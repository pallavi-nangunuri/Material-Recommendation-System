from flask import Flask, request, jsonify
import flask_cors
import pickle
import pandas as pd
import numpy as np
import json
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192
}

# Initialize the generative AI model
gemini_model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

@app.route('/api/v1/predict', methods=['POST'])  # Fixed typo: rooute -> route
def predict():
    try:
        data = request.get_json()

        # Keep a copy of original input for Gemini
        cost = data.get("Cost_per_Unit ($)", "Unknown")
        load_capacity = data["Load_Bearing_Capacity (tons)"]
        uv_resistance = data["UV_Resistance (1-10)"]
        durability = data["Durability (years)"]
        maintenance = data["Maintenance_Frequency (years)"]
        corrosion_resistance = data["Corrosion_Resistance (1-10)"]


        # Drop budget before sending to ML model
        model_input = data.copy()

        input_df = pd.DataFrame([model_input])

        # Load model and preprocessors
        model = pickle.load(open("pickle_files/model.pkl", "rb"))
        scaler = pickle.load(open("pickle_files/scaler.pkl", "rb"))
        encoder = pickle.load(open("pickle_files/encoder.pkl", "rb"))

        # Feature mappings
        input_df['Cost_per_Unit ($)'] = scaler.transform(input_df['Cost_per_Unit ($)'].values.reshape(-1, 1))
        input_df['Load_Bearing_Capacity (tons)'] = scaler.transform(input_df['Load_Bearing_Capacity (tons)'].values.reshape(-1, 1))
        input_df['UV_Resistance (1-10)'] = scaler.transform(input_df['UV_Resistance (1-10)'].values.reshape(-1, 1))
        input_df['Durability (years)'] = scaler.transform(input_df['Durability (years)'].values.reshape(-1, 1))
        input_df['Maintenance_Frequency (years)'] = scaler.transform(input_df['Maintenance_Frequency (years)'].values.reshape(-1, 1))
        input_df['Corrosion_Resistance (1-10)'] = scaler.transform(input_df['Corrosion_Resistance (1-10)'].values.reshape(-1, 1))

        # Predict top 3 materials
        predictions = model.predict_proba(input_df)[0]
        top_3_indices = np.argsort(predictions)[::-1][:3]
        top_3_materials = encoder.inverse_transform(top_3_indices)

        # Gemini Prompt
        prompt = f"""
            You are a materials science expert helping select construction materials.

            Here are the project requirements:
            - Cost per Unit: ₹{cost}
            - Load Capacity: {load_capacity}
            - UV Resistance: {uv_resistance}
            - Durability: {durability}/10
            - Maintenance Frequency: {maintenance} years
            - Corrosion Resistance: {corrosion_resistance}/10

            The machine learning model has suggested the following top 3 materials (in order of suitability):
            1. {top_3_materials[0]}
            2. {top_3_materials[1]}
            3. {top_3_materials[2]}

            Please perform a cost-based and performance-based competitor analysis **only among these three materials**.

            Present your analysis in the following **structured JSON format**:

            {{
            "top_3_predictions": [
                "{top_3_materials[0]}",
                "{top_3_materials[1]}",
                "{top_3_materials[2]}"
            ],
            "competitor_analysis": [
                {{
                "material": "{top_3_materials[0]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "remarks": "Detailed remarks about the material."
                }},
                {{
                "material": "{top_3_materials[1]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "remarks": "Detailed remarks about the material."
                }},
                {{
                "material": "{top_3_materials[2]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "remarks": "Detailed remarks about the material."
                }}
            ]
            }}

            - Use technical reasoning for any trade-offs or advantages in the **remarks** column.
            - Focus only on the three materials mentioned. Keep the output strictly in JSON.
            - Do **not** compare with the cost per unit or include “within_budget”.
        """

        gemini_response = gemini_model.generate_content(prompt)
        # result = gemini_response.text
        # cleaned_response = result.strip("json\n").strip("")
        raw_text = gemini_response.text.strip()

        # Clean: strip code block markdown
        if raw_text.startswith("```json"):
            raw_text = raw_text.removeprefix("```json").strip()
        if raw_text.endswith("```"):
            raw_text = raw_text.removesuffix("```").strip()

        parsed_response = json.loads(raw_text)
        return jsonify(parsed_response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
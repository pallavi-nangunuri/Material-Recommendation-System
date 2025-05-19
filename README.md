# Material Prediction System (Material AI)

A web-based application to predict suitable construction materials based on user inputs using machine learning algorithms.

## 🔧 Tech Stack

### Frontend
- *React (Vite)*
- *react-hook-form*
- *Axios*

### Backend
- *Flask*
- *Pandas*
- *Scikit-learn*
- *Pickle (.pkl) model loading*
- *Gemini API*


![Image](https://github.com/user-attachments/assets/23306700-c704-48c9-af40-7d70d9ac417d)



## 📄 Project Structure

### Pages
- *Landing Page*
  - Overview and introduction to the system.

- *Material Product Form*
  - A form where users input material requirements.

### Form Inputs
Users are required to input the following values:

- Cost_per_Unit ($)
- Load_Bearing_Capacity (tons)
- UV_Resistance (scale: 1–10)
- Durability (years)
- Maintenance_Frequency (years)
- Corrosion_Resistance (scale: 1–10)

Form validation is handled using react-hook-form.

---

## 🔁 Flow of Execution

1. *User Input*:  
   The user fills in the form on the Material Product Form page.

2. *Form Validation*:  
   All fields are validated using react-hook-form with proper constraints.

3. *API Request*:  
   On submission, the input data is sent to the backend using axios.

4. *Backend Processing*:
   - Flask receives the request.
   - The backend loads pre-trained .pkl files for *6 machine learning models*:
     - K-Nearest Neighbors (KNN)
     - Random Forest
     - Decision Tree
     - Support Vector Classifier (SVC)
     - Logistic Regression
     - Gaussian Naive Bayes
   - The models process the input and predict *3 recommended material names*.

5. The response from ML model is given to Gemini model which gives us the competitor analysis.

6. *Response*:
   - The predicted material names with competitor analysis is sent back to the frontend.
   - The UI displays the recommended materials to the user.

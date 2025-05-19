import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { FaSpinner, FaUndo, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa"
import { config } from "../config"

const MaterialPredictionForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [recommendedMaterials, setRecommendedMaterials] = useState(null)
    const [responseDetails, setResponseDetails] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            "Cost_per_Unit ($)": "",
            "Load_Bearing_Capacity (tons)": "",
            "UV_Resistance (1-10)": "",
            "Durability (years)": "",
            "Maintenance_Frequency (years)": "",
            "Corrosion_Resistance (1-10)": "",
        },
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        setError(null)
        setRecommendedMaterials(null)
        setResponseDetails(null)

        try {
            // Convert all values to numbers
            const numericData = Object.keys(data).reduce((acc, key) => {
                acc[key] = Number.parseFloat(data[key])
                return acc
            }, {})

            console.log("Sending data to API:", numericData)

            // Make the API call with the correct field names
            const response = await axios.post(`http://localhost:5001/api/v1/predict`, numericData)
            
            console.log("API Response:", response.data)

            // Set the recommended materials from top_3_predictions if available
            if (response.data.top_3_predictions) {
                setRecommendedMaterials({
                    materials: response.data.top_3_predictions
                })
            }

            // Set the competitor analysis data
            setResponseDetails(response.data.competitor_analysis)

        } catch (err) {
            console.error("Error submitting form:", err)
            setError(err.response?.data?.message || "An error occurred while predicting materials")
        } finally {
            setIsLoading(false)
        }
    }

    // Function to get material color based on rank
    const getMaterialColor = (index) => {
        const colors = [
            "bg-emerald-100 text-emerald-800", 
            "bg-teal-100 text-teal-800", 
            "bg-green-100 text-green-800"
        ];
        return colors[index] || "bg-gray-100 text-gray-800";
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Material Recommendation Engine</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get AI-powered material suggestions tailored to your project's specific requirements.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Cost per Unit */}
                                <div className="space-y-2">
                                    <label htmlFor="Cost_per_Unit" className="block text-lg font-medium text-gray-700">
                                        Cost per Unit ($)
                                    </label>
                                    <input
                                        id="Cost_per_Unit"
                                        type="number"
                                        step="0.01"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["Cost_per_Unit ($)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("Cost_per_Unit ($)", {
                                            required: "Cost per unit is required",
                                            min: { value: 0, message: "Cost must be positive" }
                                        })}
                                        placeholder="e.g. 25.99"
                                    />
                                    {errors["Cost_per_Unit ($)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["Cost_per_Unit ($)"].message}
                                        </p>
                                    )}
                                </div>

                                {/* Load Bearing Capacity */}
                                <div className="space-y-2">
                                    <label htmlFor="Load_Bearing_Capacity" className="block text-lg font-medium text-gray-700">
                                        Load Bearing Capacity (tons)
                                    </label>
                                    <input
                                        id="Load_Bearing_Capacity"
                                        type="number"
                                        step="0.1"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["Load_Bearing_Capacity (tons)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("Load_Bearing_Capacity (tons)", {
                                            required: "Load bearing capacity is required",
                                            min: { value: 0, message: "Capacity must be positive" }
                                        })}
                                        placeholder="e.g. 5.5"
                                    />
                                    {errors["Load_Bearing_Capacity (tons)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["Load_Bearing_Capacity (tons)"].message}
                                        </p>
                                    )}
                                </div>

                                {/* UV Resistance */}
                                <div className="space-y-2">
                                    <label htmlFor="UV_Resistance" className="block text-lg font-medium text-gray-700">
                                        UV Resistance (1-10)
                                    </label>
                                    <input
                                        id="UV_Resistance"
                                        type="number"
                                        step="1"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["UV_Resistance (1-10)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("UV_Resistance (1-10)", {
                                            required: "UV resistance is required",
                                            min: { value: 1, message: "Minimum value is 1" },
                                            max: { value: 10, message: "Maximum value is 10" }
                                        })}
                                        placeholder="Scale from 1 to 10"
                                    />
                                    {errors["UV_Resistance (1-10)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["UV_Resistance (1-10)"].message}
                                        </p>
                                    )}
                                </div>

                                {/* Durability */}
                                <div className="space-y-2">
                                    <label htmlFor="Durability" className="block text-lg font-medium text-gray-700">
                                        Durability (years)
                                    </label>
                                    <input
                                        id="Durability"
                                        type="number"
                                        step="1"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["Durability (years)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("Durability (years)", {
                                            required: "Durability is required",
                                            min: { value: 1, message: "Minimum value is 1 year" }
                                        })}
                                        placeholder="e.g. 10"
                                    />
                                    {errors["Durability (years)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["Durability (years)"].message}
                                        </p>
                                    )}
                                </div>

                                {/* Maintenance Frequency */}
                                <div className="space-y-2">
                                    <label htmlFor="Maintenance_Frequency" className="block text-lg font-medium text-gray-700">
                                        Maintenance Frequency (years)
                                    </label>
                                    <input
                                        id="Maintenance_Frequency"
                                        type="number"
                                        step="0.5"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["Maintenance_Frequency (years)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("Maintenance_Frequency (years)", {
                                            required: "Maintenance frequency is required",
                                            min: { value: 0.5, message: "Minimum value is 0.5 years" }
                                        })}
                                        placeholder="e.g. 2.5"
                                    />
                                    {errors["Maintenance_Frequency (years)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["Maintenance_Frequency (years)"].message}
                                        </p>
                                    )}
                                </div>

                                {/* Corrosion Resistance */}
                                <div className="space-y-2">
                                    <label htmlFor="Corrosion_Resistance" className="block text-lg font-medium text-gray-700">
                                        Corrosion Resistance (1-10)
                                    </label>
                                    <input
                                        id="Corrosion_Resistance"
                                        type="number"
                                        step="1"
                                        className={`w-full px-5 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors["Corrosion_Resistance (1-10)"] ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register("Corrosion_Resistance (1-10)", {
                                            required: "Corrosion resistance is required",
                                            min: { value: 1, message: "Minimum value is 1" },
                                            max: { value: 10, message: "Maximum value is 10" }
                                        })}
                                        placeholder="Scale from 1 to 10"
                                    />
                                    {errors["Corrosion_Resistance (1-10)"] && (
                                        <p className="mt-2 text-md text-red-600 flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors["Corrosion_Resistance (1-10)"].message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex items-center justify-center px-8 py-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-3" />
                                            Analyzing Specifications...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle className="mr-3" />
                                            Get Material Recommendations
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset()
                                        setRecommendedMaterials(null)
                                        setResponseDetails(null)
                                        setError(null)
                                    }}
                                    className="flex items-center justify-center px-8 py-4 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-200"
                                >
                                    <FaUndo className="mr-3" />
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="mt-12 bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="flex justify-center">
                            <FaSpinner className="animate-spin h-12 w-12 text-emerald-600" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-gray-900">Processing Your Request</h3>
                        <p className="mt-4 text-gray-600 text-lg">
                            Our AI engine is analyzing your specifications to find the optimal materials for your project...
                        </p>
                        <p className="text-red-500">Since our server is hosted on <b>Render’s</b> free instance, responses may take a little longer. We appreciate your patience Thank you!</p>

                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mt-12 bg-red-50 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FaExclamationTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold text-red-800">Error Processing Request</h3>
                                <div className="mt-2 text-lg text-red-700">
                                    <p>{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {responseDetails && (
                    <div className="mt-12 space-y-12">
                        {/* Recommended Materials */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Recommended Materials</h2>
                                <p className="text-xl text-gray-600">
                                    Based on your specifications, these are the top material matches:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {recommendedMaterials && recommendedMaterials.materials && recommendedMaterials.materials.map((material, index) => (
                                    <div 
                                        key={index} 
                                        className={`border-2 rounded-lg p-6 transition-all hover:shadow-md ${index === 0 ? 'border-emerald-500 transform scale-105' : 'border-gray-200'}`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <span className={`${getMaterialColor(index)} font-bold text-lg px-3 py-1 rounded-full`}>
                                                #{index + 1}
                                            </span>
                                            <h3 className="ml-3 text-2xl font-extrabold text-gray-900">{material}</h3>
                                        </div>
                                        
                                        <div className="mt-6">
                                            <div className="flex items-center text-emerald-600 mb-2">
                                                <FaInfoCircle className="mr-2" />
                                                <span className="font-semibold">Key Features:</span>
                                            </div>
                                            <ul className="space-y-2 text-gray-700">
                                                {Object.entries(responseDetails.find(item => item.material === material) || {})
                                                    .filter(([key]) => key !== 'material' && key !== 'remarks')
                                                    .slice(0, 3) // Show top 3 features
                                                    .map(([property, value], propIndex) => (
                                                        <li key={propIndex} className="flex justify-between">
                                                            <span className="text-gray-600 capitalize">{property.replace(/_/g, ' ')}:</span>
                                                            <span className="font-medium text-gray-900">{value}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Comparison */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Detailed Material Comparison</h2>
                                <p className="text-xl text-gray-600">
                                    Comprehensive analysis of each recommended material
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                                                Property
                                            </th>
                                            {responseDetails.map((material, index) => (
                                                <th 
                                                    key={index} 
                                                    scope="col" 
                                                    className={`px-6 py-4 text-left text-lg font-bold ${index === 0 ? 'text-emerald-600' : 'text-gray-700'} uppercase tracking-wider`}
                                                >
                                                    {material.material}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Object.keys(responseDetails[0])
                                            .filter(key => key !== 'material' && key !== 'remarks')
                                            .map((property, propIndex) => (
                                                <tr key={propIndex} className={propIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 capitalize">
                                                        {property.replace(/_/g, ' ')}
                                                    </td>
                                                    {responseDetails.map((material, matIndex) => (
                                                        <td 
                                                            key={matIndex} 
                                                            className={`px-6 py-4 whitespace-nowrap text-lg ${matIndex === 0 ? 'font-bold text-emerald-600' : 'text-gray-700'}`}
                                                        >
                                                            {material[property]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Remarks Section */}
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {responseDetails.map((material, index) => (
                                    material.remarks && (
                                        <div key={index} className="bg-gray-50 p-5 rounded-lg border-l-4 border-emerald-500">
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{material.material} Summary</h4>
                                            <p className="text-gray-700">{material.remarks}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MaterialPredictionForm
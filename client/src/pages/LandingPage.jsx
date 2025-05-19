import { FaChartLine, FaLeaf, FaTools } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-teal-100 flex-grow h-screen justify-center items-center flex flex-col">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              AI-Based Material Recommendation System
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-700">
              Make smarter material choices for your projects with our advanced
              AI system that considers durability, cost, and environmental
              impact to deliver tailored recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors font-medium">
                <a href="/predict">Try Demo</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MaterialAI Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MaterialAI?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system transforms how you select materials, making
              the process faster, smarter, and more sustainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <FaTools className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Reduce Manual Effort
              </h3>
              <p className="text-gray-600">
                Automate the material selection process to save time and
                minimize errors in your projects.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <FaChartLine className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Improve Cost Management
              </h3>
              <p className="text-gray-600">
                Make cost-effective decisions with comprehensive price
                comparisons and analysis.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
              <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <FaLeaf className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Environmental Impact
              </h3>
              <p className="text-gray-600">
                Evaluate materials based on their environmental footprint to
                make sustainable choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system simplifies the material selection process in
              just a few steps.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 hidden md:block"></div>

              {/* Steps */}
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-3">
                      Input Requirements
                    </h3>
                    <p className="text-gray-600">
                      Specify your project needs, budget constraints, and
                      environmental considerations through our intuitive
                      interface.
                    </p>
                  </div>
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center z-10 mx-auto md:mx-0">
                    <span className="text-emerald-600 text-2xl font-bold">
                      1
                    </span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 hidden md:block"></div>
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center z-10 mx-auto md:mx-0">
                    <span className="text-emerald-600 text-2xl font-bold">
                      2
                    </span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                    <p className="text-gray-600">
                      Our AI evaluates thousands of materials based on your
                      specific criteria and project conditions.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-3">
                      Get Recommendations
                    </h3>
                    <p className="text-gray-600">
                      Receive tailored material suggestions with detailed
                      comparisons and supplier information.
                    </p>
                  </div>
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center z-10 mx-auto md:mx-0">
                    <span className="text-emerald-600 text-2xl font-bold">
                      3
                    </span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 hidden md:block"></div>
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center z-10 mx-auto md:mx-0">
                    <span className="text-emerald-600 text-2xl font-bold">
                      4
                    </span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold mb-3">
                      Make Decisions
                    </h3>
                    <p className="text-gray-600">
                      Choose the best materials with confidence based on
                      comprehensive data and AI-driven insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default LandingPage;

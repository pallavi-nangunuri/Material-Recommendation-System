import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import MaterialPredictionForm from "./pages/MaterialPredictionForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<MaterialPredictionForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
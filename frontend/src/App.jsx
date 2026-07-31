import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import ResultCard from "./components/ResultCard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app">

      <Navbar />

      <Hero />

      <UploadBox setResult={setResult} />

      {result && <ResultCard result={result} />}

      <Footer />

    </div>
  );
}

export default App;

import ScoreCard from "./ScoreCard";
import VoiceAssistant from "./VoiceAssistant";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="result-card">

      <h2 className="title">
        🛒 Product Analysis
      </h2>

      <div className="result-grid">

        {/* LEFT */}

        <div className="left-panel">

         
<div className="product-header">

    <img
        src={result.image}
        alt={result.product_name}
        className="product-image"
    />

    <div className="product-info">

        <h1>{result.product_name}</h1>

        <div className="product-chip">
            📱 {result.category}
        </div>

        <p>
            <strong>Brand:</strong>{" "}
            {result.brand || "Not Detected"}
        </p>

        <div className="confidence-box">

            <span>AI Confidence</span>

            <div className="confidence-bar">

                <div
                    className="confidence-fill"
                    style={{
                        width:`${result.confidence}%`
                    }}
                />

            </div>

            <span>{result.confidence}%</span>

        </div>

    </div>

</div>
          <div className="card">

            <h3>🤖 AI Caption</h3>

            <p>{result.caption}</p>

          </div>

          <div className="card">

            <h3>📝 Summary</h3>

            <p>{result.summary}</p>

          </div>

          <div className="card">

            <h3>✅ Pros</h3>

            <ul>
              {result.pros.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

          </div>

          <div className="card">

            <h3>❌ Cons</h3>

            <ul>
              {result.cons.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

          </div>

          <div className="card">

            <h3>🎯 Best For</h3>

            <p>{result.best_for}</p>

          </div>

          <div className="card">

            <h3>📢 Marketing Analysis</h3>

            <p>{result.marketing_claim_analysis}</p>

          </div>

          <div className="card">

            <h3>🔄 Alternatives</h3>

            <ul>
              {result.alternatives.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

          </div>

        </div>

        {/* RIGHT */}

        <div className="right-panel">

          <ScoreCard
    score={result.score}
    recommendation={result.recommendation}
/>

         <VoiceAssistant result={result} />

          

        </div>

      </div>

    </div>
  );
}

export default ResultCard;
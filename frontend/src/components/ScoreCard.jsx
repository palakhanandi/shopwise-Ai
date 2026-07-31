function ScoreCard({ score, recommendation }) {

  const value = Number(score);

  let color = "#22c55e";
  let badge = "🟢 Highly Recommended";

  if (value < 4.5 && value >= 3.5) {
    color = "#3b82f6";
    badge = "👍 Recommended";
  }

  if (value < 3.5 && value >= 2.5) {
    color = "#f59e0b";
    badge = "🟡 Average Choice";
  }

  if (value < 2.5) {
    color = "#ef4444";
    badge = "🔴 Not Recommended";
  }

  const percent = (value / 5) * 100;

  return (
    <div className="score-card">

      <div
        className="score-badge"
        style={{ background: color }}
      >
        {recommendation || badge}
      </div>

      <h2>⭐ AI Score</h2>

      <div
        className="score-circle"
        style={{
          background: `conic-gradient(${color} ${percent}%, #e5e7eb ${percent}%)`
        }}
      >
        <div className="score-inner">

          <h1>{value.toFixed(1)}</h1>

          <span>/5</span>

        </div>
      </div>

      <div className="progress-title">
        Purchase Confidence
      </div>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
            background: color
          }}
        />

      </div>

    </div>
  );
}

export default ScoreCard;
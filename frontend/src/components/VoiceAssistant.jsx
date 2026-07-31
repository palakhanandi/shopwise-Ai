import { useEffect, useState } from "react";

function VoiceAssistant({ result }) {
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);

      if (v.length > 0) setVoice(v[0]);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const buildSpeech = () => {
    return `
Product Name: ${result.product_name}

Brand: ${result.brand}

Category: ${result.category}

Confidence: ${result.confidence} percent.

Summary.

${result.summary}

Pros.

${result.pros.join(". ")}

Cons.

${result.cons.join(". ")}

Best For.

${result.best_for}

Recommendation.

${result.recommendation}

Purchase Score.

${result.score} out of 5.
`;
  };

  const speak = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(buildSpeech());

    utterance.rate = rate;
    utterance.pitch = 1;

    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setPaused(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <div className="voice-card">

      <h3>🎤 AI Voice Assistant</h3>

      <select
        value={voice?.name || ""}
        onChange={(e) =>
          setVoice(
            voices.find((v) => v.name === e.target.value)
          )
        }
      >
        {voices.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>

      <div className="rate-box">
        <span>Speed</span>

        <input
          type="range"
          min="0.7"
          max="1.5"
          step="0.1"
          value={rate}
          onChange={(e) =>
            setRate(Number(e.target.value))
          }
        />

        <span>{rate}x</span>
      </div>

      <div className="voice-buttons">

        <button className="btn" onClick={speak}>
          🔊 Listen
        </button>

        <button className="btn" onClick={pause}>
          ⏸ Pause
        </button>

        <button className="btn" onClick={resume}>
          ▶ Resume
        </button>

        <button className="btn danger" onClick={stop}>
          ⏹ Stop
        </button>

      </div>

      {speaking && (
        <div className="voice-status">

          <div className="equalizer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <p>{paused ? "Paused" : "Speaking..."}</p>

        </div>
      )}

    </div>
  );
}

export default VoiceAssistant;
import React from "react";

function MetricsPanel({
  currentTime,
  avgWaiting,
  avgTat
}) {
  return (
    <div className="glass p-4 rounded-xl">
      <h2>Metrics</h2>

      <p>
        Time: {currentTime}
      </p>

      <p>
        Avg Waiting:
        {avgWaiting.toFixed(2)}
      </p>

      <p>
        Avg TAT:
        {avgTat.toFixed(2)}
      </p>
    </div>
  );
}

export default MetricsPanel;
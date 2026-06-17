import React from "react";

function ControlPanel({
  algorithm,
  setAlgorithm,
  startSimulation,
}) {
  return (
    <div className="glass p-4 rounded-xl">
      <h2>Controls</h2>

      <select
        value={algorithm}
        onChange={(e) =>
          setAlgorithm(e.target.value)
        }
      >
        <option>FCFS</option>
        <option>SJF</option>
        <option>SRTF</option>
        <option>RR</option>
        <option>Priority</option>
      </select>

      <button
        onClick={startSimulation}
      >
        Start
      </button>
    </div>
  );
}

export default ControlPanel;
import React from "react";

function ProcessList({
  processes
}) {
  return (
    <div>
      <h2>Processes</h2>

      {processes.map((p) => (
        <div
          key={p.id}
          className="border p-2 my-2"
        >
          <h3>P{p.id}</h3>

          <p>
            Arrival: {p.arrival}
          </p>

          <p>
            Burst: {p.burst}
          </p>

          <p>
            Priority: {p.priority}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProcessList;
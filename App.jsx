import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState("");
  const [started, setStarted] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [result, setResult] = useState(null);

  const createProcesses = () => {
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        id: i + 1,
        arrival: 0,
        burst: 1,
        priority: 1
      });
    }

    setProcesses(arr);
    setStarted(true);
  };

  const updateProcess = (index, field, value) => {
    const temp = [...processes];
    temp[index][field] = Number(value);
    setProcesses(temp);
  };

  const runFCFS = () => {
    let time = 0;
    let gantt = [];
    let totalWT = 0;
    let totalTAT = 0;

    let data = [...processes].sort(
      (a, b) => a.arrival - b.arrival
    );

    data.forEach((p) => {
      if (time < p.arrival) {
        time = p.arrival;
      }

      let wt = time - p.arrival;
      let tat = wt + p.burst;

      totalWT += wt;
      totalTAT += tat;

      gantt.push({
        id: p.id,
        start: time,
        end: time + p.burst
      });

      time += p.burst;
    });

    setResult({
      gantt,
      avgWT: (totalWT / data.length).toFixed(2),
      avgTAT: (totalTAT / data.length).toFixed(2)
    });
  };

  return (
    <div className="container">
      <h1>CPU Scheduling Visualizer</h1>

      {!started ? (
        <>
          <h3>Enter Number of Processes</h3>

          <input
            type="number"
            value={count}
            onChange={(e) =>
              setCount(e.target.value)
            }
          />

          <button onClick={createProcesses}>
            Create
          </button>
        </>
      ) : (
        <>
          <select
            value={algorithm}
            onChange={(e) =>
              setAlgorithm(e.target.value)
            }
          >
            <option>FCFS</option>
            <option>SJF</option>
            <option>Priority</option>
          </select>

          <table>
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {processes.map((p, index) => (
                <tr key={p.id}>
                  <td>P{p.id}</td>

                  <td>
                    <input
                      type="number"
                      value={p.arrival}
                      onChange={(e) =>
                        updateProcess(
                          index,
                          "arrival",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={p.burst}
                      onChange={(e) =>
                        updateProcess(
                          index,
                          "burst",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={p.priority}
                      onChange={(e) =>
                        updateProcess(
                          index,
                          "priority",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={runFCFS}>
            Run Simulation
          </button>

          {result && (
            <>
              <h2>Gantt Chart</h2>

              <div className="gantt">
                {result.gantt.map((g, index) => (
                  <div
                    key={index}
                    className="block"
                  >
                    P{g.id}
                    <br />
                    {g.start}-{g.end}
                  </div>
                ))}
              </div>

              <div className="metrics">
                <p>
                  Average Waiting Time :
                  {result.avgWT}
                </p>

                <p>
                  Average Turnaround Time :
                  {result.avgTAT}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
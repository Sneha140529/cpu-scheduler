import React, { useState } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState("");
  const [showTable, setShowTable] = useState(false);

  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(2);

  const [processes, setProcesses] = useState([]);

  const [gantt, setGantt] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [avgWT, setAvgWT] = useState(0);
  const [avgTAT, setAvgTAT] = useState(0);

  const createProcesses = () => {
    let arr = [];

    for (let i = 1; i <= Number(num); i++) {
      arr.push({
        id: i,
        arrival: 0,
        burst: 1,
        priority: 1,
      });
    }

    setProcesses(arr);
    setShowTable(true);
  };

  const handleChange = (index, field, value) => {
    const temp = [...processes];
    temp[index][field] = Number(value);
    setProcesses(temp);
  };

  const startSimulation = () => {
    let list = [...processes];

    let totalWT = 0;
    let totalTAT = 0;

    let ganttData = [];
    let completedData = [];

    // ================= FCFS =================

    if (algorithm === "FCFS") {
      list.sort((a, b) => a.arrival - b.arrival);

      let currentTime = 0;

      list.forEach((p) => {
        let wt = Math.max(0, currentTime - p.arrival);

        let tat = wt + p.burst;

        totalWT += wt;
        totalTAT += tat;

        currentTime += p.burst;

        ganttData.push({ id: p.id });
        completedData.push(p);
      });
    }

    // ================= SJF =================

    else if (algorithm === "SJF") {
      list.sort((a, b) => a.burst - b.burst);

      let currentTime = 0;

      list.forEach((p) => {
        let wt = currentTime;
        let tat = wt + p.burst;

        totalWT += wt;
        totalTAT += tat;

        currentTime += p.burst;

        ganttData.push({ id: p.id });
        completedData.push(p);
      });
    }

    // ================= PRIORITY =================

    else if (algorithm === "Priority") {
      list.sort((a, b) => a.priority - b.priority);

      let currentTime = 0;

      list.forEach((p) => {
        let wt = currentTime;
        let tat = wt + p.burst;

        totalWT += wt;
        totalTAT += tat;

        currentTime += p.burst;

        ganttData.push({ id: p.id });
        completedData.push(p);
      });
    }

    // ================= ROUND ROBIN =================

    else if (algorithm === "RR") {
      let queue = list.map((p) => ({
        ...p,
        remaining: p.burst,
      }));

      let currentTime = 0;

      while (queue.some((p) => p.remaining > 0)) {
        for (let p of queue) {
          if (p.remaining <= 0) continue;

          let run = Math.min(quantum, p.remaining);

          ganttData.push({
            id: p.id,
          });

          currentTime += run;
          p.remaining -= run;

          if (p.remaining === 0) {
            let tat = currentTime - p.arrival;
            let wt = tat - p.burst;

            totalWT += wt;
            totalTAT += tat;

            completedData.push(p);
          }
        }
      }
    }

    setGantt(ganttData);
    setCompleted(completedData);

    setAvgWT(
      (totalWT / processes.length).toFixed(2)
    );

    setAvgTAT(
      (totalTAT / processes.length).toFixed(2)
    );
  };

  return (
    <div className="container">
      <h1>CPU Scheduling Visualizer</h1>

      {!showTable ? (
        <div className="card">
          <h2>Enter Number of Processes</h2>

          <input
            type="number"
            min="1"
            value={num}
            onChange={(e) =>
              setNum(e.target.value)
            }
          />

          <button onClick={createProcesses}>
            Generate
          </button>
        </div>
      ) : (
        <>
          <div className="card">
            <label>Algorithm :</label>

            <select
              value={algorithm}
              onChange={(e) =>
                setAlgorithm(e.target.value)
              }
            >
              <option value="FCFS">FCFS</option>
              <option value="SJF">SJF</option>
              <option value="Priority">
                Priority
              </option>
              <option value="RR">
                Round Robin
              </option>
            </select>

            {algorithm === "RR" && (
              <>
                <label>
                  Quantum :
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantum}
                  onChange={(e) =>
                    setQuantum(
                      Number(e.target.value)
                    )
                  }
                />
              </>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>PID</th>
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
                        handleChange(
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
                        handleChange(
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
                        handleChange(
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

          <button
            className="startBtn"
            onClick={startSimulation}
          >
            Start Simulation
          </button>

          <h2>Gantt Chart</h2>

          <div className="gantt">
            {gantt.map((g, index) => (
              <div
                key={index}
                className="block"
              >
                P{g.id}
              </div>
            ))}
          </div>

          <h2>Completed Processes</h2>

          <div className="completed">
            {completed.map((p) => (
              <div
                key={p.id}
                className="process-box"
              >
                P{p.id}
              </div>
            ))}
          </div>

          <h3>
            Average Waiting Time :
            {avgWT}
          </h3>

          <h3>
            Average Turnaround Time :
            {avgTAT}
          </h3>
        </>
      )}
    </div>
  );
}

export default App;
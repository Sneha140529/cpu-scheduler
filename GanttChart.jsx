import React from "react";

function GanttChart({
  ganttData
}) {
  return (
    <div className="flex border mt-4">
      {ganttData.map(
        (item, index) => (
          <div
            key={index}
            className="border px-4 py-2"
          >
            {item}
          </div>
        )
      )}
    </div>
  );
}

export default GanttChart;
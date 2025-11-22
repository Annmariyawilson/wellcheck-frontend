import React from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatCircle({
  value = 0,
  label = "",
  size = 80,
  strokeWidth = 12,
  textSize = "22px",
  pathColor = "#4BAED1",
  trailColor = "#e5e7eb",
  textColor = "#2c2f6b",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      
      <div style={{ width: size, height: size }}>
        <CircularProgressbar
          value={value}
          text={`${value}`}
          strokeWidth={strokeWidth}
          styles={buildStyles({
            textSize,
            pathColor,
            trailColor,
            textColor,
          })}
        />
      </div>

      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}
    </div>
  );
}

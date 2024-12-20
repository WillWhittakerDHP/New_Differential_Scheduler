import React, { useState } from "react";
import {DaysWithRanges} from "./calendar";
import {formatClockTime, TimePeriod, durationTimePeriod} from "../../../server/src/utils/timeslots";

interface AvailableTimesProps {
  activeView: "Inspector" | "Client";
  inspectorTimes : DaysWithRanges,
  clientTimes : DaysWithRanges,
  selectedDate: Date | null;
}

const AvailableTimes: React.FC<AvailableTimesProps> = ({
  inspectorTimes,
  clientTimes,
  selectedDate,  
}) => {
  const [selectedTime, setSelectedTime] = useState<TimePeriod | null>({} as TimePeriod);
  const [activeView, setActiveView] = useState<"Inspector" | "Client">(
    "Inspector"
  );

  if (!selectedDate) {
    return (
      <div className="available-times">
        <h3>No Times Available</h3>
      </div>
    );
  }


  const handleTimeClick = (time : TimePeriod | null) => {
    setSelectedTime(time);
    console.log(`selectedTime: ${JSON.stringify(selectedTime)} time: ${JSON.stringify(time)}`)
  };



  const duration = selectedTime && selectedTime.start && selectedTime.end
    ? durationTimePeriod(selectedTime)
    : 0;
  // Determine the currently active times
  const times =
    activeView === "Inspector"
      ? inspectorTimes || []
      : clientTimes || [];

  // Determine the number of columns dynamically
  const columnCount = 5
    //times.length > 21 ? 4 : times.length > 14 ? 3 : times.length > 7 ? 2 : 1
    const selDay = times.daysMap.get(selectedDate.toISOString())
    const time : string[] = []
    const periods : TimePeriod[] = []
    selDay?.forEach((period) =>{
        time.push(`${formatClockTime(period.start)} - ${formatClockTime(period.end)}`)
        periods.push(period)
      }
    )
    //const time : string[] = `${selDay.}`

  return (
    <div className="available-times">
      {/* Slider */}
      <div className="available-times-slider">
        <button
          className={activeView === "Inspector" ? "active" : ""}
          onClick={() => setActiveView("Inspector")}
        >
          Inspector
        </button>
        <button
          className={activeView === "Client" ? "active" : ""}
          onClick={() => setActiveView("Client")}
        >
          Client
        </button>
      </div>

      {/* Display Times */}
      <h3>
        {activeView} Times for {selectedDate.toLocaleDateString()}
      </h3>
      <div
        className={`available-times-grid ${
          activeView === "Inspector" ? "inspector" : "client"
        }`}
        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
      >
        {time.map((periodString, index) =>
          <button key={index} onClick={() => handleTimeClick(periods[index])}>
            {periodString}
          </button>
        )}      
    </div>
    {!!selectedTime && !!selectedTime.start && !!selectedTime.end && (
                <div className="duration-bar-container">
                {/* Inspector Bar */}
                <div
                  className="duration-bar inspector-bar"
                  style={{
                    width: `${duration}%`,
                  }}
                >
                  {formatClockTime(selectedTime.start)} to {formatClockTime(selectedTime.end)}
                </div>
                {/* Client Bar */}
                <div
                  className="duration-bar client-bar"
                  style={{
                    width: `${(duration / 3)}%`, // Client bar is 1/3 the length
                  }}
                >
                  {formatClockTime(selectedTime.start)} to {formatClockTime(selectedTime.end)}
                </div>
          <p>
            Duration: {formatClockTime(selectedTime.start)} to {formatClockTime(selectedTime.end)} ({duration} minutes)
          </p>
        </div>
      )}
    </div>
    
  );
};

export default AvailableTimes;

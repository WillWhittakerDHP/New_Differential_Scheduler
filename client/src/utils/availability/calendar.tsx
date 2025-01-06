import React, { useState } from "react";
import "./calendar.css";
import AvailableTimes from "./AvailableTimes";
//import {inspectorTimes, clientTimes} from "../data/timeData"
import {TimePeriod} from "../../../server/src/utils/timeslots"
export interface DaysWithRanges {
  daysMap : Map<string, TimePeriod[]>
}

interface CalendarProps {
  inspectorTimes: DaysWithRanges;
  clientTimes: DaysWithRanges;
}
const Calendar: React.FC<CalendarProps> = ({inspectorTimes, clientTimes })  => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const isSameMonth = year === today.getFullYear() && month === today.getMonth();

    const calendarDays: JSX.Element[] = [];

    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div className="calendar-cell empty" key={`empty-${i}`} />);
    }

    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const isPastDay = cellDate < today && (!isSameMonth || day < today.getDate());

      let hasAvailableTime : boolean;
      let valid = inspectorTimes.daysMap.get(cellDate.toISOString())
      if(valid?.length && !isPastDay){
        hasAvailableTime = valid.length > 0
      }else{
        hasAvailableTime = false
      }
      
      const isSelected = selectedDate?.toDateString() === cellDate.toDateString();

      calendarDays.push(
        <div
          key={day}
          className={`calendar-cell 
            ${isPastDay ? "past" : ""} 
            ${hasAvailableTime ? "available" : ""} 
            ${isSelected ? "selected" : ""}`}
          onClick={!isPastDay ? () => handleSelectDay(day) : undefined}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const currentMonthYear = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  const isPrevDisabled =
    currentDate.getFullYear() === new Date().getFullYear() &&
    currentDate.getMonth() === new Date().getMonth();

  //const selectedDateFormatted = selectedDate?.toISOString().split("T")[0];
  //const selectedTimes = selectedDateFormatted ? timeData[selectedDateFormatted] : null;

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={handlePrevMonth} disabled={isPrevDisabled}>
              Prev
            </button>
            <span>{currentMonthYear}</span>
            <button onClick={handleNextMonth}>Next</button>
          </div>
          <div className="calendar-grid">{renderCalendarDays()}</div>
        </div>
      </div>
      <AvailableTimes
          activeView={"Inspector"}
          inspectorTimes={inspectorTimes}
          clientTimes={clientTimes}
          selectedDate={selectedDate}
        />
    </div>
    
  );
};

export default Calendar;

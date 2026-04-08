import React, { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Notes from "./Notes";

const Calender = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [dayInMonth, setDayInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDayInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currDate]);

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const prevMonth = () => {
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth() + 1)));
  };


  const monthImages = [
    "/images/jan.jpg",
    "/images/feb.jpg",
    "/images/march.jpg",
    "/images/april.jpg",
    "/images/may.jpg",
    "/images/june.jpg",
    "/images/july.jpg",
    "/images/aug.jpg",
    "/images/sep.jpg",
    "/images/oct.jpg",
    "/images/nov.jpg",
    "/images/dec.jpg",
  ];

  const currentImage = monthImages[currDate.getMonth()];

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (date < startDate) {
      setStartDate(date);
      return;
    }

    if (date.toDateString() === startDate.toDateString()) {
      setEndDate(null);
      return;
    }

    setEndDate(date);
  };

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-3 sm:p-4 md:p-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-xl">
      
      <div className="w-full h-40 sm:h-48 md:h-56 overflow-hidden mb-4 shadow rounded-lg">
        <img
          src={currentImage}
          alt="calendar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1 sm:p-2 hover:bg-zinc-200 cursor-pointer border rounded-full">
          <IoChevronBack size={20} />
        </button>

        <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-center">
          {currDate.toLocaleString("default", { month: "long" })}{" "}
          {currDate.getFullYear()}
        </h3>

        <button onClick={nextMonth} className="p-1 sm:p-2 hover:bg-zinc-200 cursor-pointer border rounded-full">
          <IoChevronForward size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs sm:text-sm font-semibold text-center mb-2">
        {dayNames.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 justify-items-center min-h-[260px] sm:min-h-[320px]">
        
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {dayInMonth.map((date, index) => {
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date);
          const isToday =
            new Date().toDateString() === date.toDateString();
          const isSunday = date.getDay() === 0;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                flex items-center justify-center 
                cursor-pointer font-semibold
                text-xs sm:text-sm md:text-base
                transition-all hover:bg-blue-100

                ${isStart || isEnd ? "bg-blue-500 text-white rounded-full" : ""}
                ${inRange ? "bg-blue-200" : ""}
                ${isToday ? "border border-blue-500" : ""}
                ${isSunday && !isStart && !isEnd ? "text-red-400" : ""}
              `}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <Notes startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default Calender;
import { useState, useEffect } from "react";

const Notes = ({ startDate, endDate }) => {
  const [note, setNote] = useState("");

  const getKey = () => {
    if (startDate && endDate) {
      return `${startDate.toISOString().split("T")[0]}_${endDate
        .toISOString()
        .split("T")[0]}`;
    }
    if (startDate) {
      return startDate.toISOString().split("T")[0];
    }
    return null;
  };

  useEffect(() => {
    const key = getKey();
    if (!key) return;

    const saved = localStorage.getItem(key);
    setNote(saved || "");
  }, [startDate, endDate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNote(value);

    const key = getKey();
    if (key) {
      localStorage.setItem(key, value);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm sm:text-md font-semibold mb-2">
        {startDate && endDate
          ? `Notes from ${startDate.toDateString()} to ${endDate.toDateString()}`
          : startDate
          ? `Notes for ${startDate.toDateString()}`
          : "Select a date"}
      </h3>

      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Write your notes..."
        className="w-full border rounded-lg p-2 outline-none resize-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        rows="3"
      />
    </div>
  );
};

export default Notes;
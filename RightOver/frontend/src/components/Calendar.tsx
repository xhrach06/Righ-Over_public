/* Author: Matej Hrachovec
Login: xhrach06 */
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  const customTileClassName = ({ date, view }: any) => {
    if (view === "month" && (date.getDay() === 0 || date.getDay() === 6)) {
      return "highlight-weekend";
    }

    return "";
  };

  return (
    <div>
      <style>
        {`
          .highlight-weekend {
            background-color: lightblue;
          }
        `}
      </style>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={customTileClassName}
      />
    </div>
  );
}

export default MyCalendar;

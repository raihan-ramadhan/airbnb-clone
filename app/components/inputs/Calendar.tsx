"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Calendarprops {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<Calendarprops> = ({
  onChange,
  value,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      minDate={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;

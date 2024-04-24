import React from 'react';
import { formatISO } from 'date-fns';

// Define a type for the props that DateRangePicker will accept
type DateRangePickerProps = {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  return (
    <div>
      <input
        type="datetime-local"
        value={formatISO(startDate)}
        onChange={e => setStartDate(new Date(e.target.value))}
      />
      <input
        type="datetime-local"
        value={formatISO(endDate)}
        onChange={e => setEndDate(new Date(e.target.value))}
      />
    </div>
  );
};

export default DateRangePicker;
'use client';
// DateRangePicker.tsx
import React from 'react';
import { formatISO } from 'date-fns';

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
    setEndDate,
}) => {
    // Function to handle date changes, including seconds
    const handleDateChange = (
        dateSetter: (date: Date) => void
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dateSetter(new Date(event.target.value));
    };

    // Generate ISO string with seconds
    const toDateTimeLocal = (date: Date) => 
        formatISO(date, { representation: 'complete' }).slice(0, 19);

    return (
        <div>
            <input
                type="datetime-local"
                value={toDateTimeLocal(startDate)}
                onChange={handleDateChange(setStartDate)}
                step="1" // Allows for second precision
            />
            <input
                type="datetime-local"
                value={toDateTimeLocal(endDate)}
                onChange={handleDateChange(setEndDate)}
                step="1" // Allows for second precision
            />
        </div>
    );
};

export default DateRangePicker;

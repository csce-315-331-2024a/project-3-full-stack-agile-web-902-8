'use client';
// DateRangePicker.tsx
import React from 'react';
import { formatISO } from 'date-fns';
//import design from '@/app/manager/report_page/page.module.css';

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
    const handleDateChange =
        (dateSetter: (date: Date) => void) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dateSetter(new Date(event.target.value));
        };

    // Generate ISO string with seconds
    const toDateTimeLocal = (date: Date) =>
        formatISO(date, { representation: 'complete' }).slice(0, 19);

    return (
        <div>
            <label>
                Start date:
                <input
                    type="datetime-local"
                    value={toDateTimeLocal(startDate)}
                    onChange={handleDateChange(setStartDate)}
                    step="1" // Allows for second precision
                    //className={design.dateInput}
                    className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl ml-2 mr-4 hover:bg-secondary/70"
                />
            </label>
            <label>
                End date:
                <input
                    type="datetime-local"
                    value={toDateTimeLocal(endDate)}
                    onChange={handleDateChange(setEndDate)}
                    step="1" // Allows for second precision
                    //className={design.dateInput}
                    className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl ml-2 hover:bg-secondary/70"
                />
            </label>
        </div>
    );
};

export default DateRangePicker;

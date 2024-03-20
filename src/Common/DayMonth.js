import React from "react";

const DayMonth = ({deliverydate}) => {
    const formatDate = (inputdate) => {
        const date = new Date(inputdate);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${weekdays[date.getUTCDay()]} ${String(date.getUTCDate()).padStart(2,'0')}/${String(date.getUTCMonth()+1).padStart(2,'0')}`
    }; 
    return (
        <div>
          {formatDate(deliverydate)}
        </div>
    )
};

export default DayMonth;

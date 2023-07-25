import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formattedDateTime = dateTime.toLocaleString(undefined, options);

  return <div>{formattedDateTime}</div>;
};

export default Clock;

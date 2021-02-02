import React, { useState, useEffect } from 'react';
import moment from "moment";
import SVGCircle from "./SVGCircle";

const CustomCountdown = ({date, type}) => {
  const [counter, setCounter] = useState({
    months: '0',
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  useEffect(() => {
    const timer =
      setInterval(() => {
        const then = moment(date);
        const now = moment();
        const countdown = moment(then - now);
        const months = countdown.format('M') - 1;
        const days = countdown.format('D');
        const hours = countdown.format('HH');
        const minutes = countdown.format('mm');
        const seconds = countdown.format('ss');
        setCounter({ months, days, hours, minutes, seconds })
      }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const renderLeftDate = (timeItem, timeRadius, word, type) => {
    return (
      <>
        {type === "radius" ?
          <div className="countdown-item">
            <SVGCircle radius={timeRadius}/>
            {timeItem}
            <span>{word}</span>
          </div>
        :
          <div className="timer-item">
            <span>{timeItem}</span>{timeItem === 1 ? 'Day' : word}
          </div>}
      </>
    )
  }

  const mapNumber = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  const {months, days, hours, minutes, seconds} = counter;

  const monthsRadius = mapNumber(months, 60, 0, 0, 360);
  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  if (!seconds) {
    return null;
  }

  return (
     <div className={type === "radius"
       ? "timer-container" : "countdown-wrapper"}>
        {renderLeftDate(months, monthsRadius, 'Months', type)}
        {renderLeftDate(days, daysRadius, 'Days', type)}
        {renderLeftDate(hours, hoursRadius, 'Hours', type)}
        {renderLeftDate(minutes, minutesRadius, 'Min', type)}
        {renderLeftDate(seconds, secondsRadius, 'Sec', type)}
      </div>
  );
}

export default CustomCountdown;

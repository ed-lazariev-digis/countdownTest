import React, { useState, useEffect } from 'react';
import moment from "moment";
import SVGCircle from "./SVGCircle";

const CustomCountdown = ({date}) => {
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

  const renderLeftDate = (timeItem, timeRadius, word) => (
    <div className="countdown-item">
      <SVGCircle radius={timeRadius} />
      {timeItem}
      <span>{word}</span>
    </div>
  )

  const renderLeftDateSecond = (timeItem, word) => (
    <li>
      <span id='seconds'>{timeItem}</span>{timeItem === 1 ? 'Day' : word}
    </li>
  )

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
    <div>
      <div className="countdown-wrapper">
        {renderLeftDate(months, monthsRadius, 'Months')}
        {renderLeftDate(days, daysRadius, 'Days')}
        {renderLeftDate(hours, hoursRadius, 'Hours')}
        {renderLeftDate(minutes, minutesRadius, 'Min')}
        {renderLeftDate(seconds, secondsRadius, 'Sec')}
      </div>

      <div className='timer-container'>
        <ul>
          {renderLeftDateSecond(months, 'Months')}
          {renderLeftDateSecond(days, 'Days')}
          {renderLeftDateSecond(hours, 'Hours')}
          {renderLeftDateSecond(minutes, 'Min')}
          {renderLeftDateSecond(seconds, 'Sec')}
        </ul>
      </div>
    </div>
  );
}

export default CustomCountdown;

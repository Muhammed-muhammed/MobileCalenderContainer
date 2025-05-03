import React from 'react';

export const TimeBoxView = ({ timeBox, isShow, waitListReserveMessage, setSuccess, name, date, waitDateValue, titleTimeBox, centerHasCapacity, titleTimeBoxWaitListFirst, titleTimeBoxWaitListSecond }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>{titleTimeBox}</h3>
      {timeBox?.map((slot, index) => (
        <div key={index}>
          ⏰ {slot.start} - {slot.end}
        </div>
      ))}
    </div>
  );
};
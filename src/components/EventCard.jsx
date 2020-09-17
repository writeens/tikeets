import React from 'react';
import { useHistory } from 'react-router-dom';

const EventCard = ({
  image, date, time, title, id,
}) => {
  const history = useHistory();

  /** Clicking an event card */
  const handleClick = () => {
    history.push(`/event/${id}`);
  };

  console.log(image);

  return (
    <div style={{ height: '300px' }} className="px-2 mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleClick(id)}
        onKeyPress={() => handleClick(id)}
        className="cursor-pointer rounded shadow-xs hover:shadow-2xl w-full h-full"
      >
        <img style={{ height: '65%' }} className="w-full" src={image} alt="event-banner" />
        <div className="px-3 pt-3">
          <p className="text-red-600 font-medium text-left text-sm mb-1">{`${date} ${time}`}</p>
          <p className="text-blue-900 font-bold text-left text-md">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React from 'react';

const Sidebar = () => {
  console.log('object');
  return (
    <div className="flex bg-gray-100 justify-between px-4 py-3 mb-8">
      <p className="flex font-bold text-blue-900 text-2xl">Tikeets</p>
      {/* <div className="flex items-center border-red-500 border-2">
        <p>Upcoming Events</p>
  </div> */}
    </div>
  );
};

export default Sidebar;

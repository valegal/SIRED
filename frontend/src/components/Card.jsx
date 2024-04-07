import { Icon } from '@iconify/react';

// eslint-disable-next-line react/prop-types
const Card = ({ title, icon }) => {
  return (
    <div className="w-52 h-36 m-8 rounded-lg shadow-lg bg-white hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center items-center">
      <div>
        <Icon icon={icon} width="48" height="48" style={{ color: '#0c6624' }} />
      </div>
      <div className="text-center mt-2">
        <p className="text-xl text-green-700 font-bold">{title}</p>
      </div>
    </div>
  );
};

export default Card;



import React from 'react';
import {
  useSendCountMutation,
  useGetCountQuery,
} from '../../features/api/apiSlice';
import CounterValue from '../../Component/CounterValue';
import { NavLink } from 'react-router-dom';

function Home() {
  const { refetch } = useGetCountQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [sendCount] = useSendCountMutation();

  const handleIncrement = async () => {
    await sendCount('increment');
    refetch(); // Refetch updated value
  };

  const handleDecrement = async () => {
    await sendCount('decrement');
    refetch(); // Refetch updated value
  };

  return (
    <div className="font-semibold text-2xl bg-gray-500 min-h-screen flex flex-col justify-center items-center">
      <div className="border-4 border-white rounded-lg py-10 px-20">
        <div className="text-white cursor-pointer mr-2 mb-5">COUNTER:</div>
        <div className="flex justify-center">
          <button
            className="mx-2 hover:text-white"
            aria-label="Decrement value"
            onClick={handleDecrement}
          >
            -
          </button>
          <CounterValue />
          <button
            className="mx-2 hover:text-white"
            aria-label="Increment value"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="mt-5 border-2 border-black text-white bg-black rounded-lg px-2 py-1 hover:text-black hover:bg-white">
        <NavLink to={'/sphere'}>
          <button> Sphere </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;

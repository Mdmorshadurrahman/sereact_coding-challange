import React from 'react';
import { useGetCountQuery } from '../features/api/apiSlice';

function CounterValue() {
  const { data, isError, isLoading } = useGetCountQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching counter value</div>;

  return (
    <div>
      <span className="border-2 border-black px-2 rounded-lg">{data ?? 0}</span>
    </div>
  );
}

export default CounterValue;

import React from 'react';
import { LatestJobCards } from './LatestJobCards';
import { useSelector } from 'react-redux';

export const LatestJobs = () => {
  const jobsState = useSelector((store) => store.job);
  const allJobs = jobsState?.allJobs || [];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomJobs = (jobs, count) => {
    const shuffled = shuffleArray([...jobs]);
    return shuffled.slice(0, count);
  };

  const randomJobs = allJobs.length > 0 ? getRandomJobs(allJobs, 6) : [];

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest</span> Job Openings
      </h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : randomJobs.length === 0 ? (
          <span>Loading...</span>
        ) : (
          randomJobs.map((job, index) => (
            <LatestJobCards key={job.id || `job-${index}`} jobId={job.id} />
          ))
        )}
      </div>
    </div>
  );
};


export default LatestJobs;

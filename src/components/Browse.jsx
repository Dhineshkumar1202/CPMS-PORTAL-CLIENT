import React, { useEffect } from 'react';
import { Navbar } from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

export const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset search when component unmounts
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-xl mb-6">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {
            allJobs.length > 0 ? (
              allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No jobs found.</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Browse;

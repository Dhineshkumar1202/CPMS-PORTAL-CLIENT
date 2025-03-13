import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';  // Import the action

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector((store) => store.job.allJobs); // Get jobs from Redux

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/job/get", { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]); 

  return allJobs;
};

export default useGetAllJobs;

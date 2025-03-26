import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://portal-server-cpms123.vercel.app/api/job/get?keyword=${searchedQuery}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [searchedQuery, dispatch]);

  useEffect(() => {
    fetchAllJobs();

    return () => {
      
    };
  }, [fetchAllJobs]);
};

export default useGetAllJobs;

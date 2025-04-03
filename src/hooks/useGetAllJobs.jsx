import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  const fetchAllJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); 

      const res = await axios.get(
        `http://localhost:3000/api/job/get?keyword=${searchedQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true,
        }
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
  }, [fetchAllJobs]);
};

export default useGetAllJobs;

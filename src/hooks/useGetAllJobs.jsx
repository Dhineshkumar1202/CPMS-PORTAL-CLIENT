import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.allJobs);
  
  useEffect(() => {
    if (jobs?.length > 0) return; 

    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/job/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data?.message || error.message);
      }
    };

    fetchAllJobs();
  }, [dispatch, jobs]);

  return jobs;
};

export default useGetAllJobs;

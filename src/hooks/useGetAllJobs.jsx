import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.allJobs); 

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("https://cpms-portal-server-tghf.vercel.app/api/job/get", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  return jobs; 
};

export default useGetAllJobs;

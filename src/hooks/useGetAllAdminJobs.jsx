import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const token = localStorage.getItem("token"); 

                const res = await axios.get(`https://portal-server-cpms123.vercel.app/api/job/getadminjobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching admin jobs:", error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;

import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`https://portal-server-cpms123.vercel.app//api/application/get`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    },
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log("Error fetching applied jobs:", error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;

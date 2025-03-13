import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchJobs = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/job/get/${jobid}`, {withCredentials:true});
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
            fetchJobs();
        }
    },[])
}

export default useGetSingleJob

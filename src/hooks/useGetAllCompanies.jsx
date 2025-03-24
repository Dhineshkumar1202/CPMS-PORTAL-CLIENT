import { setCompanies } from '@/redux/CompanySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const useGetAllCompanies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/company/get`, { withCredentials: true });
                console.log('called');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies
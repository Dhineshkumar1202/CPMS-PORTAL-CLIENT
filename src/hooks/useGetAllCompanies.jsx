import { setCompanies } from '@/redux/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await axios.get(`https://portal-server-cpms123.vercel.app//api/company/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });

        console.log('called');
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error fetching companies:", error.response?.data || error.message);
      }
    };

    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;

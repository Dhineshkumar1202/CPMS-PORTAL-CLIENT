import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!companyId) return;

        const fetchSingleCompany = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`https://cpms-portal-server-cpms1.vercel.app/api/company/get/${companyId}`, {
                    withCredentials: true
                });
                console.log(res.data.company);

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    setError('Failed to fetch company data');
                }
            } catch (error) {
                console.error('Error fetching company:', error.response?.data || error.message);
                setError(error.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchSingleCompany();
    }, [companyId, dispatch]);

    return { loading, error };
};

export default useGetCompanyById;

import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Company name is required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `https://portal-server-cpms123.vercel.app/api/company/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.error('Error registering company:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl mb-2'>Your Company Name</h1>
          <p className='text-gray-500 text-sm'>
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className='my-4'>
          <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            className="mt-2"
            placeholder="JobHunt, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className='flex items-center gap-2 mt-8 mb-20'>
          <Button variant='outline' onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;

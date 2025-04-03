import React, { useEffect, useState } from 'react';
import { Navbar } from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="sm:w-1/2"
            placeholder="Filter by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/companies/create')}>
            New Company
          </Button>
        </div>

        <div className="mt-4">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;

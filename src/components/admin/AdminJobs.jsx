import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="sm:w-1/2"
            placeholder="Filter by name or role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;

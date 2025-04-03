import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://portal-server-cpms123.vercel.app/api/application/apply/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.message) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error applying for the job.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://portal-server-cpms123.vercel.app/api/job/get/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className="border-b-2 border-b-gray-300 font-semibold py-4 mt-6 text-lg">Job Description</h2>
      <div className="space-y-3 mt-4 text-gray-800">
        <p><strong>Role:</strong> <span className="pl-2">{singleJob?.title}</span></p>
        <p><strong>Location:</strong> <span className="pl-2">{singleJob?.location}</span></p>
        <p><strong>Description:</strong> <span className="pl-2">{singleJob?.description}</span></p>
        <p><strong>Experience:</strong> <span className="pl-2">{singleJob?.experienceLevel} yrs</span></p>
        <p><strong>Salary:</strong> <span className="pl-2">{singleJob?.salary} LPA</span></p>
        <p><strong>Total Applicants:</strong> <span className="pl-2">{singleJob?.applications?.length}</span></p>
        <p><strong>Posted Date:</strong> <span className="pl-2">{singleJob?.createdAt?.split("T")[0]}</span></p>
      </div>
    </div>
  );
};

export default JobDescription;

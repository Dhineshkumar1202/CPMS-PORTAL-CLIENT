import React from 'react';
import { Badge } from './ui/badge';

export const LatestJobCards = ({job}) => {
return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <h1 className="font-medium text-lg">{job?.company?.name || "Unknown Company"}</h1>
      <p className="text-sm text-gray-500">{job?.location || "Location Not Provided"}</p>

      <div className="mt-3">
        <h1 className="font-medium text-lg my-2">{job?.title || "No Title"}</h1>
        <p className="text-sm text-gray-600">{job?.description || "No Description Available"}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="bg-transparent text-blue-700" variant="ghost">
          {job?.position || "Unknown"} Position
        </Badge>
        <Badge className="bg-transparent text-[#F83002]" variant="ghost">
          {job?.jobType || "Not Specified"}
        </Badge>
        <Badge className="bg-transparent text-[#720967]" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
        </Badge>
      </div>
    </div>
  );
};

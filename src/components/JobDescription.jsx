import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Frontend Developer</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-700" variant="ghost">
                            Fullstack Developer
                        </Badge>
                        <Badge className="text-[#F83002]" variant="ghost">
                            Part-time
                        </Badge>
                        <Badge className="text-[#720967]" variant="ghost">
                            12 LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed ' : 'bg-[#720967] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied ' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300  font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Colombo</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>This is IT industry</span></h1>
                <h1 className='font-bold my-1'>Exprience: <span className='pl-4 font-normal text-gray-800'>3 Years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>01.01.2025</span></h1>
            </div>
        </div>
    )
}

export default JobDescription

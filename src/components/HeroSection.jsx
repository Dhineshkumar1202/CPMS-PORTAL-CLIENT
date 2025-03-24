import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

export const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#9a3827] font-medium">
                    College Placement Management System
                </span>
                <h1 className="text-5xl font-bold">
                    Find Your <span className="text-[#6A38C2]">Dream Jobs & Apply Now</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Placement management system helps training and placement officers overcome the difficulty of 
                    keeping records of thousands of students and searching for eligible students for recruitment, 
                    based on various eligibility criteria of different companies.
                </p>
                <div className="flex max-w-lg w-full shadow-lg bg-white border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

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
    };

    return (
        <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#9a3827] font-medium text-sm sm:text-base">
                    College Placement Management System
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                    Find Your <span className="text-blue-600">Dream Jobs & Apply Now</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                    Placement management system helps training and placement officers overcome the difficulty of
                    keeping records of thousands of students and searching for eligible students for recruitment,
                    based on various eligibility criteria of different companies.
                </p>

                <div className="w-full max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row items-stretch shadow-lg bg-white border border-gray-200 rounded-full overflow-hidden">
                        <input
                            type="text"
                            placeholder="Find your dream jobs"
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 px-4 py-2 text-sm sm:text-base outline-none border-none"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-none sm:rounded-r-full w-full sm:w-auto bg-[#6A38C2] text-white px-4 py-2"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

export const Navbar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`https://portal-server-cpms123.vercel.app/api/user/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const renderLinks = () => (
        <>
            {user && user.role === 'recruiter' ? (
                <>
                    <li><Link to="/admin/companies">Companies</Link></li>
                    <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                </>
            )}
        </>
    );

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-green-600'>CPMS-JOB-<span className='text-[#4285F4]'>PORTAL</span></h1>
                </div>

                {/* Desktop Links */}
                <ul className='hidden md:flex font-medium items-center gap-5'>
                    {renderLinks()}
                </ul>

                <div className='hidden md:flex items-center gap-2'>
                    {!user ? (
                        <>
                            <Link to='/login'><Button variant="outline">Login</Button></Link>
                            <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#43237a]'>Signup</Button></Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {user.role === 'student' && (
                                            <div className='flex items-center gap-2'>
                                                <User2 />
                                                <Link to="/profile"><Button variant="link">View Profile</Button></Link>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="ghost">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center'>
                    <Popover>
                        <PopoverTrigger>
                            <Menu className='cursor-pointer' />
                        </PopoverTrigger>
                        <PopoverContent className="w-56 mt-2">
                            <ul className='flex flex-col gap-3'>
                                {renderLinks()}
                            </ul>
                            <div className='mt-4'>
                                {!user ? (
                                    <>
                                        <Link to='/login'><Button variant="outline" className='w-full mb-2'>Login</Button></Link>
                                        <Link to='/signup'><Button className='w-full bg-[#6A38C2] hover:bg-[#43237a]'>Signup</Button></Link>
                                    </>
                                ) : (
                                    <>
                                        {user.role === 'student' && (
                                            <Link to="/profile"><Button variant="link" className='w-full'>View Profile</Button></Link>
                                        )}
                                        <Button onClick={logoutHandler} variant="ghost" className='w-full mt-2'>Logout</Button>
                                    </>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

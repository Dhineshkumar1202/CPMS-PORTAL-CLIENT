import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const USER_API_END_POINT = "http://localhost:8000/api/user";

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changefileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-6'>
          <h1 className='font-bold text-xl mb-4'>Sign Up</h1>

          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="1123456789"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your Password"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup
              className="flex items-center gap-4 my-5"
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="student" value="student" className='cursor-pointer' />
                <Label htmlFor="student">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem id="recruiter" value="recruiter" className='cursor-pointer' />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className='my-4'>
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changefileHandler}
              className="cursor-pointer"
            />
          </div>

          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </>
            ) : "Signup"}
          </Button>
          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;

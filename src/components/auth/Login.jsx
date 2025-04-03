import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Navbar } from '../shared/Navbar';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `https://portal-server-cpms123.vercel.app/api/user/login`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center px-4 sm:px-0 max-w-7xl mx-auto'>
        <form
          onSubmit={submitHandler}
          className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-sm bg-white'
        >
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          {/* Email */}
          <div className='mb-4'>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='theena@gmail.com'
              required
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='*******'
              required
            />
          </div>

          {/* Role Selection */}
          <RadioGroup className='flex items-center gap-4 mb-6'>
            <div className='flex items-center space-x-2'>
              <Input
                type='radio'
                name='role'
                value='student'
                id='student'
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                required
              />
              <Label htmlFor='student'>Student</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Input
                type='radio'
                name='role'
                value='recruiter'
                id='recruiter'
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
              />
              <Label htmlFor='recruiter'>Recruiter</Label>
            </div>
          </RadioGroup>

          {/* Submit Button */}
          {loading ? (
            <Button className='w-full my-4' disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit' className='w-full my-4'>
              Login
            </Button>
          )}

          <p className='text-sm text-center'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-blue-600 hover:underline'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Navbar } from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const USER_API_END_POINT = "https://cpms-portal-server-tghf.vercel.app/api/user";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(`https://cpms-portal-server-tghf.vercel.app/api/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-6'>
          <h1 className='font-bold text-xl mb-4'>Login</h1>

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

          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </>
            ) : "Login"}
          </Button>

          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
          </span>
        </form>
      </div>
      
      <Toaster />
    </div>
  );
}

export default Login;

import React, { useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { setLoading, setUser } from '@/redux/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();


  try {
    const res = await axios.post('http://localhost:8000/api/user/login', input,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
    });
    if (res.data.success) {
      dispatch(setUser(res.data.user));
      navigate("/")
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
    console.log(error);
    }finally{
      dispatch(setLoading(false))
    }
}

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>  {/* ✅ Fixed margin class */}

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="theena@gmail.com"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>  {/* ✅ Fixed htmlFor */}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>  {/* ✅ Fixed htmlFor */}
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="flex w-full my-2">Login</Button>

          <span className='text-sm'>Don't have an account?
            <a href='/signup' className='text-blue-600 ml-1'>Signup</a>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login

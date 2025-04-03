import React, { useState } from 'react';
import { Navbar } from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* Profile Info */}
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfemW60O6yZF8REvbRfI9j-L5klm89rR5UQQXKNN1H--p2nakzSVXLmnhfQAlBqhu-W4&usqp=CAU'
                }
                alt='profile'
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio || 'No bio added'}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant='outline'>
            <Pen className='h-4 w-4 mr-2' />
            Edit
          </Button>
        </div>

        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber || 'Not provided'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className='my-5'>
          <h1 className='font-semibold mb-2'>Skills</h1>
          <div className='flex flex-wrap gap-2'>
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {user?.profile?.resume && user?.profile?.resumeOriginalName ? (
            <a
              target='_blank'
              rel='noreferrer'
              href={user?.profile?.resume}
              className='text-blue-500 hover:underline'
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4'>
        <h1 className='font-bold text-lg mb-4'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

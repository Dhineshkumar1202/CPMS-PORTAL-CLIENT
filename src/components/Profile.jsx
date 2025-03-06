import React, { useState } from 'react'
import { Navbar } from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'

const skills = ["Html", "css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    const [open, setOpen] = useState(false); 

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>This is the IT industry Job you can apply now</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>theena@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>1123456789</span>
                    </div>
                    <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='flex items-center gap-1'>
                            {skills.length > 0
                                ? skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <span>NA</span>}
                        </div>
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume ? (
                        <a target="_blank" href="mailto:dhineshtrendy12@gmail.com" className='text-blue-500 w-full hover:underline cursor-pointer'>
                            Theena Mern Stack
                        </a>
                    ) : <span>NA</span>}
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8'>
                <h1 className='font-bold my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Pass open state and setter to the dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        skills: '',
        file: null
    });

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                skills: Array.isArray(user.profile?.skills) 
                    ? user.profile.skills.join(', ') 
                    : (user.profile?.skills || ''),
                file: user.profile?.resume || null
            });
        }
    }, [user]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setInput({ ...input, skills: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills.split(',').map(skill => skill.trim())); 
            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(`https://cpms-portal-server-tghf.vercel.app/api/user/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="fullname"
                                value={input.fullname}
                                type="text"
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input
                                id="number"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={handleSkillsChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume" className="text-right">Resume</Label>
                            <Input
                                id="resume"
                                name="resume"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                                onChange={fileChangeHandler}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full my-4" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </>
                            ) : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;

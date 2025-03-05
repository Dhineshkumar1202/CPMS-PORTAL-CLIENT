import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


export const Job = () => {
    const navigate = useNavigate();
    const jobId = "sjfbkdsvkdskjfjds";
    return (
        <div className="p-5 rounded-sm shadow-xl bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">2 Days ago</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Avatar>
                    <AvatarImage
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s"
                        alt="Company Logo"
                    />
                </Avatar>
                <div>
                    <h1 className="font-medium text-lg">Company Name</h1>
                    <p className="text-sm text-gray-500">Sri Lanka</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">Title</h1>
                <p className="text-sm text-gray-600">
                    Also called a company description, your business description summarizes what
                    your company does, its purpose, and what makes it unique.
                </p>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700" variant="ghost">
                    Fullstack Developer
                </Badge>
                <Badge className="text-[#F83002]" variant="ghost">
                    Part-time
                </Badge>
                <Badge className="text-[#720967]" variant="ghost">
                    12 LPA
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button onClick={()=> navigate (`/description/${jobId}`)} variant="outline">Details</Button>
                <Button className="bg-[#720967] text-white">Save For Later</Button>
            </div>
        </div>
    );
};

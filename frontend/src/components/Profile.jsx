import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsDetails from "./AppliedJobsDetails";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = true;
  useGetAppliedJobs();
  return (
    <div>
      {/* Navbar component */}
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar component with profile image */}
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div className="">
              {/* User's full name */}
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              {/* User's description */}
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          {/* Edit button */}
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          {/* User's email */}
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          {/* User's contact number */}
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phonenumber}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* Skills section */}
          <h1>Skills</h1>
          <div className="flex gap-2 items-center">
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <p>No Skills</p>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
          <Label className="text-md font-bold">Resume</Label>

          {isResume ? (
            <a
              className="text-blue-500 hover:underline cursor-pointer"
              target="blank"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span className="text-red-500">No Resume Uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobsDetails />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

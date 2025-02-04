import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JobsTable from "./JobsTable";
import { setFilterJob } from "@/redux/jobSlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  useEffect(() => {
    dispatch(setFilterJob(input));
  }, [input, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-4">
          <Input
            className="w-2/6"
            placeholder="Filter by job role or company name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => {
              navigate("/admin/job/create");
            }}
          >
            Post Job
          </Button>
        </div>
        <JobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;

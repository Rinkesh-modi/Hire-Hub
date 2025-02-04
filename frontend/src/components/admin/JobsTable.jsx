import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobsTable = () => {
  // const navigate = useNavigate();
  const { filterJob, allAdminJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!filterJob) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(filterJob.toLowerCase()) ||
          job?.company?.name.toLowerCase().includes(filterJob.toLowerCase())
        );
      });
    setFilterJobs(filteredJob);
    console.log("filterJob", filterJob);
    console.log("filteredJob", filteredJob);
  }, [allAdminJobs, filterJob]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs?.length <= 0 ? (
            <span>No jobs found.</span>
          ) : (
            filterJobs?.map((job) => (
              <tr key={job._id}>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        // onClick={() => {
                        //   navigate(`/admin/company/${job._id}`);
                        // }}
                      >
                        <Edit2 className="w-4" /> <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;

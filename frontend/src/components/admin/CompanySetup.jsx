import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const params = useParams();
  useGetSingleCompany(params);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onChangeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              vatiant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold bg-white border-1 border-gray-400 hover:bg-white hover:text-gray-700 shadow-none focus:bg-white active:bg-white"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={onChangeEventHandler}
              />
            </div>
            <div className="">
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={onChangeEventHandler}
              />
            </div>
            <div className="">
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={onChangeEventHandler}
              />
            </div>
            <div className="">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={onChangeEventHandler}
              />
            </div>
            <div className="">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={onChangeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-8">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import AdminJobs from "./components/admin/adminJobs";
import AdminCompanies from "./components/admin/AdminCompanies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import JobCreate from "./components/admin/JobCreate";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  { path: "jobs/description/:id", element: <JobDescription /> },
  { path: "/admin/jobs", element: <AdminJobs /> },
  { path: "/admin/companies", element: <AdminCompanies /> },
  { path: "/admin/company/create", element: <CompanyCreate /> },
  { path: "/admin/job/create", element: <JobCreate /> },
  { path: "/admin/company/:id", element: <CompanySetup /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

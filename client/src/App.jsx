import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LoginPage";
import DashboardOutlet from "./pages/staffs/DashboardOutlet";
import MDashboardOutlet from "./pages/DashboardOutlet";
import StaffDashboard from "./pages/staffs/StaffDashboard";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MDashboardOutlet />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "staffs-dashboard",
        element: <DashboardOutlet />,
        children: [
          {
            index: true,
            element: <StaffDashboard />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

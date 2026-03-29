import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../Layouts/AuthLayout'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import HomeLayout from '../Layouts/HomeLayout'
import Dashboard from '../pages/Dashboard'
// import MyCourses from '../pages/MyCourses'
import MyInternship from '../pages/MyInternship'
import AdminDashboard from '../pages/AdminDashboard'
import AdminTaskUploader from '../pages/AdminTaskUploader'
import TaskDetails from '../pages/TaskDetails'
import InternsProfileDetails from '../pages/InternsProfileDetails'
import HomePage from '../pages/HomePage'
import PublicLayout from '../Layouts/PublicLayout'
import Register from '../components/auth/Register'

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicLayout/>,
            children:[
                {
                    path:"",
                    element:<HomePage/>
                },
                {
                    path:"login",
                    element:<AuthLayout/>
                },
                {
                    path:"register",
                    element:<Register/>
                }
            ]
        },
        {
            path: "/home",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <HomeLayout />,
                    children: [
                        { path: "", element: <Dashboard /> },
                        { path: "admin-dashoard", element: <AdminDashboard /> },
                        // {   path: 'my-courses', element: <MyCourses />  },
                        { path: 'my-internship', element: <MyInternship /> },
                        { path: "task-details/:id", element: <TaskDetails /> },
                        { path: 'admin-task-uploader', element: <AdminTaskUploader /> },
                        { path: "admin-dashoard", element: <AdminDashboard /> },
                        { path: "interns-profile/:id", element: <InternsProfileDetails /> }
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
};

export default AppRouter;
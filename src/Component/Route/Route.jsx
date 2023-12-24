import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import ErrorElement from '../Page/ErrorElement/ErrorElement';
import Home from '../Page/Home/Home';
import MainLayout from '../Layout/Mainlayout';
import PrivateRoute from './PrivateRoute';
import DashBoard from '../Layout/DashBoard';
import Profile from '../DashBoard/Profile';
import UserDashBoard from '../DashBoard/UserDashBoard';
import CreateTask from '../DashBoard/CreateTask';
import UpdateTask from '../DashBoard/UpdateTask';

const myCreatedRoute = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorElement></ErrorElement> ,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>,
            },
            {
                path:'/register',
                element: <Register></Register>
            },
        ],
    },
    {
        path:'/dashboard',
        errorElement: <ErrorElement></ErrorElement> ,
        element: <PrivateRoute> <DashBoard></DashBoard> </PrivateRoute>,
        children:[
            {
                path:'profile',
                element: <Profile></Profile>
            },
            {
                path:'createtasks',
                element: <CreateTask></CreateTask>
            },
            {
                path:'userdashboard',
                element: <UserDashBoard></UserDashBoard>
            },
            {
                path:'tasks/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({params}) => fetch(`https://task-management-server-orcin-zeta.vercel.app/tasks/${params.id}`)
            },
        ]


    }
])
    
export default myCreatedRoute;
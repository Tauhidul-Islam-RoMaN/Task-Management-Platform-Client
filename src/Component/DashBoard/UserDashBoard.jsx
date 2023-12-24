import React from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import useTasks from '../Hook/useTasks';

const UserDashBoard = () => {

    const axiosPublic = useAxiosPublic()

    const [tasks, refetch] = useTasks()

    const handleRemove = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete the Task!"
        })
            .then(async (result) => {
                axiosPublic.delete(`/tasks/${_id}`)
                    .then(res => {
                        console.log('task deleted', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Task Deleted Successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
            .catch(err => console.log(err))
    }

    console.log(tasks);
    return (
        <>
            <div className='flex gap-10'>
                <div className='w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl mb-4 font-bold text-[#2f6fa3]'>ToDo List</h2>
                    <div className="flex flex-col gap-10">
                        {
                            tasks.map(task => <div key={task._id}
                                className="relative flex flex-col hover:bg-slate-200 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                                <div className="px-6">
                                    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {task.title}
                                    </h4>
                                    <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                        {task.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between px-6">
                                    <div className="flex items-center">
                                        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                            Priority: <span className='text-2xl font-semibold'>{task.priority}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                                            {task.deadline}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-4 px-6">
                                    <div className="flex items-center">
                                        <Link to={`/dashboard/tasks/${task._id}`}><button className='btn hover:bg-[#2f6fa3] hover:text-white'>Update Task</button></Link>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleRemove(task._id)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Delete Task</button>
                                    </div>

                                </div>

                            </div>)
                        }
                    </div>
                </div>
                <div className='w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl font-bold text-[#2f6fa3]'>On going List</h2>
                    {
                        tasks.map(task => <div key={task._id}>{task.title}</div>)
                    }
                </div>
                <div className='w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl font-bold text-[#2f6fa3]'>Completed</h2>
                    {
                        tasks.map(task => <div key={task._id}>{task.title}</div>)
                    }
                </div>
            </div>

        </>

    );
};

export default UserDashBoard;
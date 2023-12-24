import useAxiosPublic from '../Hook/useAxiosPublic';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import useTasks from '../Hook/useTasks';
import useAuth from '../Hook/useAuth';

const UserDashBoard = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [tasks, refetch] = useTasks()

    const toDoTask = tasks.filter(item => item.status === "to-do")
    const onGoingTask = tasks.filter(item => item.status === "on-going")
    const completedTask = tasks.filter(item => item.status === "completed")
    console.log('todo', toDoTask, 'ongoing', onGoingTask, "completed", completedTask);


    const handleRemove = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete the task!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.delete(`/tasks/${_id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Task is deleted",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))
    }

    const handleOnGoing = (task) => {
        const confirmOnGoing = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            email: user?.email,
            status: "on-going"
        }
        Swal.fire({
            title: "Are you want to make it ongoing?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/tasks/${task._id}`, confirmOnGoing)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Task is updated",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }

    const handleComplete = (task) => {
        const confirmCompleted = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            email: user?.email,
            status: "completed"
        }
        Swal.fire({
            title: "Are you want to make it Complete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/tasks/${task._id}`, confirmCompleted)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Task is Completed",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }
    const handleToDo = (task) => {
        const confirmCompleted = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            email: user?.email,
            status: "to-do"
        }
        Swal.fire({
            title: "Are you want to make it To Do?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/tasks/${task._id}`, confirmCompleted)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Task is updated",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <div className='flex flex-col lg:flex-row gap-10'>
                <div className='w-full lg:w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl mb-4 font-bold text-[#2f6fa3]'>ToDo List</h2>
                    <div className="flex flex-col gap-10">
                        {
                            toDoTask.map(task => <div key={task._id}
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
                                <div className="flex gap-5 items-center justify-between px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => handleOnGoing(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Ongoing</button>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleComplete(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Completed</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className='w-full lg:w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl mb-4 font-bold text-[#2f6fa3]'>On going List</h2>
                    <div className="flex flex-col gap-10">
                        {
                            onGoingTask.map(task => <div key={task._id}
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
                                <div className="flex gap-5 items-center justify-between px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => handleToDo(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Todo</button>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleComplete(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Completed</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className='w-full lg:w-1/3 min-h-screen border-2 px-2 border-slate-700 '>
                    <h2 className='text-2xl mb-4 font-bold text-[#2f6fa3]'>Completed</h2>
                    <div className="flex flex-col gap-10">
                        {
                            completedTask.map(task => <div key={task._id}
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
                                <div className="flex gap-5 items-center justify-between px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => handleOnGoing(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Ongoing</button>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleToDo(task)} className='btn hover:bg-[#2f6fa3] hover:text-white'>Make Todo</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>

        </>

    );
};

export default UserDashBoard;
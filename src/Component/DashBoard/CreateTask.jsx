import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hook/useAxiosPublic';
import Swal from "sweetalert2";
import useAuth from '../Hook/useAuth';


const CreateTask = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()


    const onSubmit = (data) => {
        console.log(data)
        const taskInfo = {
            title: data.title,
            description: data.description,
            deadline:data.deadline,
            priority: data.priority,
            email: user?.email
        }
        axiosPublic.post('/tasks', taskInfo)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task is added to your dashboard",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <div>
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center text-[#2f6fa3] mt-10"> Create Task! </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" {...register("title", { required: true })} placeholder="Title"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none"
                        />
                        {errors.title && <span className="text-red-600">Title is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name="description" {...register("description", { required: true })} placeholder="Description"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none" />
                        {errors.description && <span className="text-red-600">Descriptions is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline Date</span>
                        </label>
                        <input type="date" name="deadline"   {...register("deadline", { required: true })} placeholder="Expected Delivery Date"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none"
                        />
                        {errors.deadline && <span className="text-red-600">Deadline date is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Priority</span>
                        </label>
                        <select defaultValue="default" {...register("priority", { required: true })} className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none">
                            <option disabled value="default">Select a category</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                        {errors.priority && <span className="text-red-600">Priority is required</span>}
                    </div>

                    <div className="form-control mt-6">
                        <input type="submit" className="btn hover:bg-[#2f6fa3] hover:text-white" value="Create Task" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
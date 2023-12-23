// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";


const Register = () => {
    const { createUser, profileUpdate,logOut } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                console.log("logged user", res.user);
                profileUpdate(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            password:data.password,
                            photo: data.photo
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to server");
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    logOut()
                    .then(() => console.log("User loggged Out"))
                    .catch (err => console.log(err))
                    navigate('/login')
            })

            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="mx-auto max-w-xl rounded-xl my-10 ">
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center text-[#2f6fa3] mt-10"> Register! </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="name"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none"
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input type="text" name="photo" {...register("photo", { required: true })} placeholder="Photo Url"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none" />
                        {errors.photo && <span className="text-red-600">Photo Url is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none" />
                        {errors.email && <span className="text-red-600">email is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#2f6fa3] rounded focus:outline-none" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
                            // Minimum six characters, at least one letter, one number and one special character:
                        })} placeholder="password" required />
                        {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-600">Password must be 6 characters</span>}
                        {errors.password?.type === "maxLength" && <span className="text-red-600">Password must be less than 20 characters</span>}
                        {errors.password?.type === "pattern" && <span className="text-red-600"> Password must have one letter, one number, one special character </span>}
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn hover:bg-[#2f6fa3] hover:text-white" value="Register" />
                    </div>
                </form>
                <div>
                    <h2 className="text-lg text-center ">Already have an account? Please <Link to='/login'><span className="text-[#2f6fa3]">Login</span></Link> </h2>
                </div>
                <div className="divider w-3/4 text-[#2f6fa3] mx-auto">Social Login</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
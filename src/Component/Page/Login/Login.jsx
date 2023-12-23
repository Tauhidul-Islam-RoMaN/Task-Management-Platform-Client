import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {

    const {login} =useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        login(data.email, data.password)
        .then((res) =>{
            console.log('logger user', res.user);
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Login Successful",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(location?.state ? location?.state : '/')
        })
        .catch(err => {
            console.log(err.message)
            Swal.fire({
                position: "top-end",
                title: err.message,
                showConfirmButton: false,
                timer: 1500
            });
        })

    }

    return (
        <div className="mx-auto max-w-xl rounded-xl my-10 ">
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center text-[#2f6fa3] mt-10"> Login! </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
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

                        <label className="label">
                            <Link className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn hover:bg-[#2f6fa3] hover:text-white" value="Login" />
                    </div>
                </form>
                <div>
                    <h2 className="text-lg text-center mb-6">New to the Website? Please <Link to='/register'><span className="text-[#2f6fa3]">Register</span></Link> </h2>
                </div>
                <div className="divider text-[#2f6fa3] w-3/4 mx-auto">Social Login</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;
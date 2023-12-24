import useAuth from "../../Hook/useAuth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    name: res.user?.displayName || '',
                    email: res.user?.email || '',
                    photo: res.user?.photoURL || ''
                }
                console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(location?.state ? location?.state : '/')
                    })
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    position: "top-end",
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    const handleGithubLogin = () => {
        githubLogin()
        .then(res => console.log(res.user))
        .catch(error => console.error(error))

    }
    return (
        <div>
            <div className="flex items-center flex-col gap-5 justify-center mt-5 mb-10">
                <button onClick={handleGoogleLogin} className="btn w-4/5 hover:bg-[#2f6fa3] hover:text-white">
                    <FaGoogle className="mr-4"></FaGoogle>
                    Google
                </button>
                <button onClick={handleGithubLogin} className="btn w-4/5 hover:bg-[#2f6fa3] hover:text-white">
                    <FaGithub className="mr-4"></FaGithub>
                    Git Hub
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
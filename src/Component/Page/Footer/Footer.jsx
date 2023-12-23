import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <div className="bg-slate-200 ">
                <div className="flex justify-evenly items-center lg:items-start flex-col lg:flex-row gap-10 py-10 px-10 ">
                    <div className="flex-1">
                        <p className="text-justify font-semibold ">
                            <span className="text-[#2f6fa3] font-bold text-2xl">TaskFlowHub</span> Streamline tasks, boost productivity. Your go-to for seamless task management and collaboration.
                        </p>
                    </div>
                    <div className="flex-1 lg:pl-16 ">
                        <h2 className="text-2xl font-semibold mb-3 text-[#2f6fa3]">Important links</h2>
                        <div className=" flex flex-col lg:flex-col md:flex-row items-start justify-start font-semibold gap-3">
                            <button className=" hover:underline hover:text-blue-700"> Contact</button>
                            <button className=" hover:underline hover:text-blue-700"> About us</button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-3 text-[#2f6fa3]">Connected With Our Socials</h2>
                        <div className="flex gap-5">
                            <Link to='https://www.facebook.com/'><FaFacebook className="text-5xl text-blue-700"></FaFacebook></Link>
                            <Link to='https://www.linkedin.com/'><FaLinkedin className="text-5xl text-blue-700"></FaLinkedin></Link>
                            <Link to='https://youtube.com/'><FaYoutube className="text-5xl text-red-700"></FaYoutube></Link>
                            <Link to='https://www.instagram.com/'><FaInstagram className="text-5xl text-amber-500"></FaInstagram></Link>
                        </div>
                    </div>
                </div>
                <div className="font-semibold text-[#2f6fa3] text-center pb-5 text-xl">
                    <p>Copyright © 2023 - All right reserved by TaskFlowHub</p>
                </div>
            </div>
        </>
    );
};

export default Footer;
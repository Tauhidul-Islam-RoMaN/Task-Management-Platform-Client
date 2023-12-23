import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row mx-auto">
                <div className="md:min-h-screen bg-[#2f6fa3] ">
                    <div className="flex">
                        {
                            <ul className="menu flex flex-col md:pt-16 p-4">
                                <>
                                    <h2 className="text-2xl text-black font-medium"> User Dashboard </h2>
                                    <li> <NavLink to='/dashboard/profile' className="text-lg text-black">  Profile</NavLink> </li>
                                    <li> <NavLink to='/dashboard/userdashboard' className="text-lg text-black">  DashBoard </NavLink> </li>
                                </>
                            </ul>
                        }
                        
                    </div>
                    <div className="divider"></div>
                    <>
                        <ul className="menu flex flex-col text-lg text-black  p-4">
                            <li> <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>  Home</NavLink></li>
                        </ul>
                    </>
                </div>
                <div className="p-8 flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
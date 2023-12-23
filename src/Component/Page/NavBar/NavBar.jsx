import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { IoIosNotificationsOutline } from "react-icons/io";


const NavBar = () => {

    const { user, logOut } = useAuth()

    const handleLogout = () => {
        logOut()
            .then(res => {
                console.log(res.user);
            })
            .catch(error => {
                console.log(error);
            })

    }


    const navLinks =
        <>
            <li> <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>Home</NavLink></li>
            <li> <NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn whitespace-nowrap btn-warning " : ""}>DashBoard</NavLink></li>
            {user ? undefined : <li> <NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn btn-warning " : ""}>Login</NavLink></li>}
        </>

    const subNavLinks =
        <>
            <li> <NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "btn whitespace-nowrap btn-warning " : ""}>DashBoard</NavLink></li>
            <li> <button onClick={handleLogout} >Logout</button></li>
        </>


    return (
        <>
            <div className='navbar z-10 bg-[#2f6fa3] text-white'>
                <div className="navbar mx-auto max-w-7xl ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="md:hidden">
                                <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </div>
                            </label>
                            <ul tabIndex={0} className=" flex items-center justify-center flex-col gap-1 dropdown-content mt-5 z-10 p-4 shadow bg-[#2f6fa3] rounded-box w-28">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to='/' className="flex items-center">
                            <span className="self-center text-2xl ml-1 md:ml-10 font-semibold whitespace-nowrap dark:text-white">TaskFlowHub</span>
                        </Link>
                    </div>
                    <div className=" hidden md:flex">
                        <ul className="p-4 flex items-center gap-10">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <p>{user?.displayName}</p>
                        {user?.photoURL ?
                            <div className="dropdown pl-4 dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-48 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="flex items-center justify-center text-center flex-col gap-1 dropdown-content mt-4 z-10 p-4 shadow bg-[#2f6fa3] rounded-box w-40">
                                    {subNavLinks}
                                </ul>
                            </div> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
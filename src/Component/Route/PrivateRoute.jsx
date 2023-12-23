import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {loading,user} = useAuth()
    const location = useLocation()
    console.log(location);
    if (loading) {
        return <div className="flex justify-center items-center text-5xl"><span className="loading loading-spinner text-accent"></span></div>
    }
    if (user ) {
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};
PrivateRoute.propTypes = {
    children: PropTypes.node
  };
export default PrivateRoute;
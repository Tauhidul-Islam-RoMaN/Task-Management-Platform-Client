import { useContext } from "react";
import { MyCreatedContext } from "../AuthProvider/AuthProvider";

const useAuth = () => {
    const xyz = useContext(MyCreatedContext)
    return xyz
};

export default useAuth;
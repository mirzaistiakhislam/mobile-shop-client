import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useUserType = email => {
    const { logOut } = useContext(AuthContext);
    const [userType, setUserType] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (email) {
            console.log(`${localStorage.getItem('accessToken')}`)
            fetch(`https://phone-buy-and-sell-server.vercel.app/usertypecheck/${email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `barer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {

                    setUserType(data?.type);
                    setLoading(false)
                })
        }
    }, [email])
    return [userType, isLoading]
}
export default useUserType;

import { useEffect, useState } from "react";

const useUserType = email => {
    const [userType, setUserType] = useState(false);
    const [isLoading, setLoading] = useState(true);
    console.log(email);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/usertypecheck/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.isAdmin == 'Yes') {
                        setUserType(data.isAdmin)
                    }
                    else {
                        setUserType(data?.userType)
                    }
        
                })
        }
    }, [email])
    return [userType, isLoading]
}
export default useUserType;

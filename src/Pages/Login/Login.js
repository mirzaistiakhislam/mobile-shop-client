import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import getToken from '../../Hooks/useToken';


const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [data, setData] = useState('');
    const { user, signIn, googleSignin } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    const from = location.state?.from?.pathname || '/';
    const handleGoogleSign = () => {
        googleSignin()
            .then(result => {
                toast.success('Signin successfully!');
                const user = result.user;
                const userData = {
                    name: user?.displayName,
                    email: user?.email,
                    type: 'Buyer',
                    isVerified: 'No',
                }
                fetch('https://phone-buy-and-sell-server.vercel.app/adduser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        getToken(userData?.email);
                        navigate(from, { replace: true });
                    })

            })
    }

    const handleLogin = data => {
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                getToken(user?.email);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            });
    }

    return (
        <div className=' flex justify-center p-4'>
            <div className='w-96 p-7 shadow'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text"
                            {...register("email", {
                                required: "Email address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "pasdword is required",
                                minLength: { value: 6, message: 'password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                    <input className='btn btn-active w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='my-2'>New to this website?<Link className='text-primary font-bold' to="/signup">Create new account</Link></p>
                <button onClick={handleGoogleSign} className='btn btn-outline w-full'>Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;
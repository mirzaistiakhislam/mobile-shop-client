import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import getToken from '../../Hooks/useToken';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user, createUser, updateUser, googleSignin } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    const handleGoogleSign = () => {
        googleSignin()
            .then(result => {
                toast.success('Signin successfully!')
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
                        navigate('/')
                    })
            })
    }
    const handleSignUp = data => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('user created successfully');
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        const userData = {
                            name: user?.displayName,
                            email: user?.email,
                            type: data?.userType,
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
                                navigate('/')
                            })

                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
                setSignUpError(error.message);
            });
    }

    return (
        <div className='flex justify-center p-4'>
            <div className='w-96 p-7 shadow'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register("name", {
                                required: "Name is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
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
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Type</span>
                        </label>
                        <div className='flex gap-4' >
                            <div className='flex items-center gap-1'>
                                <input type="radio" name="radio-1" className="radio" {...register("userType", { required: "User type is required" })} value="Buyer" checked />
                                <span>Buyer</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="radio" name="radio-1" className="radio" {...register("userType", { required: "User type is required" })} value="Seller" />
                                <span>Seller</span>
                            </div>
                            {
                                errors.userType && <p className='text-red-500 my-1'>{errors.userType.message}*</p>
                            }

                        </div>
                    </div>

                    <input className='btn btn-active w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p className='my-2'>Already have an account?<Link className='text-primary font-bold' to="/login">Please Login</Link></p>
                <button onClick={handleGoogleSign} className='btn btn-outline w-full'>Continue with Google</button>
            </div>
        </div>
    );
};

export default SignUp;
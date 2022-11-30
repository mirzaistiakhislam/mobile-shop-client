import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { data: productCategories = [], isLoading } = useQuery({
        queryKey: ['productCategories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;

        }
    });

    if (isLoading) {
        return <div className='mt-40'><Loading></Loading></div>
    }
    function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    const handleAdd = (data) => {
        setLoading(true)
        data['authorName'] = user?.displayName;
        const date = new Date();
        data['publishedDate'] = formatDate(date);
        data['authorEmail'] = user?.email;
        data['salesStatus'] = 'Available';
        data['advertise'] = 'No';
        data['categoryName'] = ''
        productCategories.map((category) => {
            if (category._id == data['categoryId']) {
                data['categoryName'] = category.category_name
            }
        })
        console.log(data);
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgbb => {
                console.log(imgbb)
                if (imgbb.success) {
                    let imgUrl = imgbb.data.display_url;
                    data['image'] = imgUrl;
                    fetch(`http://localhost:5000/addproduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                setLoading(false)
                                toast.success('New Product Successfully Added!');
                                navigate('/dashboard/myproducts');
                            }
                        })
                }
            })
    }
    return (
        <div className='pb-8 w-[98%] mx-auto'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>Add Product</h3>
            <div className='flex justify-center '>
                <div className='w-[90%] mx-auto p-7 shadow'>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleAdd)}>
                        {
                            loading && <Loading></Loading>
                        }
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text"
                                {...register("productName", {
                                    required: "Product name is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.productName && <p className='text-red-600'>{errors.productName?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input type="file" className="pl-0 ml-0" {...register("image", { required: "Image is required" })} />
                            {
                                errors.image && <p className='text-red-500 my-1'>{errors.image.message}*</p>
                            }
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="number"
                                {...register("resalePrice", {
                                    required: "Resale price address is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="number"
                                {...register("originalPrice", {
                                    required: "Original price address is required"
                                })}
                                className="input input-bordered w-full " />
                            {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice?.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Condition Type</span>
                            </label>
                            <div className='flex gap-4 justify-between text-black' >
                                <div className='flex items-center gap-3'>
                                    <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Excellent" />
                                    <span>Excellent</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Good" />
                                    <span>Good</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Fair" />
                                    <span>Fair</span>
                                </div>

                            </div>
                            {
                                errors.conditionType && <p className='text-red-500 my-1 block'>{errors.conditionType.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" placeholder="phone number" className="input input-bordered text-black" {...register("phoneNumber", { required: "Phone Number is required" })} />
                            {
                                errors.phoneNumber && <p className='text-red-500 my-1'>{errors.phoneNumber.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" placeholder="location" className="input input-bordered text-black" {...register("location", { required: "Location is required" })} />
                            {
                                errors.location && <p className='text-red-500 my-1 '>{errors.location.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year of Purchase</span>
                            </label>
                            <input type="number" placeholder="year of purchase" className="input input-bordered text-black " {...register("purchaseYear", { required: "Purchase year is required" })} />
                            {
                                errors.purchaseYear && <p className='text-red-500 my-1'>{errors.purchaseYear.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year of Used</span>
                            </label>
                            <input type="number" placeholder="year of used" className="input input-bordered text-black " {...register("usedYear", { required: "Used year is required" })} />
                            {
                                errors.usedYear && <p className='text-red-500 my-1'>{errors.usedYear.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Category</span>
                            </label>
                            <select className="select select-bordered w-full max-w-xs" {...register("categoryId", { required: "Category is required" })} >
                                {
                                    productCategories.map(category => <option key={category._id} value={category._id}>{category.category_name}</option>)
                                }
                            </select>

                            {
                                errors.category && <p className='text-red-500 my-1'>{errors.category.message}*</p>
                            }
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text" placeholder="description" className="input input-bordered text-black" {...register("description", { required: "Description is required" })} />
                            {
                                errors.description && <p className='text-red-500 my-1'>{errors.description.message}*</p>
                            }
                        </div>

                        <input className='btn btn-active w-full mt-4' value="Add product" type="submit" />

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddProduct;
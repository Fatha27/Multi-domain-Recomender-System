import React, { useState } from 'react'
import authImage from '../Assets/auth-image.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async e => {
    e.preventDefault();

    // Check if password matches confirm password
    const confirmPasswordInput = document.querySelector('input[name="confirmpassword"]');
    if (formData.password !== confirmPasswordInput.value) {

        toast.warning("Passwords do not match ");
        // You might want to display an error message to the user here
        return; // Exit the function early
    }

    // Send form data to backend for signup
    try {
        const response = await fetch('http://recom-ai.site:6005/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            await toast.success("SignUp Success");
            // Redirect to login page after successful signup
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            document.cookie = `token=${data.token}; path=/;`;
            window.location.href = '/login';
        } else {
            // Handle error
            toast.error("Signup Failure");
            console.error('Signup failed');
            console.log(response)
        }
    } catch (error) {
        toast.warning("An Error Occoured");
        console.error('Error:', error);
    }
};

    return (
        <div className='flex m-auto md:m-auto'>
            <div className='xl:w-1/2 text-white m-1 md:m-5   md:w-full'>
                <div className='font-extrabold text-[25px] md:text-[40px] text-center'>Let’s create your account</div>
                <div className='text-center text-[12px] md:text-[16px] font-semibold'>Sign up and get free recommendations.</div>
                <div className='w-4/5 m-auto mt-5 text-[16px] font-extralight space-y-2'>
                    <div className='  '>Name</div>
                    <input type="text" className='bg-[#16161D] border-none w-full font-medium outline-none'  name="displayName" value={formData.displayName} onChange={handleChange} required />
                    <p className='border-[2px] border-[#7F75A2] w-full'></p>
                    <div className='  '>Email Address</div>
                    <input type="email" className='bg-[#16161D] border-none w-full font-medium outline-none'  name="email" value={formData.email} onChange={handleChange} required/>
                    <p className='border-[2px] border-[#7F75A2] w-full'></p>
                    <div className='mt-2'>Password</div>
                    <input type="password" className='bg-[#16161D] border-none w-full outline-none'  name="password"value={formData.password} onChange={handleChange} required />
                    <p className='border-[2px] border-[#7F75A2] w-full'></p>
                    <div className='mt-2'>Confirm Password</div>
                    <input type="password" className='bg-[#16161D] border-none w-full outline-none' name='confirmpassword' />
                    <p className='border-[2px] border-[#7F75A2] w-full'></p>
                </div>
                <button className='m-auto flex mt-10 w-3/4 place-content-center p-3 bg-[#674CC4] rounded-[30px] font-bold text-[16px] md:text-[21px] hover:opacity-80' onClick={handleSubmit}>Sign Up</button>
                <ToastContainer position="top-center" />
                <div className='w-4/5 m-auto mt-10 text-[16px] font-medium flex place-content-between '>
                    <div> Already have an account??</div>
                    <button className='text-[#1A8FE3]' onClick={() => { navigate('/login') }}>Login</button>
                </div>
            </div>
            <div className='hidden m-auto lg:block lg:w-1/2'>
                <img src={authImage} alt="" />
            </div>
        </div>
    )
}

export default Signup
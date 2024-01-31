import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

function Registr() {

    const [searchParam, setSearchParam] = useSearchParams()

    const [form, setForm] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
        inviteCode: searchParam.get('invite_code') ?? '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { target } = e;
        const { name, value } = target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', form, { withCredentials: true });
            toast.success(res.data?.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    return (
        <>
            <div className='Registr_ct'>
                <h3>Register</h3>
                <p>Please register by phone number or email</p>
                <div className='register_phone'>
                    <i className='fa fa-mobile'></i>
                    <p>Register your phone</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form_dv'>
                        <label htmlFor='phone'><b><i className='fa fa-mobile'></i> Phone Number</b></label>
                        <span><p>+91</p><input type='text' placeholder='Please enter the phone number' name='phone' value={form.phone} onChange={handleInput} required /></span>
                    </div>
                    <div className='form_dv'>
                        <label htmlFor='password'><b><i className='fa fa-unlock-alt'></i> Set Password</b></label>
                        <input type='password' placeholder='Please enter Set password' name='password' value={form.password} onChange={handleInput} required />
                    </div>
                    <div className='form_dv'>
                        <label htmlFor='confirmPassword'><b><i className='fa fa-unlock-alt'></i> Confirm Password</b></label>
                        <input type='password' placeholder='Enter Password Confirm Password' name='confirmPassword' value={form.confirmPassword} onChange={handleInput} required />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>
                    <div className='form_dv'>
                        <label htmlFor='inviteCode'><b><i className='fa fa-user-plus'></i> Invite Code</b></label>
                        <input type='text' name='inviteCode' placeholder='Enter Invite Code' value={form.inviteCode} onChange={handleInput} />
                    </div>
                    <button type='submit' className='clearfix'>Sign Up</button>
                </form>
                <div className='I_have_an_account'>I have an account <Link to={'/login'} className='clearfixcode'>Login</Link></div>
            </div>
        </>
    );
}

export default Registr;

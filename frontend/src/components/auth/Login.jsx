import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import logo from '../../images/as-logo.png'
import { userLoginApi } from '../../features/actions/authActions';
import { useState } from 'react';


const Login = ({ setToggle }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [serverMsg, setServerMsg] = useState("");

    // ========================
    // Login page onsbmit
    // ========================
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await dispatch(userLoginApi(data));
            if (response) {
                console.log('user is login');
            }
        } catch (error) {
            console.log("this is error for login", error)
            setServerMsg("Invalid Credentials❌")
        } finally {
            setLoading(false);
            reset();
        };
    };

    return (
        <div className='min-h-screen w-full bg-black flex flex-col items-center justify-center' >

            {/* company logo */}
            <div className='h-[70px] w-[210px] absolute top-2' >
                <img src={logo} alt="company logo" />
            </div>

            <div className='w-full max-w-2xl flex border-2 border-[#102A43] rounded shadow-xl shadow-[#102A43] relative z-[99]' >

                {/* Login Form  */}
                <div className='w-full z-[99] bg-black ' >
                    <form onSubmit={handleSubmit(onSubmit)} className='px-14 py-15  border-r-2 border-[#102A43]' >
                        <h1 className='text-sky-500 text-center text-2xl' >Login </h1>

                        {/* email */}
                        <div className='flex flex-col px-5 py-1 space-y-2' >
                            <label className='text-white' >Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                                })}
                                className={`bg-tranparent text-white border-b outline-0 ${errors.email ? "border-red-500" : "border-white"}`}
                                type="email" />
                            {errors.email && (
                                <span className='text-red-500' >{errors.email.message}</span>
                            )}
                        </div>

                        {/* password */}
                        <div className='flex flex-col px-5 py-1 space-y-2' >
                            <label className='text-white' >Password</label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Atleat 8 correct is required" }
                                })}
                                className={`bg-tranparent text-white border-b outline-0 ${errors.password ? "border-red-500" : "border-white"}`}
                                type="password" />
                            {errors.password && (
                                <span className='text-red-500' >{errors.password.message}</span>
                            )}
                        </div>

                        <button disabled={loading} type='submit'
                            className='text-black bg-[#102A43] text-sm font-bold px-4 py-2 rounded'
                        >{loading ? "...Loading" : "Login"}</button>

                        {/* status showing */}
                        {serverMsg && (<div className='text-red-500' >{serverMsg}</div>)}
                    </form>

                    {/* mobile login page switch button */}
                    <div className='text-white md:hidden '>
                        <p>Create Your account?{" "}
                            <button onClick={() => setToggle((perv) => !perv)} type='button' className='text-emerald-500' >
                                Signup
                            </button>
                        </p>
                    </div>
                </div>

                {/* Information div */}
                <div className='w-full hidden md:flex flex-col items-center justify-center p-10 bg-black z-[99] relative' >

                    {/* box rotater */}
                    <div className='h-full w-full hidden md:block absolute top-0 right-0 bg-[#102A43] rounded z-[9] rotate-infinite' ></div>
                    <div className='text-white z-[99] '>
                        <h1 className='text-black font-bold text-2xl text-center' >Welcome! </h1>

                        {/* Switch to Login page button */}
                        <p>Create Your account?{" "}
                            <button onClick={() => setToggle((perv) => !perv)}
                                type='button' className='text-sky-500 font-bold underline' >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
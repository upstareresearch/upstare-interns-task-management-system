import { useState } from 'react';
import logo from '../images/as-logo.png';
import emailjs from '@emailjs/browser';

const Footer = () => {

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [serverMsg, setServerMsg] = useState("");

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            emailjs.send(serviceId, templateId, form, publicKey).then((res) => {
                if (res.text === "OK") {
                    setServerMsg("Message Sent Successfully");
                }
            })
        } catch (error) {
            console.log("error while send mail", error);
            serverMsg("Message Not Send Try Again Later")
        }finally{
            setForm({name:"", email:"", message:""});
        }
    }

    return (
        <>
            <footer className='w-full md:p-10' id='contact'>

                <div className='w-full bg-slate-900/70 md:p-5' >

                    {/* Top Footer */}
                    <div className='w-full flex flex-col md:flex-row items-center justify-evenly' >

                        {/* company file */}
                        <div className='w-full md:p-4'>
                            <img className='h-[80px] shadow-lg shadow-sky-500' src={logo} alt="Company Logo" />
                        </div>

                        {/* Description */}
                        <p className='text-white font1 p-2 text-sm' >Transform your future with  <span className='text-sky-500' >Ashok Yadav !</span> Explore high-quality online courses designed
                            to help you master new skills, grow your career, and follow your passion. Learn from industry experts, enjoy flexible
                            study options, and become part of a thriving community. Our platform offers comprehensive learning paths in web development,
                            data science, data analytics, and Ui/Ux Design. With hands-on projects, live mentoring sessions, and
                            industry-recognized certifications, we ensure you're job-ready upon completion. </p>
                    </div>

                    {/* mid footer */}
                    <div className='w-full flex flex-col md:flex-row' >

                        {/* contact details */}
                        <div className='w-full flex flex-col md:flex-row p-9' >
                            <div className='w-full flex flex-col items-start justify-center space-y-10 text-xl text-white' >
                                <h1 className='text-sky-500' >Our Courses</h1>
                                <p>About Us</p>
                                <p>Contact Us</p>
                                <p>Careers</p>
                            </div>
                            <div className='w-full flex flex-col items-start justify-center space-y-10 text-xl text-white' >
                                <h1 className='text-sky-500' >Contact us</h1>
                                <p>+ 91-1234567890</p>
                                <p>ashokyadavrtp200@gmail.com</p>
                                <p>Bhopal madhya pradesh</p>
                            </div>
                        </div>
                        
                        {/* contact from */}
                        <div className='w-full p-4 text-white flex items-center justify-center' >
                            <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col space-y-4 bg-slate-900/70 border-2 border-sky-500 rounded-lg shadow-lg shadow-sky-500 p-3 md:p-7' >
                                <label>Full Name</label>
                                <input onChange={handleChange} value={form.name} name='name'
                                    className='border-2 border-dashed rounded p-2'
                                    placeholder='Enter your name' type="text" />
                                <label>Email</label>
                                <input onChange={handleChange} value={form.email} name='email'
                                    className='border-2 border-dashed rounded p-2'
                                    placeholder='Enter your email' type="text" />
                                <textarea onChange={handleChange} value={form.message} name='message'
                                    className='border-2 border-dashed' rows={4}  ></textarea>

                                {/* status showing */}
                                {serverMsg && (<div className='text-white' >{serverMsg}</div>)}

                                <button type='submit' className='bg-sky-500 border-2' >Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer;
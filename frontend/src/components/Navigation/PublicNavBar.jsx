import { Link } from "react-router";
import logo from "../../images/logo.png"

const PublicNavBar = () => {
    return (
        <section className='w-full' >

            <nav className="w-full flex items-center justify-between p-7" >

                {/* company image */}
                <div className="shadow-lg shadow-sky-500" >
                <img className='h-[40px] md:h-[80px]' src={logo} alt="company logo" />
                </div>

                {/* Nav links */}
                <div className="flex text-white hidden md:flex md:gap-20" >
                    <a className="bg-black px-7 py-2 rounded shadow-lg shadow-sky-500 " href="#courses">Courses</a>
                    <a className="bg-black px-7 py-2 rounded shadow-lg shadow-sky-500 " href="#contact">Contact</a>
                    <Link to="/login" className="bg-black px-7 py-2 rounded shadow-lg shadow-sky-500 " >login</Link>
                    <Link to="/register" className="bg-black px-7 py-2 rounded shadow-lg shadow-sky-500 " >Sign up</Link>
                </div>

                {/* mobile nav */}
                <div className="md:hidden" >
                 <button>
                    <span className="block h-[2px] w-5 mt-1 bg-white" ></span>
                    <span className="block h-[2px] w-5 mt-1 bg-white" ></span>
                    <span className="block h-[2px] w-5 mt-1 bg-white" ></span>
                    <span className="block h-[2px] w-5 mt-1 bg-white" ></span>
                 </button>
                </div>
            </nav>
        </section>
    )
}

export default PublicNavBar;
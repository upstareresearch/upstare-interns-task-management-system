import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/as-logo.png';
import { removeUser } from "../../features/reducers/authSlice";
import { axiosintance } from "../../config/axiosintance";

// ===================
// Nav link 
// ===================
const navlink = [
  { label: "Dashboard", to: "/home" },
  // { label: "My Courses", to: "/home/my-courses" },
  { label: "My Internship", to: "/home/my-internship" },
  { label: "Admin Dashboard", to: "/home/admin-dashoard" },
  { label: "Admin Task Uploader", to: "/home/admin-task-uploader" }
]

const NavLink = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  const role = user?.role;

  if (isLoading) {
    return null
  }

  if (!role) {
    return (<div><h1>waitions</h1></div>)
  }
  // // ============================
  // Logout handler for logout
  // =============================
  const logouthandler = async () => {
    try {
      const response = await axiosintance.get("/api/auth/logout");
      navigate("/")
      if (response) {
        console.log("user is logout")
        dispatch(removeUser());
      }
    } catch (error) {
      console.log("This is error for logout", error);
    }
  }

  return (
    <>
      {/* Navigation Section */}
      <section className='h-full w-full p-10 flex flex-col items-center space-y-5 bg-slate-900 ' >

        {/* company logo */}
        <div className='h-30  flex items-center justify-center shadow-lg shadow-sky-500 mb-5' >
          <img className="h-30" src={logo} alt="company logo" />
        </div>

        {/* Nav map */}
        <div className='w-full flex flex-col items-start justify-center gap-10 text-xl font-bold' >
          {navlink.map(({ label, to }) => {

            if (role === "intern" && (label === "Admin Dashboard" || label === "Admin Task Uploader")) {
              return null
            }
            if (role === "user" && (label === "Admin Dashboard" || label === "Admin Task Uploader")) {
              return null
            }
            return (
              <RouterNavLink key={label} to={to}
                className={({ isActive }) => `${to === location.pathname ? "border-b-2 border-[#04B0F0] text-[#04B0F0]" : "text-[#04B0F0]"}`} >
                <div className='flex gap-4 hover:scale-[1.1] transition space-y-5 p-2' >
                  <span>{label}</span>
                </div>
              </RouterNavLink>
            )
          })}
        </div>

        {/* logout button */}
        <button onClick={logouthandler} className='text-[#424242] font-bold text-2xl' >Logout</button>
      </section>
    </>
  )
}

export default NavLink;
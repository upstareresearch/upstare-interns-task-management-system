import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { axiosintance } from '../config/axiosintance';
import { Link } from 'react-router';

const AdminDashboard = () => {

  // ==============states==============
  const [task, setTask] = useState(null);
  const [internsProfile, setInternsProfile] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteServerMsg, setDeleteServerMsg] = useState("");
  const [createAccountServerMsg, setCreateAccountServerMsg] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // ===================================
  //Fetching all task for admin
  // ==================================
  useEffect(() => {
    const fetchingAllTask = async () => {
      try {
        const response = await axiosintance.get("/api/admin/all-task");
        if (response) {
          setTask(response.data.tasks)
        }
      } catch (error) {
        console.log("error while fetching the all task", error)
      }
    }
    fetchingAllTask();
  }, [task])


  // =============================
  // Delete task handler and api
  // =============================

  const deleteHandler = async (taskId) => {
    try {
      const response = await axiosintance.delete(`/api/admin/dashboard/delete-task/${taskId}`);
      if (response) {
        setDeleteServerMsg("✅Task Deleted Successfully✅");
      }
    } catch (error) {
      console.log("error while deleting task", error);
      setDeleteServerMsg("❌Task Not Deleted❌");
    }
  }

  // ====================================
  // Interns account creating handler
  // ====================================

  const CreateAccountHandler = async (data) => {
    setCreateLoading(true);
    try {
      const response = await axiosintance.post("api/interns/profile-create", data);
      if (response) {
        setCreateAccountServerMsg("✅Interns Details Saved and Loin Id password Created✅");
      }
    } catch (error) {
      console.log("error while create profile", error);
      setCreateAccountServerMsg("❌Interns Details is Not Created❌")
    } finally {
      setCreateLoading(false);
      reset();
    }
  }

  // ===================================
  // Fetching all the interns profile
  // ====================================

  useEffect(() => {
    const fetchAllInterProfile = async () => {
      try {
        const response = await axiosintance.get("/api/admin/dashboard/fetch-all-interns");
        if (response) {
          setInternsProfile(response?.data.internsProfile);
        }
      } catch (error) {
        console.log("error while fetching interns profile", error);

      }
    }
    fetchAllInterProfile();
  }, [internsProfile])

  // =========================
  // Loading task 
  // =========================

  if (!task) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-[#1A2546]' >
        <h1>......Loading all task</h1>
      </div>
    )
  };

  if (!internsProfile) {
    return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center bg-[#1A2546]' >
        <h1>.........Loading Interns Profile </h1>
      </div>
    )
  };

  return (
    <section className='min-h-screen md:min-h-full w-full flex flex-col items-center justify-center gap-10 bg-[#1A2546] md:p-5' >
      <h1 className='text-2xl text-sky-500 font4 p-4'>🌐 Admin Task Management And Interns Mangement System</h1>

      {/* All interns task showing div */}
      <section className='w-full flex flex-col items-center justify-center space-y-2 border-2 border-sky-500 rounded-sm shadow-lg shadow-sky-500 bg-slate-900/50  ' >

        {/* Heading */}
        <h1 className='text-sky-500 font4 md:text-3xl' >INTERNSHIP TASK</h1>

        {/* Maping task */}
        <div className='w-full flex flex-col space-y-5 p-4' >
          {task?.map((task) => (
            <div className='text-white border-2 border-sky-500 rounded-sm p-2' key={task._id} >
              <div key={task._id} className='flex items-center justify-between' >
                <h1 className='font1' >{task.title}</h1>
                <h1 onClick={() => deleteHandler(task._id)} className='bg-red-500 text-black p-2 rounded-sm' >Delete Task</h1>
              </div>
            </div>
          ))}
        </div>

        {/* status showing */}
        {deleteServerMsg && (<div className='text-white' >{deleteServerMsg}</div>)}
      </section>

      {/* so this create account to interns */}
      <section className='h-full w-full flex flex-col items-center justify-center' >
        <div className='w-full flex flex-col items-center justify-center border-2 border-sky-500 text-center bg-slate-900/50 rounded shadow-lg shadow-sky-500 md:p-5' >
          <h1 className='text-sky-500 font4 md:text-3xl' >Interns Account creating And Data Saving page</h1>

          {/* form for input fields */}
          <form onSubmit={handleSubmit(CreateAccountHandler)} className='p-4 flex flex-col text-white space-y-2 md:gap-2 ' >

            {/* Full name and Domain inputs */}
            <div className='w-full flex flex-col md:flex-row md:gap-5' >
              <div className='w-full' >
                <label>Full Name</label>
                <input {...register("fullName", { required: "Full name is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.fullName ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Name' type="text" />
              </div>

              <div className='w-full' >
                <label>Domain</label>
                <input {...register("domain", { required: "Domain is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.domain ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Domain' type="text" />
              </div>
            </div>

            {/* Email and Password inputs */}
            <div className='w-full flex flex-col md:flex-row md:gap-5' >
              <div className='w-full' >
                <label>Email</label>
                <input {...register("email", { required: "Email is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.email ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Email' type="email" />
              </div>

              <div className='w-full' >
                <label>Password</label>
                <input {...register("password", { required: "Password is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.password ? "border-red-500" : "border-sky-500"}`} placeholder='Intern password' type="password" />
              </div>
            </div>

            {/* college and Mobile inputs */}
            <div className='w-full flex flex-col md:flex-row md:gap-5' >
              <div className='w-full' >
                <label>College</label>
                <input {...register("college", { required: "Inter college name required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.college ? "border-red-500" : "border-sky-500"}`} placeholder='Intern college Name' type="text" />
              </div>

              <div className='w-full' >
                <label>Mobile</label>
                <input {...register("mobile", { required: "Mobile  number is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.mobile ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Mobile Number' type="tel" />
              </div>
            </div>

            {/* college and intern Id inputs */}
            <div className='w-full flex flex-col md:flex-row md:gap-5' >
              <div className='w-full' >
                <label>Location</label>
                <input {...register("location", { required: "Intern location is required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.location ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Location' type="text" />
              </div>

              <div className='w-full' >
                <label>Internship Duration</label>
                <input {...register("duration", { required: "Internship durations required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.duration ? "border-red-500" : "border-sky-500"}`} placeholder='Intern Internship Duration' type="text" />
              </div>
            </div>

            {/* Interns starting date and ending date */}
            <div className='w-full flex flex-col md:flex-row md:gap-5' >
              <div className='w-full' >
                <label>Internship Starting Date</label>
                <input {...register("startingDate", { required: "Intern strating date required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.startingDate ? "border-red-500" : "border-sky-500"}`} type="date" />
              </div>

              <div className='w-full' >
                <label>Internship Ending Date</label>
                <input {...register("endingDate", { required: "Ending date required" })}
                  className={`w-full border-1 rounded p-2 text-white ${errors.endingDate ? "border-red-500" : "border-sky-500"}`} type="date" />
              </div>
            </div>

            {/* status showing */}
            {createAccountServerMsg && (<div>{createAccountServerMsg}</div>)}

            <button disabled={createLoading} type='submit' className='w-full bg-slate-900/50 rounded-lg border-2 border-sky-500 p-2 text-white' >
              {createLoading ? "....Creating Intern account" : "Create Intern Account"}
            </button>
          </form>
        </div>
      </section>

      {/* showing all interns profile details */}
      <section className='min-h-full w-full flex flex-col items-center justify-center' >

        <div className='w-full flex flex-col items-center justify-center bg-slate-900/50 border-2 border-sky-500 rounded-sm shadow-lg shadow-sky-500 md:p-4' >

          {/* Heading */}
          <h1 className='text-white font4 ' >Interns Profile data</h1>

          {/* main div interns detail showing */}

          {internsProfile.length === 0 ? (
            <section className='w-full flex flex-col items-center jsutify-center   bg-slate-900/50' >
              <h1 className='text-white text-sm md:text-2xl font1' >---No Interns Data Found---</h1>
            </section>
          ) : (
            <section className='w-full' >
              <table className='border-1 rounded text-white ' >
                <thead>
                  <tr>
                    <th className='border-2 text-[9px] md:text-lg' >Name</th>
                    <th className='border-2 text-[9px] md:text-lg' >Email</th>
                    <th className='border-2 text-[9px] md:text-lg' >Password</th>
                    <th className='border-2 text-[9px] md:text-lg' >Full Details</th>
                  </tr>
                </thead>
                <tbody>
                  {internsProfile.map((interns, index) => (
                    <tr key={interns._id} >
                      <td className='border-2 text-[7px] w-full p-1 md:p-4 md:text-sm' >
                        <h1>{interns.fullName}</h1>
                        <h1 className='text-emerald-500' onClick={() => { navigator.clipboard.writeText(interns.fullName); alert("Name copy Successfully") }}  >Copy</h1>
                      </td>
                      <td className='border-2 text-[7px] w-full p-1 md:p-4 md:text-sm' >
                        <h1>{interns.email}</h1>
                        <h1 className='text-emerald-500' onClick={() => { navigator.clipboard.writeText(interns.email); alert("Email copy successfully") }} >Copy</h1>
                      </td>
                      <td className='border-2 text-[7px] w-full p-1 md:p-4 md:text-sm' >
                        <h1>{interns.password}</h1>
                        <h1 className='text-emerald-500' onClick={() => { navigator.clipboard.writeText(interns.password); alert("Password copy successfully") }} >Copy</h1>
                      </td>
                      <td className='border-2 text-white text-[7px] w-full p-1 md:p-4 md:text-lg' >
                        <Link to={`/home/interns-profile/${interns._id}`} >
                          <h1 className='text-emerald-500' >view</h1>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </section>
    </section>
  )
}

export default AdminDashboard;
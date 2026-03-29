import { useEffect, useState } from 'react'
import { axiosintance } from '../config/axiosintance';
import { useParams } from 'react-router';

const InternsProfileDetails = () => {

  const { id } = useParams()

  // ====================states=========================
  const [internsProfile, setInternsProfile] = useState(null);
  const [internAllTasks, setInternAllTasks] = useState(null);


  // ===============Approval states & loadings================
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // ===============================
  // fetching single interns
  // ===============================
  useEffect(() => {
    async function fetchInternsProfile() {
      try {
        const response = await axiosintance.get(`/api/interns/single-profile/${id}`);
        if (response) {
          setInternsProfile(response.data.intern);
        }

      } catch (error) {
        console.log("error fetching interns profile", error);
      }
    }
    fetchInternsProfile();
  }, [id]);

  // =====================================
  // Intern all submitted task fetching 
  // ====================================

  useEffect(() => {
    async function fetchInterAllTask() {
      try {
        const response = await axiosintance.get(`/api/submission/intern-submitted/tasks/${id}`);
        if (response) {
          setInternAllTasks(response.data.internAllTask);
        }

      } catch (error) {
        console.log("error while fetching intern all task", error);
      }
    }
    fetchInterAllTask();
  }, [id])


  // =============================
  // Task Approval Api
  // =============================

  const approvalHandleSubmit = async (taskId, status) => {
    setApprovalLoading(true);
    console.log("this is task id", taskId, status)
    try {
      const response = await axiosintance.patch("/api/admin/dashboard/task/approval", { taskId, status });
      if (response) {
        console.log("Approved")
      }
    } catch (error) {
      console.log("error while approval", error);
    } finally {
      setApprovalLoading(false);
    }
  };

  // ==============================
  // Task Rejecting APi
  // ==============================

  const rejectedHandleSubmit = async (taskId, status) => {
    setRejectLoading(true);
    try {
      const response = await axiosintance.patch("/api/admin/dashboard/task/approval", { taskId, status });
      if (response) {
        console.log("Rejected");
      }

    } catch (error) {
      console.log("error while rejecting task", error);
    } finally {
      setRejectLoading(false);
    }
  }

  // ====================
  // Loadings
  // ====================

  if (!internsProfile) {
    return (
      <div className='min-h-screen bg-[#1A2546]' >....Loading Profile</div>
    )
  }

  // if (!internAllTasks) {
  //   return (
  //     <div className='min-h-screen  bg-[#1A2546]' >.....Loading intern tasks</div>
  //   )
  // }

  return (
    <section className='min-h-screen md:min-h-full w-full bg-[#1A2546] text-white p-4' >
      <h1 className='text-emerald-500 text-center text-3xl p-4' >INTERN PROFILE DETAILS</h1>
      {/* showing interns Profile */}
      <section className='w-full text-center bg-slate-900/50 text-sm space-y-4 flex flex-col  items-center justify-center border-2 border-sky-500 shadow-lg shadow-sky-500 p-4' >

        {/* main div */}
        <div className='w-full flex flex-col md:flex-row md:p-5' >

          {/* left-div */}
          <div className='w-full flex flex-col justify-start md:gap-5' >
            <div className='flex' >
              <h1 className='text-emerald-500' >Full Name :- </h1>
              <h1>{internsProfile.fullName}</h1>
            </div>
            <div className='flex'>
              <h1 className='text-emerald-500' >Domain :- </h1>
              <h1>{internsProfile.domain}</h1>
            </div>

            <div className='flex' >
              <h1 className='text-emerald-500' >Email :- </h1>
              <h1>{internsProfile.email}</h1>
            </div>
            <div className='flex'>
              <h1 className='text-emerald-500' >password :- </h1>
              <h1>{internsProfile.password}</h1>
            </div>

            <div className='flex' >
              <h1 className='text-emerald-500' >College :- </h1>
              <h1>{internsProfile.college}</h1>
            </div>
            <div className='flex'>
              <h1 className='text-emerald-500' >Mobile :- </h1>
              <h1>{internsProfile.mobile}</h1>
            </div>
          </div>

          {/* Right div */}
          <div className='w-full flex flex-col justify-start md:gap-5' >
            <div className='flex' >
              <h1 className='text-emerald-500' >Location :- </h1>
              <h1>{internsProfile.location}</h1>
            </div>
            <div className='flex'>
              <h1 className='text-emerald-500' >Duration :- </h1>
              <h1>{internsProfile.duration}</h1>
            </div>

            <div className='flex' >
              <h1 className='text-emerald-500' >Internship Starting Date :- </h1>
              <h1>{internsProfile.startingDate?.slice(0, 10)}</h1>
            </div>
            <div className='flex'>
              <h1 className='text-emerald-500' >Internship Ending Date :- </h1>
              <h1>{internsProfile.endingDate.slice(0, 10)}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* showing all interns task */}
      <section className='w-full' >
        <div className='w-full flex flex-col mt-10 text-sm' >
          <h1 className='text-emerald-500 text-3xl text-center' >INTERN SUBMITTED TASK</h1>
          {internAllTasks?.map((Task) => (
            <div className='w-full flex flex-col bg-slate-900/50 border-2 border-sky-500 space-y-4 overflow-auto mt-5 p-4' key={Task._id} >

              <div className='flex flex-col md:flex-row' >
                <h1 className='text-emerald-500' >Task Number :-</h1>
                {Task.taskNumber}
              </div>

              <div className='flex flex-col md:flex-row' >
                <h1 className='text-emerald-500' >Task Github Link :-</h1>
                <h1 className='text-sky-500' ><a href={Task.gitHubLink} target='_blank' >{Task.gitHubLink}</a></h1>
              </div>

              <div className='flex flex-col md:flex-row' >
                <h1 className='text-emerald-500' >Task Documentation Link :-</h1>
                <h1 className='text-sky-500' ><a href={Task.documentationLink} target='_blank' >{Task.documentationLink}</a></h1>
              </div>

              <div className='flex flex-col md:flex-row' >
                <h1 className='text-emerald-500' >Task Remarks :-</h1>
                {Task.remarks}
              </div>
              <div className='flex' >
                <h1 className='text-emerald-500' >Intern Task Status :-</h1>
                <h1 className='tex-bold' >{Task.status} </h1>
              </div>

              {/* Approval selection */}
              <div className='flex flex-col md:flex-row gap-5' >

                {/* Approval button */}
                <button onClick={() => approvalHandleSubmit(Task._id, "approved")}
                  className='text-white bg-emerald-500 p-3'
                  disabled={approvalLoading || Task.status !== "pending"} >
                  {approvalLoading ? "...loading" : "Approve"}
                </button>

                {/* Reject button */}
                <button onClick={() => rejectedHandleSubmit(Task._id, "rejected")}
                  className='text-white bg-red-500 p-3'
                  disabled={rejectLoading || Task.status !== "pending"} >
                  {rejectLoading ? "...loading" : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default InternsProfileDetails
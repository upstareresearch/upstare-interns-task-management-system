import { useEffect } from 'react';
import { useState } from 'react';
import { axiosintance } from '../config/axiosintance';
import { Link } from 'react-router';


const Dashboard = () => {

  // ====================State===========================
  const [approvedCount, setApprovedCount] = useState("");
  const [pendingCount, setPendingCount] = useState("");
  const [rejectedCount, setRejectedCount] = useState("");
  const [submittedCount, setSubmittedCount] = useState("");
  const [totalTask, setTotalTask] = useState("");
  const [user, setUser] = useState("");


  // ================================
  // fetching total number of task
  // ================================

  useEffect(() => {
    async function totalTaskNumber() {
      try {
        const response = await axiosintance.get("/api/dashboard/all-Task");
        if (response) {
          setTotalTask(response.data.allTaskNumber);
        }
      } catch (error) {
        console.log("error while fetching total number of task", error);
      }
    }
    totalTaskNumber();
  }, [totalTask])


  // ====================================
  // fetching the approved task number
  // ====================================
  useEffect(() => {
    async function getApprovedCounts() {
      try {
        const response = await axiosintance.get("/api/dashboard/approved/count");
        if (response) {
          setApprovedCount(response.data.approvedCount)
        }
      } catch (error) {
        console.log("error while fetching approved count", error);
      }
    }
    getApprovedCounts();
  }, [approvedCount])

  // ==========================================
  // fetching the pending task count number
  // ==========================================

  useEffect(() => {
    async function getPendingCount() {
      try {
        const response = await axiosintance.get("/api/dashboard/pending/count");
        if (response) {
          setPendingCount(response.data.pendingCount);
        }
      } catch (error) {
        console.log("error while fetching pending count", error);
      }
    }
    getPendingCount()
  }, [pendingCount]);

  // ========================================
  // fetching the rejected task count number
  // ========================================

  useEffect(() => {
    async function getRejectedCount() {
      try {
        const response = await axiosintance.get("/api/dashboard/rejected/count");
        if (response) {
          setRejectedCount(response.data.rejectedCount);
        }
      } catch (error) {
        console.log("error while fetching the rejected", error);
      }
    }
    getRejectedCount();
  }, [rejectedCount]);

  // ================================
  // Fetching total number of task
  // ================================

  useEffect(() => {
    async function getAllSubmittedTaskNumber() {
      try {
        const response = await axiosintance.get("/api/dashboard/submitted/count");
        if (response) {
          setSubmittedCount(response.data.submittedTasksCount);
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("error while fetching all task number", error);
      }
    }
    getAllSubmittedTaskNumber();
  }, [submittedCount]);

  return (
    <section className='min-h-screen md:min-h-full w-full bg-[#1A2546] p-4 md:p-10' >

      {/* main div */}
      <div className='flex flex-col gap-15 border-2 border-sky-500 rounded-lg bg-slate-900/50 shadow-lg shadow-sky-500 p-10 ' >

        {/* Heading with name */}
        <div>
          <h1 className='text-3xl text-white' >Welcome Back! {user.fullName}</h1>
          <p className='text-white text-sm' >Your learning journey continues</p>
        </div>

        {/* top bar */}
        <div className='flex flex-col md:flex-row items-center justify-evenly gap-10' >

          {/* Approved Task Number showing */}
          <div className='shadow-lg shadow-black rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-sky-500' >Total No Task</h1>
            <h1 className='text-2xl text-white' >{totalTask}</h1>
          </div>

          {/* Pending Task Number Showing */}
          <div className='shadow-lg shadow-black rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-sky-500' >Submitted Task</h1>
            <h1 className='text-2xl text-white' >{submittedCount}</h1>
          </div>

          {/* Rejected Task Number showing */}
          <div className='shadow-lg shadow-black text-center rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-sky-500' >Internship Tasks</h1>
            <Link to={`/home/my-internship`} >
              <button className='text-emerald-500 px-3' > View Tasks </button>
            </Link>
          </div>
        </div>

        {/* second layer */}
        <div className='flex flex-col md:flex-row items-center justify-evenly gap-10' >

          {/* Approved Task Number showing */}
          <div className='shadow-lg shadow-black rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-green-500' >Approved Task</h1>
            <h1 className='text-2xl text-white' >{approvedCount}</h1>
          </div>

          {/* Pending Task Number Showing */}
          <div className='shadow-lg shadow-black rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-sky-500' >Pending Task</h1>
            <h1 className='text-2xl text-white' >{pendingCount}</h1>
          </div>

          {/* Rejected Task Number showing */}
          <div className='shadow-lg shadow-black rounded-lg bg-slate-900/50 px-15 py-7 ' >
            <h1 className='text-2xl text-red-500' >Rejected Task</h1>
            <h1 className='text-2xl text-white' >{rejectedCount}</h1>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Dashboard;
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { axiosintance } from '../config/axiosintance';

const TaskStatusBadge = ({ status }) => {
    const statusStyle = {
        pending: "bg-slate-900/50 text-white",
        approved: "bg-green-500 texk-black",
        rejected: "bg-red-500 text-black"
    }
    const statusText = {
        pending: "⏳ Pending Approval",
        approved: "✅ Approved",
        rejected: "❌ Rejected",
    }

    return (
        <div className={`text-sm font1 p-4 rounded-lg border-2 border-sky-500 shadow-lg shadow-sky-500 ${statusStyle[status]}`} >
            {statusText[status]}
        </div>
    );
    ;
}

const TaskDetails = () => {

    const { id } = useParams();

    const [task, setTask] = useState(null);
    const [gitLink, setGitLink] = useState("");
    const [docsLink, setDocsLink] = useState("");
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [taskStatus, setTaskStatus] = useState(null);

    // ====================================================
    // Fetching the single task and showing
    // ====================================================

    useEffect(() => {
        async function fetchTask() {
            try {
                const response = await axiosintance.get(`/api/admin/single-task/${id}`);
                if (response) {
                    setTask(response.data.task);
                }
            } catch (error) {
                console.log("error fetching single task", error)
            }
        }
        fetchTask();
    }, [id])

    // ==========================================
    // Task submit handler for the interns
    // ==========================================

    const taskHandlerSubmit = async (e) => {
        setLoading(true);

        if (!gitLink) {
            alert("Git link is required");
        }

        if (!docsLink) {
            alert("Documentation link is required")
        }

        const playload = {
            taskId: task._id,
            taskNumber: task.taskNumber,
            gitHubLink: gitLink,
            documentationLink: docsLink,
            remarks: remarks
        }

        try {
            const response = await axiosintance.post("/api/submission/intern-task", playload);
            if (response) {
                alert("Task submitted successfully ✅")
                setGitLink("");
                setDocsLink("");
                setRemarks("");
            }
        } catch (error) {
            console.log("Task submission error", error);
            alert("Failed to submit task ❌");
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // fetching the interns task status
    // =====================================

    useEffect(() => {
        if (!task) {
            return
        }
        const fetchStatus = async () => {
            try {
                const response = await axiosintance.get(`/api/submission/task-status/${id}`);

                if (response.data.submitted) {
                    setSubmitted(true);
                    setTaskStatus(response.data.status);
                }
            } catch (error) {
                console.log("error while fetching task status")
            }
        }
        fetchStatus();
    }, [task])


    // ======================================
    // checking task is present aur not
    // ======================================

    if (!task) {
        return (
            <div className='min-h-screen bg-[#1A2537]' >
                <h1>.....Loading task</h1>
            </div>
        )
    }


    return (
        <section className='min-h-full w-full bg-[#1A2546] p-5 md:p-10' >

            {/* Task Details Showing */}
            <section className='h-full w-full flex flex-col space-y-4 bg-[#1A2537] border-2 text-white border-sky-500 md:p-10 rounded-lg shadow-lg shadow-sky-500  p-3' >
                <h1 className='text-sky-500 font-bold font4' >{task.title}</h1>

                <h1>📚 Theory Concepts: </h1>
                <p className='bg-slate-900/70 p-7' >{task.theoryConcepts}</p>

                <h1>🛠️ Hands-On Practice: </h1>
                <p className='bg-slate-900/70 p-7' >{task.handOnPractice}</p>

                <h1 className='text-sky-500 font4' >{task.projectTitle}</h1>

                <h1>🛠️ Technical Requirements: </h1>
                <p className='bg-slate-900/70 p-7' >{task.technicalRequirements}</p>

                <div className='flex flex-col gap-2 bg-slate-900/70 p-7' >
                    <h1>📋 Step-by-Step Guide:</h1>
                    <p className='bg-slate-900/70 p-7' >{task.stepByStep}</p>
                </div>

                <h1>💻 Sample Code:</h1>
                <pre className='text-green-500  bg-slate-900/70 p-7 w-full overflow-x-auto relative' >
                    <code>{task.sampleOutput}</code>
                </pre>

                <h1>💡 Tips & Resources:</h1>
                <p className='bg-slate-900/70 p-7' >{task.tipResources}</p>

                <h1>📤 Submission Requirements:</h1>
                <p className='text-white p-7' >{task.submissions}</p>

                {/* Task submiting fields */}
                <section className='w-full' >
                    {!submitted ? (
                        <div className='flex flex-col items-center justify-center' >
                            <h1 className='text-sky-500 font4 md:text-2xl' > 📤 Submit Your Task</h1>
                            <form onSubmit={taskHandlerSubmit} className='w-full flex flex-col gap-4 text-white border-2 border-sky-500 shadow-lg shadow-sky-500 p-5' >

                                {/* git hub input */}
                                <h1>GitHub Repository URL *</h1>
                                <input value={gitLink} onChange={(e) => setGitLink(e.target.value)} className='text-white border-2 border-white  p-2 bg-slate-900/70 rounded-lg' placeholder='https://github.com/yourusername/repo' type="url" />
                                <h1>Provide the link to your GitHub repository containing the project code</h1>

                                {/* documentation input */}
                                <h1>Documentation URL *</h1>
                                <input value={docsLink} onChange={(e) => setDocsLink(e.target.value)} className='border-2 border-white p-2 bg-slate-900/70 rounded-lg' placeholder='https://docs.google.com/documentation' type="url" />
                                <h3>Provide link to documentation (Google Docs, PDF, or any shareable link). Must include: Project description, setup instructions, screenshots, and explanations as specified above.</h3>

                                {/* Remark input */}
                                <h1>Remarks *</h1>
                                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder='Any additional comments or notes about your submission...' className='w-full border-2 border-white p-2 bg-slate-900/70 rounded-lg' ></textarea>
                                <h3>You can add any comments about challenges faced, features implemented, or additional information.</h3>

                                <button disabled={loading} type='submit' className='max-w-sm text-black bg-sky-500 py-2' >{loading ? "...submitting task" : "submit"}</button>
                            </form>
                        </div>
                    ) : (
                        <TaskStatusBadge status={taskStatus} />
                    )}
                </section>
            </section>
        </section>
    )
}

export default TaskDetails;
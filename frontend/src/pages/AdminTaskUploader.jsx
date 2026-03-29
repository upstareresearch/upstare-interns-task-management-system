import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosintance } from '../config/axiosintance';

const AdminTaskUploader = () => {

    // ===========================loadings&Errors ======================
    const [taskDetailsLoading, setTaskDetailsLoading] = useState(false);
    // const [uploadImageLoading, setUploadImageLoading] = useState(false);
    const [taskCodeLoading, setTaskCodeLoading] = useState(false);
    const [taskDetailsServerMsg, setTaskDetailsServerMsg] = useState("");
    const [taskCodeServerMsg, setTaskCodeServerMsg] = useState("")

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // ===============state-for-values========================
    // const [imageTaskNumber, setImageTaskNumber] = useState("");
    // const [imageUploadFile, setImageUploadFile] = useState(null);
    const [codeTaskNumber, setCodeTaskNumber] = useState("");
    const [taskCode, setTaskCode] = useState("");


    // Task details submit handler
    const taskDetailsHandler = async (data) => {
        setTaskDetailsLoading(true);
        try {
            const response = await axiosintance.post("/api/admin/task-uploader", data);
            if (response) {
                setTaskDetailsServerMsg("✅Task Created Successfully✅");
            }

        } catch (error) {
            console.log("This is error while create task", error);
            setTaskDetailsServerMsg("❌Task Not created check all fields and try again❌");
        } finally {
            setTaskDetailsLoading(false);
            reset();
        }
    }

    // Upload image submit handler
    // const uploadImageHandler = async (e) => {
    //     e.preventDefault();
    //     setUploadImageLoading(true);

    //     if (!imageTaskNumber) {
    //         alert("Please Add The Task Number");
    //     }

    //     try {
    //         const formData = new FormData();
    //         formData.append("imageTaskNumber", imageTaskNumber);
    //         formData.append("files", imageUploadFile)
    //         console.log("this is the upload image data", formData)
    //     } catch (error) {

    //     } finally {
    //         setUploadImageLoading(false);
    //         reset();
    //     }
    // }

    // Task code submit handler
    const taskCodeHandler = async (e) => {
        e.preventDefault()
        setTaskCodeLoading(true);

        if (!codeTaskNumber) {
            alert("Add The Task Number")
        }
        try {
            const response = await axiosintance.patch("/api/admin/task-code-uploader", ({ taskNumber: codeTaskNumber, sampleOutput: taskCode }));
            if (response) {
                setTaskCodeServerMsg("✅Code uploaded Successfully✅");
                setTaskCode("");
                setCodeTaskNumber("");
            }
        } catch (error) {
            console.log("error while uploading code", error);
            setTaskCodeServerMsg("❌Code is not Uploaded ❌");
        } finally {
            setTaskCodeLoading(false);
        }
    }

    return (
        <section className='min-h-screen md:min-h-full w-full text-center bg-[#1A2546]' >
            <h1 className='text-2xl text-sky-500 font4 p-4'>🌐 Admin Task Uploader System</h1>

            {/*page1 task details uploading page */}
            <section className='w-full flex items-center justify-center p-2' >
                <div className='max-w-4xl flex flex-col items-center justify-center bg-slate-900/50 text-white shadow-lg shadow-sky-500 border-2 border-sky-500 rounded p-2' >
                    <h1> Task Details Requirements</h1>
                    <form onSubmit={handleSubmit(taskDetailsHandler)} className='w-full' >

                        {/* title input and task number input*/}
                        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5 p-4' >
                            <div className='w-full' >
                                <label>Task-Title </label>
                                <input {...register("title", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.title ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Week 1: Task' type="text" />
                            </div>
                            <div className='w-full' >
                                <label>Task-Number</label>
                                <input {...register("taskNumber", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.taskNumber ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Task-01 [Add the unique]'
                                    type="text" />
                            </div>
                        </div>

                        {/* project title & Technical Requriments */}
                        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5 p-4' >
                            <div className='w-full' >
                                <label>Project-Title</label>
                                <input {...register("projectTitle", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.projectTitle ? "border-red-500" : "border-sky-500"} `}
                                    placeholder='Add the project title' type="text" />
                            </div>
                            <div className='w-full' >
                                <label>Technical-Requirements</label>
                                <input {...register("technicalRequirements", { required: "Rrequired" })}
                                    className={`w-full text-white border-2 border-dashed p-2  ${errors.technicalRequirements ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Add the task structure' type="text" />
                            </div>
                        </div>

                        {/* theory concepts & hand of practices */}
                        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5 p-4' >
                            <div className='w-full' >
                                <label>Theory Concepts</label>
                                <input {...register("theoryConcepts", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.theoryConcepts ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Add the points of task' type="text" />
                            </div>
                            <div className='w-full' >
                                <label>Hands-On-Practice</label>
                                <input {...register("handOnPractice", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.handOnPractice ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Points that interns follow' type="text" />
                            </div>
                        </div>

                        {/* submission requirements & Tips and resources */}
                        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5 p-4' >
                            <div className='w-full' >
                                <label>Submission-Requirements</label>
                                <input {...register("submissions", { required: "Required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.submissions ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Add the submission points' type="text" />
                            </div>
                            <div className='w-full' >
                                <label>Tip & Resources</label>
                                <input {...register("tipResources", { required: "required" })}
                                    className={`w-full text-white border-2 border-dashed p-2 ${errors.tipResources ? "border-red-500" : "border-sky-500"}`}
                                    placeholder='Task-01 [Add the unique]' type="text" />
                            </div>
                        </div>

                        {/* step by setp guide field */}
                        <div className='w-full p-4' >
                            <label>Step By Step Guide</label>
                            <textarea {...register("stepByStep", { required: "Required" })}
                                className={`w-full text-white border-2 border-dashed p-2 ${errors.stepByStep ? "border-red-500" : "border-sky-500"}`}
                                placeholder='Explain the task in detail' rows={5} >
                            </textarea>
                        </div>

                        {/* Status showing */}
                        {taskDetailsServerMsg && (<div>{taskDetailsServerMsg}</div>)}

                        <button disabled={taskDetailsLoading}
                            className='w-full bg-sky-500 rounded py-2 text-white' type='submit' >
                            {taskDetailsLoading ? "....Creating Task Just Wait" : "Create Task"}
                        </button>
                    </form>
                </div>
            </section>

            {/* page2 code */}
            <section className='flex flex-col space-y-3 text-white' >

                <div className='h-full w-full flex flex-col items-center justify-center md:flex-row gap-20 p-4' >

                    {/* <div className='w-full max-w-5xl flex flex-col items-center justify-center bg-slate-900/50 shadow shadow-lg shadow-sky-500 border-2 border-sky-500 rounded-lg space-y-6 p-3' >
                        <h1 className='font1' >1. 📊 Upload Tasks via Excel</h1>
                        <p>Upload multiple internship tasks at once using an <span className='text-sky-500' >Excel File.</span></p>

                        <form onSubmit={uploadImageHandler} className='w-full space-y-2 flex flex-col space-y-10' >

                            <label>Upload the excel</label>
                            <label className='w-full border-2 flex itmes-center justify-center border-sky-500 border-dashed rounded-sm p-6' >
                                <h1 className='text-sm text-slate-500' >Drag and Drop</h1>
                                <input onChange={(e) => setImageUploadFile(e.target.files[0] || null)} className='hidden' accept='.xlsx,.xlx,.csv' type="file" />
                            </label>

                            <button disabled={uploadImageLoading}
                                type='submit' className='bg-sky-500 rounded py-2' >
                                {uploadImageLoading ? "....Uploading Image just Wait" : "Upload Image"}
                            </button>
                        </form>
                    </div> */}

                    {/* Right div */}
                    <div className='w-full max-w-3xl flex flex-col items-center justify-center bg-slate-900/50 shadow shadow-lg shadow-sky-500 border-2 border-sky-500 rounded-lg space-y-7 p-3' >
                        <h1>2. Add the task code for interns</h1>
                        <p>This task code is help the interns to complete the task and add internship task with the <span className='text-sky-500 text-sm font-bold ' >Task Number</span></p>

                        {/* this is the form for uploading */}
                        <form onSubmit={taskCodeHandler} className='w-full space-y-2 flex flex-col ' >

                            {/* upload task number */}
                            <label className='text-sm text-sky-500' > Add Task Number</label>
                            <label className='w-full border-2 flex itmes-center justify-center border-sky-500 border-dashed rounded-sm p-1' >
                                <input onChange={(e) => setCodeTaskNumber(e.target.value)} value={codeTaskNumber} className='w-full p-2 outline-0 text-white' type="text" placeholder='Task-01' />
                            </label>

                            {/* uplaod image input field */}
                            <label className='text-sm text-sky-500' > Add the task code </label>
                            <label className='w-full border-2 flex itmes-center justify-center border-sky-500 border-dashed rounded-sm ' >
                                <input onChange={(e) => setTaskCode(e.target.value)} value={taskCode} className='h-full w-full text-white p-6 outline-0' placeholder='Add Task Code' type="text" />
                            </label>

                            {/* status showing  */}
                            {taskCodeServerMsg && (<div>{taskCodeServerMsg}</div>)}

                            <button disabled={taskCodeLoading}
                                type='submit' className='bg-sky-500 rounded py-2' >
                                {taskCodeLoading ? "Upoading code just wait" : "Upload Code"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default AdminTaskUploader;
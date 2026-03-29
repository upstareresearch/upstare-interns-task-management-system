import svg from '../images/OnlineTest.svg'
import PublicNavBar from '../components/Navigation/PublicNavBar';
import courses1 from "../images/courses-image-1.png";
import courses2 from "../images/courses-image-2.png";
import courses3 from "../images/courses-image-3.png";
import courses4 from "../images/courses-image-4.png";
import logo from "../images/as-logo.png"
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <section className='min-h-screen md:min-h-screen bg-[#102A43]' >

      {/* Nav bar */}
      <PublicNavBar />

      {/* hero section */}
      <section className='w-full flex flex-col justify-evenly md:flex-row text-white p-10 gap-5' >
        <div className="w-full w-full md:max-w-xl font1 p-1">
          <div className='flex items-center justify-center ' >
            <img className='h-[40px] md:h-[60px]' src={logo} alt="company logo" />
            <h1 className='text-5xl text-center text-sky-500 text-shadow-lg text-shadow-black' >Ashok Yadav</h1>
            <img className='h-[40px] md:h-[60px]' src={logo} alt="company logo" />
          </div>
          <p className='mt-5 font-bold border-2 border-sky-500 bg-slate-900/50 shadow-lg shadow-sky-500 rounded-lg p-7' > Expert-led courses designed to help you excel in your career by providing in-depth knowledge, hands-on training,
            and real-world projects. Learn from industry professionals, build job-ready skills, and gain the confidence to
            achieve your dreams. Whether you're starting fresh or upskilling, our courses offer personalized guidance and
            career-focused learning to set you up for long-term success.</p>
        </div>

        {/* icon */}
        <div className='w-full' >
          <img className="w-full md:h-[300px]" src={svg} alt="Svg" />
        </div>
      </section>

      {/* our Courses */}
      <section className='w-full p-5' id='courses' >
        <h1 className='text-center font4 text-3xl text-white p-5' >Explore Our Courses</h1>

        {/* Courses */}
        <div className='w-full flex flex-col items-center justify-evenly md:flex-row gap-10' >

          {/* Data Analytics */}
          <div className='flex flex-col bg-slate-900/50 border-2 border-sky-500 shadow-lg shadow-sky-500 p-6 text-white space-y-4 font1'>
            <img src={courses1} alt="courses image" />
            <h1 className='text-sky-500' >Data Analytics</h1>
            <p className='text-sm' >Data Analytics Course - Master Data Skills with ashok yadav 🚀 Turn Data into Actionable Insights & Build a Successful Career in Analytics!
              💡 In today's data-driven world, businesses rely on skilled data analysts to uncover trends, enhance decision-making, and drive success.
            </p>
            <button className='bg-sky-500 text-white text-sm py-2' >Enroll Now</button>
          </div>

          {/* Digital Marketing */}
          <div className='flex flex-col bg-slate-900/50 border-2 border-sky-500 shadow-lg shadow-sky-500 p-6 text-white space-y-4 font1'>
            <img src={courses2} alt="courses image" />
            <h1 className='text-sky-500' >Digital Marketing</h1>
            <p className='text-sm' > Digital Marketing Course - Master Online Marketing with ashok yadav Unlock the Power of Digital Marketing & Build a High-Growth Career! In today's
              digital-first world, businesses of all sizes rely on digital marketing to connect with their audience, drive sales, and grow their brand.
            </p>
            <button className='bg-sky-500 text-white text-sm py-2' >Enroll Now</button>
          </div>

          {/* Ui/Ux Design */}
          <div className='flex flex-col bg-slate-900/50 border-2 border-sky-500 shadow-lg shadow-sky-500 p-6 text-white space-y-4 font1'>
            <img src={courses3} alt="courses image" />
            <h1 className='text-sky-500' >UI/UX Design</h1>
            <p className='text-sm' >Design intuitive, engaging, and user-centered digital experiences with expert mentorship. Learn UI/UX fundamentals, wireframing, prototyping, user research,
              and usability testing to create impactful designs.In today’s digital-first world, great user experience is key to product succ
            </p>
            <button className='bg-sky-500 text-white text-sm py-2' >Enroll Now</button>
          </div>

          {/* Web Development */}
          <div className='flex flex-col bg-slate-900/50 border-2 border-sky-500 shadow-lg shadow-sky-500 p-6 text-white space-y-4 font1'>
            <img src={courses4} alt="courses image" />
            <h1 className='text-sky-500' >Web Development</h1>
            <p className='text-sm' >Web Development Course - Build Modern Websites & Applications with ashok yadav Master Frontend & Backend
              Development to Launch Your Tech Career! In today's digital world, websites and web applications are the backbone of businesses, services, and everyday interactions.
            </p>
            <button className='bg-sky-500 text-white text-sm py-2' >Enroll Now</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </section>
  )
}

export default HomePage;
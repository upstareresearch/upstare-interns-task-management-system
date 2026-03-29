import AppRouter from './routes/AppRouter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosintance } from './config/axiosintance';
import { addUser, finishLoading } from './features/reducers/authSlice';

const App = () => {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    const fetchingUser = async()=>{
      try {
        const response = await axiosintance.get("api/auth/me");
        if(response){
          dispatch(addUser(response?.data?.user))
        }
      } catch (error) {
        dispatch(finishLoading());
        if(error.response?.status  === 404){
          return
        }
        console.log("fetching user error", error);
      }
    };
     fetchingUser()
  }, [dispatch] );

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App;
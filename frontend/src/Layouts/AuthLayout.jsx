import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthLayout = () => {

  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user !== null && isLoggedIn) {
      navigate("/home")
    }
  }, [user, isLoggedIn]);

  const [toggle, setToggle] = useState(true)

  return (
    <div>
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )}
    </div>
  )
}

export default AuthLayout
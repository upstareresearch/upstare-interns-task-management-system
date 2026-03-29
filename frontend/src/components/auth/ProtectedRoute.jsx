import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

  const { user, isLoading } = useSelector((state) => state.auth);

  // ==========================================
  // create Protected route useing navigate
  // ===========================================

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#1A2546]' >...Loading user</div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import './App.css'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [])

  return (
    <>
      <div style={{ background: "url('/login-page.jpg') no-repeat center" }} className='flex flex-col items-center justify-center flex-1 min-h-dvh bg-blue-950'>
        <Button size='large' onClick={() => navigate("/login")}>go to login</Button>
      </div>
    </>
  )
}

export default App

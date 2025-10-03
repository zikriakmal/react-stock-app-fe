import { Button } from 'antd'
import { useNavigate } from 'react-router'
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button onClick={() => navigate("/login")}>go to login</Button>
      </div>
    </>
  )
}

export default App

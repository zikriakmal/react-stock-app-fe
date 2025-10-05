import { Button, Input } from "antd";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const navigation = useNavigate();
    return (
        <div
            style={{ background: "url('/login-page.jpg') no-repeat center" }}
            className="flex-col justify-center items-center min-h-dvh flex flex-1 bg-blue-950">
            <div className="flex flex-col gap-4 sm:w-96 h-100 border-2 border-white/20 p-10 rounded-xl shadow-sm bg-white/5 backdrop-blur-sm" >
                <div>
                    <p className="text-left mb-2 text-white">Email</p>
                    <Input size="large" type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    <p className="text-left mb-2 text-white">Password</p>
                    <Input size="large" name="password" type="password" placeholder="Password" />
                </div>
                <div className="flex-1 flex items-end">
                    <Button onClick={() => navigation('/dashboard')} size="large" color="blue" variant="filled" className="flex-1 ">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
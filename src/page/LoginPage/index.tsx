import { Button, Input } from "antd";

const LoginPage = () => {
    return (
        <div className="flex-col justify-center items-center min-h-svh flex flex-1">
            <div className="flex flex-col gap-4 h-100 w-96 border-[0.5px] p-10 rounded-2xl shadow-sm">
                <div>
                    <p className="text-left mb-2">Email</p>
                    <Input size="large" type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    <p className="text-left mb-2">Password</p>
                    <Input size="large" name="password" type="password" placeholder="Password" />
                </div>
                <div className="flex-1 flex items-end">
                    <Button size="large" type="primary" className="flex-1">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
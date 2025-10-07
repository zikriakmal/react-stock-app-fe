import { Button, Input } from "antd";
import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoading } from "../../contexts/LoadingContext";
import { postData } from "../../services/api";
import loginFormSchema from "./schema";

const LoginPage = () => {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [])

    const setDataToLocalStorage = (email: string, accesToken: string) => {
        localStorage.setItem("email", email);
        localStorage.setItem("accessToken", accesToken);
    }

    return (
        <div
            style={{ background: "url('/login-page.jpg') no-repeat", backgroundSize: 'cover' }}
            className="flex-col justify-center items-center min-h-dvh flex flex-1 bg-blue-950">
            <Formik
                validationSchema={loginFormSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    showLoading();
                    postData('auth/login', values).then((dt) => {
                        setDataToLocalStorage(dt?.data?.user?.email, dt?.data?.access_token);
                        resetForm();
                        setSubmitting(false);
                        hideLoading();
                        navigate('/dashboard');
                    }).catch((e) => {
                        console.log(e);
                        resetForm();
                        hideLoading();
                        setSubmitting(false);
                    })
                }}
            >
                {({ handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                    <form onSubmit={handleSubmit}  >
                        <div className="flex flex-col gap-4 sm:w-96 h-100 border-2 border-white/20 p-10 rounded-xl shadow-sm bg-white/5 backdrop-blur-sm" >
                            <div>
                                <p className="text-left mb-2 text-white">Email</p>
                                <Input size="large" type="email" placeholder="Email" {...getFieldProps("email")} />
                                {errors.email && touched.email ? <p className="text-red-700 text-sm italic mt-0.5">{errors.email}</p> : null}
                            </div>
                            <div>
                                <p className="text-left mb-2 text-white">Password</p>
                                <Input size="large" type="password" placeholder="Password" {...getFieldProps("password")} />
                                {errors.password && touched.password ? <p className="text-red-700 text-sm italic mt-0.5">{errors.password}</p> : null}
                            </div>
                            <div className="flex-1 flex items-end">
                                <Button className="flex-1" disabled={isSubmitting || !isValid} htmlType="submit" size="large" color="pink" variant="solid">Login</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LoginPage;
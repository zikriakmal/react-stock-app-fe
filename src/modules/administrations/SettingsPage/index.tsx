import { SettingOutlined } from "@ant-design/icons";
import { Button, Input, Progress } from "antd";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import { getMyInfo, type User } from "../../../services/users-service";
import MainLayout from "../../../layouts/MainLayout";
import settingsSchema from "./schema";

const SettingsPage: React.FC<any> = () => {
    const [user, setUser] = useState<User | null>(null);
    const { showLoading, hideLoading } = useLoading();
    const formikRef = useRef(null);

    // State for password strength
    const [strength, setStrength] = useState(0);
    const [status, setStatus] = useState<"exception" | "normal" | "success">("exception");

    const getUser = () => {
        showLoading();
        getMyInfo()
            .then((dt) => {
                setUser(dt?.data);
            })
            .finally(() =>
                setTimeout(() => {
                    hideLoading();
                }, 500)
            );
    };

    useEffect(() => {
        getUser();
    }, []);

    // Evaluate password strength dynamically
    const evaluateStrength = (password: string) => {
        let score = 0;
        if (password.length > 5) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        setStrength(score);

        if (score < 50) setStatus("exception");
        else if (score < 100) setStatus("normal");
        else setStatus("success");
    };

    return (
        <MainLayout>
            <Formik
                innerRef={formikRef}
                validationSchema={settingsSchema}
                enableReinitialize
                initialValues={{
                    email: user?.email || "",
                    name: user?.name || "",
                    oldPassword: "",
                    newPassword: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    showLoading();

                    // Simulate update request
                    setTimeout(() => {
                        console.log("Submitted values:", values);
                        hideLoading();
                        setSubmitting(false);
                    }, 1000);
                }}
            >
                {({
                    handleSubmit,
                    isSubmitting,
                    touched,
                    errors,
                    isValid,
                    getFieldProps,
                    values,
                    handleChange,
                }) => (
                    <form onSubmit={handleSubmit} className="bg-white rounded-sm flex flex-1 flex-row justify-start">
                        <div className="flex flex-col gap-4 lg:w-3/5 p-10">
                            <p className="text-lg font-semibold">
                                <SettingOutlined /> User settings
                            </p>

                            {/* Email */}
                            <div>
                                <p className="text-left mb-2 text-black">Email</p>
                                <Input
                                    size="large"
                                    type="email"
                                    placeholder="Email"
                                    {...getFieldProps("email")}
                                />
                                {errors.email && touched.email ? (
                                    <p className="text-red-400 text-xs italic mt-0.5">
                                        {errors.email}
                                    </p>
                                ) : null}
                            </div>

                            {/* Name */}
                            <div>
                                <p className="text-left mb-2 text-black">Name</p>
                                <Input
                                    size="large"
                                    type="text"
                                    placeholder="Name"
                                    {...getFieldProps("name")}
                                />
                                {errors.name && touched.name ? (
                                    <p className="text-red-400 text-xs italic mt-0.5">
                                        {errors.name}
                                    </p>
                                ) : null}
                            </div>

                            {/* Old Password */}
                            <div>
                                <p className="text-left mb-2 text-black">Old Password</p>
                                <Input.Password
                                    size="large"
                                    placeholder="Enter old password"
                                    {...getFieldProps("oldPassword")}
                                />
                                {errors.oldPassword && touched.oldPassword ? (
                                    <p className="text-red-400 text-xs italic mt-0.5">
                                        {errors.oldPassword}
                                    </p>
                                ) : null}
                            </div>

                            {/* New Password + Strength Indicator */}
                            <div>
                                <p className="text-left mb-2 text-black">New Password</p>
                                <Input.Password
                                    size="large"
                                    placeholder="Enter new password"
                                    {...getFieldProps("newPassword")}
                                    onChange={(e) => {
                                        handleChange(e);
                                        evaluateStrength(e.target.value);
                                    }}
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <p className="text-red-400 text-xs italic mt-0.5">
                                        {errors.newPassword}
                                    </p>
                                ) : null}

                                {values.newPassword && (
                                    <div className="mt-2">
                                        <Progress
                                            percent={strength}
                                            status={status}
                                            showInfo={false}
                                            strokeColor={
                                                strength < 50
                                                    ? "#ff4d4f"
                                                    : strength < 100
                                                        ? "#faad14"
                                                        : "#52c41a"
                                            }
                                        />
                                        <p
                                            className={`text-xs mt-1 ${strength < 50
                                                ? "text-red-500"
                                                : strength < 100
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                                }`}
                                        >
                                            {strength < 50
                                                ? "Weak password"
                                                : strength < 100
                                                    ? "Medium strength"
                                                    : "Strong password"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="flex-1 flex items-end">
                                <Button
                                    loading={isSubmitting}
                                    className="flex-1"
                                    disabled={isSubmitting || !isValid}
                                    htmlType="submit"
                                    size="large"
                                    color="pink"
                                    variant="solid"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </MainLayout>
    );
};

export default SettingsPage;

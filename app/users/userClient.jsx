"use client";

import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";

const UsersClient = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleFinish = async (values) => {
        console.log("Form val: ", values);
        try {
            const payload = {
                ...values,
                role: parseInt(values.role),
            };

            const res = await fetch("http://localhost:4000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Server error:", result);
                return;
            }

            console.log("Success:", result);

            message.success("User berhasil ditambahkan");
            message.error("Gagal menambahkan user");

            setIsModalOpen(false);
            form.resetFields();
            window.location.reload();
        } catch (error) {
            console.log("Submit error : ", error);
        }
    };

    return (
        <>
            {/* button add new user */}
            <div className="flex w-full justify-end mb-3">
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new user
                </Button>
            </div>

            <Modal
                title="Add New User"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleFinish}
                    onFinishFailed={(err) => {
                        console.log("Form failed:", err);
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone_number">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#4E71FF] dark:text-white">
                        <tr>
                            <th className="capitalize px-6 py-3">name</th>
                            <th className="capitalize px-6 py-3">email</th>
                            <th className="capitalize px-6 py-3">role</th>
                            <th className="capitalize px-6 py-3">
                                phone number
                            </th>
                            <th className="capitalize px-6 py-3">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="odd:bg-white odd:dark:bg-[#8DD8FF] even:bg-gray-50 even:dark:bg-[#BBFBFF] text-gray-900"
                            >
                                <th
                                    scope="row"
                                    className="capitalize px-6 py-4 font-medium whitespace-nowrap"
                                >
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {user.role ?? "None"}
                                </td>
                                <td className="px-6 py-4">
                                    {user.phone_number || "Belum Diinput"}
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersClient;

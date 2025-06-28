"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Space,
    Table,
    Form,
    Modal,
    Input,
    message,
    Select,
} from "antd";
import {
    deleteUsers,
    getUsers,
    postUsers,
    putUsers,
} from "../../lib/api/users";
import { getRoles } from "../../lib/api/roles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const UsersClient = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [currentRecord, setCurrentRecord] = useState(null);
    const [roles, setRoles] = useState([]);
    const [dataSource, setDataSource] = useState(
        users.map((item) => ({ ...item, key: item.id }))
    );

    const showModal = () => {
        setIsModalOpen(true);
        setCurrentRecord(null);
        form.resetFields();
        setIsEditing(false);
    };

    const showEditModal = (record) => {
        console.log("isi record", record);
        setIsModalOpen(true);
        setIsEditing(true);
        setCurrentRecord(record);
        form.setFieldsValue(record);
    };
    const handleCancel = () => setIsModalOpen(false);

    const handleAdd = async (values) => {
        console.log("values : ", values);
        try {
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                role_id: values.role_id,
                phone_number: values.phone_number,
            };

            console.log("payload value : ", payload);

            const newUsers = await postUsers(payload);
            message.success("Order added successfully!");

            const updateUsers = await getUsers();
            setDataSource(
                updateUsers.map((item) => ({ ...item, key: item.id }))
            );

            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleEdit = async (values) => {
        try {
            const payload = {
                id: values.id,
                name: values.name,
                email: values.email,
                password: values.password,
                role_id: values.role_id,
                phone_number: values.phone_number,
            };

            console.log("payload value : ", payload);

            const editUsers = await putUsers(payload, values.id);
            message.success("Order editted successfully!");
            const updatedUsers = await getUsers(values);

            setDataSource(
                updatedUsers.map((item) => ({ ...item, key: item.id }))
            );

            form.resetFields();
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentRecord(null);
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleFinish = async (values) => {
        if (isEditing && currentRecord) {
            await handleEdit({ ...currentRecord, ...values });
        } else {
            await handleAdd(values);
        }
    };

    const handleDelete = async (id) => {
        console.log("deleting id : ", id);
        try {
            const result = await deleteUsers(id);
            console.log("result", result);

            message.success("Service deleted seccessfully!");

            const updated = await getUsers();
            setDataSource(updated.map((item) => ({ ...item, key: item.id })));
        } catch (error) {
            console.log("result", result);
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <p className="capitalize">{text}</p>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role_id",
            key: "role_id",
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
            render: (text) => (
                <p className="capitalize">
                    {text == null ? "belum diinput" : text}
                </p>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        color="purple"
                        variant="outlined"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                    >
                        Edit
                    </Button>

                    <Button
                        color="danger"
                        variant="outlined"
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            Modal.confirm({
                                title: "Are you sure want to delete this user(s)?",
                                okText: "Yes",
                                okType: "danger",
                                cancelText: "Cancel",
                                onOk: () => handleDelete(record.id),
                            })
                        }
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await getRoles();
                setRoles(res);
                console.log("res useeffect role: ", res);
            } catch (error) {
                message.error("Failed to load categories");
            }
        };

        fetchRole();
    }, []);

    const onRoleChange = async (value) => {
        const selected = roles.find((role) => role.id === value);
        if (selected) {
            form.setFieldsValue({ note: `You selected ${selected.role}` });
        }
    };

    return (
        <>
            {/* button add new user */}
            <div className="flex w-full justify-between mb-3">
                <h3 className="text-2xl capitalize text-center md:text-start mb-3">
                    users
                </h3>
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new user
                </Button>
            </div>

            <Modal
                title={isEditing ? "Edit User" : "Add New User"}
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
                        rules={[{ type: "email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role_id"
                        rules={[
                            { required: true, message: "Role is required" },
                        ]}
                    >
                        <Select
                            placeholder="Select a role of this user"
                            onChange={onRoleChange}
                            allowClear
                        >
                            {roles.map((role) => (
                                <Select.Option key={role.id} value={role.id}>
                                    {role.id} - {role.role}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone_number">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};

export default UsersClient;

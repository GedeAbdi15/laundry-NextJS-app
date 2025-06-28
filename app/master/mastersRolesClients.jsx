"use client";

import { Button, Space, Table, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import { postRoles, getRoles, deleteRole, putRoles } from "../../lib/api/roles";
import "@ant-design/v5-patch-for-react-19";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MasterRolesClients = ({ roles }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(roles);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    const showModal = () => {
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (record) => {
        setIsEditing(true);
        setCurrentRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };
    const handleCancel = () => setIsModalOpen(false);

    const handleAdd = async (values) => {
        try {
            const newRole = await postRoles(values);
            message.success("Role added successfully!");

            const updatedRoles = await getRoles();
            setDataSource(updatedRoles);

            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleEdit = async (values) => {
        try {
            const editRole = await putRoles(values, values.id);
            message.success("Role editted successfully!");

            const updatedRoles = await getRoles(values);
            setDataSource(
                updatedRoles.map((item) => ({ ...item, key: item.id }))
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
            const result = await deleteRole(id);
            console.log("result", result);

            message.success("Role deleted seccessfully!");

            const updated = await getRoles();
            setDataSource(updated.map((item) => ({ ...item, key: item.id })));
        } catch (error) {
            console.log("result", result);
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Role ID",
            dataIndex: "id",
            key: "id",
        },

        {
            title: "Name",
            dataIndex: "role",
            key: "role",
            render: (text) => <p>{text}</p>,
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
                                title: "Are you sure want to delete this role(s)?",
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

    return (
        <>
            <div className="flex w-full justify-between mb-3 mt-5">
                <h3 className="capitalize mb-3">master role</h3>
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new role
                </Button>
            </div>

            <Modal
                title={isEditing ? "Edit Role" : "Add New Role"}
                open={isModalOpen}
                centered
                onCancel={() => {
                    handleCancel();
                    setIsEditing(false);
                    setCurrentRecord(null);
                    form.resetFields();
                }}
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
                        label="Role"
                        name="role"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                columns={columns}
                dataSource={dataSource.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};

export default MasterRolesClients;

"use client";

import { Button, Space, Table, Form, Modal, Input, message } from "antd";
import { useState } from "react";
import { getServices, postService } from "../../lib/api/service";

const MasterServicesClients = ({ services }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(
        services.map((item) => ({ ...item, key: item.id }))
    );

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleFinish = async (values) => {
        try {
            const newService = await postService(values);
            message.success("Service berhasil ditambahkan");

            const updatedService = await getServices();
            setDataSource(
                updatedService.map((item) => ({ ...item, key: item.id }))
            );

            setDataSource((prev) => [
                ...prev,
                { ...newService, key: Date.now() },
            ]);
            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            message.error(err.message);
        }
    };

    const columns = [
        {
            title: "Service",
            dataIndex: "name",
            key: "name",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Duration (Days)",
            dataIndex: "duration_days",
            key: "duration_days",
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a href="#">Edit </a>
                    <a href="#">Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex w-full justify-end mb-3 mt-5">
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new price
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
                        label="Service"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Duration" name="duration_days">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Unit" name="unit">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <h3 className="capitalize mb-3">master services</h3>
            <Table columns={columns} dataSource={dataSource} />
        </>
    );
};

export default MasterServicesClients;

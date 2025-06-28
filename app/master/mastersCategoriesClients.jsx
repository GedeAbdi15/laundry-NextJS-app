"use client";

import { Button, Space, Table, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import {
    postCategories,
    getCategories,
    deleteCategories,
    putCategories,
} from "../../lib/api/category";
import "@ant-design/v5-patch-for-react-19";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MasterCategoriesClients = ({ category }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(category);
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
            const newCategory = await postCategories(values);
            message.success("Category added successfully!");

            const updatedCategory = await getCategories();
            setDataSource(
                updatedCategory.map((item) => ({ ...item, key: item.id }))
            );

            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleEdit = async (values) => {
        try {
            const editCategory = await putCategories(values, values.id);
            message.success("Category updated successfully!");

            const updatedCategory = await getCategories();
            setDataSource(
                updatedCategory.map((item) => ({ ...item, key: item.id }))
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
            const result = await deleteCategories(id);
            console.log("result", result);

            message.success("Category deleted seccessfully!");

            const updated = await getCategories();
            setDataSource(updated.map((item) => ({ ...item, key: item.id })));
        } catch (error) {
            console.log("result", result);
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Category ID",
            dataIndex: "id",
            key: "id",
        },

        {
            title: "Category Name",
            dataIndex: "category",
            key: "category",
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
                                title: "Are you sure want to delete this category(s)?",
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
            <div className="flex w-full justify-between mt-3 mb-3">
                <h3 className="capitalize mb-3">master categories</h3>
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new category
                </Button>
            </div>

            <Modal
                centered
                title={isEditing ? "Edit Category" : "Add New Category"}
                open={isModalOpen}
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
                        label="Category"
                        name="category"
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

export default MasterCategoriesClients;

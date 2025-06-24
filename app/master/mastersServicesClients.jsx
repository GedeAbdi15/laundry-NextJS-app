"use client";

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
import { useEffect, useState } from "react";
import {
    deleteService,
    getServices,
    postService,
    putService,
} from "../../lib/api/service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getCategories } from "../../lib/api/category";

const MasterServicesClients = ({ services }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(
        services.map((item) => ({ ...item, key: item.id }))
    );
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [categories, setCategories] = useState([]);

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
        // form.setFieldsValue(record);
        form.setFieldsValue({
            id: record.id,
            name: record.name || "",
            category: record.category || undefined,
            type: record.type || undefined,
            duration_days: record.duration_days || 0,
            unit: record.unit || undefined,
            price: record.price || 0,
            description: record.description || "",
        });
    };
    const handleCancel = () => setIsModalOpen(false);

    const handleAdd = async (values) => {
        try {
            const payload = {
                name: values.name,
                category: values.category,
                type: values.type,
                duration_days: parseInt(values.duration_days),
                unit: values.unit,
                price: values.price,
                description: values.description,
            };

            console.log("payload value : ", payload);

            const newService = await postService(payload);
            message.success("Service added successfully!");

            const updatedService = await getServices();
            setDataSource(
                updatedService.map((item) => ({ ...item, key: item.id }))
            );

            // setDataSource((prev) => [
            //     ...prev,
            //     { ...newService, key: Date.now() },
            // ]);
            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            message.error(err.message);
        }
    };

    const handleEdit = async (values) => {
        try {
            const payload = {
                name: values.name,
                category: values.category,
                type: values.type,
                duration_days: parseInt(values.duration_days),
                unit: values.unit,
                price: values.price,
                description: values.description,
            };

            const editRole = await putService(payload, values.id);
            message.success("Service editted successfully!");
            const updatedService = await getServices(values);

            setDataSource(
                updatedService.map((item) => ({ ...item, key: item.id }))
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
            const result = await deleteService(id);
            console.log("result", result);

            message.success("Service deleted seccessfully!");

            const updated = await getServices();
            setDataSource(updated.map((item) => ({ ...item, key: item.id })));
        } catch (error) {
            console.log("result", result);
            message.error(error.message);
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
            title: "Price",
            dataIndex: "price",
            key: "price",
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
                                title: "Are you sure want to delete this service(s)?",
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
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res);
                console.log("res : ", res);
            } catch (error) {
                message.error("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    const onCategoryChange = async (value) => {
        const selected = categories.find((cat) => cat.id === value);
        if (selected) {
            form.setFieldsValue({ note: `You selected ${selected.category}` });
        }
    };

    const onTypeChange = (value) => {};
    const onUnitChange = (value) => {};

    return (
        <>
            <div className="flex w-full justify-between mb-3 mt-5">
                <h3 className="capitalize mb-3">master services</h3>
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    add new service
                </Button>
            </div>

            <Modal
                title={isEditing ? "Edit Service" : "Add New Service"}
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
                        rules={[
                            {
                                required: true,
                                message: "Please input the service name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select
                            placeholder="Select a category of service"
                            onChange={onCategoryChange}
                            allowClear
                        >
                            {categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.id} - {cat.category}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select
                            placeholder="Select a type of service"
                            onChange={onTypeChange}
                            allowClear
                        >
                            <Select.Option value="Express">
                                Express
                            </Select.Option>
                            <Select.Option value="Regular">
                                Regular
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Duration"
                        name="duration_days"
                        rules={[
                            {
                                required: true,
                                message: "Please input duration in day(s)",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Unit" name="unit">
                        <Select
                            placeholder="Select a unit of service"
                            onChange={onUnitChange}
                            allowClear
                        >
                            <Select.Option value="kg">Kg</Select.Option>
                            <Select.Option value="item">Item</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Price" name="price">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Table columns={columns} dataSource={dataSource} />
        </>
    );
};

export default MasterServicesClients;

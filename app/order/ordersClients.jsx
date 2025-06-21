"use client";

import { usePathname } from "next/navigation";
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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import {
    deleteOrders,
    getOrders,
    postOrders,
    putOrders,
} from "../../lib/api/order";
import { getServices } from "../../lib/api/service";
import { getUsers } from "../../lib/api/users";

const getTitlePage = (path) => {
    switch (path) {
        case "/":
            return "Dashboard";
        case "/order":
            return "Order";
        case "/invoice":
            return "Invoice";
        case "/master":
            return "Master";
        case "/users":
            return "Users";
        case "/services":
            return "Services";
        default:
            break;
    }
};

const OrdersClients = ({ orders }) => {
    const pathName = usePathname();
    const title = getTitlePage(pathName);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(
        orders.map((item) => ({ ...item, key: item.id }))
    );
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);

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
    };
    const handleCancel = () => setIsModalOpen(false);

    const handleAdd = async (values) => {
        console.log("values : ", values);
        try {
            const payload = {
                users_id: values.users_id,
                services_id: values.services_id,
                total_weight: values.total_weight,
                total_item: values.total_item,
                total_price: values.total_price,
                status: values.status,
            };

            console.log("payload value : ", payload);

            const newOrders = await postOrders(payload);
            message.success("Order added successfully!");

            const updateOrders = await getOrders();
            setDataSource(
                updateOrders.map((item) => ({ ...item, key: item.id }))
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
                users_id: values.users_id,
                services_id: values.services_id,
                total_weight: values.total_weight,
                total_item: values.total_item,
                total_price: values.total_price,
                status: values.status,
            };

            const editOrder = await putOrders(payload, values.id);
            message.success("Order editted successfully!");
            const updatedOrders = await getOrders(values);

            setDataSource(
                updatedOrders.map((item) => ({ ...item, key: item.id }))
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
            const result = await deleteOrders(id);
            console.log("result", result);

            message.success("Service deleted seccessfully!");

            const updated = await getOrders();
            setDataSource(updated.map((item) => ({ ...item, key: item.id })));
        } catch (error) {
            console.log("result", result);
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Customer",
            dataIndex: "user_name",
            key: "user_name",
            render: (text) => <p className="capitalize">{text}</p>,
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
            render: (text) => (
                <p className="capitalize">
                    {text == null ? "belum diisi" : text}
                </p>
            ),
        },
        {
            title: "Service",
            dataIndex: "service_name",
            key: "service_name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text) => <p className="capitalize">{text}</p>,
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
            title: "Total Weight",
            dataIndex: "total_weight",
            key: "total_weight",
        },
        {
            title: "Total Item",
            dataIndex: "total_item",
            key: "total_item",
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
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => <p className="capitalize">{text}</p>,
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
                                title: "Are you sure want to delete this order(s)?",
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
        const fetchServices = async () => {
            try {
                const res = await getServices();
                setServices(res);
                console.log("res : ", res);
            } catch (error) {
                message.error("Failed to load services");
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                setUsers(res);
                console.log("res users: ", res);
            } catch (error) {
                message.error("Failed to load users");
            }
        };

        fetchUsers();
    }, []);

    const calculateTotalPrice = () => {
        const selectedServiceId = form.getFieldValue("services_id");
        let weight = form.getFieldValue("total_weight");
        const items = form.getFieldValue("total_item");

        const selected = services.find(
            (service) => service.id === selectedServiceId
        );

        if (selected && weight) {
            const calculatedPrice = selected.price * parseFloat(weight);
            form.setFieldsValue({ total_price: calculatedPrice });
        } else if (selected && items) {
            const calculatedPrice = selected.price * parseInt(items);
            form.setFieldsValue({ total_price: calculatedPrice });
        }
    };

    useEffect(() => {
        if (
            isEditing &&
            currentRecord &&
            users.length > 0 &&
            services.length > 0
        ) {
            console.log("debug value useffect edit : ", currentRecord);
            form.setFieldsValue({
                id: currentRecord.id,
                users_id: currentRecord.users_id,
                services_id: currentRecord.services_id,
                total_weight: currentRecord.total_weight,
                total_item: currentRecord.total_item,
                total_price: currentRecord.total_price,
                status: currentRecord.status,
            });
        }
    }, [currentRecord, isEditing, users, services, form]);

    const onServicesChange = () => {
        calculateTotalPrice();
    };

    const onWeightChange = () => {
        calculateTotalPrice();
    };

    const onCustomerChange = async (value) => {
        const selected = users.find((user) => user.id === value);
        if (selected) {
            form.setFieldsValue({ note: `You selected ${selected.users}` });
        }
    };

    const onStatusChange = (value) => {};

    return (
        <>
            <div className="flex w-full justify-between mb-3 mt-5">
                <h3 className="capitalize mb-3">{title}</h3>
                <Button
                    type="primary"
                    className="capitalize"
                    onClick={showModal}
                >
                    create new order
                </Button>
            </div>

            <Modal
                title={isEditing ? "Edit Order" : "Add New Order"}
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
                        label="Customer"
                        name="users_id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a customer"
                            onChange={onCustomerChange}
                            allowClear
                        >
                            {users.map((user) => (
                                <Select.Option
                                    key={user.id}
                                    value={Number(user.id)}
                                >
                                    {user.id} - {user.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Service" name="services_id">
                        <Select
                            placeholder="Select service"
                            onChange={onServicesChange}
                            allowClear
                        >
                            {services.map((service) => (
                                <Select.Option
                                    key={service.id}
                                    value={Number(service.id)}
                                >
                                    {service.id} - {service.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Total Weight" name="total_weight">
                        <Input type="number" onChange={onWeightChange} />
                    </Form.Item>
                    <Form.Item label="Total Item" name="total_item">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Total Price" name="total_price">
                        <Input
                            type="number"
                            onChange={(e) => onWeightChange(e.target.value)}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Select
                            placeholder="Select an order status"
                            onChange={onStatusChange}
                            allowClear
                        >
                            <Select.Option value="on progress">
                                On Progress
                            </Select.Option>
                            <Select.Option value="done">Done</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                className="overflow-x-auto"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};

export default OrdersClients;

"use client";

import { usePathname } from "next/navigation";
import { Table } from "antd";
import { useState } from "react";

const getTitlePage = (path) => {
    switch (path) {
        case "/":
            return "Dashboard";
        case "/billing":
            return "Billing";
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

const ServiceClients = ({ services }) => {
    const pathName = usePathname();
    const title = getTitlePage(pathName);
    const [dataSource, setDataSource] = useState(
        services.map((item) => ({ ...item, key: item.id }))
    );

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
    ];
    
    return (
        <>
            <div className="flex w-full justify-between mb-3 mt-7">
                <h3 className="capitalize mb-3">{title}</h3>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </>
    );
};

export default ServiceClients;

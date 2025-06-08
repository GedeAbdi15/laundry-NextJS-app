"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";

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

const ServiceUI = () => {
    const pathName = usePathname();
    const title = getTitlePage(pathName);

    return (
        <>
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <h1 className="text-2xl capitalize text-center">{title}</h1>
            </main>
        </>
    );
};

export default ServiceUI;

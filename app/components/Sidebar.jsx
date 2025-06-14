"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleEcommerce = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const pathName = usePathname();

    return (
        <>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 pb-2 pt-2"
                aria-label="Sidebar"
            >
                <div className="h-full ml-2 px-3 py-4 overflow-y-auto bg-[#8DD8FF] dark:bg-[#5409DA] rounded-t-2xl rounded-b-2xl shadow-xl">
                    <ul className="space-y-2 font-medium">
                        {/* dashboard */}
                        <li>
                            <Link
                                href="/"
                                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                                    pathName === "/"
                                        ? "dark:bg-white dark:text-[#5409DA]"
                                        : "dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-[#5409DA]"
                                }`}
                            >
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition duration-75 ${
                                        pathName === "/"
                                            ? "dark:text-[#5409DA] "
                                            : "dark:text-white dark:group-hover:text-[#5409DA]"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 ">Dashboard</span>
                            </Link>
                        </li>

                        {/* transaction */}
                        <li>
                            <button
                                type="button"
                                onClick={toggleEcommerce}
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-[#5409DA]"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-white dark:group-hover:text-[#5409DA]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 21"
                                >
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Transaction
                                </span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-300 ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`overflow-hidden transition-all duration-300 ${
                                    isDropdownOpen
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <li>
                                    <Link
                                        href="/order"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-[#5409DA]"
                                    >
                                        Order
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/invoice"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-[#5409DA]"
                                    >
                                        Invoice
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* master */}
                        <li>
                            <Link
                                href="/master"
                                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                                    pathName === "/master"
                                        ? "dark:bg-white dark:text-[#5409DA]"
                                        : "dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-[#5409DA]"
                                }`}
                            >
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition duration-75 ${
                                        pathName === "/master"
                                            ? "dark:text-[#5409DA] "
                                            : "dark:text-white dark:group-hover:text-[#5409DA]"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 18"
                                >
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Master
                                </span>
                            </Link>
                        </li>

                        {/* users */}
                        <li>
                            <Link
                                href="/users"
                                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                                    pathName === "/users"
                                        ? "dark:bg-white dark:text-[#5409DA]"
                                        : "dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-[#5409DA]"
                                }`}
                            >
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition duration-75 ${
                                        pathName === "/users"
                                            ? "dark:text-[#5409DA] "
                                            : "dark:text-white dark:group-hover:text-[#5409DA]"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Users
                                </span>
                            </Link>
                        </li>

                        {/* services */}
                        <li>
                            <Link
                                href="/services"
                                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                                    pathName === "/services"
                                        ? "dark:bg-white dark:text-[#5409DA]"
                                        : "dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-[#5409DA]"
                                }`}
                            >
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition duration-75 ${
                                        pathName === "/services"
                                            ? "dark:text-[#5409DA] "
                                            : "dark:text-white dark:group-hover:text-[#5409DA]"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Services
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

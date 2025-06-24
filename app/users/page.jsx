import { getUsers } from "../../lib/api/users";
import Sidebar from "../components/Sidebar";
import UsersClient from "./userClient";

const Users = async () => {
    const users = await getUsers();

    return (
        <>
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <h1 className="text-2xl capitalize text-center md:text-start mb-3">
                    users
                </h1>
                <UsersClient users={users} />
            </main>
        </>
    );
};

export default Users;

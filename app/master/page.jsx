import Sidebar from "../components/Sidebar";
import MasterRolesClients from "./mastersRolesClients";
import MasterServicesClients from "./mastersServicesClients";
import { getRoles } from "../../lib/api/roles";
import { getServices } from "../../lib/api/service";

const Master = async () => {
    const roles = await getRoles();
    const services = await getServices();

    return (
        <>
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <h1 className="text-2xl capitalize text-center md:text-start mb-3">
                    Master
                </h1>

                <MasterRolesClients roles={roles} />
                <MasterServicesClients services={services} />
            </main>
        </>
    );
};

export default Master;

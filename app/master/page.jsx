import Sidebar from "../components/Sidebar";
import MasterRolesClients from "./mastersRolesClients";
import MasterServicesClients from "./mastersServicesClients";
import MasterCategoriesClients from "./mastersCategoriesClients";
import { getRoles } from "../../lib/api/roles";
import { getServices } from "../../lib/api/service";
import { getCategories } from "../../lib/api/category";

const Master = async () => {
    const roles = await getRoles();
    const services = await getServices();
    const category = await getCategories();

    return (
        <>
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <MasterRolesClients roles={roles} />
                <MasterCategoriesClients category={category} />
                <MasterServicesClients services={services} />
            </main>
        </>
    );
};

export default Master;

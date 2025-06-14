import { getServices } from "../../lib/api/service";
import Sidebar from "../components/Sidebar";
import ServiceClients from "./servicesClients";

export const metadata = {
    title: "Services",
    description: "Services Page",
};

const Services = async () => {
    const services = await getServices();

    return (
        <>
            <Sidebar />
            <main className="p-4 px-8 sm:ml-64">
                <ServiceClients services={services} />
            </main>
        </>
    );
};

export default Services;

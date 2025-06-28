import Sidebar from "../components/Sidebar";
import InvoicesClients from "./invoicesClients";

const Invoice = () => {
    return (
        <>
            <Sidebar />
            <main className="p-4 px-8 sm:ml-64">
                <InvoicesClients />
            </main>
        </>
    );
};

export default Invoice;

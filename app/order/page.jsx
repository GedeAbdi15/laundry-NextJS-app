import { getOrders } from "../../lib/api/order";
import Sidebar from "../components/Sidebar";
import OrdersClients from "./ordersClients";

const Orders = async () => {
    const orders = await getOrders();

    return (
        <>
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <OrdersClients orders={orders} />
            </main>
        </>
    );
};

export default Orders;

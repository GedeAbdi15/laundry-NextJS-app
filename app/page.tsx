import Sidebar from "./components/Sidebar";
import HomePage from "./home/Home";

export default function Home() {
    return (
        <>
            <Sidebar />

            <main className="p-4 sm:ml-64">
                <HomePage />
            </main>
        </>
    );
}

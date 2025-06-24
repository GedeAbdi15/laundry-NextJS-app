"use client";

import Charts from "../components/Charts";

const HomePage = () => {
    return (
        <>
            <h1 className=" text-2xl capitalize text-center">Dashboard</h1>
            <div className="flex justify-between mt-7 w-full px-10">
                <Charts />
                <Charts />
            </div>
        </>
    );
};

export default HomePage;

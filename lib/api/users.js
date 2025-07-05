// lib/api/roles.js
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

export const getUsers = async () => {
    const res = await fetch(`${apiUrl}users`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    console.log(data);
    return data.data.users || [];
};

export const getCustomers = async () => {
    const res = await fetch(`${apiUrl}users/customers`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    console.log("debug data cust: ".data);
    return data.data?.customers || [];
};

export const postUsers = async (payload) => {
    const res = await fetch(`${apiUrl}users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to create role");
    }

    return data;
};

export const putUsers = async (payload, id) => {
    const res = await fetch(`${apiUrl}users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to update role");
    }

    return data;
};

export const deleteUsers = async (id) => {
    const res = await fetch(`${apiUrl}users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to delete role");
    }
    console.log("data : ", data);
    console.log("res : ", res);

    return data;
};

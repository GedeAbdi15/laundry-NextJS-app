// lib/api/roles.js

export const getUsers = async () => {
    const res = await fetch("http://localhost:4000/users", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    console.log(data);
    return data.data.users || [];
};

export const postUsers = async (payload) => {
    const res = await fetch("http://localhost:4000/users", {
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
    const res = await fetch(`http://localhost:4000/users/${id}`, {
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
    const res = await fetch(`http://localhost:4000/users/${id}`, {
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

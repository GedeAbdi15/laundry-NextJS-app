// lib/api/roles.js
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

export const getRoles = async () => {
    const res = await fetch(`${apiUrl}roles`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    return data.data.roles || [];
};

export const postRoles = async (payload) => {
    const res = await fetch(`${apiUrl}roles`, {
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

export const putRoles = async (payload, id) => {
    const res = await fetch(`${apiUrl}roles/${id}`, {
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

export const deleteRole = async (id) => {
    const res = await fetch(`${apiUrl}roles/${id}`, {
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

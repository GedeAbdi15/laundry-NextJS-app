// lib/api/service.js

export const getServices = async () => {
    const res = await fetch("http://localhost:4000/services", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch services");
    }

    const data = await res.json();
    return data.data.services || [];
};

export const postService = async (payload) => {
    const res = await fetch("http://localhost:4000/services", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to create service");
    }

    return data;
};

export const putService = async (payload, id) => {
    const res = await fetch(`http://localhost:4000/services/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to create service");
    }

    return data;
};

export const deleteService = async (id) => {
    const res = await fetch(`http://localhost:4000/services/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to delete service");
    }

    return data;
};

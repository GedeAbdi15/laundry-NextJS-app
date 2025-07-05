// lib/api/service.js
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

export const getServices = async () => {
    const res = await fetch(`${apiUrl}services`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch services");
    }

    const data = await res.json();
    return data.data.services || [];
};

export const postService = async (payload) => {
    const res = await fetch(`${apiUrl}services`, {
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
    const res = await fetch(`${apiUrl}services/${id}`, {
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
    const res = await fetch(`${apiUrl}services/${id}`, {
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

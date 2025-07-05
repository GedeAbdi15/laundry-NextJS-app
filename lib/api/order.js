// lib/api/service.js
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

export const getOrders = async () => {
    const res = await fetch(`${apiUrl}transaction/orders`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return data.data.orders || [];
};

export const postOrders = async (payload) => {
    const res = await fetch(`${apiUrl}transaction/orders`, {
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

export const putOrders = async (payload, id) => {
    const res = await fetch(`${apiUrl}transaction/orders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to update orders");
    }

    return data;
};

export const deleteOrders = async (id) => {
    const res = await fetch(`${apiUrl}transaction/orders/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to delete order");
    }

    return data;
};

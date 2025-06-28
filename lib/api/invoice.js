// lib/api/roles.js

export const getInvoice = async () => {
    const res = await fetch("http://localhost:4000/transaction/invoices", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch roles");
    }

    const data = await res.json();
    return data.data.invoices || [];
};

export const postInvoice = async (payload) => {
    const res = await fetch("http://localhost:4000/transaction/invoices", {
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

export const putInvoice = async (payload, id) => {
    const res = await fetch(
        `http://localhost:4000/transaction/invoices/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to update role");
    }

    return data;
};

export const deleteInvoice = async (id) => {
    const res = await fetch(
        `http://localhost:4000/transaction/invoices/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to delete role");
    }
    console.log("data : ", data);
    console.log("res : ", res);

    return data;
};

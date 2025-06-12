// lib/api/roles.js

export const getCategories = async () => {
    const res = await fetch("http://localhost:4000/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch category");
    }

    const data = await res.json();
    return data.data.category || [];
};

export const postCategories = async (payload) => {
    const res = await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to create category");
    }

    return data;
};

export const putCategories = async (payload, id) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to update category");
    }

    return data;
};

export const deleteCategories = async (id) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Failed to delete category");
    }
    // console.log("data : ", data);
    // console.log("res : ", res);

    return data;
};

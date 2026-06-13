"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/Config/Supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
// import { LuPackagePlus } from "react-icons/lu";

function AdminPanel() {
    const router = useRouter();

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        imgUrl: "",
        description: "",
    });

    const [editId, setEditId] = useState(null);

    // AUTH CHECK
    useEffect(() => {
        const admin = localStorage.getItem("admin");

        if (!admin) {
            router.push("/admin");
        }

        getProducts();
    }, []);

    // GET PRODUCTS
    const getProducts = async () => {
        const { data, error } = await supabase
            .from("Products")
            .select("*");

        if (!error) {
            setProducts(data);
        }
    };

    // ADD PRODUCT
    const addProduct = async () => {

        const { data, error } = await supabase
            .from("Products")
            .insert([formData])
            .select();

        console.log(data);
        console.log(error);

        if (error) {
            alert(error.message);
            return;
        }

        toast.success("Product added successfully");

        getProducts();

        setFormData({
            name: "",
            price: "",
            stock: "",
            imgUrl: "",
            description: "",

        });
    };

    // DELETE PRODUCT
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        await supabase
            .from("Products")
            .delete()
            .eq("id", id);

        toast.success(
            "Product deleted successfully"
        );

        getProducts();

    }

    // EDIT PRODUCT
    const editProduct = (item) => {
        setEditId(item.id);

        setFormData({
            name: item.name,
            price: item.price,
            stock: item.stock,
            imgUrl: item.imgUrl,
            description: item.description,

        });
        toast.success("Product updated");
    };

    // UPDATE PRODUCT
    const updateProduct = async () => {
        await supabase
            .from("Products")
            .update(formData)
            .eq("id", editId);

        setEditId(null);

        setFormData({
            name: "",
            price: "",
            stock: "",
            imgUrl: "",
            description: "",

        });

        getProducts();
    };

    // LOGOUT
   const logout = async () => {

  await supabase.auth.signOut();

  localStorage.removeItem("admin");

  toast.success("Logged out");
  window.location.href = "/admin";
  router.push("/admin");
  

};

    return (
        <div className="min-h-screen bg-[#f6fff0] p-8">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-[#8DC63F]">
                        DVAGO Admin Panel
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your products dynamically
                    </p>
                </div>

         <div className="flex items-center gap-3">

  <button
    onClick={() => router.push("/")}
    className="flex items-center gap-2 rounded-2xl bg-[#8DC63F] px-5 py-3 text-white shadow-lg"
  >
    <FaHome />
    Website
  </button>

  <button
    onClick={logout}
    className="rounded-2xl bg-red-500 px-5 py-3 text-white shadow-lg"
  >
    Logout
  </button>

</div>
            </div>

            {/* Form */}
            <div className="rounded-3xl bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                    {editId ? "Update Product" : "Add New Product"}
                </h2>

                <div className="grid grid-cols-2 gap-6">
                    {/* Product Name */}
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
                    />

                    {/* Price */}
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                        className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
                    />

                    {/* Stock */}
                    <input
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value,
                            })
                        }
                        className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
                    />

                    {/* Image URL */}
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imgUrl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                imgUrl: e.target.value,
                            })
                        }
                        className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#8DC63F]"
                    />
                    <textarea
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                        className="col-span-2 h-32 rounded-2xl border  border-gray-200 px-5 outline-none focus:border-[#8DC63F] p-4"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={editId ? updateProduct : addProduct}
                    className="mt-8 rounded-2xl bg-[#8DC63F] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                    {editId ? "Update Product" : "Add Product"}
                </button>
            </div>

            {/* Product Table */}
            <div className="mt-10 rounded-3xl bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        All Products
                    </h2>

                    <div className="rounded-xl bg-[#8DC63F]/10 px-4 py-2 text-sm font-medium text-[#8DC63F]">
                        Total Products : {products.length}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((v, i) => {
                                return (
                                    <tr
                                        key={`${v.name}-${i}`}
                                        className="rounded-2xl bg-[#f9fff5] shadow-sm"
                                    >
                                        {/* IMAGE */}
                                        <td className="rounded-l-2xl p-4">
                                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-white">
                                                <img
                                                    src={v.imgUrl}
                                                    alt={v.name}
                                                    className="h-20 w-20 object-contain"
                                                />
                                            </div>
                                        </td>

                                        {/* NAME */}
                                        <td className="p-4 text-lg font-medium text-gray-700">
                                            {v.name}
                                        </td>

                                        {/* PRICE */}
                                        <td className="p-4 text-lg font-bold text-[#8DC63F]">
                                            Rs. {v.price}
                                        </td>

                                        {/* STOCK */}
                                        <td className="p-4">
                                            <span className="rounded-xl bg-[#8DC63F]/10 px-4 py-2 text-sm font-medium text-[#8DC63F]">
                                                {v.stock} In Stock
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="rounded-r-2xl p-4">
                                            <div className="flex items-center gap-3">
                                                {/* Edit */}
                                                <button
                                                    onClick={() => editProduct(v)}
                                                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white transition-all duration-300 hover:scale-105"
                                                >
                                                    <IoPencil size={18} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => deleteProduct(v.id)}
                                                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white transition-all duration-300 hover:scale-105"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
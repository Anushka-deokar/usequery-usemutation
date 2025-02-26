import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreateUpdateProduct = () => {
    const queryClient = useQueryClient();

    const [product, setProduct] = useState({
        id: "",
        title: "",
        price: "",
        image: "",
        description: ""
    });

    // Mutation to add a new product (POST)
    const addProductMutation = useMutation({
        mutationFn: async () => {
            const existingProducts = queryClient.getQueryData<any[]>(["products"]) || [];
            const productExists = existingProducts.some(p => p.id === Number(product.id));

            if (productExists) {
                throw new Error("Product ID already exists!");
            }

            if (!product.title || !product.price || !product.image || !product.description) {
                throw new Error("All fields are required!");
            }

            const response = await axios.post("https://fakestoreapi.com/products", {
                id: Number(product.id),
                title: product.title,
                price: Number(product.price),
                image: product.image,
                description: product.description
            });

            return response.data;
        },
        onSuccess: (newProduct) => {
            queryClient.setQueryData(["products"], (oldProducts: any[]) => [...oldProducts, newProduct]);
            alert("Product added successfully!");
        },
        onError: (error: any) => {
            alert(error.message);
        }
    });

    // Mutation to update an existing product (PUT)
    const updateProductMutation = useMutation({
        mutationFn: async () => {
            if (!product.id || !product.title || !product.price || !product.image || !product.description) {
                throw new Error("All fields are required!");
            }

            const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, {
                title: product.title,
                price: Number(product.price),
                image: product.image,
                description: product.description
            });

            return response.data;
        },
        onSuccess: () => {
            alert("Product updated successfully!");

            // queryClient.invalidateQueries(["products"]);

            queryClient.invalidateQueries({ queryKey: ["products"] });

        },
        onError: (error: any) => {
            alert(error.message);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create / Update Product</h2>
            <input type="number" name="id" placeholder="Product ID" value={product.id} onChange={handleChange} />
            <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
            <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} />

            <button onClick={() => addProductMutation.mutate()}>Add Product</button>
            <button onClick={() => updateProductMutation.mutate()}>Update Product</button>
        </div>
    );
};

export default CreateUpdateProduct;

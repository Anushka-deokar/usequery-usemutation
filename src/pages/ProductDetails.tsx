import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../types/types";


const fetchProductDetails = async (id: string): Promise<Product> => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return data;
};

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();


    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => fetchProductDetails(id!),
        enabled: !!id,
    });


    const addToCartMutation = useMutation({
        mutationFn: async (newProduct: Product) => {
            return new Promise<void>((resolve) => {
                const existingCart = queryClient.getQueryData<Product[]>(["cart"]) || [];
                if (!existingCart.some((p) => p.id === newProduct.id)) {
                    queryClient.setQueryData(["cart"], [...existingCart, newProduct]);
                }
                resolve();
            });
        },
        onSuccess: () => alert(" Added to Cart Successfully!"),
    });



    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching product</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>⭐ {product.rating.rate}</strong> ({product.rating.count} reviews)</p>
            <button onClick={() => addToCartMutation.mutate(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;

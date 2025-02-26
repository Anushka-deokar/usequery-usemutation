import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Product } from "../types/types";

const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
};

const Home = () => {
    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message}</p>;

    return (
        <div>
            <h2>Products</h2>
            <div className="products-container">
                {products?.length ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                            <Link to={`/product/${product.id}`}>
                                <button>View Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;

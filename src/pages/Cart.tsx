import { useQueryClient } from "@tanstack/react-query";

const Cart = () => {
    const queryClient = useQueryClient();
    const cartItems = queryClient.getQueryData<any[]>(["cart"]) || [];

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} width="50" />
                            {item.title} - ${item.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;


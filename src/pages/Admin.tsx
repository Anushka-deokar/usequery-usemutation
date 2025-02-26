import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface AdminProps {
    setIsAuthenticated: (auth: boolean) => void;
}

const Admin: React.FC<AdminProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const adminLogin = useMutation({
        mutationFn: async ({ username, password }: { username: string; password: string }) => {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (username === "admin" && password === "admin123") {
                        resolve();
                    } else {
                        reject(new Error("Invalid credentials"));
                    }
                }, 1000);
            });
        },
        onSuccess: () => {
            setIsAuthenticated(true);
            alert("Login Successful!");
            navigate("/admin/products");
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        adminLogin.mutate({ username, password });
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={adminLogin.isPending}>
                    {adminLogin.isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Admin;

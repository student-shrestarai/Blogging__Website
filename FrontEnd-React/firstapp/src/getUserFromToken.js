import { jwtDecode } from "jwt-decode";


// Extracts user data from JWT stored in localStorage
export const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return {
            name: decodedToken.name || "",
            email: decodedToken.sub || decodedToken.email || "",
            role: decodedToken.role || decodedToken.roles || decodedToken.authorities || "ROLE_USER"
        };
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

// Clears token during logout
export const logout = () => {
    localStorage.removeItem("token");
};

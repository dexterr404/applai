import axios from "axios";

export async function googleAuth(token: string) {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`,
            { token }
        );
        return res.data;
    } catch (error) {
        console.log("Error in google authentication", error);
    }
}

export async function getUser(token: string) {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        console.log("Error in fetching user", error);
    }
}
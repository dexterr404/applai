import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { getUser } from "../api/authService";

export function useUser() {
    const token = useToken();

     return useQuery({
        queryKey: ['user', token],
        queryFn: () => getUser(token!),
        enabled: !!token,
        retry: false,
    });
}
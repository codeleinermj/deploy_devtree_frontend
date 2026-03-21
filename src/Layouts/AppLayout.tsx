import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const {data, isLoading, isError } = useQuery ({
        queryFn: getUser,
        queryKey: ["user"],
        retry:1,
        refetchOnWindowFocus: false
    })

    if(isLoading) return (
        <div className="bg-dark-900 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Cargando...</p>
            </div>
        </div>
    )
    if(isError) {
        return <Navigate to={"/auth/login"}/>
    }

    if (data) return <DevTree data={data} />
}
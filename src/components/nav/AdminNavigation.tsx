import { motion } from "framer-motion"
import {useQueryClient} from "@tanstack/react-query"

export default function AdminNavigation() {
  const queryClient = useQueryClient()

  const logout = () =>{
    localStorage.removeItem("AUTH_TOKEN")
    queryClient.invalidateQueries({queryKey: ["user"]})
  }
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-4 py-2 uppercase font-bold text-xs rounded-lg cursor-pointer transition-colors"
      onClick={logout}
    >
      Cerrar Sesión
    </motion.button>
  )
}

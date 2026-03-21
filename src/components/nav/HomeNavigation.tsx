import { motion } from "framer-motion"
import {Link} from "react-router-dom"

export default function HomeNavigation() {
  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          className="text-gray-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 uppercase font-bold text-xs cursor-pointer transition-colors"
          to="/auth/login"
        >
          Iniciar Sesion
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-900 px-4 py-2 uppercase font-black text-xs cursor-pointer rounded-lg"
          to="/auth/register"
        >
          Registrarme
        </Link>
      </motion.div>
    </>
  )
}

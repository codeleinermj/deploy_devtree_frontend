import { motion } from "framer-motion"
import { Outlet} from "react-router-dom"
import {Toaster} from "sonner"
import Logo from "../components/Logo"

export default function AuthLayout() {
  return (
    <>
      <div className="bg-dark-900 min-h-screen relative overflow-hidden">
        {/* Ambient lights */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-lg mx-auto pt-10 px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Logo />
          </motion.div>

          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-right" theme="dark" />
    </>
  )
}

import { motion } from "framer-motion"
import { useLocation} from "react-router-dom"
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {

  const location = useLocation()
  return (
       <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 bg-dark-900/80 backdrop-blur-lg border-b border-white/5 py-5"
        >
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center md:justify-between px-6 lg:px-8">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <Logo />
                    </div>
                    <nav className="md:w-1/3 md:flex md:justify-end gap-3">
                        {location.pathname=== "/" ? <HomeNavigation/>:<AdminNavigation />}
                    </nav>
                </div>
            </motion.header>
  )
}

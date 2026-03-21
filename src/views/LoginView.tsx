import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {toast} from "sonner"
import {isAxiosError} from "axios"
import ErrorMessage from "../components/ErrorMessage"
import type { LoginForm } from "../Types"
import api from "../config/axios"

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
} as const;

const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
} as const;

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues : LoginForm = {
    email: "",
    password: ""
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues : initialValues })

  const handleLogin = async (formData : LoginForm) =>{
     try {
            const {data} = await api.post("/auth/Login",formData)
            localStorage.setItem("AUTH_TOKEN", data)
            navigate("/admin")
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }
  }

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl text-white font-bold"
      >
        Iniciar sesion
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit(handleLogin)}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="glass glow-border px-6 py-10 space-y-8 mt-8"
        noValidate
      >
        <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
          <label htmlFor="email" className="text-lg text-gray-300 font-medium">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </motion.div>

        <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
          <label htmlFor="password" className="text-lg text-gray-300 font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </motion.div>

        <motion.div variants={fieldVariants}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-900 uppercase font-black text-sm rounded-xl cursor-pointer tracking-wider transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            Iniciar Sesión
          </motion.button>
        </motion.div>
      </motion.form>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Link className="text-center text-gray-400 hover:text-cyan-400 text-lg block transition-colors" to="/auth/register">
          ¿No tienes cuenta?, registrate aqui.
        </Link>
      </motion.nav>
    </>
  )
}

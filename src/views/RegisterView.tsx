import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import type {RegisterForm} from "../Types"
import ErrorMessage from "../components/ErrorMessage";
import {toast} from "sonner"
import {isAxiosError} from "axios";
import api from "../config/axios";

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
} as const;

const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
} as const;

export default function RegisterView() {
    const location = useLocation()
    const navigate = useNavigate()
    const initialValues : RegisterForm= {
        name: "",
        email: "",
        handle: location?.state?.handle || "",
        password: "",
        password_confirmation: ""

    }

    const {register,reset,watch,handleSubmit, formState: { errors }} = useForm({defaultValues : initialValues})

    const password = watch("password")

    const handleRegister = async(formData : RegisterForm) =>{
        try {
            const {data} = await api.post("/auth/register",formData)
            toast.success(data)
            reset()
            navigate("/auth/login")
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
                Crear cuenta
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit(handleRegister)}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="glass glow-border px-6 py-10 space-y-8 mt-8"
            >
                <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
                    <label htmlFor="name" className="text-lg text-gray-300 font-medium">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                        {...register("name",{
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </motion.div>

                <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
                    <label htmlFor="email" className="text-lg text-gray-300 font-medium">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                          {...register("email",{
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                             },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </motion.div>

                <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
                    <label htmlFor="handle" className="text-lg text-gray-300 font-medium">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                          {...register("handle",{
                            required: "El handle es obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </motion.div>

                <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
                    <label htmlFor="password" className="text-lg text-gray-300 font-medium">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                          {...register("password",{
                            required: "El password es obligatorio",
                            minLength:{
                                value:8,
                                message: "El password debe ser minino de 8 caracteres."
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </motion.div>

                <motion.div variants={fieldVariants} className="grid grid-cols-1 space-y-2">
                    <label htmlFor="password_confirmation" className="text-lg text-gray-300 font-medium">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                        {...register("password_confirmation",{
                            required: "El password es obligatorio",
                            validate : (value) => value === password || "Los passwords no son iguales"
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </motion.div>

                <motion.div variants={fieldVariants}>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-900 uppercase font-black text-sm rounded-xl cursor-pointer tracking-wider transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    >
                        Crear Cuenta
                    </motion.button>
                </motion.div>
            </motion.form>

            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
            >
                <Link className="text-center text-gray-400 hover:text-cyan-400 text-lg block transition-colors" to="/auth/login">
                    ¿Ya tienes una cuenta? Inicia sesion.
                </Link>
            </motion.nav>
        </>
    )
}

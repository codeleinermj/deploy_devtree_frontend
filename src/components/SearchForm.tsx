import { motion, AnimatePresence } from "framer-motion"
import {useForm} from "react-hook-form"
import slugify from "react-slugify"
import {useMutation} from "@tanstack/react-query"
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues:{
            handle:""
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle,
    })

    const handle = watch("handle")

    const handleSearch = () =>{
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-4">
            <div className="relative flex items-center glass glow-border px-4 py-1 transition-all focus-within:border-cyan-400/40 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                <label
                    htmlFor="handle"
                    className="text-cyan-400 font-mono text-sm"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1 text-white placeholder-gray-500 font-mono"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />
            </div>

            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <AnimatePresence mode="wait">
                {mutation.isPending && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-center"
                    >
                        <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    </motion.div>
                )}

                {mutation.error && (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center text-red-400 font-bold text-sm"
                    >
                        {mutation.error.message}
                    </motion.p>
                )}

                {mutation.data && (
                    <motion.p
                        key="success"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center text-emerald-400 font-bold text-sm"
                    >
                        {mutation.data.message} Ir a{" "}
                        <Link
                            to={"/auth/register"}
                            state={{ handle: slugify(handle) }}
                            className="text-cyan-400 underline hover:text-cyan-300 transition-colors"
                        >
                            Registro
                        </Link>
                    </motion.p>
                )}
            </AnimatePresence>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-900 uppercase font-black text-sm rounded-xl cursor-pointer tracking-wider transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
                Obtener mi DevTree
            </motion.button>
        </form>
    )
}

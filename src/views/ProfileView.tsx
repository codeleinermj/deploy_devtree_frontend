import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useQueryClient , useMutation} from "@tanstack/react-query"
import { toast } from "sonner"
import ErrorMessage from "../components/ErrorMessage"
import { updateProfile, uploadImage } from "../api/DevTreeAPI"
import type { ProfileForm, User } from "../Types"

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
} as const;

const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
} as const;

export default function ProfileView() {

    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(["user"])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues: {
        handle : data.handle,
        description: data.description
    }  })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess: (data : any) => {
           toast.success(data)
           queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })

    const uploadimageMutation = useMutation({
        mutationFn: uploadImage,
        onError:(error) => {
         toast.error(error.message)
        },
        onSuccess: (data) => {
           queryClient.setQueryData(["user"],(prevData : User)=>{
            return {...prevData, image: data}
           })
        }
    })

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files){
            uploadimageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) =>{
        const user: User = queryClient.getQueryData(["user"])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="glass glow-border p-8 space-y-6"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <motion.legend variants={fieldVariants} className="text-2xl text-white text-center font-bold">
                Editar Información
            </motion.legend>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 gap-2">
                <label htmlFor="handle" className="text-gray-300 font-medium">Handle:</label>
                <input
                    type="text"
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", {
                        required:"El nombre es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 gap-2">
                <label htmlFor="description" className="text-gray-300 font-medium">Descripción:</label>
                <textarea
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors min-h-[100px]"
                    placeholder="Tu Descripción"
                     {...register("description", {
                        required:"La descripcion es obligatoria"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 gap-2">
                <label htmlFor="image" className="text-gray-300 font-medium">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-400/10 file:text-cyan-400 hover:file:bg-cyan-400/20 transition-colors"
                    accept="image/*"
                    onChange={handleChange}
                />
            </motion.div>

            <motion.div variants={fieldVariants}>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-900 uppercase font-black text-sm rounded-xl cursor-pointer tracking-wider transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                >
                    Guardar Cambios
                </motion.button>
            </motion.div>
        </motion.form>
    )
}
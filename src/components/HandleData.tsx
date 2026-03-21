import { motion } from "framer-motion"
import type { SocialNetwork, UserHandle } from "../Types"

type HandleDataProps= {
    data: UserHandle
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
} as const;

export default function HandleData({data}: HandleDataProps) {

    const links : SocialNetwork[] = JSON.parse(data.links).filter((link:SocialNetwork) => link.enabled )

    return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-white"
    >
      <motion.p variants={itemVariants} className="text-5xl text-center font-black gradient-text">{data.handle}</motion.p>
      {data.image && (
        <motion.img
          variants={itemVariants}
          src={data.image}
          className="max-w-[250px] mx-auto rounded-xl"
        />
      )}

        <motion.p variants={itemVariants} className="text-lg text-center font-bold text-gray-300">{data.description}</motion.p>
        <div className="mt-10 flex flex-col gap-4">
            {links.length ?
                links.map((link, i) => (
                    <motion.a
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, type: "spring" as const, stiffness: 300, damping: 24 }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.4)" }}
                        className="glass border border-white/10 px-5 py-3 flex items-center gap-5 rounded-xl transition-colors"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img src={`/social/icon_${link.name}.svg`} alt="imagen de red social" className="w-10 brightness-200"/>
                        <p className="text-gray-300 capitalize font-bold">Visita mi: <span className="text-white">{link.name}</span></p>
                        <span className="ml-auto text-gray-600">&#8599;</span>
                     </motion.a>
                ))
            : <p className="text-center text-gray-500">No hay enlaces en este perfil</p>}
        </div>
    </motion.div>
  )
}

import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

const socialIcons = ["facebook", "github", "instagram", "x", "youtube", "tiktok", "twitch", "linkedin"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
} as const;

const floatingIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 0.15,
    scale: 1,
    transition: { delay: 0.8 + i * 0.1, type: "spring" as const, stiffness: 200, damping: 20 },
  }),
};

export default function HomeView() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating social icons background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {socialIcons.map((icon, i) => (
          <motion.img
            key={icon}
            src={`/social/icon_${icon}.svg`}
            alt=""
            custom={i}
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-10 h-10 animate-float"
            style={{
              top: `${15 + (i * 11) % 70}%`,
              left: `${55 + (i * 13) % 40}%`,
              animationDelay: `${i * 0.8}s`,
              filter: "grayscale(1) brightness(2)",
            }}
          />
        ))}
      </motion.div>

      <Header />

      <main className="relative z-10 pt-10 pb-20 min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 glass mb-6">
                  Tu identidad digital
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight"
              >
                Todas tus{" "}
                <span className="gradient-text">Redes Sociales</span>
                <br />
                en un enlace.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl text-gray-400 max-w-lg leading-relaxed"
              >
                Unete, vive, y comparte tus redes sociales al mundo.
                Tiktok, Facebook, Instagram, Youtube, Github y mas.
              </motion.p>

              <motion.div variants={itemVariants}>
                <SearchForm />
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-dark-900"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Miles de creadores ya usan <span className="text-cyan-400 font-semibold">DevTree</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Visual card preview */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
              className="hidden lg:block"
            >
              <div className="glass glow-border p-8 animate-glow">
                {/* Mock profile card */}
                <div className="flex flex-col items-center gap-5 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">@tuusuario</h3>
                    <p className="text-gray-400 text-sm mt-1">Desarrollador & Creador</p>
                  </div>
                </div>
                {/* Mock social links */}
                <div className="space-y-3">
                  {["github", "linkedin", "youtube", "instagram"].map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors"
                    >
                      <img src={`/social/icon_${name}.svg`} alt={name} className="w-5 h-5 brightness-200" />
                      <span className="text-gray-300 text-sm capitalize">{name}</span>
                      <span className="ml-auto text-xs text-gray-600">&#8599;</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

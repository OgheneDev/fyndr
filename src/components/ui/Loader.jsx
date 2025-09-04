import Image from "next/image"
import { motion } from "framer-motion"

export const Loader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Image
            src="/images/logo-removebg-preview.png"
            alt="Company Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </motion.div>
      </motion.div>
      
      <div className="flex justify-center space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
    </div>
  </div>
)
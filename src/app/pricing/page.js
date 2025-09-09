'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Home, Briefcase, Shield, Zap, Heart } from 'lucide-react'
import Navbar from '@/components/general/Navbar'

const PricingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <div>
        <Navbar />
        <div className="min-h-screen pt-12 bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10"></div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Affordable.
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                Transparent.
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Made for You.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-sm text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              At Fyndr, we believe access to trusted services shouldn't come at a high cost. <br />
              That's why our pricing is simple, fair, and designed with your everyday needs in mind.
            </motion.p>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-start md:items-center text-[10px] md:text-[16px] px-6 py-3 rounded-full bg-green-500/20 border border-green-400/30 text-green-300">
              <Heart className="w-5 h-5 mr-2 " />
              We're not just another platform. We're building a system that empowers people.
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Pricing Cards Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employment Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white cursor-pointer rounded-3xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <Briefcase className="w-12 h-12 text-green-500" />
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  100% FREE
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Employment</h3>
              <p className="text-gray-600 mb-6 text-sm">
                We know how tough job hunting is, and how expensive recruiting can be. 
                That's why, for now, all employment services on Fyndr are completely free.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Job Seekers</p>
                    <p className="text-gray-600 text-sm">Create your CV, apply for jobs, and get noticed, at no cost.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Employers</p>
                    <p className="text-gray-600 text-sm">Post jobs, browse CVs, and connect with great talent, free of charge.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-green-800 text-sm font-medium">
                  This is our way of supporting Nigerians in a difficult job market. Now is the time to build.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Real Estate Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white h-full cursor-pointer rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <Home className="w-12 h-12 text-blue-500" />
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ₦500
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Estate</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Finding a home shouldn't break the bank.
              </p>
              
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-2xl font-bold text-blue-600 mb-2">₦500 per request</p>
                <p className="text-gray-700 text-sm">
                  Connect directly with landlords and verified agents.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">No fake listings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">No price padding</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">No stress</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Other Services Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-green-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 cursor-pointer shadow-xl h-full border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <Users className="w-12 h-12 text-purple-500" />
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ₦200
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">All Other Services</h3>
              <p className="text-gray-600 mb-6 text-sm">
                From car hire to cleaning, car parts to car purchases, whatever you need:
              </p>
              
              <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                <p className="text-2xl font-bold text-purple-600 mb-2">₦200 per request</p>
                <p className="text-gray-700 text-sm">
                  Receive multiple verified offers
                </p>
              </div>
              
              <div className="bg-purple-100 rounded-xl p-4">
                <p className="text-purple-800 text-sm font-medium text-center">
                  That's less than your transport fare to search manually.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Why We Charge Section */}
      <motion.div 
        className="bg-gray-900 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-5"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why We Charge
          </motion.h2>
          
          <motion.p 
            className="text-sm text-gray-300 mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our small service fee helps us:
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold">Keep Fyndr secure and scam-free</p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold">Verify merchants and professionals</p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold">Promote your request to the right providers</p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold">Deliver a smooth and helpful experience</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-2xl text-white mb-4 font-bold">This isn't about profit.</p>
            <p className="text-2xl text-green-400 font-bold">It's about purpose.</p>
            <p className="text-sm text-gray-300 mt-6 max-w-3xl mx-auto">
              Fyndr is built to make life easier, business better, and opportunities more <br /> accessible, for everyday Nigerians like you.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-green-500 to-green-600 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join the Movement
          </motion.h2>
          
          <motion.p 
            className="text-xl text-green-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Tired of asking "Do you know anyone who can…?"
          </motion.p>
          
          <motion.p 
            className="text-2xl font-bold text-white mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Now you do. Their name is Fyndr.
          </motion.p>

          <motion.button
            className="bg-white text-green-600 px-10 py-4 rounded-full text-sm cursor-pointer font-bold hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </div>
    </div>
  )
}

export default PricingPage
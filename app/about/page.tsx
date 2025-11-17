"use client";

import { Button, Card, Chip, Kbd } from "@heroui/react";
import { motion, Variants, TargetAndTransition } from "motion/react";

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

const scaleItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

export default function AboutPage() {
  return (
    <>
      <motion.div
        animate="visible"
        className="space-y-8 p-6 max-w-4xl mx-auto"
        initial="hidden"
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            What I Am
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 dark:text-zinc-500 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            &quot;Know thyself.&quot;
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">asdf</div>
      </motion.div>

      <motion.div
        animate="visible"
        className="min-h-screen space-y-8 p-6"
        initial="hidden"
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            What I Use
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            &quot;To do great work, one must first master their tools.&quot;
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <MotionCard
              className="relative flex flex-col justify-between min-h-40"
              transition={{ duration: 0.2 }}
              variants={scaleItemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >
              <img
                alt="iPhone 16 Pro"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                src="./16pro.jpg"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <Card.Header className="z-50 flex flex-row justify-between items-center">
                <Card.Title className="flex text-white text-xl sm:text-2xl font-semibold">
                  iPhone 16 Pro
                </Card.Title>
                <Card.Description className="flex gap-1">
                  <Chip color="success" size="sm" variant="primary">
                    256GB
                  </Chip>
                  <Chip color="warning" size="sm" variant="primary">
                    A18 Pro
                  </Chip>
                </Card.Description>
              </Card.Header>

              <Card.Footer className="z-10">
                <Kbd>
                  <Kbd.Content>¥ 7899</Kbd.Content>
                </Kbd>
              </Card.Footer>
            </MotionCard>

            <MotionCard
              className="gap-4"
              transition={{ duration: 0.2 }}
              variants={scaleItemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >
              <img
                alt="AirPods Pro"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src="./airpods-pro.jpg"
              />
              <Card.Header className="z-50">
                <Card.Title className="text-teal-300 text-xl sm:text-2xl font-semibold">
                  AirPods Pro
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <Card.Description />
              </Card.Content>
              <Card.Footer className="flex items-center gap-3" />
            </MotionCard>

            <MotionCard
              className="gap-4"
              transition={{ duration: 0.2 }}
              variants={scaleItemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >
              <img
                alt="AirPods Pro"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src="./switch.jpg"
              />
              <Card.Header />
              <Card.Content>
                <Card.Title className="text-lg" />
                <Card.Description />
              </Card.Content>
              <Card.Footer className="flex items-center gap-3" />
            </MotionCard>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <MotionCard
              className="relative overflow-hidden min-h-[300px]"
              transition={{ duration: 0.3 }}
              variants={scaleItemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              }}
            >
              <img
                alt="PlayStation 5"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                src="./m1-max.jpg"
              />

              <Card.Header className="space-y-2 p-0">
                <Card.Title className="text-2xl font-bold" />
                <Card.Description className="text-lg opacity-90" />
              </Card.Header>
              <Card.Footer className="flex items-center justify-between ">
                <MotionButton
                  className="bg-white text-black hover:bg-gray-100"
                  size="sm"
                  variant="tertiary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get now
                </MotionButton>
              </Card.Footer>
            </MotionCard>

            <MotionCard
              className="relative flex flex-col justify-between overflow-hidden min-h-[300px]"
              transition={{ duration: 0.3 }}
              variants={scaleItemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              }}
            >
              <img
                alt="AirPods Pro"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src="./ps5.jpg"
              />
              <Card.Header>adsf</Card.Header>
              <Card.Footer className="flex items-center justify-between z-50">
                <div>adf</div>
                <MotionButton
                  size="sm"
                  variant="tertiary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Now
                </MotionButton>
              </Card.Footer>
            </MotionCard>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

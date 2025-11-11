"use client";

import { Avatar, Button, Card, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, Variants, TargetAndTransition } from "motion/react";

// Create motion versions of HeroUI components
const MotionCard = motion(Card);
const MotionButton = motion(Button);

// Animation variants
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
    <motion.div
      animate="visible"
      className="min-h-screen space-y-8 p-6"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="text-center space-y-4" variants={itemVariants}>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          variants={itemVariants}
        >
          What I Use
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
          variants={itemVariants}
        >
          &quot;To do great work, one must first master their tools.&quot;
        </motion.p>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Featured Card - MacBook Pro M1 Max */}
        <MotionCard
          className="flex flex-col sm:flex-row overflow-hidden"
          transition={{ duration: 0.3 }}
          variants={scaleItemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
            <img
              alt="MacBook Pro M1 Max"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <Card.Header className="gap-3 p-0">
              <Card.Title>MacBook Pro 16" M1 Max</Card.Title>
              <Card.Description>
                64GB RAM • 2TB SSD • Ultimate performance for creative work
              </Card.Description>
            </Card.Header>
            <Card.Footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-0">
              <div>
                <span className="text-foreground font-medium">
                  Daily Driver
                </span>
                <span className="text-muted-foreground text-sm block">
                  Since 2021
                </span>
              </div>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Specs
              </MotionButton>
            </Card.Footer>
          </div>
        </MotionCard>

        {/* Cards Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {/* iPhone 16 Pro Card */}
          <MotionCard
            className="relative"
            transition={{ duration: 0.2 }}
            variants={scaleItemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            <Card.Header className="gap-4 pb-4">
              <Icon
                aria-label="iPhone icon"
                className="text-blue-600 text-2xl flex-shrink-0"
                icon="mingcute:iphone-line"
                role="img"
              />
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  MOBILE
                </span>
                <Card.Title className="text-lg">iPhone 16 Pro</Card.Title>
                <Card.Description>
                  Titanium • 256GB • The creative companion
                </Card.Description>
              </div>
            </Card.Header>
            <Card.Footer className="pt-0">
              <Link className="text-sm" href="#" rel="noopener noreferrer">
                Always Connected
                <Link.Icon className="ml-1" />
              </Link>
            </Card.Footer>
          </MotionCard>

          {/* AirPods Pro Card */}
          <MotionCard
            className="gap-4"
            transition={{ duration: 0.2 }}
            variants={scaleItemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            <Card.Header>
              <Avatar className="w-16 h-16 rounded-xl">
                <Avatar.Image
                  alt="AirPods Pro"
                  src="https://images.unsplash.com/photo-1602562780974-fbc1839815db?w=200&h=200&fit=crop"
                />
                <Avatar.Fallback>APP</Avatar.Fallback>
              </Avatar>
            </Card.Header>
            <Card.Content>
              <Card.Title className="text-lg">AirPods Pro</Card.Title>
              <Card.Description>
                ANC • Spatial Audio • Focus mode
              </Card.Description>
            </Card.Content>
            <Card.Footer className="flex items-center gap-3">
              <Avatar className="w-6 h-6">
                <Avatar.Image
                  alt="Apple"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/apple.jpg"
                />
                <Avatar.Fallback>A</Avatar.Fallback>
              </Avatar>
              <span className="text-muted-foreground text-sm">Deep Work</span>
            </Card.Footer>
          </MotionCard>

          {/* Gaming Collection Card */}
          <MotionCard
            className="gap-4"
            transition={{ duration: 0.2 }}
            variants={scaleItemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            <Card.Header>
              <Avatar className="w-16 h-16 rounded-xl">
                <Avatar.Image
                  alt="Gaming Setup"
                  src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop"
                />
                <Avatar.Fallback>PS5</Avatar.Fallback>
              </Avatar>
            </Card.Header>
            <Card.Content>
              <Card.Title className="text-lg">Gaming Setup</Card.Title>
              <Card.Description>
                PS5 • Switch OLED • Weekend Warrior
              </Card.Description>
            </Card.Content>
            <Card.Footer className="flex items-center gap-3">
              <Avatar className="w-6 h-6">
                <Avatar.Image
                  alt="Gaming"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/gaming.jpg"
                />
                <Avatar.Fallback>G</Avatar.Fallback>
              </Avatar>
              <span className="text-muted-foreground text-sm">Relax Time</span>
            </Card.Footer>
          </MotionCard>
        </motion.div>

        {/* Featured Product Cards */}
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
              src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=400&fit=crop"
            />

            <div className="relative z-40 flex flex-col h-full min-h-[300px] justify-between text-white ">
              <Card.Header className="space-y-2 p-0">
                <Card.Title className="text-2xl font-bold">
                  PlayStation 5
                </Card.Title>
                <Card.Description className="text-lg opacity-90">
                  Disc Version • DualSense • 4K Gaming
                </Card.Description>
              </Card.Header>
              <Card.Footer className="flex items-center justify-between ">
                <div>
                  <div className="font-medium text-lg">Weekend Gaming</div>
                  <div className="text-sm opacity-80">
                    Ultimate Entertainment
                  </div>
                </div>
                <MotionButton
                  className="bg-white text-black hover:bg-gray-100"
                  size="sm"
                  variant="tertiary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Library
                </MotionButton>
              </Card.Footer>
            </div>
          </MotionCard>

          {/* Nintendo Switch Card */}
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
              alt="Nintendo Switch OLED"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop"
            />
            <div className="relative z-10 flex flex-col h-full min-h-[300px] justify-end p-6">
              <Card.Footer className="flex items-center justify-between p-0 text-white">
                <div>
                  <div className="font-bold text-xl">Switch OLED</div>
                  <div className="text-sm opacity-90">
                    Hybrid Console • Zelda • Mario Kart
                  </div>
                </div>
                <MotionButton
                  className="bg-white text-black hover:bg-gray-100"
                  size="sm"
                  variant="tertiary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Anywhere
                </MotionButton>
              </Card.Footer>
            </div>
          </MotionCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

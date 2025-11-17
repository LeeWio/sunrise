"use client";

import {
  Button,
  Card,
  Chip,
  Kbd,
  Avatar,
  Tabs,
  Tab,
  Separator
} from "@heroui/react";
import {
  motion,
  Variants,
  TargetAndTransition,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView
} from "motion/react";
import { useRef } from "react";

const MotionCard = motion(Card);
const MotionButton = motion(Button);
const MotionTabs = motion(Tabs);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  } as TargetAndTransition,
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } as TargetAndTransition,
};

function HardwareShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className="py-8 w-full"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Masonry Grid - 手工编排，非对称布局 */}
      <div className="grid grid-cols-12 gap-4 auto-rows-[150px]">
        {/* MacBook Pro */}
        <motion.div
          className="col-span-12 lg:col-span-6 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden"
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
            <img
              src="./m1-max.jpg"
              alt="MacBook Pro"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Title - Top Left */}
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                MacBook Pro 14"
              </h3>
              <p className="text-sm text-white/80 mt-1">Primary Development Machine</p>
            </div>
            
            {/* Bottom Info - Hand-drawn Glass */}
            <div className="absolute bottom-0 left-0 right-0">
              <div 
                className="backdrop-blur-lg bg-white/[0.08] pt-6 pb-4 px-6"
                style={{
                  clipPath: 'path("M 0 25 C 15 18, 25 30, 45 22 C 65 14, 85 28, 105 20 C 125 12, 145 25, 165 18 C 185 22, 205 15, 225 23 C 245 19, 265 26, 285 20 C 305 14, 325 24, 345 17 C 365 22, 385 16, 420 20 L 420 200 L 0 200 Z")'
                }}
              >
                <div className="flex items-center gap-3">
                  <Chip size="sm" variant="secondary">M3 Pro</Chip>
                  <Chip size="sm" variant="secondary">36GB</Chip>
                  <Chip size="sm" variant="secondary">1TB SSD</Chip>
                </div>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* iPhone 16 Pro */}
        <motion.div
          className="col-span-6 lg:col-span-3 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden"
            whileHover={{ y: -8, rotateY: -3 }}
          >
            <img
              src="./16pro.jpg"
              alt="iPhone 16 Pro"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Title - Top */}
            <div className="absolute top-5 left-5">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                iPhone 16 Pro
              </h3>
              <p className="text-xs text-white/70 mt-1">Desert Titanium</p>
            </div>
            
            {/* Bottom Info - Hand-drawn Glass */}
            <div className="absolute bottom-0 left-0 right-0">
              <div 
                className="backdrop-blur-lg bg-white/[0.08] pt-5 pb-3 px-4"
                style={{
                  clipPath: 'path("M 0 22 C 8 15, 18 26, 28 19 C 38 12, 48 23, 58 17 C 68 21, 78 14, 88 19 C 98 16, 108 24, 118 18 C 128 22, 138 15, 160 18 L 160 200 L 0 200 Z")'
                }}
              >
                <Chip size="sm" variant="secondary">A18 Pro</Chip>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* AirPods Pro */}
        <motion.div
          className="col-span-6 lg:col-span-3 row-span-1"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden"
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            <img
              src="./airpods-pro.jpg"
              alt="AirPods Pro"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Title - Top */}
            <h3 className="absolute top-4 left-4 text-lg font-bold text-white drop-shadow-lg">
              AirPods Pro 2
            </h3>
            
            {/* Bottom Info - Hand-drawn Glass */}
            <div className="absolute bottom-0 left-0 right-0">
              <div 
                className="backdrop-blur-lg bg-white/[0.08] pt-4 pb-2 px-4"
                style={{
                  clipPath: 'path("M 0 18 C 6 10, 12 20, 20 14 C 28 18, 36 11, 44 16 C 52 13, 60 19, 68 15 C 76 20, 84 12, 92 17 C 100 14, 108 18, 120 15 L 120 100 L 0 100 Z")'
                }}
              >
                <p className="text-xs text-white/80">Active Noise Cancellation</p>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* Nintendo Switch */}
        <motion.div
          className="col-span-6 lg:col-span-3 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden"
            whileHover={{ y: -8, rotateY: 3 }}
          >
            <img
              src="./switch.jpg"
              alt="Nintendo Switch"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Title - Top */}
            <div className="absolute top-5 left-5">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                Nintendo Switch
              </h3>
              <p className="text-sm text-white/70 mt-1">OLED Model</p>
            </div>
            
            {/* Bottom Info - Hand-drawn Glass */}
            <div className="absolute bottom-0 left-0 right-0">
              <div 
                className="backdrop-blur-lg bg-white/[0.08] pt-5 pb-3 px-4"
                style={{
                  clipPath: 'path("M 0 20 C 9 14, 16 24, 26 17 C 36 21, 46 13, 56 19 C 66 15, 76 22, 86 16 C 96 20, 106 14, 116 18 C 126 16, 136 21, 144 17 L 144 200 L 0 200 Z")'
                }}
              >
                <Chip size="sm" variant="secondary">7 inch OLED</Chip>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* PlayStation 5 */}
        <motion.div
          className="col-span-12 lg:col-span-9 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden"
            whileHover={{ scale: 1.01, rotateY: -2 }}
          >
            <img
              src="./ps5.jpg"
              alt="PlayStation 5"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            
            {/* Title - Top Left */}
            <div className="absolute top-6 left-6">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                PlayStation 5
              </h3>
              <p className="text-base text-white/80 mt-1">Next-Gen Gaming Console</p>
            </div>
            
            {/* Bottom Info - Hand-drawn Glass */}
            <div className="absolute bottom-0 left-0 right-0">
              <div 
                className="backdrop-blur-lg bg-white/[0.08] pt-6 pb-4 px-6"
                style={{
                  clipPath: 'path("M 0 28 C 20 19, 35 32, 55 24 C 75 17, 95 30, 115 22 C 135 26, 155 18, 175 25 C 195 20, 215 28, 235 21 C 255 24, 275 17, 295 23 C 315 19, 335 26, 355 20 C 375 24, 395 18, 415 22 C 435 17, 455 25, 475 19 C 495 23, 515 16, 535 21 C 555 18, 575 24, 595 20 C 615 26, 635 19, 640 22 L 640 200 L 0 200 Z")'
                }}
              >
                <div className="flex flex-wrap gap-3">
                  <Chip size="sm" variant="secondary">Ray Tracing</Chip>
                  <Chip size="sm" variant="secondary">4K 120fps</Chip>
                  <Chip size="sm" variant="secondary">3D Audio</Chip>
                  <Chip size="sm" variant="secondary">DualSense</Chip>
                </div>
              </div>
            </div>
          </MotionCard>
        </motion.div>
      </div>

      {/* 统计信息条 */}
      <motion.div
        className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={fadeInUpVariants}
      >
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-surface/50 border border-border text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            5+
          </div>
          <div className="text-sm text-muted-foreground">核心设备</div>
        </div>
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-surface/50 border border-border text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            24/7
          </div>
          <div className="text-sm text-muted-foreground">全天在线</div>
        </div>
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-surface/50 border border-border text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            98%
          </div>
          <div className="text-sm text-muted-foreground">满意度</div>
        </div>
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-surface/50 border border-border text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            3年+
          </div>
          <div className="text-sm text-muted-foreground">使用年限</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SoftwareShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const softwareCategories = [
    {
      title: "Development",
      icon: "💻",
      tools: [
        { name: "VS Code", description: "Primary code editor with extensive customization" },
        { name: "Cursor", description: "AI-powered development environment" },
        { name: "Figma", description: "UI/UX design and prototyping" },
        { name: "Linear", description: "Project management and issue tracking" }
      ]
    },
    {
      title: "Productivity",
      icon: "⚡",
      tools: [
        { name: "Notion", description: "Knowledge management and documentation" },
        { name: "Arc", description: "Browser for focused productivity" },
        { name: "Raycast", description: "Productivity launcher and automation" },
        { name: "Craft", description: "Note-taking and document creation" }
      ]
    },
    {
      title: "Creative",
      icon: "🎨",
      tools: [
        { name: "Photoshop", description: "Image editing and manipulation" },
        { name: "Final Cut Pro", description: "Video editing and post-production" },
        { name: "Logic Pro", description: "Music production and audio editing" },
        { name: "Motion", description: "Motion graphics and animations" }
      ]
    },
    {
      title: "Communication",
      icon: "💬",
      tools: [
        { name: "Slack", description: "Team collaboration and messaging" },
        { name: "Discord", description: "Community and voice communication" },
        { name: "Zoom", description: "Video conferencing and meetings" },
        { name: "Telegram", description: "Secure messaging and file sharing" }
      ]
    }
  ];

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className="py-12"
      initial="hidden"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {softwareCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className="space-y-4"
            variants={scaleInVariants}
          >
            <motion.div
              className="flex items-center gap-3"
              variants={scaleInVariants}
            >
              <motion.span
                className="text-3xl"
                variants={scaleInVariants}
              >
                {category.icon}
              </motion.span>
              <motion.h3
                className="text-xl font-bold text-foreground"
                variants={scaleInVariants}
              >
                {category.title}
              </motion.h3>
            </motion.div>

            <div className="space-y-3">
              {category.tools.map((tool, toolIndex) => (
                <MotionCard
                  key={tool.name}
                  className="p-4 bg-gradient-to-r from-surface to-surface/50 border-border hover:shadow-lg transition-all duration-300"
                  variants={scaleInVariants}
                  whileHover={{
                    scale: 1.02,
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <Chip
                      color="success"
                      size="sm"
                      variant="secondary"
                    >
                      Active
                    </Chip>
                  </div>
                </MotionCard>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-20 px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50"
          animate={{
            background: [
              "linear-gradient(to bottom right, rgba(var(--heroui-primary-rgb), 0.1), transparent, rgba(var(--heroui-secondary-rgb), 0.1))",
              "linear-gradient(to bottom right, rgba(var(--heroui-secondary-rgb), 0.1), transparent, rgba(var(--heroui-primary-rgb), 0.1))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Chip
              className="mb-4"
              color="success"
              size="lg"
              variant="primary"
            >
              My Digital Arsenal
            </Chip>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            What I Use
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            The tools and technologies that power my daily workflow, from creative development to productive living.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-8"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Chip color="success" variant="primary" size="lg">
              🖥️ Hardware
            </Chip>
            <Chip color="warning" variant="primary" size="lg">
              💻 Software
            </Chip>
            <Chip color="success" variant="primary" size="lg">
              🛠️ Tools
            </Chip>
            <Chip color="warning" variant="primary" size="lg">
              ⚡ Productivity
            </Chip>
          </motion.div>
        </div>
      </motion.section>

      {/* Hardware Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-background to-surface/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-50px" }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={scaleInVariants}
            >
              Hardware Setup
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={scaleInVariants}
              transition={{ delay: 0.1 }}
            >
              The tools and technologies that power my daily workflow, from creative development to productive living.
            </motion.p>
          </motion.div>

          <HardwareShowcase />
        </div>
      </section>

      {/* Software Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-surface/30 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-50px" }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={scaleInVariants}
            >
              Software & Tools
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={scaleInVariants}
              transition={{ delay: 0.1 }}
            >
              The applications and platforms that power my workflow and enhance productivity.
            </motion.p>
          </motion.div>

          <SoftwareShowcase />
        </div>
      </section>

      {/* Footer Section */}
      <motion.footer
        className="py-12 px-6 text-center border-t border-border"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            "The right tools don't just make the work easier—they make it possible."
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button
              variant="primary"
              onPress={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
            <Button
              variant="secondary"
              onPress={() => window.open('https://twitter.com', '_blank')}
            >
              Twitter
            </Button>
            <Button
              variant="secondary"
              onPress={() => window.open('mailto:contact@example.com')}
            >
              Contact
            </Button>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}

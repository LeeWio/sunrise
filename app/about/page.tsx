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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className="py-8 w-full"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Masonry Grid - 手工编排，非对称布局 */}
      <div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
        {/* MacBook Pro - 大型特色卡片 */}
        <motion.div
          className="col-span-12 lg:col-span-7 row-span-3"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
            {/* 图片区域 - 无遮罩，清晰可见 */}
            <div className="h-2/3 overflow-hidden rounded-t-2xl">
              <img
                src="./m1-max.jpg"
                alt="MacBook Pro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* 内容区域 */}
            <div className="h-1/3 p-6 bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      MacBook Pro 14"
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">在线</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    主力开发机。M3 Pro 芯片性能强大，36GB 统一内存让多任务流畅无比。
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Chip size="sm" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  ⚡ M3 Pro
                </Chip>
                <Chip size="sm" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  💾 36GB RAM
                </Chip>
                <Chip size="sm" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                  💽 1TB SSD
                </Chip>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>💻 编程 • 🎨 设计 • 🎬 视频</span>
                <Button size="sm" variant="secondary" className="h-7">
                  查看配置
                </Button>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* iPhone 16 Pro - 竖向卡片 */}
        <motion.div
          className="col-span-6 lg:col-span-5 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
            whileHover={{ y: -8, rotateY: -3 }}
          >
            <div className="h-1/2 overflow-hidden">
              <img
                src="./16pro.jpg"
                alt="iPhone 16 Pro"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="h-1/2 p-5 bg-white dark:bg-slate-900 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    iPhone 16 Pro
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">钛金属边框 • 256GB</p>
                </div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed flex-1">
                A18 Pro 芯片，ProRAW 摄影，120Hz 流畅体验。随身携带的创作工具。
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">芯片</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">A18 Pro</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">屏幕</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">6.3" OLED</div>
                </div>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* AirPods Pro - 小卡片 */}
        <motion.div
          className="col-span-6 lg:col-span-5 row-span-1"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            <div className="h-full flex">
              <div className="w-2/5 overflow-hidden">
                <img
                  src="./airpods-pro.jpg"
                  alt="AirPods Pro"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="w-3/5 p-4 bg-white dark:bg-slate-900 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    AirPods Pro 2
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    自适应降噪，空间音频
                  </p>
                </div>
                <div className="flex gap-2">
                  <Chip size="sm" className="text-xs bg-slate-100 dark:bg-slate-800">
                    🎧 ANC
                  </Chip>
                  <Chip size="sm" className="text-xs bg-slate-100 dark:bg-slate-800">
                    30h
                  </Chip>
                </div>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* Nintendo Switch - 横向卡片 */}
        <motion.div
          className="col-span-6 lg:col-span-4 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
            whileHover={{ y: -8, rotateY: 3 }}
          >
            <div className="h-3/5 overflow-hidden">
              <img
                src="./switch.jpg"
                alt="Nintendo Switch"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="h-2/5 p-5 bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Nintendo Switch
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">OLED Model</p>
                </div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                7英寸 OLED 屏幕，掌机与主机双模式。
              </p>
              
              <div className="flex gap-2">
                <Chip size="sm" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                  🎮 游戏
                </Chip>
                <Chip size="sm" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                  🖥️ 7" OLED
                </Chip>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* PlayStation 5 - 横向大卡片 */}
        <motion.div
          className="col-span-12 lg:col-span-8 row-span-2"
          variants={scaleInVariants}
        >
          <MotionCard
            className="group relative h-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
            whileHover={{ scale: 1.01, rotateY: -2 }}
          >
            <div className="h-full flex flex-col lg:flex-row">
              <div className="lg:w-3/5 h-64 lg:h-full overflow-hidden">
                <img
                  src="./ps5.jpg"
                  alt="PlayStation 5"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="lg:w-2/5 p-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        PlayStation 5
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">次世代游戏主机</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    光线追踪带来真实光影，超快 SSD 几乎零加载，DualSense 手柄震撼反馈。
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                    <div className="text-lg mb-1">✨</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">光线追踪</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30">
                    <div className="text-lg mb-1">⚡</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">4K 120fps</div>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
                    <div className="text-lg mb-1">🎧</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">3D 音效</div>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                    <div className="text-lg mb-1">🎮</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">DualSense</div>
                  </div>
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
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 backdrop-blur-sm text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            5+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">核心设备</div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 backdrop-blur-sm text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
            24/7
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">全天在线</div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 backdrop-blur-sm text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
            98%
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">满意度</div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 backdrop-blur-sm text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">
            3年+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">使用年限</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SoftwareShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            variants={fadeInUpVariants}
          >
            <motion.div
              className="flex items-center gap-3"
              variants={fadeInUpVariants}
            >
              <motion.span
                className="text-3xl"
                variants={fadeInUpVariants}
              >
                {category.icon}
              </motion.span>
              <motion.h3
                className="text-xl font-bold text-foreground"
                variants={fadeInUpVariants}
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
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hardware Setup
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The physical tools that enable my digital creativity and productivity.
            </p>
          </motion.div>

          <HardwareShowcase />
        </div>
      </section>

      {/* Software Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-surface/30 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Software & Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The applications and platforms that power my workflow and enhance productivity.
            </p>
          </motion.div>

          <SoftwareShowcase />
        </div>
      </section>

      {/* Footer Section */}
      <motion.footer
        className="py-12 px-6 text-center border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.p
            className="text-lg text-muted-foreground"
            variants={fadeInUpVariants}
          >
            "The right tools don't just make the work easier—they make it possible."
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            variants={fadeInUpVariants}
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

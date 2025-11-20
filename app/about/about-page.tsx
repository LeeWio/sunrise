import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Code,
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

// --- Types & Interfaces ---

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// --- Content Data ---

const FUN_FACTS = [
  "I once debugged code while skydiving (okay, maybe just in a dream).",
  "I brew my own kombucha and it actually tastes good.",
  "I've visited 12 countries and aim to visit 30 before I turn 40.",
];

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2023 - Present",
    title: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    description:
      "Leading the frontend migration to Next.js and establishing a new design system used by 4 different product teams.",
    type: "work",
  },
  {
    year: "2020 - 2023",
    title: "Full Stack Developer",
    company: "Creative Pulse Agency",
    description:
      "Built interactive marketing experiences for Fortune 500 clients using React, WebGL, and Node.js.",
    type: "work",
  },
  {
    year: "2019",
    title: "BS in Computer Science",
    company: "University of Technology",
    description:
      "Graduated with honors. Specialized in Human-Computer Interaction and Web Technologies.",
    type: "education",
  },
  {
    year: "2017 - 2019",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    description:
      "Started my journey building custom WordPress themes and React dashboards for local businesses.",
    type: "work",
  },
];

const SKILLS = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "GraphQL",
  "Framer Motion",
];

const INTERESTS = [
  "Analog Photography",
  "Hiking",
  "Indie Game Dev",
  "Sci-Fi Novels",
  "Coffee Roasting",
];

const VALUES: ValueItem[] = [
  {
    icon: <Code className="w-6 h-6 text-blue-500" />,
    title: "Clean & Maintainable",
    description:
      "I believe code is read much more often than it is written. Clarity and simplicity are my guiding principles.",
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    title: "User-Centric Design",
    description:
      "Technology should serve people, not the other way around. Accessibility and UX are never afterthoughts.",
  },
  {
    icon: <Heart className="w-6 h-6 text-blue-500" />,
    title: "Continuous Growth",
    description:
      "The tech landscape changes daily. I stay curious, humble, and always ready to learn the next big thing.",
  },
];

// --- Animation Variants ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Main Component ---

const AboutPage: React.FC = () => {
  // -- State --
  const [factIndex, setFactIndex] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // -- Effects --

  // Cycle through fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // -- Handlers --

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.email.trim() || !emailRegex.test(formState.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Animated Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-200/30 to-blue-100/30 rounded-full blur-3xl"
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-24">
        {/* 2. Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            animate="visible"
            className="space-y-6"
            initial="hidden"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
              Available for new opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Hi, I'm Alex. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                I build digital experiences.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              I'm a Full Stack Developer passionate about bridging the gap
              between engineering and design. I craft robust applications that
              feel as good as they look.
            </p>

            {/* Fun Fact Badge */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm max-w-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Fun Fact
              </p>
              <div className="h-12 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={factIndex}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-sm font-medium text-slate-700 italic"
                    exit={{ y: -20, opacity: 0 }}
                    initial={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    "{FUN_FACTS[factIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <SocialButton
                href="https://github.com"
                icon={<Github size={20} />}
                label="GitHub"
              />
              <SocialButton
                href="https://linkedin.com"
                icon={<Linkedin size={20} />}
                label="LinkedIn"
              />
              <SocialButton
                href="https://twitter.com"
                icon={<Twitter size={20} />}
                label="Twitter"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:h-[600px] flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[550px]">
              {/* Decorative border elements */}
              <div className="absolute inset-0 border-2 border-blue-200 rounded-[2rem] translate-x-4 translate-y-4 z-0" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[2rem] -translate-x-2 -translate-y-2 opacity-10 z-0" />

              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-slate-200">
                <Image
                  fill
                  priority
                  alt="Portrait of Alex"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  src="/api/placeholder/600/800" // Replace with actual image path
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Journey Timeline */}
        <SectionWrapper title="My Journey">
          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8 md:pl-12"
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[9px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow-md" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                    {item.year}
                  </span>
                </div>

                <div className="flex items-center text-slate-500 mb-3 text-sm font-medium">
                  {item.type === "work" ? (
                    <Briefcase className="mr-2" size={16} />
                  ) : (
                    <GraduationCap className="mr-2" size={16} />
                  )}
                  {item.company}
                </div>

                <p className="text-slate-600 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* 4. Skills & Interests */}
        <SectionWrapper title="What I Do & Love">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Professional Skills */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="text-blue-500" />
                <h3 className="text-2xl font-bold text-slate-900">
                  Professional Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 font-medium cursor-default hover:border-blue-300 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Personal Interests */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-pink-500" />
                <h3 className="text-2xl font-bold text-slate-900">
                  Personal Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {INTERESTS.map((interest, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-medium cursor-default hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 5. Philosophy / Approach */}
        <SectionWrapper title="My Approach">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            variants={staggerContainer}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>

        {/* 6. Contact Section */}
        <SectionWrapper title="Let's Connect">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Contact Info Text */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Have a project in mind?
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                I'm currently open to new opportunities and collaborations.
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>

              <div className="space-y-4">
                <a
                  className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors group"
                  href="mailto:hello@example.com"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <span className="font-medium">hello@example.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Globe className="text-blue-600" size={20} />
                  </div>
                  <span className="font-medium">Remote / Tokyo, Japan</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
              {submitStatus === "success" ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-slate-600">
                    Thanks for reaching out. I'll be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"} focus:outline-none focus:ring-4 transition-all bg-slate-50`}
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-1" size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"} focus:outline-none focus:ring-4 transition-all bg-slate-50`}
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-1" size={12} />{" "}
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"} focus:outline-none focus:ring-4 transition-all bg-slate-50 resize-none`}
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-1" size={12} />{" "}
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </SectionWrapper>

        <footer className="border-t border-slate-200 pt-8 pb-12 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} Alex Developer. Built with React &
            Tailwind.
          </p>
        </footer>
      </main>
    </div>
  );
};

// --- Sub-Components ---

// Wrapper for Sections to ensure consistent spacing and entry animation
const SectionWrapper: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <motion.section
      className="scroll-mt-20"
      initial="hidden"
      variants={fadeInUp}
      viewport={{ once: true, margin: "-100px" }}
      whileInView="visible"
    >
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          {title}
        </h2>
        <div className="h-px bg-gradient-to-r from-slate-300 to-transparent flex-grow max-w-xs" />
      </div>
      {children}
    </motion.section>
  );
};

// Reusable Social Button
const SocialButton: React.FC<{
  icon: React.ReactNode;
  href: string;
  label: string;
}> = ({ icon, href, label }) => (
  <a
    aria-label={label}
    className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {icon}
  </a>
);

export default AboutPage;

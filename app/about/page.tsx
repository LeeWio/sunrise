"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);
  const techWrapperRef = useRef<HTMLDivElement>(null);
  const techTrackRef = useRef<HTMLDivElement>(null);

  // --- 1. LENIS SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // --- 2. GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // A. HERO ANIMATIONS
      const heroTl = gsap.timeline();

      heroTl
        .to(".hero-poster .reveal-up", {
          y: 0,
          duration: 1.6,
          stagger: 0.1,
          ease: "power4.out",
        })
        .from(
          ".line-h",
          { scaleX: 0, opacity: 0, duration: 1.5, ease: "expo.out" },
          "-=1.4",
        )
        .from(".meta-header, .bottom-bar", { opacity: 0, duration: 1 }, "-=1")
        .from(
          ".narrative-item",
          {
            x: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=1",
        );

      // B. PARALLAX
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");

        gsap.to(el, {
          y: (i, target) => -100 * speed,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
          },
        });
      });

      // C. IDENTITY REVEAL
      gsap.utils.toArray(".reveal-text-scroll").forEach((text: any) => {
        gsap.from(text, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: text, start: "top 85%" },
        });
      });

      // D. APPLE SECTION (BG Color Swap + Animations)
      ScrollTrigger.create({
        trigger: ".apple",
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          gsap.to("body", { backgroundColor: "#ffffff", color: "#000000" });
          gsap.to(".global-guide-line", { backgroundColor: "rgba(0,0,0,0.1)" });
        },
        onLeave: () => {
          gsap.to("body", { backgroundColor: "#050505", color: "#e1e1e1" });
          gsap.to(".global-guide-line", {
            backgroundColor: "rgba(255,255,255,0.15)",
          });
        },
        onEnterBack: () => {
          gsap.to("body", { backgroundColor: "#ffffff", color: "#000000" });
          gsap.to(".global-guide-line", { backgroundColor: "rgba(0,0,0,0.1)" });
        },
        onLeaveBack: () => {
          gsap.to("body", { backgroundColor: "#050505", color: "#e1e1e1" });
          gsap.to(".global-guide-line", {
            backgroundColor: "rgba(255,255,255,0.15)",
          });
        },
      });

      const appleTl = gsap.timeline({
        scrollTrigger: { trigger: ".apple", start: "top 60%" },
      });

      appleTl
        .from(".apple-title-char", {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
        })
        .from(
          ".apple-divider",
          { scaleX: 0, duration: 1, ease: "expo.out" },
          "-=0.5",
        )
        .from(
          ".apple-left-col > *",
          { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        )
        .from(
          ".spec-row",
          { x: 20, opacity: 0, duration: 0.6, stagger: 0.05 },
          "-=0.6",
        );

      // E. GAMING REVEAL
      gsap.utils.toArray(".game-row").forEach((row: any) => {
        gsap.from(row, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });

      // F. TECH HORIZONTAL SCROLL
      if (techTrackRef.current && techWrapperRef.current) {
        const scrollTween = gsap.to(techTrackRef.current, {
          xPercent: -75, // 4 panels -> move 75%
          ease: "none",
          scrollTrigger: {
            trigger: techWrapperRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=3500",
          },
        });

        gsap.utils.toArray(".tech-panel").forEach((panel: any) => {
          gsap.from(
            panel.querySelectorAll(
              ".impact-word, .tech-tag, .function-def, .param-list, .arrow-huge, .hex-stream",
            ),
            {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.05,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
              },
            },
          );
        });
      }

      // G. FOOTER ANIMATION
      const footerTl = gsap.timeline({
        scrollTrigger: { trigger: "footer", start: "top 80%" },
      });

      footerTl
        .from(".footer-cta span", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
        })
        .from(
          ".comm-protocol, .footer-grid",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 },
          "-=0.5",
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const accentColors = {
    ps5: "#2d5af0",
    switch: "#e60012",
    lol: "#c89b3c",
  };

  return (
    <main
      ref={mainRef}
      className="font-sans w-full overflow-x-hidden cursor-crosshair selection:bg-white selection:text-black bg-[#050505] text-[#e1e1e1]"
    >
      {/* Global Guide Line */}
      <div className="global-guide-line fixed top-0 bottom-0 left-1/4 w-px bg-white/15 z-0 opacity-30 pointer-events-none transition-colors duration-500" />

      {/* 1. HERO POSTER */}
      <section className="hero-poster relative w-full h-screen flex flex-col justify-center px-[4vw] overflow-hidden border-b border-[#222]">
        <div className="poster-grid absolute inset-0 pointer-events-none z-10">
          <div className="line-h absolute w-full h-px bg-white/10 top-[15%]" />
          <div className="line-h absolute w-full h-px bg-white/10 bottom-[15%]" />
          <div className="absolute top-0 bottom-0 left-[25vw] w-px bg-white/5 hidden lg:block" />
        </div>

        <div className="meta-header absolute top-[4vh] left-[4vw] right-[4vw] flex justify-between z-10 text-[#666] font-mono text-xs uppercase tracking-widest">
          <div>ID: INTP-A // CAPRICORN</div>
          <div>TOKYO / DIGITAL / 2025</div>
        </div>

        <div
          className="bg-layer-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/2 whitespace-nowrap z-0 pointer-events-none select-none"
          data-speed="0.2"
        >
          LOGIC / VOID
        </div>

        <div className="title-wrapper relative z-10 mix-blend-lighten flex flex-col justify-center h-full pointer-events-none">
          <div className="reveal-wrap overflow-hidden">
            <div className="main-title reveal-up text-[13vw] leading-[0.85] font-black tracking-[-0.04em] uppercase text-white translate-y-[110%]">
              DIGITAL
            </div>
          </div>
          <div className="reveal-wrap overflow-hidden pr-12">
            <div className="main-title reveal-up text-[13vw] leading-[0.85] font-black tracking-[-0.04em] uppercase text-white translate-y-[110%] flex items-baseline">
              ARCHITECT
              <span className="font-serif italic font-normal text-[0.35em] tracking-normal text-[#888] ml-2 transform translate-y-[-1vw]">
                ure.
              </span>
            </div>
          </div>
        </div>

        <div className="hero-narrative absolute left-[4vw] bottom-[20vh] z-10">
          <div className="flex flex-col gap-3 font-mono text-sm tracking-widest text-[#888]">
            <div className="narrative-item flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#33ff00] rounded-full shadow-[0_0_8px_#33ff00]" />
              <span className="text-[#e1e1e1]">THINKING IN SYSTEMS</span>
            </div>
            <div className="narrative-item flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#333] border border-[#666] rounded-full" />
              <span>DREAMING IN CODE</span>
            </div>
            <div className="narrative-item flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#333] border border-[#666] rounded-full" />
              <span>THRIVING IN SILENCE</span>
            </div>
          </div>
        </div>

        <div className="bottom-bar absolute bottom-[4vh] left-[4vw] w-[92vw] flex justify-between items-end z-10 font-mono text-xs uppercase tracking-widest text-[#444]">
          <div className="barcode w-[120px] h-[20px] bg-[repeating-linear-gradient(to_right,#fff_0px,#fff_2px,transparent_2px,transparent_4px,#fff_4px,#fff_5px)] opacity-50" />
          <div>SCROLL TO INITIALIZE ↓</div>
        </div>
      </section>

      {/* 2. IDENTITY (FIXED: Reduced Left Padding) */}
      <section className="identity section relative w-full min-h-screen px-[4vw] flex flex-col border-b border-white/5 justify-center items-start md:pl-[10vw]">
        <div className="mono-tag font-mono text-xs uppercase tracking-widest text-[#666] mb-8">
          // STATUS: SOLITARY
        </div>
        <div className="reveal-wrap overflow-hidden">
          <div className="giant-statement reveal-text-scroll text-[8vw] font-extrabold leading-[0.9] tracking-[-0.03em] mb-8">
            I DON'T DISLIKE
            <br />
            <span className="font-serif italic text-[#888]">PEOPLE.</span>
          </div>
        </div>
        <div className="reveal-wrap overflow-hidden">
          <div className="giant-statement reveal-text-scroll text-[8vw] font-extrabold leading-[0.9] tracking-[-0.03em] mb-8 text-[#888]">
            I JUST PREFER
            <br />
            <span className="text-white">THE ECHO.</span>
          </div>
        </div>
        <p className="max-w-[500px] leading-relaxed text-[#666] mt-8 text-lg">
          INTP personality. Capricorn drive. I build mental castles where logic
          reigns supreme. Chaos is merely uncompiled code.
        </p>
      </section>

      {/* 3. APPLE: THE SYSTEM REPORT */}
      <section className="apple relative w-full min-h-screen px-[4vw] py-[12vh] flex flex-col bg-white text-black overflow-hidden transition-colors duration-500">
        {/* Title */}
        <div className="flex flex-col leading-[0.8] font-black tracking-tighter uppercase mb-16 overflow-hidden pointer-events-none select-none mix-blend-difference text-black">
          <div className="flex">
            {"TOTAL".split("").map((char, i) => (
              <span key={i} className="apple-title-char text-[12vw] block">
                {char}
              </span>
            ))}
          </div>
          <div className="flex">
            {"BUY-IN.".split("").map((char, i) => (
              <span
                key={i}
                className="apple-title-char text-[12vw] block text-[#ccc]"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="apple-divider w-full h-[2px] bg-black origin-left mb-16" />

        {/* Strict Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full border-b border-black pb-20">
          {/* Left: Philosophy */}
          <div className="apple-left-col lg:col-span-5 flex flex-col pr-10 mb-16 lg:mb-0">
            <div className="mono-tag font-mono text-xs font-bold uppercase tracking-widest text-black mb-8">
              [ 001 ] :: PHILOSOPHY
            </div>
            <h2 className="text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-10">
              I don't fix
              <br />
              <span className="relative inline-block text-[#bbb]">
                Windows.
                <span className="absolute left-[-5%] top-[45%] w-[110%] h-[3px] bg-[#ff3b30] -rotate-3" />
              </span>
              <br />
              <span className="font-serif italic font-light">
                I look through them.
              </span>
            </h2>
            <p className="text-lg font-medium leading-relaxed text-[#333] max-w-md border-l-4 border-[#eee] pl-6 mb-12">
              Fragmentation is a bug. Continuity is a feature. I trade
              "openness" for an absolute, friction-free existence.
            </p>
            <div className="mt-auto">
              <div className="border-2 border-black w-fit px-5 py-2 flex items-center gap-4 bg-black text-white">
                <div className="w-2 h-2 bg-[#33ff00] rounded-full animate-pulse shadow-[0_0_10px_#33ff00]" />
                <div className="font-mono text-xs font-bold tracking-widest">
                  MACOS_ONLY // VERIFIED
                </div>
              </div>
            </div>
          </div>

          {/* Right: System Report */}
          <div className="lg:col-span-7 flex flex-col lg:pl-12 lg:border-l lg:border-[#eee]">
            <div className="mono-tag font-mono text-xs font-bold uppercase tracking-widest text-black mb-8">
              [ 002 ] :: SYSTEM_REPORT
            </div>
            <div className="flex flex-col w-full">
              {[
                {
                  label: "WORKSTATION",
                  val: 'MacBook Pro 16"',
                  sub: "M3 Max / 64GB / 2TB",
                },
                {
                  label: "MOBILE",
                  val: "iPhone 15 Pro",
                  sub: "Natural Titanium / 256GB",
                },
                {
                  label: "AUDIO",
                  val: "AirPods Max",
                  sub: "Space Gray / Noise Cancellation",
                },
                {
                  label: "WRIST",
                  val: "Apple Watch Ultra",
                  sub: "Alpine Loop / Orange",
                },
                {
                  label: "TERMINAL",
                  val: "Warp + ZSH",
                  sub: "Oh-My-Zsh / Tmux / Neovim",
                },
                {
                  label: "BROWSER",
                  val: "Arc Browser",
                  sub: "Chromium / Vertical Tabs",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="spec-row group grid grid-cols-1 md:grid-cols-[140px_1fr] items-baseline py-4 border-t border-[#e5e5e5] hover:bg-[#f5f5f7] transition-colors px-2"
                >
                  <div className="font-mono text-[10px] lg:text-xs text-[#888] uppercase tracking-widest font-bold group-hover:text-black transition-colors mb-1 md:mb-0">
                    {item.label}
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <span className="text-lg lg:text-xl font-bold tracking-tight text-black">
                      {item.val}
                    </span>
                    <span className="font-mono text-xs text-[#666] mt-1 md:mt-0 md:ml-4">
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#e5e5e5]" />
            </div>
            <div className="spec-row mt-10 flex items-start gap-5 px-2 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
              <div className="text-4xl leading-none"></div>
              <div>
                <h3 className="font-black text-lg uppercase mb-1">
                  Unix Soul.
                </h3>
                <p className="text-sm text-[#444] max-w-md leading-relaxed">
                  The raw power of the terminal meets the elegance of a gallery.{" "}
                  <br />
                  This is why I stay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GAMING */}
      <section className="gaming relative w-full min-h-screen flex flex-col justify-center px-[4vw] bg-[#050505] text-white overflow-hidden">
        <div className="gaming-header flex justify-between items-end mb-[4vh] border-b border-[#333] pb-5">
          <div className="mono-tag font-mono text-xs uppercase tracking-widest text-white">
            // SELECT_PLAYER_MODE
          </div>
          <div className="mono-tag font-mono text-xs uppercase tracking-widest text-[#666]">
            STATUS: ONLINE
          </div>
        </div>
        <div className="game-list-wrapper flex flex-col w-full">
          {/* PS5 */}
          <div
            className="game-row group relative flex items-center justify-between py-[6vh] border-b border-[#222] transition-all duration-400 cursor-default hover:px-[2vw]"
            style={{ "--hover-color": accentColors.ps5 } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--hover-color)]/10 to-transparent opacity-0 transition-opacity duration-400 z-0 pointer-events-none group-hover:opacity-100" />
            <div className="game-info z-10 relative transition-transform duration-400 group-hover:translate-x-[2vw]">
              <div className="game-title text-[7vw] font-black leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] uppercase transition-all duration-300 group-hover:text-white group-hover:[-webkit-text-stroke:0] group-hover:[text-shadow:0_0_30px_var(--hover-color)]">
                ELDEN RING
              </div>
              <div className="game-detail font-mono text-sm text-[#888] mt-4 flex gap-5 opacity-80">
                <span className="border border-[#333] px-3 py-1 rounded">
                  BUILD: MAGE
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  LVL. 713
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  PLAT: PS5
                </span>
              </div>
            </div>
            <div className="platform-huge font-sans text-[4vw] font-black uppercase text-[#222] transition-all duration-400 z-10 text-right leading-none group-hover:text-[var(--hover-color)] group-hover:scale-105">
              SONY
              <br />
              PS5
            </div>
          </div>
          {/* Switch */}
          <div
            className="game-row group relative flex items-center justify-between py-[6vh] border-b border-[#222] transition-all duration-400 cursor-default hover:px-[2vw]"
            style={
              { "--hover-color": accentColors.switch } as React.CSSProperties
            }
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--hover-color)]/10 to-transparent opacity-0 transition-opacity duration-400 z-0 pointer-events-none group-hover:opacity-100" />
            <div className="game-info z-10 relative transition-transform duration-400 group-hover:translate-x-[2vw]">
              <div className="game-title text-[7vw] font-black leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] uppercase transition-all duration-300 group-hover:text-white group-hover:[-webkit-text-stroke:0] group-hover:[text-shadow:0_0_30px_var(--hover-color)]">
                ZELDA: TOTK
              </div>
              <div className="game-detail font-mono text-sm text-[#888] mt-4 flex gap-5 opacity-80">
                <span className="border border-[#333] px-3 py-1 rounded">
                  ENGINEER
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  MAX BATTERY
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  SWITCH
                </span>
              </div>
            </div>
            <div className="platform-huge font-sans text-[4vw] font-black uppercase text-[#222] transition-all duration-400 z-10 text-right leading-none group-hover:text-[var(--hover-color)] group-hover:scale-105">
              NINTENDO
              <br />
              SWITCH
            </div>
          </div>
          {/* PC */}
          <div
            className="game-row group relative flex items-center justify-between py-[6vh] border-b border-[#222] transition-all duration-400 cursor-default hover:px-[2vw]"
            style={{ "--hover-color": accentColors.lol } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--hover-color)]/10 to-transparent opacity-0 transition-opacity duration-400 z-0 pointer-events-none group-hover:opacity-100" />
            <div className="game-info z-10 relative transition-transform duration-400 group-hover:translate-x-[2vw]">
              <div className="game-title text-[7vw] font-black leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] uppercase transition-all duration-300 group-hover:text-white group-hover:[-webkit-text-stroke:0] group-hover:[text-shadow:0_0_30px_var(--hover-color)]">
                LEAGUE
              </div>
              <div className="game-detail font-mono text-sm text-[#888] mt-4 flex gap-5 opacity-80">
                <span className="border border-[#333] px-3 py-1 rounded">
                  MASTER
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  MID: VIKTOR
                </span>
                <span className="border border-[#333] px-3 py-1 rounded">
                  PC
                </span>
              </div>
            </div>
            <div className="platform-huge font-sans text-[4vw] font-black uppercase text-[#222] transition-all duration-400 z-10 text-right leading-none group-hover:text-[var(--hover-color)] group-hover:scale-105">
              DESKTOP
              <br />
              PC
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECH HORIZONTAL GALLERY */}
      <section
        ref={techWrapperRef}
        className="tech-wrapper relative w-full h-screen overflow-hidden bg-black text-white"
      >
        <div
          ref={techTrackRef}
          className="tech-track flex w-[400%] h-full will-change-transform"
        >
          {/* PANEL 1: LOGIC ENGINE */}
          <div className="tech-panel w-screen h-screen relative flex flex-col justify-center px-[6vw] border-r border-[#222] shrink-0">
            <div className="logic-engine w-full h-full grid grid-cols-[1.5fr_1fr] relative overflow-hidden">
              <div className="logic-input flex flex-col justify-center pl-[6vw] border-r border-[#333] relative">
                <div className="absolute top-[5%] left-[5%] font-mono text-[#333] text-xs">
                  #include &lt;reality.h&gt;
                </div>
                <div className="function-def text-[8vw] font-black leading-none text-white mb-8">
                  <span className="text-[0.4em] block text-[#666] font-normal">
                    // The Mission
                  </span>
                  <span className="text-[#33ff00]">void</span> create
                  <span className="text-[#666]">(</span>
                  <br />
                  &nbsp;&nbsp;Idea <span className="text-[#33ff00]">*v</span>
                  <br />
                  <span className="text-[#666]">)</span> {"{"}
                </div>
                <div className="param-list font-mono text-xl text-[#888] ml-4 border-l-2 border-[#33ff00] pl-8">
                  <span className="block mb-2">
                    <span className="text-[#c678dd]">if</span> (is_abstract(*v)){" "}
                    {"{"}
                  </span>
                  <span className="block mb-2">
                    &nbsp;&nbsp;compile_to_matter(*v);
                  </span>
                  <span className="block mb-2">
                    &nbsp;&nbsp;
                    <span className="text-[#5c6370]">
                      // Making the intangible, real.
                    </span>
                  </span>
                  <span className="block">{"}"}</span>
                </div>
              </div>
              <div className="logic-status flex flex-col justify-between py-[6vh] px-[4vw] bg-white/2 font-mono">
                <div>
                  <div className="text-xs text-[#666] mb-2 uppercase">
                    MEMORY DUMP
                  </div>
                  <div className="hex-stream text-xs text-[#333] break-all leading-relaxed opacity-50 mb-8">
                    0F 2A 4C 99 1B <span className="text-[#33ff00]">FF</span>
                    <br />
                    C3 00 1A 5E 77 82
                    <br />
                    AB CD EF 12 34 56
                    <br />
                    ... STREAMING
                  </div>
                </div>
                <div>
                  <div className="border border-[#444] p-5">
                    <div className="text-xs text-[#666] mb-2 uppercase">
                      CURRENT CONTEXT
                    </div>
                    <div className="text-4xl text-white font-bold leading-none">
                      KERNEL
                      <br />
                      SPACE
                    </div>
                  </div>
                  <div className="border border-[#444] border-t-0 p-5">
                    <div className="text-xs text-[#666] mb-2 uppercase">
                      PROCESS
                    </div>
                    <div className="text-4xl text-[#33ff00] font-bold leading-none">
                      RUNNING
                      <span className="animate-blink inline-block w-[0.6em] h-[1em] bg-[#33ff00] align-middle ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* PANEL 2: HARDWARE */}
          <div className="tech-panel w-screen h-screen relative flex flex-col justify-center px-[6vw] border-r border-[#222] shrink-0">
            <div className="chapter-mark font-mono text-base text-[#444] absolute top-[10vh] left-[6vw] border-b border-[#444] pb-2 w-[200px]">
              02 // THE METAL
            </div>
            <div className="flex flex-col">
              <span className="impact-word text-[13vw] font-black leading-[0.85] uppercase block text-white tracking-tighter">
                DIRECT
              </span>
              <span className="impact-word text-[13vw] font-black leading-[0.85] uppercase block text-transparent [-webkit-text-stroke:2px_white] opacity-50 tracking-tighter">
                CONTROL
              </span>
              <span className="impact-word text-[#33ff00] text-[4vw] tracking-[0.2em] mt-4 font-black uppercase block">
                0ms LATENCY
              </span>
            </div>
            <div className="tag-cluster mt-[4vh] flex gap-6 flex-wrap">
              <div className="tech-tag font-mono text-lg border border-[#33ff00] text-[#33ff00] px-6 py-3 uppercase hover:bg-white/5 transition-colors">
                C / C++
              </div>
              <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                RTOS
              </div>
              <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                KERNEL
              </div>
              <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                SMART_COCKPIT
              </div>
            </div>
          </div>
          {/* PANEL 3: SOFTWARE */}
          <div className="tech-panel w-screen h-screen relative flex flex-col justify-center px-[6vw] border-r border-[#222] shrink-0">
            <div className="chapter-mark font-mono text-base text-[#444] absolute top-[10vh] left-[6vw] border-b border-[#444] pb-2 w-[200px]">
              03 // THE CLOUD
            </div>
            <div>
              <span className="impact-word text-[13vw] font-black leading-[0.85] uppercase block text-white tracking-tighter">
                ROBUST
              </span>
              <span className="font-serif italic text-[#888] text-[6vw]">
                &
              </span>
              <span className="impact-word text-[13vw] font-black leading-[0.85] uppercase block text-transparent [-webkit-text-stroke:2px_white] opacity-50 tracking-tighter">
                FLUID
              </span>
            </div>
            <div className="tag-cluster mt-[4vh] flex gap-6 flex-wrap">
              <div className="tech-tag font-mono text-lg border border-white text-white px-6 py-3 uppercase hover:bg-white/5 transition-colors">
                JAVA SPRING
              </div>
              <div className="tech-tag font-mono text-lg border border-white text-white px-6 py-3 uppercase hover:bg-white/5 transition-colors">
                NEXT.JS
              </div>
              <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                POSTGRESQL
              </div>
              <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                TYPESCRIPT
              </div>
            </div>
          </div>
          {/* PANEL 4: ARSENAL */}
          <div className="tech-panel w-screen h-screen relative flex flex-col justify-center px-[6vw] border-r border-[#222] shrink-0">
            <div className="chapter-mark font-mono text-base text-[#444] absolute top-[10vh] left-[6vw] border-b border-[#444] pb-2 w-[200px]">
              04 // ARSENAL
            </div>
            <div className="grid grid-cols-2 w-full gap-[2vw]">
              <div>
                <div className="mono-tag font-mono text-xs uppercase tracking-widest text-[#666] mb-4">
                  LANGUAGES
                </div>
                <span className="impact-word text-[5vw] font-black leading-[0.85] uppercase block text-white tracking-tighter">
                  JAVA
                </span>
                <span className="impact-word text-[5vw] font-black leading-[0.85] uppercase block text-transparent [-webkit-text-stroke:2px_white] opacity-50 tracking-tighter">
                  C++
                </span>
                <span className="impact-word text-[5vw] font-black leading-[0.85] uppercase block text-transparent [-webkit-text-stroke:2px_white] opacity-50 tracking-tighter">
                  RUST
                </span>
                <span className="impact-word text-[5vw] font-black leading-[0.85] uppercase block text-white tracking-tighter">
                  TS
                </span>
              </div>
              <div className="border-l border-[#333] pl-[4vw] flex flex-col justify-center">
                <div className="mono-tag font-mono text-xs uppercase tracking-widest text-[#666] mb-8">
                  DEPLOYMENT
                </div>
                <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase mb-4 w-fit hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                  DOCKER
                </div>
                <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase mb-4 w-fit hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                  KUBERNETES
                </div>
                <div className="tech-tag font-mono text-lg border border-[#333] text-[#888] px-6 py-3 uppercase mb-4 w-fit hover:border-white hover:text-white hover:bg-white/5 transition-colors">
                  LINUX
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full bg-[#050505] text-white border-t border-[#222] overflow-hidden flex flex-col justify-between pt-[10vh] px-[4vw] pb-[4vh] z-20">
        <div className="footer-cta text-[11vw] font-black leading-[0.85] uppercase tracking-[-0.04em] mb-[5vh] relative z-10 text-white group cursor-pointer">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[2vw] group-hover:text-[#33ff00]">
            INITIATE
          </span>
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-[#333] text-transparent [-webkit-text-stroke:2px_white] group-hover:-translate-x-[2vw]">
            UPLINK
          </span>
        </div>
        <div className="comm-protocol font-mono text-base text-[#666] max-w-[400px] mb-[8vh] border-l border-[#333] pl-5">
          <div className="text-[#33ff00] mb-[10px]">// PROTOCOL: ASYNC</div>
          <p>
            Voice calls are interrupts. I prefer data packets.
            <br />
            Drop a message. I will process it in the next cycle.
          </p>
        </div>
        <div className="footer-grid grid grid-cols-3 border-t border-[#222] pt-8">
          <div>
            <div className="font-mono text-xs text-[#444] mb-6 uppercase">
              Connect
            </div>
            <div className="flex flex-col gap-2">
              {["GitHub", "Twitter / X", "LinkedIn"].map((link) => (
                <a
                  key={link}
                  className="block font-sans text-xl text-[#e1e1e1] no-underline relative w-fit transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#33ff00] after:transition-all after:duration-300 hover:after:w-full"
                  href="#"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-[#444] mb-6 uppercase">
              Transmission
            </div>
            <div className="flex flex-col gap-2">
              <a
                className="block font-sans text-xl text-[#e1e1e1] no-underline relative w-fit transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#33ff00] after:transition-all after:duration-300 hover:after:w-full"
                href="mailto:hello@architect.dev"
              >
                hello@architect.dev
              </a>
              <span className="font-mono text-sm text-[#444] mt-1 block">
                PGP: 0x4A2B...
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-[#444] mb-6 uppercase">
              Location
            </div>
            <div className="font-mono text-[#888]">
              TOKYO, JP
              <br />
              35.6762° N<br />
              139.6503° E
            </div>
          </div>
        </div>
        <div className="copyright-bar flex justify-between items-end mt-[10vh] font-mono text-xs text-[#444]">
          <div>
            Designed by INT.P
            <br />
            System Status: <span className="text-[#33ff00]">OPERATIONAL</span>
          </div>
          <div>
            &copy; 2025 The Architect.{" "}
            <span className="animate-blink inline-block w-2 h-3.5 bg-[#33ff00]" />
          </div>
        </div>
      </footer>

      {/* Custom Blink Animation */}
      <style global jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </main>
  );
}

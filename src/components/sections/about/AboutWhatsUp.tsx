import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { scrollRange, useImageReady, useKitMotion } from "@/components/kit/kitMotion";
import NudgeFrame from "@/components/kit/NudgeFrame";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type InlineImage = { src: string; alt?: string };
type Polaroid = { imageSrc: string; imageAlt?: string; caption?: string };

type AboutWhatsUpProps = {
  note?: string;
  label?: string;
  title?: string;
  inlineImages?: InlineImage[];
  items?: Polaroid[];
  skills?: string[];
  ariaLabel?: string;
  className?: string;
};

type Token = { kind: "word"; text: string; spaced: boolean } | { kind: "image"; index: number; spaced: boolean };

const tokenize = (title: string): Token[] => {
  const tokens: Token[] = [];
  for (const match of title.matchAll(/\{(\d+)\}|\s+|[^\s{]+|\{/g)) {
    const value = match[0];
    if (/^\s+$/.test(value)) {
      const last = tokens[tokens.length - 1];
      if (last) last.spaced = true;
    } else if (match[1] !== undefined) {
      tokens.push({ kind: "image", index: Number(match[1]), spaced: false });
    } else {
      tokens.push({ kind: "word", text: value, spaced: false });
    }
  }
  return tokens;
};

const BLOCKS = [
  "bg-secondary text-secondary-foreground",
  "bg-[var(--tint-1)] text-secondary-foreground",
  "bg-[var(--tint-3)] text-secondary-foreground",
  "bg-accent text-accent-foreground",
];

const Glyph = ({ index }: { index: number }) => {
  const kind = index % 4;
  if (kind === 0)
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-[58%] fill-current">
        <rect x="16" y="2" width="8" height="8" transform="rotate(45 20 6)" />
        <rect x="16" y="30" width="8" height="8" transform="rotate(45 20 34)" />
        <rect x="2" y="16" width="8" height="8" transform="rotate(45 6 20)" />
        <rect x="30" y="16" width="8" height="8" transform="rotate(45 34 20)" />
      </svg>
    );
  if (kind === 1)
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-[62%] fill-current">
        <path d="M20 0 L23 14 L20 20 L17 14 Z M20 40 L17 26 L20 20 L23 26 Z M0 20 L14 17 L20 20 L14 23 Z M40 20 L26 23 L20 20 L26 17 Z" />
        <circle cx="20" cy="20" r="8" />
      </svg>
    );
  if (kind === 2)
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-[62%] fill-current">
        <path d="M2 20 C 10 8, 30 8, 38 20 C 30 32, 10 32, 2 20 Z M20 12 A 8 8 0 1 0 20 28 A 8 8 0 1 0 20 12 Z" fillRule="evenodd" />
        <circle cx="20" cy="20" r="3.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-[62%] fill-current">
      <circle cx="9" cy="9" r="4" />
      <circle cx="30" cy="12" r="2.5" />
      <circle cx="12" cy="30" r="2.5" />
      <circle cx="31" cy="31" r="4" />
      <circle cx="20" cy="20" r="1.75" />
    </svg>
  );
};

const PolaroidCard = ({ variants, children }: { variants: Variants; children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useImageReady(ref, inView);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView && ready ? "shown" : "hidden"} variants={variants} className="flex flex-col bg-background p-[0.5rem] pb-0 shadow-lg">
      {children}
    </motion.div>
  );
};

const AboutWhatsUp = ({
  note = "about us!",
  label = "what's up",
  title = "We're Mackcode {0} a web design agency that gets excited {1} about making high-performing websites simple {2}.",
  inlineImages = [
    { src: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200", alt: "Designer at a laptop" },
    { src: "https://images.pexels.com/photos/10202668/pexels-photo-10202668.jpeg?auto=compress&cs=tinysrgb&w=200", alt: "Colour swatches" },
    { src: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=200", alt: "Brand sketches" },
  ],
  items = [
    { imageSrc: "https://images.pexels.com/photos/15780884/pexels-photo-15780884.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "since 2016" },
    { imageSrc: "https://images.pexels.com/photos/9218551/pexels-photo-9218551.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "our studio" },
  ],
  skills = ["Brand Identity", "Product Design", "Prototyping", "Motion Design"],
  ariaLabel,
  className,
}: AboutWhatsUpProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { ease, base } = useKitMotion();
  const { scrollYProgress: arrive } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const { scrollYProgress: pass } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const draw = useTransform(arrive, scrollRange(0.15, 0.85), [0, 1]);
  const slowY = useTransform(pass, [0, 1], [50, -50]);
  const fastY = useTransform(pass, [0, 1], [110, -110]);
  const tokens = tokenize(title);
  const columns = [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)];
  const pop = (rest: number, index: number) => ({
    hidden: { scale: 0.6, rotate: rest + (rest < 0 ? -8 : 8), opacity: 0 },
    shown: {
      scale: 1,
      rotate: rest,
      opacity: 1,
      transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 17, delay: index * 0.06 },
    },
  });

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? label ?? "About"}
      className={cn(
        "relative z-10 flex min-h-svh flex-col overflow-x-clip bg-background bg-[linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[length:6.25rem_6.25rem] bg-[position:center_top] pb-[var(--section-space)] text-foreground",
        className,
      )}
    >
      <svg viewBox="0 0 1440 145" preserveAspectRatio="none" aria-hidden="true" className="h-[clamp(3rem,10vw,9rem)] w-full overflow-visible" fill="none">
        <motion.path
          d="M0 135 C 260 95, 480 40, 760 14 C 960 -2, 1200 8, 1440 52"
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : draw }}
        />
      </svg>

      <div className="mx-auto flex w-[var(--container)] flex-col items-center gap-[clamp(2rem,4vw,3.5rem)]">
        {note && (
          <motion.p
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: base, ease }}
            className="self-start pl-[clamp(0rem,8vw,8rem)] font-[family-name:var(--font-script,var(--font-heading))] text-[length:var(--text-h3)] leading-[1.1] rotate-[8deg]"
          >
            {note}
          </motion.p>
        )}
        {label && (
          <NudgeFrame tone="foreground">
            <p className="px-[0.5rem] py-[0.25rem] text-[length:var(--text-h3)] font-medium leading-[1.2] tracking-[-0.03em] whitespace-nowrap">{label}</p>
          </NudgeFrame>
        )}
      </div>

      <div className="relative mt-[clamp(2rem,4vw,3.5rem)] flex flex-col items-center gap-[clamp(2.5rem,6vw,4rem)]">
        <motion.h2
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="relative z-[1] mx-auto w-[var(--container)] max-w-[24ch] text-center text-[length:var(--text-h2)] font-medium leading-[1.1] tracking-[-0.03em] text-balance [font-family:var(--font-body)] lg:max-w-[min(24ch,calc(100vw-2*clamp(9rem,17vw,16rem)))]"
        >
          <div className="sr-only">{title.replace(/\s*\{\d+\}/g, "")}</div>
          <div aria-hidden="true">
          {tokens.map((token, index) => {
            const gap = token.spaced ? "mr-[0.25em]" : "";
            if (token.kind === "image") {
              const image = inlineImages[token.index];
              if (!image) return null;
              return (
                <motion.div key={`i-${index}`} variants={pop(index % 2 ? 6 : -6, index * 0.4)} className={`inline-block size-[0.85em] align-[-0.08em] ${gap}`}>
                  <Media src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" className="size-full object-cover" />
                </motion.div>
              );
            }
            return (
              <div key={`w-${index}`} className={`inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom ${gap}`}>
                <motion.div
                  variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
                  transition={reduce ? { duration: 0 } : { duration: base, ease, delay: 0.05 + index * 0.025 }}
                >
                  {token.text}
                </motion.div>
              </div>
            );
          })}
          </div>
        </motion.h2>

        {items.length > 0 && (
          <div className="flex w-full justify-center gap-[clamp(0.5rem,3vw,2rem)] px-[var(--gutter)] lg:pointer-events-none lg:absolute lg:inset-0 lg:justify-between lg:px-[clamp(0.5rem,2vw,2.5rem)]">
            {columns.map((column, side) =>
              column.length === 0 ? null : (
                <motion.div
                  key={side}
                  style={{ y: reduce ? 0 : side === 0 ? slowY : fastY }}
                  className="flex w-[min(46%,13rem)] flex-col gap-[clamp(1.5rem,3vw,3rem)] will-change-transform lg:pointer-events-auto lg:w-[clamp(8rem,13vw,12.5rem)] lg:justify-center"
                >
                  {column.map((item, index) => (
                    <PolaroidCard key={`${item.imageSrc}-${index}`} variants={pop(side === 0 ? -8 : 8, index + side)}>
                      <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.caption ?? ""} strength={0.12} className="aspect-square rounded-none" />
                      <p className="py-[0.375rem] text-center font-[family-name:var(--font-script,var(--font-heading))] text-[length:var(--text-h3)] leading-[1.1]">{item.caption}</p>
                    </PolaroidCard>
                  ))}
                </motion.div>
              ),
            )}
          </div>
        )}
      </div>

      {skills.length > 0 && (
        <motion.ul
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mx-auto mt-[clamp(3rem,7vw,6rem)] flex w-[var(--container)] flex-col items-center gap-[0.5rem] lg:max-w-[min(var(--container),62rem)] lg:flex-row lg:flex-wrap lg:justify-center"
        >
          {skills.map((skill, index) => {
            const block = BLOCKS[index % BLOCKS.length];
            return (
              <motion.li key={`${skill}-${index}`} variants={pop(0, index)} className="flex max-w-full gap-[0.5rem]">
                <p className={`min-w-0 px-[1rem] py-[0.5rem] text-[length:var(--text-h3)] font-medium leading-[1.2] tracking-[-0.03em] [overflow-wrap:anywhere] lg:whitespace-nowrap ${block}`}>{skill}</p>
                <div aria-hidden="true" className={`flex size-[calc(var(--text-h3)*1.2+1rem)] shrink-0 items-center justify-center ${block} text-foreground`}>
                  <Glyph index={index} />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </section>
  );
};

export default AboutWhatsUp;

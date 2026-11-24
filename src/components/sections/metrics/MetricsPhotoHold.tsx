import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCoverNext } from "@/components/kit/sectionNeighbour";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import NickhoOdometer from "@/components/kit/NickhoOdometer";
import NudgeHeader from "@/components/kit/NudgeHeader";
import NudgeFrame from "@/components/kit/NudgeFrame";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Metric = { value: number; prefix?: string; suffix?: string; label: string };

type MetricsPhotoHoldProps = {
  note?: string;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  items?: Metric[];
  ariaLabel?: string;
  className?: string;
};

const BLOCKS = [
  "bg-secondary text-secondary-foreground",
  "bg-[var(--tint-1)] text-secondary-foreground",
  "bg-[var(--tint-3)] text-secondary-foreground",
  "bg-accent text-accent-foreground",
];

const TILTS = [-2, 1.5, -1, 2];

const defaults: Metric[] = [
  { value: 140, suffix: "+", label: "Products shipped" },
  { value: 12, label: "Years in practice" },
  { value: 92, suffix: "%", label: "Clients who return" },
  { value: 31, label: "Design systems built" },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const MetricsPhotoHold = ({
  note = "by the numbers",
  title = "Made by hand",
  imageSrc = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "",
  items = defaults,
  ariaLabel,
  className,
}: MetricsPhotoHoldProps) => {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useCoverNext(ref);
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const play = useInView(listRef, { once: true, amount: 0.3 });
  const { scrollYProgress: hold } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const holdY = useTransform(hold, (p) => `${clamp01(p) * 6}%`);
  const shade = useTransform(hold, (p) => clamp01(p) * 0.45);
  const wide = items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section
      ref={ref}
      data-scene
      aria-label={ariaLabel ?? title ?? "Key figures"}
      className={cn(live ? "relative -mb-[100svh] h-[200svh]" : "relative h-svh", "text-white", className)}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-deep">
        <motion.div style={live ? { y: holdY } : undefined} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
          <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.25} className="absolute inset-0 aspect-auto h-full rounded-none" />
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/40" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-[clamp(0.75rem,2vw,1.5rem)]">
          <NudgeFrame tone="background" className="size-full" />
        </div>

        <div className="absolute inset-0 mx-auto flex w-[var(--container)] flex-col justify-between gap-[2rem] pb-[clamp(2rem,7svh,4.5rem)] pt-[clamp(5.5rem,14svh,8rem)]">
          <NudgeHeader note={note} title={title} align="left" />

          <ul ref={listRef} className={cn("grid grid-cols-2 gap-[0.75rem] lg:gap-[1rem]", wide)}>
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={live ? { scale: 0.6, rotate: TILTS[index % 4] + 8, opacity: 0 } : false}
                animate={play || reduce ? { scale: 1, rotate: TILTS[index % 4], opacity: 1 } : undefined}
                transition={live ? { type: "spring", stiffness: 440, damping: 17, delay: index * 0.06 } : { duration: 0 }}
                className={cn("flex min-w-0 flex-col gap-[0.5rem] px-[clamp(0.875rem,1.6vw,1.25rem)] py-[clamp(0.875rem,1.6vw,1.25rem)] [container-type:inline-size]", BLOCKS[index % 4])}
              >
                <NickhoOdometer
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  play={play || reduce}
                  duration={1.2}
                  delay={0.2 + index * 0.08}
                  className="font-mono text-[length:min(var(--text-h2),22cqi)] leading-none tracking-[-0.03em]"
                />
                <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.25] tracking-[var(--label-tracking)] text-balance">{item.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {live && <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[5] bg-black" />}
      </div>
    </section>
  );
};

export default MetricsPhotoHold;

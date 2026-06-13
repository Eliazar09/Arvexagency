"use client";
import React from "react";
import { motion } from "motion/react";
import type { Testimonial } from "@/content/testimonials";

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 border border-white/[0.07] bg-ink-2/40 max-w-xs w-full flex flex-col gap-4"
              >
                {/* Resultado em destaque */}
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1 border self-start"
                  style={{ borderColor: `${t.color}30`, background: `${t.color}0a` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.16em]"
                    style={{ color: t.color }}
                  >
                    {t.result}
                  </span>
                </div>

                {/* Texto */}
                <p className="font-sans text-sm text-paper-dim leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Rating — traços */}
                <div className="flex gap-1.5" aria-label={`Avaliação: ${t.rating} de 5`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="block h-0.5 w-5"
                      style={{ background: idx < t.rating ? t.color : 'rgb(255 255 255 / 0.08)' }}
                    />
                  ))}
                </div>

                {/* Autor */}
                <div className="flex items-center gap-3 border-t border-white/[0.07] pt-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold"
                    style={{
                      background: `${t.color}18`,
                      border: `1px solid ${t.color}30`,
                      color: t.color,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-paper leading-none">{t.author}</p>
                    <p className="font-mono text-[9px] text-paper-soft/50 uppercase tracking-wider mt-1">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

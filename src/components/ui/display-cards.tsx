"use client";

import { cn } from "@/lib/utils";
import { Globe, Zap, LayoutDashboard } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Globe className="size-4 text-red/70" />,
  title = "Sites Premium",
  description = "Do briefing ao deploy em 1–5 dias",
  date = "A partir de R$ 1.500",
  titleClassName = "text-red",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl",
        "border-2 border-white/[0.08] bg-ink-2/60 backdrop-blur-sm px-4 py-3",
        "transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
        "after:bg-gradient-to-l after:from-[#0a0a0b] after:to-transparent after:content-['']",
        "hover:border-white/20 hover:bg-ink-2 overflow-hidden",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-red/10 border border-red/20 p-1">
          {icon}
        </span>
        <p className={cn("font-display text-lg font-light", titleClassName)}>{title}</p>
      </div>
      <p className="truncate font-sans text-base text-paper/80">{description}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-paper-soft/40">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export const ARVEX_CARDS: DisplayCardProps[] = [
  {
    icon: <Globe className="size-4 text-red/70" />,
    title: "Landing Page",
    description: "1 página para captar clientes",
    date: "R$ 680 · 1 mês grátis · depois R$150/mês",
    titleClassName: "text-red",
    className:
      "[grid-area:stack] hover:-translate-y-10 " +
      "before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-white/[0.08] " +
      "before:h-full before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0b]/50 " +
      "grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 " +
      "hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Zap className="size-4 text-red/70" />,
    title: "Site Institucional",
    description: "Home, sobre, serviços e contato",
    date: "R$ 1.200 · manutenção R$150/mês",
    titleClassName: "text-red",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 " +
      "before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-white/[0.08] " +
      "before:h-full before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0b]/50 " +
      "grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 " +
      "hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <LayoutDashboard className="size-4 text-red/70" />,
    title: "Site + Dashboard",
    description: "Site com painel de gestão integrado",
    date: "R$ 1.680 · manutenção R$250/mês",
    titleClassName: "text-red",
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

export default function DisplayCards({ cards = ARVEX_CARDS }: DisplayCardsProps) {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

import { PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Logo = { src: string; alt: string };

export const STACK_LOGOS: Logo[] = [
  { src: 'https://svgl.app/library/nextjs_wordmark_light.svg',    alt: 'Next.js'      },
  { src: 'https://svgl.app/library/tailwindcss_wordmark.svg',     alt: 'Tailwind CSS' },
  { src: 'https://svgl.app/library/supabase_wordmark_light.svg',  alt: 'Supabase'     },
  { src: 'https://svgl.app/library/vercel_wordmark.svg',          alt: 'Vercel'       },
  { src: 'https://svgl.app/library/wordpress_wordmark_light.svg', alt: 'WordPress'    },
  { src: 'https://svgl.app/library/nodejs_wordmark_light.svg',    alt: 'Node.js'      },
  { src: 'https://svgl.app/library/n8n.svg',                      alt: 'n8n'          },
  { src: 'https://svgl.app/library/figma_wordmark_light.svg',     alt: 'Figma'        },
];

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos?: Logo[];
};

export function LogoCloud({ className, logos = STACK_LOGOS, ...props }: LogoCloudProps) {
  const [a, b, c, d, e, f, g, h] = logos;

  return (
    <div
      className={cn('relative grid grid-cols-2 border-x border-white/[0.08] md:grid-cols-4', className)}
      {...props}
    >
      {/* Linha superior full-width */}
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-white/[0.08]" />

      <LogoCard className="relative border-r border-b border-white/[0.08] bg-ink-2/30" logo={a}>
        <PlusIcon className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-white/[0.10]" strokeWidth={1} />
      </LogoCard>

      <LogoCard className="border-b border-white/[0.08]" logo={b} />

      <LogoCard className="relative border-r border-b border-white/[0.08] bg-ink-2/30" logo={c}>
        <PlusIcon className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-white/[0.10]" strokeWidth={1} />
        <PlusIcon className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 text-white/[0.10] md:block" strokeWidth={1} />
      </LogoCard>

      <LogoCard className="relative border-b border-white/[0.08]" logo={d} />

      <LogoCard className="relative border-r border-b border-white/[0.08]" logo={e}>
        <PlusIcon className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 text-white/[0.10] md:hidden" strokeWidth={1} />
      </LogoCard>

      <LogoCard className="border-b border-white/[0.08] bg-ink-2/30 md:border-r md:border-b-0" logo={f} />

      <LogoCard className="border-r border-white/[0.08]" logo={g} />

      <LogoCard className="bg-ink-2/30" logo={h} />

      {/* Linha inferior full-width */}
      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-white/[0.08]" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<'div'> & { logo: Logo };

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn('relative flex items-center justify-center bg-ink px-6 py-10 md:p-12', className)}
      {...props}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="pointer-events-none h-5 w-auto select-none brightness-0 invert opacity-55 transition-opacity duration-300 hover:opacity-100 md:h-6"
      />
      {children}
    </div>
  );
}

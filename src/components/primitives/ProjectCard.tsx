'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Project } from '@/content/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

export function ProjectCard({ project, className, priority }: ProjectCardProps) {
  const aspectMap = {
    '16/10': 'aspect-[16/10]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  };

  const isInternal = !project.url.startsWith('http');
  const overlayLabel = isInternal ? 'Ver detalhes →' : 'Ver site →';
  const cursorLabel = isInternal ? 'ver detalhes' : 'ver site';

  const inner = (
    <>
      {/* Imagem */}
      <div className={cn('relative overflow-hidden', aspectMap[project.aspectRatio])}>
        <Image
          src={project.cover}
          alt={`${project.title} — projeto desenvolvido pela Arvex Agency, Boa Vista RR`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-[1.1]"
          priority={priority}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-ink/70 flex items-end p-6"
        >
          <span className="font-display text-4xl md:text-5xl font-light text-paper leading-none">
            {overlayLabel}
          </span>
        </motion.div>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <span className="section-label text-[10px] mb-1 block">{project.category}</span>
          <h3 className="font-display text-xl font-light text-paper leading-tight">
            {project.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-paper-soft/50 shrink-0 mt-1">{project.year}</span>
      </div>
    </>
  );

  if (isInternal) {
    return (
      <Link
        href={project.url}
        className={cn('group block relative overflow-hidden', className)}
        data-cursor-label={cursorLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('group block relative overflow-hidden', className)}
      data-cursor-label={cursorLabel}
    >
      {inner}
    </a>
  );
}

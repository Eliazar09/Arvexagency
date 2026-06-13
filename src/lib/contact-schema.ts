import { z } from 'zod';

export const contactSchema = z.object({
  name:           z.string().optional(),
  email:          z.string().email('Email inválido'),
  whatsappCode:   z.string(),
  whatsappNumber: z.string().min(8, 'Número inválido'),
  company:        z.string().optional(),
  segment:        z.string().min(1,  'Selecione o segmento'),
  hasSite:        z.enum(['sim', 'nao']),
  currentSiteUrl: z.string().optional(),
  service:        z.string().min(1,  'Selecione um serviço'),
  goal:           z.string().min(1,  'Selecione um objetivo'),
  timeline:       z.string().min(1,  'Selecione um prazo'),
  message:        z.string().min(10, 'Conte mais sobre o projeto (mínimo 10 caracteres)'),
  contactMethod:  z.enum(['mensagem', 'meet']),
  meetDate:       z.string().optional(),
  meetTime:       z.string().optional(),
  lgpdConsent:    z.boolean().refine((v) => v === true, {
    message: 'Você precisa concordar com a Política de Privacidade para continuar',
  }),
}).superRefine((data, ctx) => {
  if (data.contactMethod === 'meet') {
    if (!data.meetDate) {
      ctx.addIssue({ code: 'custom', path: ['meetDate'], message: 'Selecione uma data' });
    } else {
      // Item 1: impede datas passadas (validação server-side complementar ao min= do input)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(data.meetDate + 'T00:00:00');
      if (selected <= today) {
        ctx.addIssue({ code: 'custom', path: ['meetDate'], message: 'A data deve ser amanhã ou depois' });
      }
    }
    if (!data.meetTime) {
      ctx.addIssue({ code: 'custom', path: ['meetTime'], message: 'Selecione um horário' });
    }
  }
});

export type FormData = z.infer<typeof contactSchema>;

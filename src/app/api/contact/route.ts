import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Honeypot: bots preenchem campo escondido; humanos não veem ──────────
    // Responde 200 fake para o bot não perceber que foi bloqueado
    if (body._hp) {
      return NextResponse.json({ ok: true });
    }

    // ── Validação server-side com o mesmo schema do formulário ───────────────
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // ── TODO: Persistência de leads ──────────────────────────────────────────
    // Aguardando escolha do usuário entre:
    //   A) Google Sheets  — grátis, sem conta extra, familiar
    //   B) Notion         — grátis (tier), UI bonita, fácil de gerenciar
    //   C) Airtable       — grátis (tier), melhor para filtrar/ordenar leads
    //   D) Resend (email) — sem banco de dados, só recebe email com os dados
    //
    // Implementar aqui após decisão. Exemplo:
    //
    // await saveToGoogleSheets(data);
    // await saveToNotion(data);
    // await saveToAirtable(data);
    // await sendLeadEmail(data);
    // ─────────────────────────────────────────────────────────────────────────

    console.log('[API /contact] Lead recebido:', {
      name: data.name,
      email: data.email,
      service: data.service,
      contactMethod: data.contactMethod,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[API /contact] Erro:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

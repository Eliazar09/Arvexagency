import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Arvex Agency coleta, usa e protege seus dados pessoais conforme a LGPD.',
};

const LAST_UPDATE = '13 de junho de 2026';
const CONTACT_EMAIL = 'arvexagency@outlook.com';
const COMPANY = 'Arvex Agency';
const CITY = 'Boa Vista, Roraima, Brasil';

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <section className="min-h-[35vh] flex items-end border-b border-white/[0.06]">
        <div className="container pb-16 pt-[120px]">
          <p className="section-label mb-6">LGPD / PRIVACIDADE</p>
          <h1 className="font-display font-light leading-tight" style={{ fontSize: 'var(--fs-h1)' }}>
            Política de Privacidade
          </h1>
          <p className="font-mono text-xs text-paper-soft/40 uppercase tracking-widest mt-4">
            Última atualização: {LAST_UPDATE}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-[72ch] flex flex-col gap-12">

            <div>
              <p className="font-sans text-paper-dim leading-relaxed" style={{ fontSize: 'var(--fs-lead)' }}>
                A <strong className="text-paper">{COMPANY}</strong> respeita a sua privacidade. Esta política explica de forma direta quais dados coletamos quando você usa nosso site, para que usamos, e quais são os seus direitos como titular de dados, conforme a{' '}
                <strong className="text-paper">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
              </p>
            </div>

            <Block title="1. Quem somos">
              <p>
                <strong className="text-paper">{COMPANY}</strong> — studio de tecnologia e criação digital, com sede em {CITY}.
                Responsável pelo tratamento de dados: equipe da Arvex Agency.
                Contato para assuntos de privacidade: <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper hover:text-red transition-colors underline underline-offset-2">{CONTACT_EMAIL}</a>
              </p>
            </Block>

            <Block title="2. Quais dados coletamos">
              <p>Coletamos apenas o que você nos fornece voluntariamente ao preencher o formulário de contato:</p>
              <ul>
                <li><strong className="text-paper">Nome</strong> (opcional)</li>
                <li><strong className="text-paper">Email</strong></li>
                <li><strong className="text-paper">Número de WhatsApp</strong></li>
                <li><strong className="text-paper">Nome e segmento da empresa</strong> (opcional)</li>
                <li><strong className="text-paper">Detalhes do projeto</strong>: serviço de interesse, objetivo, prazo e descrição do projeto</li>
                <li><strong className="text-paper">Preferência de contato</strong>: mensagem ou reunião (com data e horário se escolher reunião)</li>
              </ul>
              <p className="mt-4">
                Não coletamos dados automaticamente (cookies de rastreamento, fingerprint, localização) além do mínimo técnico necessário para o funcionamento do site (ex: logs de servidor do Vercel).
              </p>
            </Block>

            <Block title="3. Para que usamos seus dados">
              <p>Usamos seus dados exclusivamente para:</p>
              <ul>
                <li>Responder ao seu contato e enviar a proposta solicitada</li>
                <li>Confirmar e realizar a reunião agendada, se aplicável</li>
                <li>Entender o seu projeto e oferecer a solução mais adequada</li>
              </ul>
              <p className="mt-4">
                <strong className="text-paper">Não vendemos, alugamos nem compartilhamos seus dados com terceiros</strong> para fins de marketing. Seus dados não são usados para publicidade direcionada.
              </p>
            </Block>

            <Block title="4. Base legal (LGPD)">
              <p>O tratamento dos seus dados é baseado em:</p>
              <ul>
                <li><strong className="text-paper">Consentimento</strong> (art. 7º, I) — você marca explicitamente a caixa de concordância antes de enviar o formulário</li>
                <li><strong className="text-paper">Execução de contrato</strong> (art. 7º, V) — quando iniciamos um projeto, o tratamento é necessário para cumprir o serviço contratado</li>
              </ul>
            </Block>

            <Block title="5. Por quanto tempo guardamos seus dados">
              <p>
                Guardamos seus dados de contato pelo tempo necessário para responder à sua solicitação e, em caso de contratação, pelo período contratual e por até 5 anos após o encerramento (prazo de prescrição civil padrão no Brasil).
              </p>
              <p className="mt-4">
                Se você entrou em contato mas não virou cliente, excluímos seus dados após 12 meses sem interação.
              </p>
            </Block>

            <Block title="6. Seus direitos (LGPD, art. 18)">
              <p>Como titular de dados, você tem direito a:</p>
              <ul>
                <li><strong className="text-paper">Confirmação</strong> — saber se tratamos seus dados</li>
                <li><strong className="text-paper">Acesso</strong> — receber uma cópia dos dados que temos sobre você</li>
                <li><strong className="text-paper">Correção</strong> — atualizar dados incompletos ou incorretos</li>
                <li><strong className="text-paper">Eliminação</strong> — solicitar a exclusão dos seus dados</li>
                <li><strong className="text-paper">Revogação do consentimento</strong> — retirar a autorização a qualquer momento</li>
                <li><strong className="text-paper">Portabilidade</strong> — receber seus dados em formato estruturado</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer desses direitos, envie um email para{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper hover:text-red transition-colors underline underline-offset-2">{CONTACT_EMAIL}</a>{' '}
                com o assunto <em className="text-paper">&ldquo;LGPD — [seu pedido]&rdquo;</em>. Respondemos em até 15 dias úteis.
              </p>
            </Block>

            <Block title="7. Segurança">
              <p>
                O site é hospedado na <strong className="text-paper">Vercel</strong> (infraestrutura com HTTPS obrigatório e certificado SSL). Seus dados em trânsito são protegidos por criptografia TLS. Não armazenamos senhas nem dados de cartão de crédito.
              </p>
            </Block>

            <Block title="8. Terceiros">
              <p>
                O formulário usa o <strong className="text-paper">WhatsApp</strong> (Meta Platforms) como canal de comunicação. Ao enviar o formulário, uma mensagem é aberta no WhatsApp com os dados do seu projeto. A política de privacidade do WhatsApp se aplica a esse canal.
              </p>
              <p className="mt-4">
                O site utiliza fontes do <strong className="text-paper">Google Fonts</strong>, carregadas com a diretiva <code className="text-paper bg-white/5 px-1 py-0.5 rounded text-xs">display=swap</code> via Next.js, o que minimiza o envio de dados ao Google.
              </p>
            </Block>

            <Block title="9. Alterações nesta política">
              <p>
                Podemos atualizar esta política eventualmente. A data de &ldquo;última atualização&rdquo; no topo desta página sempre refletirá a versão mais recente. Mudanças significativas serão comunicadas por email se tivermos seu contato.
              </p>
            </Block>

            <Block title="10. Contato e reclamações">
              <p>
                Para qualquer dúvida sobre esta política ou sobre o tratamento dos seus dados:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper hover:text-red transition-colors underline underline-offset-2">{CONTACT_EMAIL}</a>
              </p>
              <p className="mt-4">
                Se não ficar satisfeito com nossa resposta, você pode registrar uma reclamação na{' '}
                <strong className="text-paper">ANPD</strong> (Autoridade Nacional de Proteção de Dados) em{' '}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-paper hover:text-red transition-colors underline underline-offset-2">gov.br/anpd</a>.
              </p>
            </Block>

            <div className="border-t border-white/[0.06] pt-8">
              <Link
                href="/"
                className="font-mono text-xs text-paper-soft hover:text-paper transition-colors uppercase tracking-widest"
              >
                ← Voltar ao início
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-light text-paper mb-4">{title}</h2>
      <div className="font-sans text-sm text-paper-dim leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}

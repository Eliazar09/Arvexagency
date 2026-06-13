# Automação de Prospecção de Clientes via WhatsApp (n8n)

Esse é um dos fluxos de automação que eu construo pra meus clientes. A ideia é simples: **transformar a parte chata e repetitiva da prospecção em algo automático**, pra que o tempo seja gasto fechando negócio, e não caçando contato um por um.

## O problema que ele resolve

Prospectar cliente na unha é lento. Você precisa pesquisar empresas no Google, anotar telefone, checar se tem WhatsApp, mandar mensagem, esperar, anotar quem respondeu... e repetir isso centenas de vezes. É cansativo e fácil de errar.

Essa automação faz tudo isso sozinha, do começo ao fim.

## Como funciona (em linguagem de gente)

1. **Você escolhe o nicho e a cidade** — por exemplo, "joalherias em São Paulo".
2. **O fluxo busca as empresas** automaticamente no Google Maps.
3. **Organiza os dados** — limpa os telefones, tira repetidos, separa nome, nota, site, etc.
4. **Divide em dois grupos:** quem *não tem site* (cliente em potencial pra um site novo) e quem *já tem* (oportunidade de redesign no futuro).
5. **Confere quem tem WhatsApp ativo** antes de mandar qualquer coisa.
6. **Envia a primeira mensagem** de contato, já personalizada.
7. **Espera um tempo aleatório entre os envios** pra imitar comportamento humano e proteger o número de bloqueio.
8. **Registra tudo num log** — pra você acompanhar pra quem mandou e o que respondeu.

## Tecnologias usadas

- **n8n** — a ferramenta que orquestra todo o fluxo (visual, sem precisar programar do zero)
- **API de scraping do Google Maps** — pra buscar as empresas
- **API de WhatsApp** — pra validar números e enviar mensagens
- Lógica de **anti-bloqueio** com intervalos aleatórios entre envios

## Como configurar (passo a passo)

O arquivo `.json` pode ser importado direto no n8n. Dentro dele, deixei **anotações coladas em cada etapa** explicando o que fazer. Os pontos que precisam dos seus dados estão marcados com `>>> CONFIGURAR <<<`:

1. **Buscar Empresas** — coloque a URL do serviço de scraping e o seu token.
2. **Validar WhatsApp** e **Enviar Mensagem** — coloque a URL e a instância da sua API de WhatsApp, e configure a credencial de autenticação (Header Auth) no n8n.
3. **Configurações** — ajuste o nicho, a cidade e a quantidade de leads por execução.
4. **Mensagem** — personalize o texto para o seu serviço.

> 💡 Dica: comece com poucos leads (10–15) pra testar, depois escale com calma.

## Resultado

No fim, você tem uma máquina de prospecção rodando praticamente sozinha: você aperta um botão e ela busca, filtra, valida e inicia a conversa com dezenas de clientes em potencial — enquanto você cuida do que importa.

---

*Esse projeto faz parte do meu portfólio de automações e desenvolvimento. Também faço sites, integrações e fluxos personalizados sob medida pro seu negócio.*

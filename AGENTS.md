<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md

## Decisões técnicas

- Toda a landing page vive em `src/routes/index.tsx` (página única com âncoras `/#secao`); dados editáveis (datas, contatos) ficam no objeto `EDITAVEIS` no topo desse arquivo — atualize só ali. (Facilita edição por estudantes iniciantes.)
- Design tokens ficam apenas em `src/styles.css` em formato oklch; nunca usar cores fixas nos componentes. (Mantém o tema consistente e acessível.)
- Fontes Sora (títulos) e Manrope (textos) carregadas via `<link>` em `src/routes/__root.tsx`. (Mantêm o visual moderno escolhido com leitura clara.)
- O tema claro/escuro usa a classe `dark` no elemento raiz e salva a escolha em `localStorage`. (Preserva a preferência visual sem exigir banco de dados.)
- O formulário de participação não tem backend: valida os campos e monta uma mensagem pronta que o usuário envia por WhatsApp ou e-mail. (Simples e sem cadastro, conforme escopo.)
- Animações de surgimento ao rolar ficam centralizadas no componente `Revelar` (src/routes/index.tsx) com classes `.pre-revelar`/`.revelar` em `src/styles.css`; cada seção da página é envolvida por `<Revelar data-revelar>`. Nunca esconder conteúdo no CSS sem o JS aplicar (conteúdo só fica invisível quando o JS adiciona `.pre-revelar`) e sempre respeitar `prefers-reduced-motion`. (Animação suave e acessível, sem depender de bibliotecas.)

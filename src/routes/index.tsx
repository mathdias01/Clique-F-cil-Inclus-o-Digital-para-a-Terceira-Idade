import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MousePointerClick,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Smartphone,
  HandHeart,
  Lock,
  Smile,
  MapPin,
  CalendarDays,
  Clock,
  Timer,
  Users,
  MessageCircleQuestion,
  PartyPopper,
  Share2,
  GraduationCap,
  User,
  Mail,
  Phone,
  Instagram,
  Sun,
  Moon,
} from "lucide-react";
import heroIlustracao from "@/assets/hero-ilustracao.png";
import fotoLorenzo from "@/assets/integrante-lorenzo.png";
import fotoMatheus from "@/assets/integrante-matheus.png";
import fotoJoseCarlos from "@/assets/integrante-josecarlos.png";
import fotoJose from "@/assets/integrante-jose.png";
import fotoClayton from "@/assets/integrante-clayton.png";
import fotoVictor from "@/assets/integrante-victor.png";
import fotoVitorNascimento from "@/assets/integrante-vitor-nascimento.png";

// ============================================================================
// DADOS EDITÁVEIS
// Altere apenas os valores abaixo para atualizar datas, contatos e horários.
// Os campos entre [COLCHETES] devem ser preenchidos pela equipe do projeto.
// ============================================================================
const EDITAVEIS = {
  // Informações das oficinas (seção "Quando e onde?")
  local: "Univassouras — Campus 2 (Porto da Roça)",
  data: "[DATA DA OFICINA]",
  horario: "[HORÁRIO]",
  duracao: "1 hora e 30 minutos",
  publico: "Pessoas idosas da comunidade",

  // Contatos (seção "Fale com o Clique Fácil") — preencher quando definidos
  email: "dias.moutinho34@gmail.com",
  whatsapp: "(22) 98175-4597",
  // Número para os links do WhatsApp (apenas números, com código do país 55)
  whatsappNumero: "5522981754597",
  instagram: "[INSTAGRAM DO PROJETO]",
};

// Mensagem exibida nos campos ainda não definidos pela equipe
const A_CONFIRMAR = "(a ser definido pela equipe)";

// ============================================================================
// EQUIPE — estudantes do projeto (a quantidade é a do array abaixo)
// Para incluir uma pessoa: 1) envie a foto dela, 2) importe o arquivo no topo
// deste arquivo e 3) preencha o nome abaixo. Deixe o nome vazio ("") enquanto
// a pessoa ainda não foi confirmada. O campo "cargo" é opcional: quando
// preenchido, mostra uma etiqueta discreta abaixo do nome.
// ============================================================================
const INTEGRANTES: { nome: string; foto?: string; cargo?: string }[] = [
  { nome: "Lorenzo Sampaio de Guadelupe", foto: fotoLorenzo},
  {
    nome: "Matheus Dias Moutinho",
    foto: fotoMatheus,
    cargo: "Gerente do projeto",
  },
  { nome: "José Carlos Miranda Bonelli", foto: fotoJoseCarlos},
  { nome: "Josué Borbas de Aguiar", foto: fotoJose},
  { nome: "Clayton de Jesus Cristo do Nascimento", foto: fotoClayton},
  { nome: "Victor Hugo Sanches Leite", foto: fotoVictor},
  { nome: "Vitor Hugo do Nascimento Gomes", foto: fotoVitorNascimento},
];

// ============================================================================
// CONTEÚDO DAS OFICINAS
// ============================================================================
const OFICINAS = [
  {
    id: "ia",
    icone: Sparkles,
    titulo: "Inteligência Artificial no dia a dia e uso do celular",
    resumo:
      "Vamos conhecer o que é Inteligência Artificial e descobrir, com exemplos práticos, como essas ferramentas podem ajudar em tarefas do dia a dia.",
    equipe: "3 estudantes",
    detalhes: [
      "O que é Inteligência Artificial, explicado de forma simples",
      "Exemplos de como a IA pode ajudar em tarefas diárias",
      "Demonstrações práticas e dicas para usar a IA com consciência",
      "Momento para tirar dúvidas e receber ajuda prática com o celular",
    ],
  },
  {
    id: "seguranca",
    icone: ShieldCheck,
    titulo: "Segurança Digital e uso do celular no dia a dia",
    resumo:
      "Vamos aprender a prevenir golpes digitais e a usar a internet com mais segurança no dia a dia.",
    equipe: "4 estudantes",
    detalhes: [
      "Como reconhecer mensagens suspeitas, links perigosos e tentativas de fraude",
      "Como identificar conteúdos enganosos",
      "Boas práticas de segurança em aplicativos, contas e serviços digitais",
      "Momento para tirar dúvidas e receber ajuda prática com o celular",
    ],
  },
];

const PASSOS = [
  {
    numero: 1,
    titulo: "Conheça o projeto",
    texto: "Confira as informações sobre o Clique Fácil.",
    icone: MessageCircleQuestion,
  },
  {
    numero: 2,
    titulo: "Escolha uma oficina",
    texto: "Conheça os temas que serão trabalhados.",
    icone: PartyPopper,
  },
  {
    numero: 3,
    titulo: "Participe",
    texto: "Venha para a oficina e pratique com nossa equipe.",
    icone: Users,
  },
  {
    numero: 4,
    titulo: "Aprenda e compartilhe",
    texto: "Aprenda novos recursos e tire suas dúvidas.",
    icone: Share2,
  },
];

const DUVIDAS = [
  {
    pergunta: "Quem pode participar?",
    resposta: "As oficinas são destinadas a pessoas idosas da comunidade.",
  },
  {
    pergunta: "Preciso saber mexer no celular?",
    resposta:
      "Não. As oficinas foram pensadas justamente para ajudar quem possui dúvidas ou dificuldades com tecnologia.",
  },
  {
    pergunta: "Quanto custa participar?",
    resposta: "As atividades do projeto são gratuitas.",
  },
  {
    pergunta: "Onde acontecem as oficinas?",
    resposta: "Na Univassouras — Campus 2 (Porto da Roça).",
  },
  {
    pergunta: "Preciso levar meu celular?",
    resposta:
      "Sempre que possível, é recomendado levar o próprio celular para acompanhar as atividades práticas.",
  },
];

// ============================================================================
// ROTAS DA PÁGINA (âncoras)
// ============================================================================
const LINKS = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre o projeto" },
  { href: "/#oficinas", label: "Oficinas" },
  { href: "/#participar", label: "Como participar" },
  { href: "/#contato", label: "Contato" },
];

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clique Fácil — Inclusão Digital para a Terceira Idade" },
      {
        name: "description",
        content:
          "Oficinas presenciais e gratuitas de tecnologia para pessoas idosas, realizadas por estudantes de Engenharia de Software da Universidade de Vassouras — Polo Saquarema.",
      },
      {
        property: "og:title",
        content: "Clique Fácil — Inclusão Digital para a Terceira Idade",
      },
      {
        property: "og:description",
        content:
          "Oficinas presenciais gratuitas para ajudar pessoas idosas a usar a tecnologia com autonomia, segurança e confiança.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: PaginaInicial,
});

// ============================================================================
// REVELAÇÃO SUAVE AO ROLAR
// Envolve uma seção e a faz surgir devagarzinho quando entra na tela.
// Quem prefere menos movimento (no sistema) não vê animação nenhuma.
// Uso: <Revelar data-revelar className="..."> ... </Revelar>
// ============================================================================
const useEfeitoNoNavegador =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Revelar({ children, ...outras }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEfeitoNoNavegador(() => {
    const container = ref.current;
    if (!container) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    if (!container.hasAttribute("data-revelar")) return;

    container.classList.add("pre-revelar");

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("revelado");
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    observador.observe(container);

    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} {...outras}>
      {children}
    </div>
  );
}

function PaginaInicial() {
  return (
    <div className="min-h-dvh">
      <a href="#conteudo" className="skip-link text-lg font-bold">
        Pular para o conteúdo principal
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Hero />
        <Sobre />
        <Objetivo />
        <Oficinas />
        <ComoFunciona />
        <QuandoEOnde />
        <Participar />
        <Equipe />
        <Duvidas />
        <Contato />
      </main>
      <Rodape />
    </div>
  );
}

// ============================================================================
// 1. CABEÇALHO
// ============================================================================
function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const temaSalvo = window.localStorage.getItem("clique-facil-tema");
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const usarTemaEscuro = temaSalvo ? temaSalvo === "escuro" : prefereEscuro;

    document.documentElement.classList.toggle("dark", usarTemaEscuro);
    setTemaEscuro(usarTemaEscuro);
  }, []);

  function alternarTema() {
    const proximoTemaEscuro = !temaEscuro;
    document.documentElement.classList.toggle("dark", proximoTemaEscuro);
    window.localStorage.setItem(
      "clique-facil-tema",
      proximoTemaEscuro ? "escuro" : "claro",
    );
    setTemaEscuro(proximoTemaEscuro);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <a
          href="/#inicio"
          className="flex min-w-0 items-center gap-3 rounded-md"
          aria-label="Clique Fácil — voltar ao início"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <MousePointerClick className="size-6" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-heading text-xl font-bold leading-tight sm:text-2xl">
              Clique Fácil
            </span>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Inclusão Digital para a Terceira Idade
            </span>
          </span>
        </a>

        {/* Menu — telas maiores */}
        <nav aria-label="Menu principal" className="hidden xl:block">
          <ul className="flex items-center gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-12 items-center whitespace-nowrap border-b-2 border-transparent px-2 py-2 text-base font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#participar"
                className="ml-2 inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Quero participar
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={alternarTema}
            aria-label={temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"}
            aria-pressed={temaEscuro}
            title={temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"}
            className="size-12 rounded-full border-2 border-primary bg-primary-soft text-primary-soft-foreground shadow-none hover:bg-primary hover:text-primary-foreground"
          >
            {temaEscuro ? (
              <Sun className="size-6" aria-hidden="true" />
            ) : (
              <Moon className="size-6" aria-hidden="true" />
            )}
          </Button>

          {/* Botão do menu — celular e tablet */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            className="size-12 rounded-xl border-2 bg-card text-foreground xl:hidden"
          >
            {aberto ? (
              <>
                <X className="size-6" aria-hidden="true" />
                <span className="sr-only">Fechar menu</span>
              </>
            ) : (
              <>
                <Menu className="size-6" aria-hidden="true" />
                <span className="sr-only">Abrir menu</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Menu aberto — celular */}
      {aberto && (
        <nav aria-label="Menu principal (celular)" className="border-t xl:hidden">
          <ul id="menu-celular" className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block min-h-14 rounded-lg border-b border-border px-4 py-4 text-lg font-semibold last:border-b-0 hover:bg-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

// ============================================================================
// 2. HERO / SEÇÃO PRINCIPAL
// ============================================================================
function Hero() {
  return (
    <section id="inicio" className="py-12 sm:py-16 lg:py-20">
      <Revelar data-revelar className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-base font-bold text-primary-soft-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
            Projeto de extensão — Universidade de Vassouras
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Aprender tecnologia pode ser mais fácil.
          </h1>
          <p className="mt-6 max-w-xl text-xl text-muted-foreground sm:text-2xl">
            O Clique Fácil promove oficinas presenciais para ajudar pessoas
            idosas a utilizar a tecnologia com mais autonomia, segurança e
            confiança.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-h-14 rounded-full px-8 text-xl"
            >
              <a href="/#sobre">Conheça o projeto</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-14 rounded-full border-2 px-8 text-xl"
            >
              <a href="/#oficinas">Confira as oficinas</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <img
            src={heroIlustracao}
            alt="Ilustração acolhedora de uma senhora sorrindo enquanto usa o celular, com a ajuda atenta de um estudante universitário sentado ao seu lado."
            width={1024}
            height={1024}
            className="w-full rounded-3xl border border-border shadow-sm"
          />
        </div>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 3. SOBRE O PROJETO
// ============================================================================
function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-24 py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Sobre o Clique Fácil
        </h2>
        <p className="mt-6 max-w-3xl text-xl text-muted-foreground">
          O Clique Fácil é um projeto de extensão desenvolvido por estudantes
          de Engenharia de Software da Universidade de Vassouras — Polo
          Saquarema. A iniciativa busca aproximar a universidade da comunidade
          por meio de atividades de inclusão digital voltadas para pessoas
          idosas.
        </p>
        <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
          Por meio de oficinas presenciais, os participantes poderão aprender,
          praticar e esclarecer dúvidas sobre recursos tecnológicos presentes
          no cotidiano.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {[
            { valor: "2 oficinas", rotulo: "Temas diferentes para conhecer" },
            { valor: "Celular", rotulo: "Ajuda prática nos dois encontros" },
            { valor: "1h30", rotulo: "Duração de cada encontro" },
            {
              valor: `${INTEGRANTES.length} estudantes`,
              rotulo: "Trabalhando juntos no projeto",
            },
          ].map((item) => (
            <div
              key={item.valor}
              className="rounded-2xl border bg-card p-5 text-center sm:p-6"
            >
              <dt className="sr-only">{item.rotulo}</dt>
              <dd className="text-2xl font-bold text-primary sm:text-3xl">
                {item.valor}
              </dd>
              <dd className="mt-1 text-base text-muted-foreground">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 4. OBJETIVO
// ============================================================================
function Objetivo() {
  const cards = [
    {
      icone: HandHeart,
      titulo: "Autonomia",
      texto: "Realizar tarefas digitais com mais independência.",
    },
    {
      icone: Lock,
      titulo: "Segurança",
      texto: "Reconhecer situações de risco e possíveis golpes.",
    },
    {
      icone: Smile,
      titulo: "Confiança",
      texto: "Aprender tecnologia de maneira prática e acompanhada.",
    },
  ];

  return (
    <section id="objetivo" className="scroll-mt-24 bg-hero py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Nosso objetivo</h2>
        <p className="mt-5 max-w-3xl text-xl sm:text-2xl">
          Promover a inclusão e a autonomia digital de pessoas idosas, ajudando
          os participantes a utilizar tecnologias do cotidiano de maneira mais
          simples, segura e confiante.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {cards.map((card) => (
            <li
              key={card.titulo}
              className="rounded-2xl border bg-card p-6 sm:p-7"
            >
              <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
                <card.icone className="size-8" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-bold">{card.titulo}</h3>
              <p className="mt-2 text-lg text-muted-foreground">
                {card.texto}
              </p>
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 5. OFICINAS
// ============================================================================
function Oficinas() {
  return (
    <section id="oficinas" className="scroll-mt-24 py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Conheça nossas oficinas
        </h2>
        <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
          Dois encontros presenciais, cada um com um tema principal. Nos dois,
          você também poderá tirar dúvidas e receber ajuda prática com o
          celular. Toque em “Saiba mais” para ver os detalhes.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {OFICINAS.map((oficina) => (
            <li
              key={oficina.id}
              className="flex flex-col rounded-3xl border bg-card p-6 sm:p-7"
            >
              <span className="mb-5 grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
                <oficina.icone className="size-9" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-bold">{oficina.titulo}</h3>
              <p className="mt-3 grow text-lg text-muted-foreground">
                {oficina.resumo}
              </p>
              <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-primary">
                <Smartphone className="size-5" aria-hidden="true" />
                Inclui ajuda prática com o celular
              </p>
              <p className="mt-1 text-base text-muted-foreground">
                Equipe responsável: {oficina.equipe}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="mt-6 min-h-12 w-full rounded-full px-6 text-lg"
                  >
                    Saiba mais
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
                  <DialogHeader>
                    <span className="mb-2 grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
                      <oficina.icone className="size-8" aria-hidden="true" />
                    </span>
                    <DialogTitle className="text-left text-2xl sm:text-3xl">
                      {oficina.titulo}
                    </DialogTitle>
                    <DialogDescription className="text-left text-lg text-muted-foreground">
                      {oficina.resumo}
                    </DialogDescription>
                  </DialogHeader>
                  <h4 className="text-xl font-bold">O que vamos ver</h4>
                  <ul className="space-y-3">
                    {oficina.detalhes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 size-2.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="rounded-2xl bg-muted p-5 text-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="size-5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Local</dt>
                        <dd>{EDITAVEIS.local}</dd>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Data</dt>
                        <dd>{EDITAVEIS.data === "[DATA DA OFICINA]" ? "Data a ser definida" : EDITAVEIS.data}</dd>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Timer className="size-5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Duração</dt>
                        <dd>{EDITAVEIS.duracao}</dd>
                      </div>
                    </div>
                  </dl>
                  <Button
                    asChild
                    size="lg"
                    className="min-h-12 w-full rounded-full text-lg"
                  >
                    <a href="/#participar">Quero participar desta oficina</a>
                  </Button>
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 6. COMO FUNCIONA
// ============================================================================
function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-muted py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Como funciona</h2>
        <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
          Participar é simples: são apenas quatro passos.
        </p>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((passo) => (
            <li
              key={passo.numero}
              className="relative rounded-2xl border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {passo.numero}
                </span>
                <passo.icone className="size-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold">{passo.titulo}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 7. INFORMAÇÕES DAS OFICINAS — "Quando e onde?"
// ============================================================================
function QuandoEOnde() {
  const infos = [
    {
      icone: MapPin,
      titulo: "Local",
      valor: EDITAVEIS.local,
    },
    {
      icone: CalendarDays,
      titulo: "Data",
      valor: EDITAVEIS.data,
    },
    {
      icone: Clock,
      titulo: "Horário",
      valor: EDITAVEIS.horario,
    },
    {
      icone: Timer,
      titulo: "Duração",
      valor: EDITAVEIS.duracao,
    },
    {
      icone: Users,
      titulo: "Público",
      valor: EDITAVEIS.publico,
    },
  ];

  return (
    <section id="quando-onde" className="scroll-mt-24 py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Quando e onde?</h2>
        <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
          São dois encontros presenciais, sempre no mesmo lugar.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {infos.map((info) => {
            const valorAConfirmar =
              info.valor.startsWith("[") || info.valor.startsWith("(");
            return (
              <li
                key={info.titulo}
                className="flex items-start gap-4 rounded-2xl border bg-card p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-soft-foreground">
                  <info.icone className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-muted-foreground">
                    {info.titulo}
                  </h3>
                  <p className="mt-1 break-words text-xl font-semibold">
                    {valorAConfirmar ? (
                      <>
                        <span className="sr-only">Ainda não definido: </span>
                        {A_CONFIRMAR}
                      </>
                    ) : (
                      info.valor
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 8. COMO PARTICIPAR (formulário simples)
// ============================================================================
function Participar() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [oficina, setOficina] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [mensagemPronta, setMensagemPronta] = useState("");

  function aoEnviar(evento: React.FormEvent) {
    evento.preventDefault();
    const novosErros: Record<string, string> = {};

    if (nome.trim().length < 2) {
      novosErros["nome"] = "Por favor, escreva seu nome.";
    }
    const apenasNumeros = telefone.replace(/\D/g, "");
    if (apenasNumeros.length < 8) {
      novosErros["telefone"] =
        "Por favor, digite um telefone com pelo menos 8 números.";
    }
    if (!oficina) {
      novosErros["oficina"] = "Por favor, escolha uma oficina.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      novosErros["email"] = "Por favor, verifique o e-mail digitado.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const partes = [
      `Olá! Quero participar do Clique Fácil.`,
      `Nome: ${nome.trim()}`,
      `Telefone: ${telefone.trim()}`,
      email.trim() ? `E-mail: ${email.trim()}` : null,
      `Oficina de interesse: ${oficina}`,
    ].filter(Boolean);

    setMensagemPronta(partes.join("\n"));
  }

  const oficinaEscolhida = OFICINAS.find((o) => o.titulo === oficina);

  return (
    <section
      id="participar"
      className="scroll-mt-24 bg-hero py-12 sm:py-16"
    >
      <Revelar data-revelar className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Quer participar?</h2>
        <p className="mt-5 text-xl text-muted-foreground">
          As oficinas são voltadas para pessoas idosas da comunidade. Para
          participar, confira as informações da oficina e entre em contato com
          a equipe do Clique Fácil.
        </p>

        {mensagemPronta ? (
          <div
            role="status"
            className="mt-8 rounded-3xl border-2 border-primary bg-card p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold">Sua mensagem está pronta!</h3>
            <p className="mt-3 text-lg text-muted-foreground">
              {nome.trim()}, escolha abaixo como prefere enviar seu interesse.
              Abriremos o aplicativo com a mensagem já escrita:
            </p>
            <blockquote className="mt-4 whitespace-pre-line rounded-2xl bg-muted p-4 text-lg">
              {mensagemPronta}
            </blockquote>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-h-14 rounded-full px-8 text-lg"
              >
                <a
                  href={`https://wa.me/${EDITAVEIS.whatsappNumero}?text=${encodeURIComponent(mensagemPronta)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone className="mr-2 size-5" aria-hidden="true" />
                  Enviar pelo WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-14 rounded-full border-2 px-8 text-lg"
              >
                <a
                  href={`mailto:${EDITAVEIS.email}?subject=${encodeURIComponent("Quero participar do Clique Fácil")}&body=${encodeURIComponent(mensagemPronta)}`}
                >
                  <Mail className="mr-2 size-5" aria-hidden="true" />
                  Enviar por e-mail
                </a>
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMensagemPronta("")}
              className="mt-6 text-lg font-semibold text-primary underline underline-offset-4"
            >
              Editar meus dados novamente
            </button>
          </div>
        ) : (
          <form
            onSubmit={aoEnviar}
            noValidate
            className="mt-8 rounded-3xl border bg-card p-6 sm:p-8"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="nome" className="text-lg font-bold">
                  Seu nome
                </Label>
                <Input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!erros["nome"]}
                  aria-describedby={erros["nome"] ? "erro-nome" : undefined}
                  className="mt-2 h-14 rounded-xl border-2 px-4 text-lg"
                />
                {erros["nome"] && (
                  <p id="erro-nome" className="mt-2 text-lg font-semibold text-destructive">
                    {erros["nome"]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="telefone" className="text-lg font-bold">
                  Seu telefone
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  inputMode="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!erros["telefone"]}
                  aria-describedby={erros["telefone"] ? "erro-telefone" : undefined}
                  className="mt-2 h-14 rounded-xl border-2 px-4 text-lg"
                />
                {erros["telefone"] && (
                  <p
                    id="erro-telefone"
                    className="mt-2 text-lg font-semibold text-destructive"
                  >
                    {erros["telefone"]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-lg font-bold">
                  Seu e-mail <span className="font-normal text-muted-foreground">(opcional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!erros["email"]}
                  aria-describedby={erros["email"] ? "erro-email" : undefined}
                  className="mt-2 h-14 rounded-xl border-2 px-4 text-lg"
                />
                {erros["email"] && (
                  <p id="erro-email" className="mt-2 text-lg font-semibold text-destructive">
                    {erros["email"]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="oficina" className="text-lg font-bold">
                  Oficina de interesse
                </Label>
                <select
                  id="oficina"
                  value={oficina}
                  onChange={(e) => setOficina(e.target.value)}
                  aria-invalid={!!erros["oficina"]}
                  aria-describedby={erros["oficina"] ? "erro-oficina" : undefined}
                  className="mt-2 h-14 w-full rounded-xl border-2 border-input bg-background px-4 text-lg"
                >
                  <option value="">Escolha uma oficina…</option>
                  {OFICINAS.map((o) => (
                    <option key={o.id} value={o.titulo}>
                      {o.titulo}
                    </option>
                  ))}
                  <option value="Ainda não sei">Ainda não sei</option>
                </select>
                {erros["oficina"] && (
                  <p
                    id="erro-oficina"
                    className="mt-2 text-lg font-semibold text-destructive"
                  >
                    {erros["oficina"]}
                  </p>
                )}
                {oficinaEscolhida && !erros["oficina"] && (
                  <p className="mt-2 text-lg text-muted-foreground">
                    {oficinaEscolhida.resumo}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="min-h-14 w-full rounded-full text-xl"
              >
                Quero participar
              </Button>
            </div>
          </form>
        )}
      </Revelar>
    </section>
  );
}

// ============================================================================
// 9. EQUIPE / UNIVERSIDADE
// ============================================================================
function Equipe() {
  return (
    <section id="equipe" className="scroll-mt-24 py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Quem está por trás do projeto?
        </h2>
        <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
          O Clique Fácil é desenvolvido por estudantes de Engenharia de
          Software da Universidade de Vassouras — Polo Saquarema, com
          acompanhamento do professor João Coelho.
        </p>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          A equipe é formada por {INTEGRANTES.length} estudantes de Engenharia
          de Software: 3 conduzem a oficina de Inteligência Artificial e 4
          conduzem a oficina de Segurança Digital.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {INTEGRANTES.map((integrante, indice) => (
            <li
              key={indice}
              className={`rounded-2xl border bg-card p-4 text-center ${
                integrante.cargo
                  ? "border-primary/60"
                  : integrante.foto
                    ? "border-border"
                    : "border-dashed"
              }`}
            >
              {integrante.foto ? (
                <img
                  src={integrante.foto}
                  alt={`Foto de ${integrante.nome}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                />
              ) : (
                <span className="grid aspect-[4/5] w-full place-items-center rounded-xl bg-muted text-muted-foreground">
                  <User className="size-9" aria-hidden="true" />
                </span>
              )}
              <span className="mt-3 block text-lg font-semibold leading-snug">
                {integrante.nome || `Integrante ${indice + 1}`}
              </span>
              {integrante.cargo ? (
                <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {integrante.cargo}
                </span>
              ) : (
                !integrante.nome && (
                  <span className="text-sm text-muted-foreground">
                    (adicionar nome)
                  </span>
                )
              )}
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 10. DÚVIDAS FREQUENTES
// ============================================================================
function Duvidas() {
  return (
    <section id="faq" className="scroll-mt-24 bg-muted py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Dúvidas frequentes
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Toque em uma pergunta para ver a resposta.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4"
        >
          {DUVIDAS.map((item) => (
            <AccordionItem
              key={item.pergunta}
              value={item.pergunta}
              className="rounded-2xl border bg-card px-5 last:border-b"
            >
              <AccordionTrigger className="py-5 text-left text-xl font-bold hover:no-underline">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-lg text-muted-foreground">
                {item.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 11. CONTATO
// ============================================================================
function Contato() {
  const contatos = [
    {
      icone: Mail,
      titulo: "E-mail",
      valor: EDITAVEIS.email,
      href: EDITAVEIS.email.startsWith("[") ? undefined : `mailto:${EDITAVEIS.email}`,
    },
    {
      icone: Phone,
      titulo: "Telefone / WhatsApp",
      valor: EDITAVEIS.whatsapp,
      href: `https://wa.me/${EDITAVEIS.whatsappNumero}`,
    },
    {
      icone: Instagram,
      titulo: "Instagram",
      valor: EDITAVEIS.instagram,
      href: undefined,
    },
  ];

  return (
    <section id="contato" className="scroll-mt-24 py-12 sm:py-16">
      <Revelar data-revelar className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Fale com o Clique Fácil
        </h2>
        <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
          Tem alguma dúvida? Entre em contato com a equipe do projeto.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {contatos.map((contato) => (
            <li
              key={contato.titulo}
              className="rounded-2xl border bg-card p-6 text-center sm:p-7"
            >
              <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
                <contato.icone className="size-7" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold">{contato.titulo}</h3>
              <p className="mt-2 break-words text-lg text-muted-foreground">
                {contato.valor.startsWith("[") ? A_CONFIRMAR : contato.valor}
              </p>
              {contato.href && (
                <a
                  href={contato.href}
                  className="mt-3 inline-block text-lg font-bold text-primary underline underline-offset-4"
                >
                  Enviar mensagem
                </a>
              )}
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}

// ============================================================================
// 12. RODAPÉ
// ============================================================================
function Rodape() {
  return (
    <footer className="border-t bg-card py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="flex items-center gap-2 text-xl font-bold">
            <MousePointerClick className="size-6 text-primary" aria-hidden="true" />
            Clique Fácil — Inclusão Digital para a Terceira Idade
          </p>
          <p className="text-lg text-muted-foreground">
            Projeto de extensão — Engenharia de Software
          </p>
          <p className="text-lg text-muted-foreground">
            Universidade de Vassouras — Polo Saquarema
          </p>
        </div>

        <nav aria-label="Links do rodapé" className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-lg font-semibold">
            {[
              { href: "/#inicio", label: "Início" },
              { href: "/#sobre", label: "Sobre" },
              { href: "/#oficinas", label: "Oficinas" },
              { href: "/#contato", label: "Contato" },
            ].map((link, indice) => (
              <li key={link.href} className="flex items-center">
                {indice > 0 && (
                  <span className="mx-2 text-muted-foreground" aria-hidden="true">
                    |
                  </span>
                )}
                <a
                  href={link.href}
                  className="rounded-lg px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-8 text-center text-base text-muted-foreground">
          <Link to="/" className="underline underline-offset-4">
            Clique Fácil
          </Link>{" "}
          — página institucional do projeto.
        </p>
      </div>
    </footer>
  );
}

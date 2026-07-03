import {
  ArrowRight,
  BookOpen,
  Brain,
  BracketsCurly,
  ChartLineUp,
  CheckCircle,
  Code,
  Cube,
  Database,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  Lightning,
  Link,
  ListChecks,
  Notepad,
  Phone,
  Pulse,
  RocketLaunch,
  Sparkle,
  Stack,
  TerminalWindow,
  XLogo,
} from "@phosphor-icons/react";

const pretraining = [
  "Computer Science",
  "Algorithms & Systems",
  "Databases",
  "Compilers",
  "AI Foundations",
];

const adapters = [
  { title: "PIN AI", subtitle: "Personal AI systems", icon: Cube },
  { title: "MTEB", subtitle: "Evaluation work", icon: ChartLineUp },
  { title: "Mobile AI", subtitle: "iOS / Local runtime", icon: Phone },
  { title: "Codex Skills", subtitle: "Operating loops", icon: TerminalWindow },
  { title: "Agent Workflows", subtitle: "Context to action", icon: BracketsCurly },
];

const contextItems = ["User needs", "Product problems", "Codebase", "Research", "Feedback"];

const outputs = [
  { title: "Products", subtitle: "PIN AI, PINLOB", icon: RocketLaunch },
  { title: "Open Source", subtitle: "PRs & contributions", icon: GithubLogo },
  { title: "Notes", subtitle: "Articles & essays", icon: Notepad },
  { title: "Systems", subtitle: "Infra & tools", icon: Stack },
];

const proofCards = [
  {
    tag: "Personal AI",
    title: "PIN AI",
    body: "Personal AI workspace and agentic product systems for real user workflows.",
    action: "View project",
    accent: "green",
    shot: "pin-shot",
    icon: Brain,
  },
  {
    tag: "Evaluation",
    title: "MTEB",
    body: "Contributing to the benchmark and leaderboard ecosystem for embedding models.",
    action: "View PRs",
    accent: "blue",
    shot: "mteb-shot",
    icon: ChartLineUp,
  },
  {
    tag: "Mobile AI",
    title: "iOS + Local AI",
    body: "On-device models, local runtime work, and mobile-first product validation.",
    action: "See mobile work",
    accent: "red",
    shot: "mobile-shot",
    icon: Phone,
  },
];

const chips = [
  { label: "Personal AI", icon: Brain },
  { label: "Agent Workflows", icon: BracketsCurly },
  { label: "Mobile AI", icon: Phone },
  { label: "Evaluation", icon: ChartLineUp },
  { label: "Full-stack", icon: Code },
  { label: "Product Builder", icon: Lightning },
];

function Nav() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Smile Hu home">
        <span className="brand-mark">S</span>
        <span>Smile Hu</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a className="active" href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#notes">Notes</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-actions">
        <span className="sun" aria-hidden="true">
          <Sparkle size={20} weight="regular" />
        </span>
        <a className="connect-button" href="mailto:smiletoye@gmail.com">
          Let's connect
          <ArrowRight size={17} weight="bold" />
        </a>
      </div>
    </header>
  );
}

function HeroCopy() {
  return (
    <section className="hero-copy" aria-labelledby="hero-title">
      <div className="availability">
        <span />
        Available for meaningful AI work
      </div>
      <div className="index-rail" aria-hidden="true">
        <span>01</span>
        <i />
        <i />
        <i />
        <i />
        <span>05</span>
      </div>
      <h1 id="hero-title">Smile Hu</h1>
      <p className="hero-line">
        I turn context into <strong>shipped</strong> AI products.
      </p>
      <p className="hero-body">
        Trained on CS. Fine-tuned by Personal AI, mobile workflows, evaluation
        infrastructure, and full-stack shipping loops.
      </p>
      <div className="chip-grid" aria-label="Core capabilities">
        {chips.map(({ label, icon: Icon }) => (
          <span className="chip" key={label}>
            <Icon size={15} weight="duotone" />
            {label}
          </span>
        ))}
      </div>
      <div className="hero-actions">
        <a href="#work" className="primary-action">
          View my work
          <ArrowRight size={18} weight="bold" />
        </a>
        <a href="#notes" className="secondary-action">
          <BookOpen size={18} weight="regular" />
          Read notes
        </a>
      </div>
      <div className="social-row">
        <span>Find me on</span>
        <a href="https://github.com/SmileLikeYe" aria-label="GitHub">
          <GithubLogo size={21} weight="fill" />
        </a>
        <a href="https://x.com/Yeshujing" aria-label="X">
          <XLogo size={19} weight="bold" />
        </a>
        <a href="mailto:smiletoye@gmail.com" aria-label="Email">
          <EnvelopeSimple size={20} weight="regular" />
        </a>
        <a href="https://smileflow.cn" aria-label="Website">
          <Link size={19} weight="regular" />
        </a>
      </div>
    </section>
  );
}

function TrainingPanel() {
  return (
    <section className="training-panel" aria-label="Model training structure">
      <div className="pretraining panel-step">
        <span className="step-index blue">01</span>
        <h2>Pre-training</h2>
        <p>Foundation</p>
        <strong>Tongji University<br />Computer Science</strong>
        <div className="stack-list">
          {pretraining.map((item) => (
            <button type="button" key={item}>{item}</button>
          ))}
        </div>
      </div>

      <ModelCore />

      <div className="finetuning panel-step">
        <span className="step-index green">02</span>
        <h2>Fine-tuning</h2>
        <p>Adapters</p>
        <div className="adapter-list" id="skills">
          {adapters.map(({ title, subtitle, icon: Icon }) => (
            <button className="adapter" type="button" key={title}>
              <Icon size={23} weight="duotone" />
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <CheckCircle size={18} weight="fill" />
            </button>
          ))}
        </div>
      </div>

      <RuntimeContext />
      <Outputs />
      <EvalLoop />
    </section>
  );
}

function ModelCore() {
  return (
    <div className="model-core" aria-label="Smile Hu model core">
      <div className="core-title">
        <h2>Smile Hu</h2>
        <p>A-level Product Model</p>
      </div>
      <div className="core-orbit">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <img src="/assets/smile-hu-portrait.jpg" alt="Smile Hu portrait" />
      </div>
      <div className="core-stream stream-left" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => <span key={index} />)}
      </div>
      <div className="core-stream stream-right" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, index) => <span key={index} />)}
      </div>
      <div className="core-drip" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => <span key={index} />)}
      </div>
    </div>
  );
}

function RuntimeContext() {
  return (
    <div className="runtime-context">
      <span className="step-index blue">03</span>
      <h2>Runtime Context</h2>
      <p>Real-world input</p>
      <div>
        {contextItems.map((item) => (
          <button type="button" key={item}>{item}</button>
        ))}
      </div>
    </div>
  );
}

function Outputs() {
  return (
    <div className="outputs">
      <span className="step-index red">04</span>
      <h2>Outputs</h2>
      <p>Shipped value</p>
      <div className="output-list">
        {outputs.map(({ title, subtitle, icon: Icon }) => (
          <a href="#work" key={title}>
            <Icon size={22} weight="duotone" />
            <span>
              <strong>{title}</strong>
              <small>{subtitle}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function EvalLoop() {
  return (
    <div className="eval-loop">
      <span className="step-index amber">05</span>
      <h2>Evaluation Loop</h2>
      <p>Observe {"->"} Evaluate {"->"} Improve {"->"} Ship</p>
      <Pulse size={36} weight="duotone" />
    </div>
  );
}

function ProofSection() {
  return (
    <section className="proof-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p>Selected outputs</p>
        <h2 id="work-title">Proof that the model ships</h2>
      </div>
      <div className="proof-grid">
        {proofCards.map(({ tag, title, body, action, accent, shot, icon: Icon }) => (
          <article className={`proof-card ${accent}`} key={title}>
            <div className="proof-copy">
              <span className="proof-tag">
                <Icon size={16} weight="fill" />
                {tag}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <a href={title === "MTEB" ? "https://github.com/embeddings-benchmark/mteb/pulls/SmileLikeYe" : "#contact"}>
                {action}
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
            <div className={`proof-visual ${shot}`} aria-hidden="true">
              <img src="/reference/model-core-reference.png" alt="" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NotesSection() {
  return (
    <section className="notes-section" id="notes" aria-labelledby="notes-title">
      <div>
        <p>Field notes</p>
        <h2 id="notes-title">The training log stays public.</h2>
      </div>
      <div className="note-list">
        <a href="#notes">
          <span>01</span>
          <strong>How I use Codex to ship real products</strong>
          <small>Agent workflows, skills, and feedback loops</small>
        </a>
        <a href="#notes">
          <span>02</span>
          <strong>Why Personal AI needs mobile context</strong>
          <small>Local runtime, privacy, device constraints</small>
        </a>
        <a href="#notes">
          <span>03</span>
          <strong>Evaluation is a product surface</strong>
          <small>MTEB, leaderboard trust, benchmark UX</small>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <span>Let's build something meaningful.</span>
      <a href="https://github.com/SmileLikeYe"><GithubLogo size={20} weight="fill" /> GitHub</a>
      <a href="https://x.com/Yeshujing"><XLogo size={18} weight="bold" /> X / @Yeshujing</a>
      <a href="mailto:smiletoye@gmail.com"><EnvelopeSimple size={20} /> smiletoye@gmail.com</a>
      <a href="https://smileflow.cn"><Link size={19} /> smileflow.cn</a>
    </footer>
  );
}

export function App() {
  return (
    <main id="top">
      <Nav />
      <section className="hero-section">
        <HeroCopy />
        <TrainingPanel />
      </section>
      <ProofSection />
      <NotesSection />
      <Footer />
    </main>
  );
}

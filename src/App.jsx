import {
  ArrowRight,
  BookOpen,
  Brain,
  BracketsCurly,
  ChartLineUp,
  CheckCircle,
  Code,
  Cube,
  EnvelopeSimple,
  GithubLogo,
  Lightning,
  Link,
  Notepad,
  Phone,
  Pulse,
  RocketLaunch,
  Sparkle,
  Stack,
  TerminalWindow,
  XLogo,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { featuredPost, posts, writingTracks } from "./content/posts";

const pretraining = [
  "Computer Science",
  "Algorithms & Systems",
  "Databases",
  "Compilers",
  "AI Foundations",
];

const adapters = [
  { title: "PIN AI", subtitle: "Assistant", icon: Cube },
  { title: "MTEB", subtitle: "Eval", icon: ChartLineUp },
  { title: "Mobile AI", subtitle: "Runtime", icon: Phone },
  { title: "Codex Skills", subtitle: "Loops", icon: TerminalWindow },
  { title: "Agent Workflows", subtitle: "Workflow", icon: BracketsCurly },
];

const contextItems = ["User needs", "Product problems", "Codebase", "Research", "Feedback"];

const outputs = [
  { title: "Products", subtitle: "PIN AI, PINLOB", icon: RocketLaunch },
  { title: "Open Source", subtitle: "PRs & contributions", icon: GithubLogo },
  { title: "Writing", subtitle: "Markdown posts", icon: Notepad },
  { title: "Systems", subtitle: "Infra & tools", icon: Stack },
];

const proofCards = [
  {
    tag: "Personal AI",
    title: "PIN AI",
    body: "Your personal AI workspace for chat, search, writing, and shipping with multiple models.",
    action: "View project",
    accent: "green",
    image: "/assets/work-shots/pin-ai-workspace.png",
    icon: Brain,
  },
  {
    tag: "Evaluation",
    title: "MTEB",
    body: "Contributing to the evaluation ecosystem for embeddings and retrieval models.",
    action: "View PRs",
    accent: "blue",
    image: "/assets/work-shots/mteb-leaderboard.png",
    icon: ChartLineUp,
  },
  {
    tag: "Mobile AI",
    title: "iOS + Local AI",
    body: "On-device models, intelligent features, and fast mobile AI experiences.",
    action: "See mobile work",
    accent: "red",
    image: "/assets/work-shots/ios-local-ai.png",
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

const skillSystems = [
  {
    index: "S1",
    name: "Agent Harness",
    input: "Context, repo state, screenshots, product intent",
    loop: "Plan -> tool use -> inspect -> fix -> verify",
    output: "A working product surface, not just an answer",
  },
  {
    index: "S2",
    name: "Codex Skills",
    input: "Repeated delivery and debugging patterns",
    loop: "Capture the playbook, run it, tighten it after failure",
    output: "Reusable operating loops for future work",
  },
  {
    index: "S3",
    name: "Evaluation Stack",
    input: "Benchmarks, PRs, leaderboard trust, UX clarity",
    loop: "Compare -> explain -> validate -> publish",
    output: "MTEB and product evaluation work",
  },
  {
    index: "S4",
    name: "Mobile Runtime",
    input: "iOS constraints, local models, latency, privacy",
    loop: "Prototype -> device check -> runtime fallback -> polish",
    output: "On-device AI experiences that feel usable",
  },
];

function Nav() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Smile Hu home">
        <span className="brand-mark">S</span>
        <span>Smile Hu</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a className="active" href="#top">Model</a>
        <a href="#skills">Skills</a>
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
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
        <a href="#writing" className="secondary-action">
          <BookOpen size={18} weight="regular" />
          Read writing
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
    <section className="training-panel" id="skills" aria-label="Model training structure">
      <img
        className="training-flow-background"
        src="/assets/diagram/model-flow-background-portrait.png"
        alt=""
        aria-hidden="true"
      />

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
        <div className="adapter-list">
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
      <img className="model-photo" src="/assets/smile-hu-portrait.jpg" alt="Smile Hu portrait" />
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
          <a href={title === "Writing" ? "#writing" : "#work"} key={title}>
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
        {proofCards.map(({ tag, title, body, action, accent, image, icon: Icon }) => (
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
            <div className="proof-visual">
              <img src={image} alt={`${title} visual preview`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillSystemSection() {
  return (
    <section className="skill-os-section" id="about" aria-labelledby="skill-os-title">
      <div className="section-heading">
        <p>Skill OS</p>
        <h2 id="skill-os-title">The adapters behind the outputs.</h2>
      </div>
      <div className="skill-os-grid">
        {skillSystems.map((skill) => (
          <article className="skill-row" key={skill.name}>
            <span>{skill.index}</span>
            <div>
              <h3>{skill.name}</h3>
              <p>{skill.input}</p>
            </div>
            <div>
              <small>Loop</small>
              <strong>{skill.loop}</strong>
            </div>
            <div>
              <small>Output</small>
              <strong>{skill.output}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WritingSection() {
  const [selectedSlug, setSelectedSlug] = useState(featuredPost.slug);
  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) || featuredPost,
    [selectedSlug],
  );

  return (
    <section className="writing-section" id="writing" aria-labelledby="writing-title">
      <div className="writing-heading">
        <div>
          <p>Markdown writing</p>
          <h2 id="writing-title">The training log stays public.</h2>
        </div>
        <div className="writing-tracks" aria-label="Writing tracks">
          {writingTracks.map((track) => (
            <div key={track.name}>
              <strong>{track.count}</strong>
              <span>{track.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="writing-layout">
        <div className="post-list" aria-label="Articles">
          {posts.map((post, index) => (
            <button
              className={post.slug === selectedPost.slug ? "active" : ""}
              key={post.slug}
              type="button"
              onClick={() => setSelectedSlug(post.slug)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{post.type} / {post.adapter} / {post.readingTime}</small>
                <strong>{post.title}</strong>
                <p>{post.summary}</p>
              </div>
            </button>
          ))}
        </div>

        <article className="post-reader">
          <div className="post-reader-meta">
            <span>{selectedPost.status}</span>
            <span>{selectedPost.date}</span>
            <span>{selectedPost.readingTime}</span>
          </div>
          <h3>{selectedPost.title}</h3>
          <p className="post-summary">{selectedPost.summary}</p>
          <div className="post-tags">
            {selectedPost.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedPost.content}
            </ReactMarkdown>
          </div>
        </article>
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
      <SkillSystemSection />
      <WritingSection />
      <Footer />
    </main>
  );
}

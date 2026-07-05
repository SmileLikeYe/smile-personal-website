import {
  ArrowRight,
  BookOpen,
  Brain,
  BracketsCurly,
  ChartLineUp,
  CheckCircle,
  Cube,
  EnvelopeSimple,
  GithubLogo,
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
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, animate, domAnimation, m, useInView } from "motion/react";
import { featuredPost, posts, writingTracks } from "./content/posts";
import { about, heroStats, profile, projects } from "./content/site";

const MarkdownBody = lazy(() => import("./MarkdownBody"));

const easeOutStrong = [0.23, 1, 0.32, 1];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutStrong } },
};

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

const proofIcons = { "PIN AI": Brain, MTEB: ChartLineUp, "iOS + Local AI": Phone };

const chips = [
  { label: "Personal AI", icon: Brain },
  { label: "Agent Workflows", icon: BracketsCurly },
  { label: "Mobile AI", icon: Phone },
  { label: "Evaluation", icon: ChartLineUp },
];

const skillSystems = [
  {
    index: "S1",
    name: "Agent Harness",
    input: "Context, repo state, screenshots, product intent",
    loop: "Plan → tool use → inspect → fix → verify",
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
    loop: "Compare → explain → validate → publish",
    output: "MTEB and product evaluation work",
  },
  {
    index: "S4",
    name: "Mobile Runtime",
    input: "iOS constraints, local models, latency, privacy",
    loop: "Prototype → device check → runtime fallback → polish",
    output: "On-device AI experiences that feel usable",
  },
];

const navItems = [
  { id: "top", label: "Model" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Smile Hu home">
        <span className="brand-mark">S</span>
        <span>Smile Hu</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(({ id, label }) => (
          <a key={id} className={activeId === id ? "active" : ""} href={`#${id}`}>
            {label}
            {activeId === id && (
              <m.span
                className="nav-dot"
                layoutId="nav-dot"
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
              />
            )}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <span className="sun" aria-hidden="true">
          <Sparkle size={20} weight="regular" />
        </span>
        <a className="connect-button" href={`mailto:${profile.email}`}>
          Let's connect
          <ArrowRight size={17} weight="bold" />
        </a>
      </div>
    </header>
  );
}

function StatValue({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return undefined;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: easeOutStrong,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <strong ref={ref}>{target === null ? value : `${display}${suffix}`}</strong>;
}

function HeroCopy() {
  return (
    <m.section
      className="hero-copy"
      aria-labelledby="hero-title"
      variants={heroContainer}
      initial="hidden"
      animate="show"
    >
      <m.div className="availability" variants={heroItem}>
        <span />
        Available for meaningful AI work
      </m.div>
      <m.h1 id="hero-title" variants={heroItem}>{profile.name}</m.h1>
      <m.p className="hero-line" variants={heroItem}>
        {profile.headline[0]} <strong>{profile.headline[1]}</strong> {profile.headline[2]}
      </m.p>
      <m.p className="hero-body" variants={heroItem}>{profile.subline}</m.p>
      <m.div className="chip-grid" aria-label="Core capabilities" variants={heroItem}>
        {chips.map(({ label, icon: Icon }) => (
          <span className="chip" key={label}>
            <Icon size={15} weight="duotone" />
            {label}
          </span>
        ))}
      </m.div>
      <m.div className="hero-actions" variants={heroItem}>
        <a href="#work" className="primary-action">
          View my work
          <ArrowRight size={18} weight="bold" />
        </a>
        <a href="#writing" className="secondary-action">
          <BookOpen size={18} weight="regular" />
          Read writing
        </a>
      </m.div>
      <m.div className="hero-stats" aria-label="Track record" variants={heroItem}>
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <StatValue value={stat.value} />
            <span>{stat.label}</span>
            <small>{stat.note}</small>
          </div>
        ))}
      </m.div>
      <m.div className="social-row" variants={heroItem}>
        <span>Find me on</span>
        <a href={profile.github} aria-label="GitHub">
          <GithubLogo size={21} weight="fill" />
        </a>
        <a href={profile.x} aria-label="X">
          <XLogo size={19} weight="bold" />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <EnvelopeSimple size={20} weight="regular" />
        </a>
        <a href={profile.website} aria-label="Website">
          <Link size={19} weight="regular" />
        </a>
      </m.div>
    </m.section>
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
      <div className="panel-wash" aria-hidden="true" />

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
      <p>Observe → Evaluate → Improve → Ship</p>
      <Pulse size={36} weight="duotone" />
    </div>
  );
}

function ProofSection() {
  return (
    <section className="proof-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p><span className="section-index">01</span>Selected outputs</p>
        <h2 id="work-title">Proof that the model ships</h2>
      </div>
      <div className="proof-grid">
        {projects.map(({ tag, title, body, impact, stack, action, accent, image, href }, index) => {
          const Icon = proofIcons[title] || Brain;
          return (
            <article
              className={`proof-card ${accent}`}
              key={title}
              data-reveal=""
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="proof-copy">
                <span className="proof-tag">
                  <Icon size={16} weight="fill" />
                  {tag}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <p className="proof-impact">{impact}</p>
                <div className="proof-stack" aria-label={`${title} tech stack`}>
                  {stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={href} target="_blank" rel="noreferrer">
                  {action}
                  <ArrowRight size={16} weight="bold" />
                </a>
              </div>
              <div className="proof-visual">
                <img src={image} alt={`${title} visual preview`} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <p><span className="section-index">03</span>About</p>
        <h2 id="about-title">The person behind the model.</h2>
      </div>
      <div className="about-layout" data-reveal="">
        <div className="about-bio">
          {about.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <dl className="about-facts">
          {about.facts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function SkillSystemSection() {
  return (
    <section className="skill-os-section" aria-labelledby="skill-os-title">
      <div className="section-heading">
        <p><span className="section-index">02</span>Skill OS</p>
        <h2 id="skill-os-title">The adapters behind the outputs.</h2>
      </div>
      <div className="skill-os-grid">
        {skillSystems.map((skill, index) => (
          <article
            className="skill-row"
            key={skill.name}
            data-reveal=""
            style={{ animationDelay: `${index * 60}ms` }}
          >
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

function getHashSlug() {
  const match = window.location.hash.match(/^#post\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function WritingSection() {
  const [selectedSlug, setSelectedSlug] = useState(() => {
    const slug = getHashSlug();
    return slug && posts.some((post) => post.slug === slug) ? slug : featuredPost.slug;
  });
  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) || featuredPost,
    [selectedSlug],
  );

  useEffect(() => {
    if (getHashSlug()) {
      document.getElementById("writing")?.scrollIntoView();
    }
    const onHashChange = () => {
      const slug = getHashSlug();
      if (slug && posts.some((post) => post.slug === slug)) {
        setSelectedSlug(slug);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectPost = (slug) => {
    setSelectedSlug(slug);
    window.history.replaceState(null, "", `#post/${slug}`);
  };

  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#post/${selectedPost.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <section className="writing-section" id="writing" aria-labelledby="writing-title">
      <div className="writing-heading">
        <div>
          <p><span className="section-index">04</span>Markdown writing</p>
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
              onClick={() => selectPost(post.slug)}
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

        <AnimatePresence mode="wait" initial={false}>
        <m.article
          className="post-reader"
          key={selectedPost.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: easeOutStrong }}
        >
          <div className="post-reader-meta">
            <span>{selectedPost.status}</span>
            <span>{selectedPost.date}</span>
            <span>{selectedPost.readingTime}</span>
            <button className="copy-link" type="button" onClick={copyLink}>
              {copied ? <CheckCircle size={14} weight="fill" /> : <Link size={14} />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
          <h3>{selectedPost.title}</h3>
          <p className="post-summary">{selectedPost.summary}</p>
          <div className="post-tags">
            {selectedPost.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Suspense fallback={<div className="markdown-body markdown-loading">Loading…</div>}>
            <MarkdownBody content={selectedPost.content} />
          </Suspense>
        </m.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-cta">
        <p><span className="section-index">05</span>Contact</p>
        <h2>Let's build something meaningful.</h2>
        <p className="footer-note">
          Open to AI product and engineering roles. The fastest way to reach me is email.
        </p>
        <a className="primary-action" href={`mailto:${profile.email}`}>
          <EnvelopeSimple size={18} weight="regular" />
          {profile.email}
        </a>
      </div>
      <div className="footer-links">
        <a href={profile.github}><GithubLogo size={20} weight="fill" /> GitHub</a>
        <a href={profile.x}><XLogo size={18} weight="bold" /> X / @Yeshujing</a>
        <a href={profile.website}><Link size={19} /> smileflow.cn</a>
        <span>© 2026 Smile Hu · React + Vite · posts in Markdown</span>
      </div>
    </footer>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export function App() {
  useRevealOnScroll();
  return (
    <LazyMotion features={domAnimation} strict>
      <main>
        <Nav />
        <section className="hero-section" id="top">
          <HeroCopy />
          <TrainingPanel />
        </section>
        <ProofSection />
        <SkillSystemSection />
        <AboutSection />
        <WritingSection />
        <Footer />
      </main>
    </LazyMotion>
  );
}

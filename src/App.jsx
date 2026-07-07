import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  ChartLineUp,
  CheckCircle,
  Cube,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  Link,
  MagnifyingGlass,
  Notepad,
  Phone,
  Pulse,
  RocketLaunch,
  TerminalWindow,
  XLogo,
} from "@phosphor-icons/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useScroll } from "motion/react";
import { featuredPost, posts } from "./content/posts";
import { about, endpoints, loop, nowTraining, profile, projects, skills, statusLines } from "./content/site";

const MarkdownBody = lazy(() => import("./MarkdownBody"));

const easeOutStrong = [0.23, 1, 0.32, 1];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutStrong },
  },
};

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "writing", label: "WRITING" },
  { id: "skills", label: "SKILLS" },
  { id: "build", label: "BUILD" },
  { id: "contact", label: "CONTACT" },
];

function Nav({ resetKey }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setActiveId(null);
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(null);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [resetKey]);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Smile Hu home">
        Smile
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(({ id, label }, index) => (
          <span className="nav-item" key={id}>
            {index > 0 && <i className="nav-sep" aria-hidden="true" />}
            <a className={activeId === id ? "active" : ""} href={`#${id}`}>
              {label}
              {activeId === id && (
                <m.span
                  className="nav-dot"
                  layoutId="nav-dot"
                  transition={{ type: "spring", stiffness: 520, damping: 34 }}
                />
              )}
            </a>
          </span>
        ))}
      </nav>
      <div className="header-actions">
        <a className="header-github" href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
          <GithubLogo size={19} weight="fill" />
        </a>
        <a className="connect-button" href={`mailto:${profile.email}`}>
          Let's connect
          <ArrowRight size={15} weight="bold" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <m.section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      variants={heroContainer}
      initial="hidden"
      animate="show"
    >
      <div className="hero-left">
        <m.h1 className="hero-wordmark" id="hero-title" variants={heroItem}>
          {profile.name}
        </m.h1>
        <m.p className="hero-kicker" variants={heroItem}>
          <span className="dot" aria-hidden="true" />
          {profile.kicker}
        </m.p>
        <m.p className="hero-slogan" variants={heroItem}>
          {profile.slogan[0]}
          <br />
          {profile.slogan[1]}
        </m.p>
        <m.div className="hero-cta" variants={heroItem}>
          <a className="btn-ghost" href="#writing">
            阅读文章 <ArrowRight size={15} weight="bold" />
          </a>
          <a className="btn-link" href={`mailto:${profile.email}`}>
            联系我 <ArrowRight size={15} weight="bold" />
          </a>
        </m.div>
      </div>
      <TrainingPanel />
    </m.section>
  );
}

const pretraining = [
  "Computer Science",
  "Algorithms & Systems",
  "Databases",
  "Compilers",
  "AI Foundations",
];

// 02 Fine-tuning：真实经历，每一条都可点进去验证
const adapters = [
  { title: "PIN AI", subtitle: "Chief AI Engineer", icon: Cube, href: "https://www.pinai.com/" },
  { title: "Zhipu AI", subtitle: "FDE · 微调 / 共创", icon: BracketsCurly, href: "https://bigmodel.cn/" },
  { title: "SAP", subtitle: "Full-stack · 4 端", icon: Phone, href: "https://play.google.com/store/apps/details?id=b1.sales.mobile.android&hl=en_GB" },
  { title: "MTEB", subtitle: "2yr+ Contributor", icon: ChartLineUp, href: "https://github.com/embeddings-benchmark/mteb/" },
  { title: "agent-chief", subtitle: "Open Source", icon: TerminalWindow, href: "https://github.com/SmileLikeYe/agent-chief" },
];

const contextItems = ["User needs", "Product problems", "Codebase", "Research", "Feedback"];

// 04 Outputs：真实数字与产出
const outputs = [
  {
    title: "3M+ Users",
    subtitle: "PIN AI · consumer",
    icon: RocketLaunch,
    href: "https://x.com/pinai_io/status/1950915602983346431",
  },
  {
    title: "$10M Raised",
    subtitle: "PIN AI · funding",
    icon: ChartLineUp,
    href: "https://x.com/pinai_io/status/1833176031714541651",
  },
  {
    title: "Open Source",
    subtitle: "SDK · MTEB · chief",
    icon: GithubLogo,
    href: "https://github.com/SmileLikeYe",
  },
  { title: "Writing & Skills", subtitle: "文章 · adapter", icon: Notepad, href: "#writing" },
];

function TrainingPanel() {
  return (
    <section className="training-panel" aria-label="Smile Hu as a large model">
      <img
        className="training-flow-background"
        src="/assets/diagram/model-flow-background-portrait.webp"
        alt=""
        aria-hidden="true"
      />
      <div className="panel-wash" aria-hidden="true" />
      <div className="model-pulse-anchor" aria-hidden="true">
        <m.div
          className="model-pulse"
          animate={{ opacity: [0.12, 0.34, 0.12], scale: [0.92, 1.1, 0.92] }}
          transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

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

      <div className="model-core" aria-label="Smile Hu model core">
        <div className="core-title">
          <h2>Smile Hu</h2>
          <p>A-level Product Model</p>
        </div>
        <img className="model-photo" src="/assets/smile-hu-portrait.webp" alt="Smile Hu portrait" />
      </div>

      <div className="finetuning panel-step">
        <span className="step-index green">02</span>
        <h2>Fine-tuning</h2>
        <p>Adapters</p>
        <div className="adapter-list">
          {adapters.map(({ title, subtitle, icon: Icon, href }) => (
            <a className="adapter" href={href} target="_blank" rel="noreferrer" key={title}>
              <Icon size={23} weight="duotone" />
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <CheckCircle size={18} weight="fill" />
            </a>
          ))}
        </div>
      </div>

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

      <div className="outputs">
        <span className="step-index red">04</span>
        <h2>Outputs</h2>
        <p>Shipped value</p>
        <div className="output-list">
          {outputs.map(({ title, subtitle, icon: Icon, href }) => {
            const external = href.startsWith("http");
            return (
              <a
                href={href}
                key={title}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <Icon size={22} weight="duotone" />
                <span>
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="eval-loop">
        <span className="step-index amber">05</span>
        <h2>Evaluation Loop</h2>
        <p>Observe → Evaluate → Improve → Ship</p>
        <Pulse size={36} weight="duotone" />
      </div>
    </section>
  );
}

const platformIcons = {
  github: GithubLogo,
  x: XLogo,
  blog: Globe,
  skills: TerminalWindow,
};

function Endpoints() {
  return (
    <div className="endpoints" data-reveal="">
      <div className="ep-head">
        <h3>Serving Endpoints</h3>
        <span className="ep-uptime">
          <i className="ep-dot" aria-hidden="true" />
          SERVING
        </span>
      </div>
      <div className="ep-pipe" aria-label="内容管线：写、建、淀">
        {loop.map((step, index) => (
          <span key={step}>
            {index > 0 && <b aria-hidden="true">→</b>}
            {step}
          </span>
        ))}
      </div>
      <ul className="ep-list">
        {endpoints.map(({ platform, path, href, status, note }) => {
          const Icon = platformIcons[platform];
          const inner = (
            <>
              <span className={`ep-logo ep-logo-${platform}`}>
                {Icon ? <Icon size={14} weight="fill" /> : <b>红</b>}
              </span>
              <span className="ep-path">{path}</span>
              <span className="ep-note">{note}</span>
              <span className={`ep-status ep-status-${status === "200" ? "ok" : "soon"}`}>
                {status === "200" ? "200" : "SOON"}
              </span>
            </>
          );
          return (
            <li className={status === "200" ? "ep-row" : "ep-row ep-row-soon"} key={path}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <span className="ep-inner">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="ep-foot">内容在本站沉淀，再分发到各端点。</p>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-left">
        <p className="section-kicker" data-reveal="">
          ABOUT — 01
        </p>
        <h2 className="section-title" id="about-title" data-reveal="">
          About me
        </h2>
        <div className="about-bio" data-reveal="">
          {about.bio.map((line) => (
            <p key={line.slice(0, 12)}>{line}</p>
          ))}
        </div>
        <dl className="about-specs" data-reveal="">
          {about.specs.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="about-right">
        <Endpoints />
      </div>
    </section>
  );
}

function getHashRoute() {
  const hash = window.location.hash;
  const postMatch = hash.match(/^#post\/(.+)$/);
  if (postMatch) {
    const slug = decodeURIComponent(postMatch[1]);
    const post = posts.find((item) => item.slug === slug);
    if (post) return { type: "post", post };
  }
  const libraryMatch = hash.match(/^#library(?:\/(\w+))?$/);
  if (libraryMatch) {
    return { type: "library", tab: libraryMatch[1] === "skills" ? "skills" : "posts" };
  }
  return null;
}

function formatDate(date) {
  return (date || "").replaceAll("-", ".");
}

function PostMeta({ post }) {
  return (
    <div className="post-meta">
      <span className="post-tag">{post.adapter}</span>
      <i className="dotsep" aria-hidden="true" />
      <span>{post.readingTime}</span>
    </div>
  );
}

function CkptRow({ post, ckptNumber, delay = 0 }) {
  const isFeatured = post.slug === featuredPost.slug;
  return (
    <a
      className={isFeatured ? "ckpt ckpt-featured" : "ckpt"}
      href={`#post/${post.slug}`}
      data-reveal=""
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="ckpt-id">
        ckpt-{String(ckptNumber).padStart(2, "0")}
        {isFeatured && <em>★ FEATURED</em>}
      </span>
      <span className="ckpt-body">
        <strong className="ckpt-title">{post.title}</strong>
        {isFeatured && <span className="ckpt-dek">{post.summary}</span>}
        <PostMeta post={post} />
      </span>
      <span className="ckpt-date">{formatDate(post.date)}</span>
      <ArrowUpRight className="ckpt-arr" size={16} weight="bold" />
    </a>
  );
}

function WritingSection() {
  const recent = posts.slice(0, 4);
  return (
    <section className="writing" id="writing" aria-labelledby="writing-title">
      <SectionHead index="02" kicker="WRITING" title="Training Log">
        <p className="section-note" data-reveal="">
          写 — WRITE · 训练日志
          <br />
          每篇文章是一次 checkpoint
        </p>
      </SectionHead>

      <div className="tlog">
        {recent.map((post, index) => (
          <CkptRow
            post={post}
            ckptNumber={posts.length - posts.indexOf(post)}
            delay={index * 45}
            key={post.slug}
          />
        ))}
      </div>
      <a className="more-link" href="#library" data-reveal="">
        全部文章 {posts.length} 篇 · 可搜索 <ArrowRight size={14} weight="bold" />
      </a>
    </section>
  );
}

function SectionHead({ index, kicker, title, children }) {
  return (
    <header className="section-head">
      <p className="section-kicker" data-reveal="">
        {kicker} — {index}
      </p>
      <div className="section-head-row">
        <h2 className="section-title" data-reveal="">
          {title}
        </h2>
        {children}
      </div>
    </header>
  );
}

function SkillRow({ skill, delay = 0 }) {
  const { index, name, zh, desc, status, href, post } = skill;
  return (
    <article className="skill-row" data-reveal="" style={{ animationDelay: `${delay}ms` }}>
      <span className="skill-idx">{index}</span>
      <div className="skill-main">
        <h3>
          {zh}
          <code>{name}</code>
        </h3>
        <p>{desc}</p>
      </div>
      <div className="skill-side">
        <span className={`status-pill status-${status}`}>
          {status === "live" ? "LIVE" : "SOON"}
        </span>
        <span className="skill-links">
          {href && (
            <a href={href} target="_blank" rel="noreferrer">
              源码 <ArrowUpRight size={13} weight="bold" />
            </a>
          )}
          {post && (
            <a href={`#post/${post}`}>
              文章 <ArrowRight size={13} weight="bold" />
            </a>
          )}
        </span>
      </div>
    </article>
  );
}

function SkillsSection() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <SectionHead index="03" kicker="SKILLS" title="Adapters">
        <p className="section-note" data-reveal="">
          淀 — DISTILL · 把重复的工作方式
          <br />
          炼成可安装的 adapter
        </p>
      </SectionHead>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <SkillRow skill={skill} delay={index * 50} key={skill.name} />
        ))}
      </div>
      <a className="more-link" href="#library/skills" data-reveal="">
        在 Library 查看全部 skills <ArrowRight size={14} weight="bold" />
      </a>
    </section>
  );
}

function BuildSection() {
  return (
    <section className="build" id="build" aria-labelledby="build-title">
      <SectionHead index="04" kicker="BUILD" title="Build">
        <p className="section-note" data-reveal="">
          建 — BUILD · 每一条战绩
          <br />
          都有可验证的链接
        </p>
      </SectionHead>

      <div className="build-list">
        {projects.map(({ tag, title, role, body, stack, status, href, links }, index) => (
          <div className="project-row" key={title} data-reveal="" style={{ animationDelay: `${index * 50}ms` }}>
            <span className="project-idx">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-main">
              <h3>
                <a className="project-title-link" href={href} target="_blank" rel="noreferrer">
                  {title}
                  <ArrowUpRight size={15} weight="bold" />
                </a>
                <span className="project-tag">{tag}</span>
              </h3>
              <p className="project-role">{role}</p>
              <p>{body}</p>
              <span className="project-links">
                {links.map(({ label, href: linkHref }) => (
                  <a href={linkHref} target="_blank" rel="noreferrer" key={label}>
                    {label} <ArrowUpRight size={12} weight="bold" />
                  </a>
                ))}
              </span>
            </div>
            <div className="project-side">
              <span className={`status-pill status-${status === "SHIPPED" ? "live" : "soon"}`}>{status}</span>
              <span className="project-stack">{stack.join(" · ")}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="build-foot" data-reveal="">
        <p className="now-training">
          <span>now training :</span> {nowTraining.join(" · ")}
        </p>
        <a className="build-cta" href={profile.github} target="_blank" rel="noreferrer">
          <GithubLogo size={15} weight="fill" /> 在 GitHub 围观 <ArrowRight size={14} weight="bold" />
        </a>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div className="contact-left">
          <p className="section-kicker" data-reveal="">
            CONTACT — 05
          </p>
          <h2 className="section-title" id="contact-title" data-reveal="">
            Let's talk.
          </h2>
          <p className="contact-sub" data-reveal="">
            聊聊 personal AI、agent harness，
            <br />
            或者一起把想法做出来。
          </p>
          <p className="contact-status" data-reveal="">
            <span className="pulse" aria-hidden="true" />
            当前开放机会 · Available
          </p>
          <TypeLine />
        </div>
        <div className="contact-list" data-reveal="">
          <a className="crow" href={`mailto:${profile.email}`}>
            <span className="crow-label">
              <EnvelopeSimple size={15} weight="regular" /> EMAIL
            </span>
            <span className="crow-value">{profile.email}</span>
            <ArrowRight className="crow-arr" size={15} weight="bold" />
          </a>
          <a className="crow" href={profile.x} target="_blank" rel="noreferrer">
            <span className="crow-label">
              <XLogo size={14} weight="bold" /> X
            </span>
            <span className="crow-value">{profile.xHandle}</span>
            <ArrowRight className="crow-arr" size={15} weight="bold" />
          </a>
          <a className="crow" href={profile.github} target="_blank" rel="noreferrer">
            <span className="crow-label">
              <GithubLogo size={14} weight="fill" /> GITHUB
            </span>
            <span className="crow-value">{profile.githubHandle}</span>
            <ArrowRight className="crow-arr" size={15} weight="bold" />
          </a>
          <div className="crow crow-soon">
            <span className="crow-label">微信 / 小红书</span>
            <span className="crow-value">内容分发筹备中</span>
            <span className="crow-tag">SOON</span>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <span className="footer-loop">
          <i className="loop-ring" aria-hidden="true" />
          eval loop running
        </span>
        <span>© 2026 Smile Hu · React + Vite · 内容用 Markdown 维护</span>
        <a href="#top" className="to-top">
          回到顶部 ↑
        </a>
      </footer>
    </section>
  );
}

function TypeLine() {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(statusLines[0]);
      return undefined;
    }
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const full = statusLines[line];
      if (!deleting) {
        char += 1;
        setText(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(tick, 2400);
          return;
        }
      } else {
        char -= 1;
        setText(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % statusLines.length;
        }
      }
      timer = setTimeout(tick, deleting ? 26 : 62);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="type-line" aria-hidden="true">
      <span className="type-prompt">$</span> {text}
      <i className="type-caret" />
    </p>
  );
}

function PostPage({ post }) {
  const { scrollYProgress } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#post/${post.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const goBack = () => {
    window.location.hash = "#writing";
  };

  return (
    <m.main
      className="post-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.26, ease: easeOutStrong }}
    >
      <m.div className="read-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <article className="post-article">
        <div className="reader-bar">
          <button className="btn-back" type="button" onClick={goBack}>
            <ArrowLeft size={14} weight="bold" /> 全部文章
          </button>
          <div className="reader-meta">
            <span>{post.status}</span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
            <button className="copy-link" type="button" onClick={copyLink}>
              {copied ? <CheckCircle size={14} weight="fill" /> : <Link size={14} />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>
        <h1 className="reader-title">{post.title}</h1>
        <p className="reader-summary">{post.summary}</p>
        <div className="reader-tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Suspense fallback={<div className="markdown-body markdown-loading">Loading…</div>}>
          <MarkdownBody content={post.content} />
        </Suspense>
        <div className="post-page-foot">
          <button className="btn-back" type="button" onClick={goBack}>
            <ArrowLeft size={14} weight="bold" /> 返回全部文章
          </button>
          <button
            className="to-top-btn"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            回到顶部 ↑
          </button>
        </div>
      </article>
    </m.main>
  );
}

function LibraryPage({ initialTab }) {
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const q = query.trim().toLowerCase();
  const filteredPosts = posts.filter(
    (post) =>
      !q ||
      [post.title, post.summary, post.adapter, ...(post.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q),
  );
  const filteredSkills = skills.filter(
    (skill) => !q || [skill.zh, skill.name, skill.desc].join(" ").toLowerCase().includes(q),
  );

  const goBack = () => {
    window.location.hash = tab === "skills" ? "#skills" : "#writing";
  };

  return (
    <m.main
      className="library-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.26, ease: easeOutStrong }}
    >
      <div className="library-inner">
        <div className="reader-bar">
          <button className="btn-back" type="button" onClick={goBack}>
            <ArrowLeft size={14} weight="bold" /> 返回
          </button>
          <span className="library-count">
            {tab === "posts" ? `${filteredPosts.length} / ${posts.length} 篇` : `${filteredSkills.length} / ${skills.length} 个`}
          </span>
        </div>

        <p className="section-kicker">LIBRARY · 全部沉淀</p>
        <h1 className="section-title library-title">Library</h1>

        <div className="library-controls">
          <div className="library-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "posts"}
              className={tab === "posts" ? "active" : ""}
              onClick={() => setTab("posts")}
            >
              文章 {posts.length}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "skills"}
              className={tab === "skills" ? "active" : ""}
              onClick={() => setTab("skills")}
            >
              Skills {skills.length}
            </button>
          </div>
          <label className="library-search">
            <MagnifyingGlass size={15} />
            <input
              type="search"
              value={query}
              placeholder={tab === "posts" ? "搜索标题 / 摘要 / 标签…" : "搜索 skill…"}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {tab === "posts" ? (
          <div className="tlog library-list">
            {filteredPosts.map((post) => (
              <CkptRow post={post} ckptNumber={posts.length - posts.indexOf(post)} key={post.slug} />
            ))}
            {filteredPosts.length === 0 && (
              <p className="library-empty">没有匹配「{query}」的文章 —— 换个关键词试试。</p>
            )}
          </div>
        ) : (
          <div className="skill-list library-list">
            {filteredSkills.map((skill) => (
              <SkillRow skill={skill} key={skill.name} />
            ))}
            {filteredSkills.length === 0 && (
              <p className="library-empty">没有匹配「{query}」的 skill —— 换个关键词试试。</p>
            )}
          </div>
        )}
      </div>
    </m.main>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
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
    const observe = () => {
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((element) => {
        observer.observe(element);
      });
    };
    observe();
    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

function useHashRoute() {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

export function App() {
  useRevealOnScroll();
  const route = useHashRoute();
  const routeKey = route ? (route.type === "post" ? route.post.slug : "library") : "home";

  useEffect(() => {
    if (route) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [routeKey]);

  // 从二级页返回首页时，等首页挂载完再定位到对应区块
  const onExitComplete = () => {
    if (!getHashRoute()) {
      const target = window.location.hash.replace("#", "") || "writing";
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
      });
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <Nav resetKey={routeKey} />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        {route?.type === "post" ? (
          <PostPage post={route.post} key={route.post.slug} />
        ) : route?.type === "library" ? (
          <LibraryPage initialTab={route.tab} key="library" />
        ) : (
          <m.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Hero />
            <AboutSection />
            <WritingSection />
            <SkillsSection />
            <BuildSection />
            <ContactSection />
          </m.main>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

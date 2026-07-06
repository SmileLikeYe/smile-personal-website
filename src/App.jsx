import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChatCircleDots,
  CheckCircle,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  Link,
  TerminalWindow,
  XLogo,
} from "@phosphor-icons/react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { featuredPost, posts } from "./content/posts";
import { about, channels, marquee, model, profile, projects, queued, skills } from "./content/site";

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

const platformIcons = {
  github: GithubLogo,
  x: XLogo,
  blog: Globe,
  skills: TerminalWindow,
};

function Nav() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
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
  }, []);

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

function PageDecor() {
  return (
    <>
      <div className="rail" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <span className="cross cross-tr" aria-hidden="true" />
      <span className="cross cross-bl" aria-hidden="true" />
    </>
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
      <ModelCard />
    </m.section>
  );
}

const modelCardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};

const modelRow = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutStrong } },
};

function ModelCard() {
  return (
    <m.aside className="model-card" variants={modelCardStagger} aria-label="Smile Hu 模型规格卡">
      <m.div className="mc-head" variants={modelRow}>
        <span>{model.id}</span>
        <i className="mc-dot" aria-hidden="true" />
      </m.div>
      <m.div className="mc-row" variants={modelRow}>
        <small>CONTEXT IN</small>
        <p>{model.context.join(" · ")}</p>
      </m.div>
      <m.span className="mc-link" variants={modelRow} aria-hidden="true" />
      <m.figure className="mc-core" variants={modelRow}>
        <span className="mc-frame">
          <img src="/assets/smile-hu-portrait.jpg" alt="Smile Hu" />
          <span className="portrait-cross portrait-cross-tl" aria-hidden="true" />
          <span className="portrait-cross portrait-cross-br" aria-hidden="true" />
        </span>
        <figcaption>
          <b>{model.grade}</b>
          <small>{model.pretrain}</small>
        </figcaption>
      </m.figure>
      <m.span className="mc-link" variants={modelRow} aria-hidden="true" />
      <m.div className="mc-row" variants={modelRow}>
        <small>ADAPTERS</small>
        <span className="mc-chips">
          {model.adapters.map((adapter) => (
            <span key={adapter}>{adapter}</span>
          ))}
        </span>
      </m.div>
      <m.span className="mc-link" variants={modelRow} aria-hidden="true" />
      <m.div className="mc-row" variants={modelRow}>
        <small>OUTPUTS</small>
        <p>{model.outputs.join(" · ")}</p>
      </m.div>
      <m.div className="mc-foot" variants={modelRow}>
        {model.evalLoop}
      </m.div>
    </m.aside>
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

function SignalBoard() {
  return (
    <div className="signal" data-reveal="">
      <div className="signal-head">
        <h3>全平台信号台</h3>
        <span className="signal-legend">
          <b>LIVE</b> / SOON
        </span>
      </div>
      <ul className="signal-list">
        {channels.map(({ platform, handle, href, count, status }) => {
          const Icon = platformIcons[platform];
          const inner = (
            <>
              <span className={`srow-logo srow-logo-${platform}`}>
                {Icon ? <Icon size={15} weight="fill" /> : <b>红</b>}
              </span>
              <span className="srow-handle">{handle}</span>
              <span className="srow-count">{count}</span>
              <span className="srow-bars" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i />
              </span>
              <span className="srow-status">
                <i className="srow-dot" aria-hidden="true" />
                {status === "live" ? "LIVE" : "SOON"}
              </span>
            </>
          );
          return (
            <li className={`srow srow-${status}`} key={platform}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <span className="srow-inner">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
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
        <div className="flow" data-reveal="" aria-label="工作循环：写、建、淀">
          {about.flow.map(({ zh, en }, index) => (
            <span className="flow-step" key={en}>
              {index > 0 && <span className="flow-link" aria-hidden="true" />}
              <span className="flow-node">
                <b>{zh}</b>
                <small>{en}</small>
              </span>
            </span>
          ))}
        </div>
        <SignalBoard />
      </div>
    </section>
  );
}

function getHashSlug() {
  const match = window.location.hash.match(/^#post\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function formatDate(date) {
  return (date || "").replaceAll("-", ".");
}

function PostMeta({ post }) {
  return (
    <div className="post-meta">
      <span className="post-tag">{post.adapter}</span>
      <i className="dotsep" aria-hidden="true" />
      <span>{formatDate(post.date)}</span>
      <i className="dotsep" aria-hidden="true" />
      <span>{post.readingTime}</span>
    </div>
  );
}

function WritingSection() {
  const [selectedSlug, setSelectedSlug] = useState(() => {
    const slug = getHashSlug();
    return slug && posts.some((post) => post.slug === slug) ? slug : null;
  });
  const [showAll, setShowAll] = useState(false);
  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) || null,
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
        document.getElementById("writing")?.scrollIntoView();
      } else {
        setSelectedSlug(null);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openPost = (slug) => {
    setSelectedSlug(slug);
    window.history.replaceState(null, "", `#post/${slug}`);
    document.getElementById("writing")?.scrollIntoView();
  };

  const closePost = () => {
    setSelectedSlug(null);
    window.history.replaceState(null, "", "#writing");
    document.getElementById("writing")?.scrollIntoView();
  };

  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    if (!selectedPost) return;
    const url = `${window.location.origin}${window.location.pathname}#post/${selectedPost.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const listPosts = posts.filter((post) => post.slug !== featuredPost.slug);
  const visiblePosts = showAll ? listPosts : listPosts.slice(0, 3);

  return (
    <section className="writing" id="writing" aria-labelledby="writing-title">
      <SectionHead index="02" kicker="WRITING" title="Writing">
        <p className="section-note" data-reveal="">
          写 — WRITE · 先在这里沉淀
          <br />
          再分发到 GitHub / 小红书
        </p>
      </SectionHead>

      <AnimatePresence mode="wait" initial={false}>
        {selectedPost ? (
          <m.article
            className="post-reader"
            key={selectedPost.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: easeOutStrong }}
          >
            <div className="reader-bar">
              <button className="btn-back" type="button" onClick={closePost}>
                <ArrowLeft size={14} weight="bold" /> 全部文章
              </button>
              <div className="reader-meta">
                <span>{selectedPost.status}</span>
                <span>{formatDate(selectedPost.date)}</span>
                <span>{selectedPost.readingTime}</span>
                <button className="copy-link" type="button" onClick={copyLink}>
                  {copied ? <CheckCircle size={14} weight="fill" /> : <Link size={14} />}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
            <h3 className="reader-title">{selectedPost.title}</h3>
            <p className="reader-summary">{selectedPost.summary}</p>
            <div className="reader-tags">
              {selectedPost.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Suspense fallback={<div className="markdown-body markdown-loading">Loading…</div>}>
              <MarkdownBody content={selectedPost.content} />
            </Suspense>
          </m.article>
        ) : (
          <m.div
            className="writing-grid"
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: easeOutStrong }}
          >
            <button className="feat" type="button" onClick={() => openPost(featuredPost.slug)} data-reveal="">
              <span className="feat-idx">01</span>
              <h3 className="feat-title">{featuredPost.title}</h3>
              <p className="feat-dek">{featuredPost.summary}</p>
              <PostMeta post={featuredPost} />
              <span className="feat-read">
                阅读 <ArrowRight size={14} weight="bold" />
              </span>
            </button>

            <div className="writing-list">
              {visiblePosts.map((post, index) => (
                <button
                  className="wpost"
                  type="button"
                  key={post.slug}
                  onClick={() => openPost(post.slug)}
                  data-reveal=""
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="wpost-idx">{String(index + 2).padStart(2, "0")}</span>
                  <span className="wpost-body">
                    <strong className="wpost-title">{post.title}</strong>
                    <PostMeta post={post} />
                  </span>
                  <ArrowUpRight className="wpost-arr" size={16} weight="bold" />
                </button>
              ))}
              {listPosts.length > 3 && (
                <button className="writing-all" type="button" onClick={() => setShowAll((value) => !value)}>
                  {showAll ? "收起" : `全部文章 ${posts.length} 篇`} <ArrowRight size={14} weight="bold" />
                </button>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <SectionHead index="03" kicker="SKILLS" title="Skills">
        <p className="section-note" data-reveal="">
          淀 — DISTILL · 把重复的工作方式
          <br />
          沉淀成可安装的 skill
        </p>
      </SectionHead>
      <div className="skill-list">
        {skills.map(({ index, name, zh, desc, status, href, post }, i) => (
          <article className="skill-row" key={name} data-reveal="" style={{ animationDelay: `${i * 50}ms` }}>
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
        ))}
      </div>
    </section>
  );
}

const gitlog = [
  { hash: "28722ce", msg: "feat: monad editorial restyle" },
  { hash: "08fd333", msg: "feat: motion interactions" },
  { hash: "8b870ab", msg: "feat: ai-design skill" },
  { hash: "HEAD", msg: "build: in public", head: true },
];

function BuildSection() {
  return (
    <section className="build" id="build" aria-labelledby="build-title">
      <SectionHead index="04" kicker="BUILD" title="Build">
        <p className="section-note" data-reveal="">
          建 — BUILD · 公开建造中
          <br />
          本站源码也在 GitHub
        </p>
      </SectionHead>

      <div className="build-layout">
        <div className="build-list">
          {projects.map(({ tag, title, body, impact, stack, href, status }, index) => (
            <a
              className="project-row"
              href={href}
              target="_blank"
              rel="noreferrer"
              key={title}
              data-reveal=""
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="project-idx">{String(index + 1).padStart(2, "0")}</span>
              <div className="project-main">
                <h3>
                  {title}
                  <span className="project-tag">{tag}</span>
                </h3>
                <p>{body}</p>
                <p className="project-impact">{impact}</p>
              </div>
              <div className="project-side">
                <span className={`status-pill status-${status === "SHIPPED" ? "live" : "soon"}`}>{status}</span>
                <span className="project-stack">{stack.join(" · ")}</span>
                <ArrowUpRight className="project-arr" size={16} weight="bold" />
              </div>
            </a>
          ))}
        </div>

        <aside className="build-aside" data-reveal="" aria-hidden="true">
          <div className="gitlog">
            <span className="gitlog-branch">⊖ main ——</span>
            {gitlog.map(({ hash, msg, head }) => (
              <span className={`gitlog-row${head ? " gitlog-head" : ""}`} key={hash}>
                <i />
                <b>{hash}</b>
                <em>{msg}</em>
              </span>
            ))}
          </div>
          <div className="queue">
            <span className="queue-label">queued {"{"}</span>
            <ul>
              {queued.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="queue-label">{"}"}</span>
          </div>
          <a
            className="build-cta"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-hidden="false"
          >
            <GithubLogo size={15} weight="fill" /> 在 GitHub 围观 <ArrowRight size={14} weight="bold" />
          </a>
        </aside>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-center">
        <p className="contact-kicker" data-reveal="">
          <span className="ln" aria-hidden="true" />
          GET IN TOUCH / 联系
          <span className="ln" aria-hidden="true" />
        </p>
        <h2 className="contact-title" id="contact-title" data-reveal="">
          Let's talk.
          <svg className="contact-underline" viewBox="0 0 360 18" preserveAspectRatio="none" aria-hidden="true">
            <path d="M12 13 Q 180 3, 348 11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </h2>
        <p className="contact-sub" data-reveal="">
          聊聊 AI 产品、Agent，或者一起把想法做出来。
        </p>
        <p className="contact-status" data-reveal="">
          <span className="pulse" aria-hidden="true" />
          当前开放机会 · Available
        </p>
      </div>

      <div className="contact-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{marquee.repeat(4)}</span>
          <span>{marquee.repeat(4)}</span>
        </div>
      </div>

      <div className="contact-bar">
        <a className="cbar-item" href={`mailto:${profile.email}`}>
          <span className="cbar-label">EMAIL</span>
          <span className="cbar-value">{profile.email}</span>
          <ArrowRight className="cbar-arr" size={15} weight="bold" />
        </a>
        <a className="cbar-item" href={profile.x} target="_blank" rel="noreferrer">
          <span className="cbar-label">
            <XLogo size={14} weight="bold" /> X
          </span>
          <span className="cbar-value">{profile.xHandle}</span>
          <ArrowRight className="cbar-arr" size={15} weight="bold" />
        </a>
        <a className="cbar-item" href={profile.github} target="_blank" rel="noreferrer">
          <span className="cbar-label">
            <GithubLogo size={14} weight="fill" /> GITHUB
          </span>
          <span className="cbar-value">{profile.githubHandle}</span>
          <ArrowRight className="cbar-arr" size={15} weight="bold" />
        </a>
        <div className="cbar-item cbar-soon">
          <span className="cbar-label">
            <ChatCircleDots size={14} weight="fill" /> 微信 / 小红书
          </span>
          <span className="cbar-value">内容分发筹备中</span>
          <span className="cbar-tag">SOON</span>
        </div>
      </div>

      <footer className="site-footer">
        <span>© 2026 Smile Hu · React + Vite · 内容用 Markdown 维护</span>
        <a href="#top" className="to-top">
          回到顶部 ↑
        </a>
      </footer>
    </section>
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

export function App() {
  useRevealOnScroll();
  return (
    <LazyMotion features={domAnimation} strict>
      <PageDecor />
      <main>
        <Nav />
        <Hero />
        <AboutSection />
        <WritingSection />
        <SkillsSection />
        <BuildSection />
        <ContactSection />
      </main>
    </LazyMotion>
  );
}

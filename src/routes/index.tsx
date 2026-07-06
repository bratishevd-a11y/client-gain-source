import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Target,
  BarChart3,
  Zap,
  Layers,
  Award,
  ShieldCheck,
  Search,
  Megaphone,
  Globe,
  Cog,
  Sparkles,
  Star,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import heroImg from "@/assets/hero-dashboard.jpg";
import { useCountUp } from "@/components/landing/useCountUp";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* -------------------- Shared UI -------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border hairline bg-[var(--color-card)]/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[var(--color-muted-foreground)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  href = "#cta",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: "var(--gradient-accent)",
        boxShadow: "var(--shadow-glow)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function GhostButton({
  children,
  href = "#cases",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border hairline bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </a>
  );
}

/* -------------------- Header -------------------- */

const nav = [
  { href: "#home", label: "Главная" },
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#process", label: "Этапы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b hairline bg-[var(--color-background)]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between md:h-[90px]">
        <a href="#home" className="flex items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl font-extrabold text-white"
            style={{ background: "var(--gradient-accent)" }}
          >
            L
          </span>
          <span className="text-lg font-extrabold tracking-tight">Leadflow</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[var(--color-muted-foreground)] transition-colors duration-300 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <PrimaryButton href="#cta">Получить клиентов</PrimaryButton>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border hairline lg:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t hairline bg-[var(--color-background)]/95 backdrop-blur-xl lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-[var(--color-muted-foreground)] transition hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <div className="pt-2">
              <PrimaryButton href="#cta" className="w-full">
                Получить клиентов
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -80]);
  const y2 = useTransform(scrollY, [0, 800], [0, 60]);
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 md:pt-40 lg:min-h-screen lg:pt-44"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-40 [background:radial-gradient(circle_at_50%_0%,oklch(0.68_0.17_240/0.3),transparent_60%)]" />
      <div className="container-x grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border hairline bg-white/[0.03] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            Агентство лидогенерации
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[64px]">
            Получайте поток клиентов в{" "}
            <span className="text-gradient">свой бизнес</span> уже через 7 дней
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-muted-foreground)]">
            Настраиваем рекламу, создаём воронки и приводим только
            заинтересованных клиентов. Прозрачно, предсказуемо, с гарантией
            результата.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton href="#cta">Получить консультацию</PrimaryButton>
            <GhostButton href="#cases">Смотреть кейсы</GhostButton>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              "Более 200 проектов",
              "До 300 заявок в месяц",
              "Работаем по всему СНГ",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
          style={{ y: y1 }}
        >
          <motion.div
            style={{ y: y2 }}
            className="absolute -inset-8 -z-10 rounded-[40px] opacity-70 blur-3xl"
          >
            <div
              className="h-full w-full rounded-[40px]"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, oklch(0.68 0.17 240 / 0.55), transparent 70%)",
              }}
            />
          </motion.div>
          <div className="relative overflow-hidden rounded-3xl border hairline bg-[var(--color-card)]/40 p-2 shadow-[var(--shadow-card)] backdrop-blur">
            <img
              src={heroImg}
              alt="Панель аналитики: заявки, воронки продаж, рост показателей"
              width={1280}
              height={1280}
              className="h-auto w-full rounded-2xl"
            />
          </div>
          <FloatingChip
            className="left-4 top-8 sm:-left-6"
            icon={<Sparkles className="h-4 w-4" />}
            title="+327% заявок"
            sub="за 2 месяца"
          />
          <FloatingChip
            className="bottom-6 right-4 sm:-right-6"
            icon={<BarChart3 className="h-4 w-4" />}
            title="ROAS 6.4×"
            sub="средний по кампаниям"
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingChip({
  className = "",
  icon,
  title,
  sub,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className={`absolute z-10 flex items-center gap-3 rounded-2xl border hairline bg-[var(--color-card)]/90 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl ${className}`}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-xl text-white"
        style={{ background: "var(--gradient-accent)" }}
      >
        {icon}
      </span>
      <div>
        <div className="text-sm font-bold leading-none">{title}</div>
        <div className="mt-1 text-xs text-[var(--color-muted-foreground)]">{sub}</div>
      </div>
    </motion.div>
  );
}

/* -------------------- Why us -------------------- */

const whyCards = [
  { icon: Target, title: "Работаем на результат", desc: "Оплата привязана к KPI: заявки, сделки, ROI. Отвечаем цифрами, а не отчётами ради отчётов." },
  { icon: BarChart3, title: "Прозрачная аналитика", desc: "Ежедневный дашборд со всеми метриками — от кликов до сделок в CRM." },
  { icon: Zap, title: "Оптимизация рекламы", desc: "Тестируем гипотезы каждую неделю: креативы, аудитории, посадочные, ставки." },
  { icon: Layers, title: "Сквозная аналитика", desc: "Собираем данные от первого касания до продажи — знаем стоимость каждого рубля." },
  { icon: Award, title: "Опыт более 5 лет", desc: "200+ реализованных проектов в 40+ нишах. Знаем, что работает в вашей." },
  { icon: ShieldCheck, title: "Полное сопровождение", desc: "Стратег, таргетолог, дизайнер, аналитик и менеджер — вся команда в одном чате." },
];

function WhyUs() {
  return (
    <section className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="О нас"
        title={<>Почему компании <span className="text-gradient">доверяют нам</span></>}
        subtitle="Мы строим предсказуемые системы привлечения клиентов, а не запускаем разовые рекламные кампании."
      />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyCards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative rounded-3xl border hairline bg-[var(--color-card)]/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[var(--color-card)]/80 hover:shadow-[var(--shadow-card)]"
          >
            <div
              className="mb-6 grid h-12 w-12 place-items-center rounded-2xl text-white"
              style={{ background: "var(--gradient-accent)" }}
            >
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Services -------------------- */

const services = [
  { icon: Megaphone, title: "Контекстная реклама", desc: "Google Ads и Яндекс.Директ с фокусом на горячий спрос и минимальную стоимость лида." },
  { icon: Target, title: "Таргетированная реклама", desc: "Instagram, TikTok, VK — создаём креативы, тестируем аудитории, масштабируем связки." },
  { icon: Search, title: "SEO", desc: "Выводим сайт в топ по коммерческим запросам. Технический аудит, контент, ссылки." },
  { icon: Globe, title: "Создание сайтов", desc: "Landing, корпоративные сайты и e-commerce с конверсией от 5%. Дизайн + разработка." },
  { icon: Cog, title: "Автоматизация CRM", desc: "Внедряем amoCRM/Bitrix24, настраиваем воронки, интеграции, сквозную аналитику." },
  { icon: Sparkles, title: "Комплексная лидогенерация", desc: "Собираем весь маркетинг под ключ: стратегия, реклама, аналитика, отдел продаж." },
];

function Services() {
  return (
    <section id="services" className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="Услуги"
        title={<>Всё, что нужно для <span className="text-gradient">роста продаж</span></>}
        subtitle="Собираем нужный набор инструментов под задачи вашего бизнеса — от одного канала до полного маркетингового отдела на аутсорсе."
      />
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border hairline bg-[var(--color-card)]/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-accent)]/0 blur-3xl transition-all duration-500 group-hover:bg-[var(--color-accent)]/30" />
            <div
              className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl text-white"
              style={{ background: "var(--gradient-accent)" }}
            >
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="relative text-xl font-bold">{s.title}</h3>
            <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              {s.desc}
            </p>
            <a
              href="#cta"
              className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-all duration-300 hover:gap-3"
            >
              Подробнее <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Process -------------------- */

const steps = [
  { n: "01", title: "Анализ бизнеса", desc: "Разбираем продукт, воронку, юнит-экономику и точки роста. Формулируем цели в цифрах." },
  { n: "02", title: "Исследование конкурентов", desc: "Аудит рекламы конкурентов, УТП, посадочных страниц и офферов на рынке." },
  { n: "03", title: "Запуск рекламы", desc: "Создаём креативы, посадочные, настраиваем кампании и аналитику. Первые лиды за 3–7 дней." },
  { n: "04", title: "Оптимизация", desc: "Еженедельно тестируем гипотезы, отключаем убыточное, масштабируем то, что работает." },
  { n: "05", title: "Рост количества заявок", desc: "Стабильно увеличиваем объём качественных лидов при сохранении или снижении CPA." },
];

function Process() {
  return (
    <section id="process" className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="Как мы работаем"
        title={<>Прозрачный процесс из <span className="text-gradient">5 этапов</span></>}
      />
      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)]/60 via-white/10 to-transparent md:left-1/2 md:-translate-x-1/2" />
        <div className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-start gap-5 md:w-1/2 ${
                i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
              }`}
            >
              <div
                className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-extrabold text-white md:absolute md:top-0 ${
                  i % 2 ? "md:-left-6" : "md:-right-6"
                }`}
                style={{ background: "var(--gradient-accent)", boxShadow: "var(--shadow-glow)" }}
              >
                {s.n}
              </div>
              <div className="flex-1 rounded-3xl border hairline bg-[var(--color-card)]/50 p-6 backdrop-blur">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Cases -------------------- */

const cases = [
  { logo: "Northwind", niche: "B2B производство", desc: "Настроили контекст + сквозную аналитику, перезапустили сайт.", metrics: [{ v: "+327%", k: "заявок" }, { v: "×2.4", k: "ROAS" }, { v: "−41%", k: "CPA" }] },
  { logo: "Aurora", niche: "Ecommerce косметика", desc: "Таргет в Instagram + email-воронка. Масштабирование связок.", metrics: [{ v: "8 200", k: "заявок/мес" }, { v: "5.8×", k: "ROAS" }, { v: "+64%", k: "средний чек" }] },
  { logo: "Vertex", niche: "SaaS для HR", desc: "Комплексная лидогенерация: SEO + контекст + LinkedIn.", metrics: [{ v: "1 200", k: "MQL/квартал" }, { v: "−38%", k: "CAC" }, { v: "+180%", k: "MRR" }] },
  { logo: "Loft", niche: "Недвижимость премиум", desc: "Собрали лендинги под ЖК, запустили таргет и контекст.", metrics: [{ v: "460", k: "заявок/мес" }, { v: "12", k: "сделок/мес" }, { v: "×3.1", k: "рост выручки" }] },
];

function Cases() {
  const [i, setI] = useState(0);
  return (
    <section id="cases" className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="Кейсы"
        title={<>Результаты, за которые <span className="text-gradient">не стыдно</span></>}
        subtitle="Каждый проект — измеримый рост в деньгах, а не в лайках и показах."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border hairline bg-[var(--color-card)]/60 p-8 md:p-12"
        >
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-accent)" }}
          />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="text-2xl font-extrabold tracking-tight">{cases[i].logo}</span>
            <span className="rounded-full border hairline px-3 py-1 text-xs text-[var(--color-muted-foreground)]">
              {cases[i].niche}
            </span>
          </div>
          <p className="relative mt-6 max-w-2xl text-lg text-[var(--color-muted-foreground)]">
            {cases[i].desc}
          </p>
          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {cases[i].metrics.map((m) => (
              <div key={m.k} className="rounded-2xl border hairline bg-black/20 p-5">
                <div className="text-3xl font-extrabold text-gradient sm:text-4xl">{m.v}</div>
                <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">{m.k}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-10">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:gap-3 transition-all"
            >
              Подробнее о кейсе <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
        <div className="flex gap-2 lg:flex-col">
          {cases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Кейс ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === i ? "w-10 bg-[var(--color-accent)] lg:h-10 lg:w-2" : "w-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Numbers -------------------- */

function Counter({ n, suffix = "", label }: { n: number; suffix?: string; label: string }) {
  const { ref, value } = useCountUp(n);
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        <span ref={ref} className="text-gradient">
          {value.toLocaleString("ru-RU")}
        </span>
        {suffix}
      </div>
      <div className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        {label}
      </div>
    </div>
  );
}

function Numbers() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, oklch(0.55 0.19 240 / 0.18), transparent 70%)",
        }}
      />
      <div className="container-x">
        <div className="grid gap-10 rounded-[32px] border hairline bg-[var(--color-card)]/40 p-10 backdrop-blur-xl sm:grid-cols-2 md:p-16 lg:grid-cols-4">
          <Counter n={200} suffix="+" label="Проектов" />
          <Counter n={15000} suffix="+" label="Лидов" />
          <Counter n={95} suffix="%" label="Довольных клиентов" />
          <Counter n={8} suffix=" млн $" label="Рекламного бюджета" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonials -------------------- */

const testimonials = [
  { name: "Алексей Смирнов", company: "CEO, Northwind", text: "За 2 месяца команда перезапустила весь маркетинг и увеличила поток заявок в 4 раза. Работать легко и прозрачно." },
  { name: "Мария Ковалёва", company: "CMO, Aurora", text: "Наконец нашли подрядчика, который отвечает за деньги, а не за клики. ROAS вырос до 5.8, средний чек — на 64%." },
  { name: "Игорь Петров", company: "Founder, Vertex", text: "Комплексная работа под ключ: стратегия, каналы, аналитика. Стоимость привлечения снизилась почти вдвое." },
  { name: "Елена Дорошенко", company: "Marketing Lead, Loft", text: "Понравился уровень стратегического подхода и скорость. За квартал вышли на плановые показатели по сделкам." },
];

function Testimonials() {
  return (
    <section className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="Отзывы"
        title={<>Что говорят <span className="text-gradient">клиенты</span></>}
      />
      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent" />
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="w-[340px] shrink-0 rounded-3xl border hairline bg-[var(--color-card)]/50 p-7 sm:w-[420px]"
            >
              <div className="flex items-center gap-1 text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-white/90">
                «{t.text}»
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="grid h-11 w-11 place-items-center rounded-full font-bold text-white"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)]">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */

const faq = [
  { q: "Через сколько будут первые заявки?", a: "Первые лиды получаем в среднем через 3–7 дней после старта рекламы. За это время мы успеваем собрать посадочные страницы, креативы и настроить аналитику." },
  { q: "Работаете ли вы с малым бизнесом?", a: "Да, у нас есть тарифы под разные бюджеты — от локальных бизнесов до крупных B2B. Главное, чтобы юнит-экономика позволяла окупать привлечение." },
  { q: "Даёте ли вы гарантии?", a: "Фиксируем KPI по стоимости лида и объёму заявок в договоре. Если не достигаем — работаем бесплатно до выхода на согласованные показатели." },
  { q: "Кто будет заниматься моим проектом?", a: "Выделенная команда: стратег, таргетолог/директолог, дизайнер, аналитик и проектный менеджер. Все в одном чате с вами." },
  { q: "Сколько стоит работа?", a: "Стоимость зависит от ниши, каналов и объёма работ. Стартовые пакеты — от 80 000 ₽/мес. Точная смета — после короткого брифа и аудита." },
  { q: "Можно ли получить бесплатный аудит?", a: "Да. Оставьте заявку — мы проведём аудит текущего маркетинга, покажем точки роста и предложим стратегию." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="container-x py-20 md:py-28 lg:py-32">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Частые <span className="text-gradient">вопросы</span></>}
      />
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/[0.08] rounded-3xl border hairline bg-[var(--color-card)]/40">
        {faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition hover:bg-white/[0.02]"
              >
                <span className="text-base font-semibold sm:text-lg">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[var(--color-accent)]" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- CTA form -------------------- */

const formSchema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(80),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  comment: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

function CTAForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    reset();
    // eslint-disable-next-line no-console
    console.log("Lead:", data);
  };

  return (
    <section id="cta" className="container-x py-20 md:py-28 lg:py-32">
      <div
        className="relative overflow-hidden rounded-[32px] border hairline p-8 md:p-14 lg:p-20"
        style={{ background: "var(--gradient-cta)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              Бесплатно · 30 минут
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Получите бесплатный аудит вашего бизнеса
            </h2>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Мы покажем, где вы теряете клиентов, и предложим стратегию роста
              с прогнозом по заявкам и выручке.
            </p>
            {isSubmitSuccessful && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white">
                <Check className="h-4 w-4" /> Заявка принята
              </p>
            )}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-white/15 bg-[var(--color-background)]/70 p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-4">
              <Field label="Имя" error={errors.name?.message}>
                <input
                  {...register("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Как к вам обращаться?"
                  className="input-base"
                />
              </Field>
              <Field label="Телефон" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="input-base"
                />
              </Field>
              <Field label="Компания" hint="необязательно">
                <input
                  {...register("company")}
                  type="text"
                  placeholder="Название компании"
                  className="input-base"
                />
              </Field>
              <Field label="Комментарий" hint="необязательно">
                <textarea
                  {...register("comment")}
                  rows={3}
                  placeholder="Коротко о задаче"
                  className="input-base resize-none"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              style={{ background: "var(--gradient-accent)", boxShadow: "var(--shadow-glow)" }}
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              ) : (
                <>
                  Получить аудит <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-[var(--color-muted-foreground)]">
              Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal text-white/40">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <footer id="contacts" className="border-t hairline bg-[var(--color-surface)]/60">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl font-extrabold text-white"
              style={{ background: "var(--gradient-accent)" }}
            >
              L
            </span>
            <span className="text-lg font-extrabold tracking-tight">Leadflow</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-muted-foreground)]">
            Агентство перформанс-маркетинга и лидогенерации для B2B и e-commerce.
          </p>
        </div>
        <FooterCol
          title="Компания"
          items={[
            { label: "О нас", href: "#home" },
            { label: "Услуги", href: "#services" },
            { label: "Кейсы", href: "#cases" },
            { label: "Контакты", href: "#contacts" },
          ]}
        />
        <FooterCol
          title="Контакты"
          items={[
            { label: "+7 (999) 000-00-00", href: "tel:+79990000000", icon: Phone },
            { label: "hello@leadflow.io", href: "mailto:hello@leadflow.io", icon: Mail },
            { label: "Telegram", href: "https://t.me/", icon: Send },
            { label: "WhatsApp", href: "https://wa.me/", icon: MessageCircle },
          ]}
        />
        <div>
          <div className="text-sm font-semibold text-white">Соцсети</div>
          <div className="mt-4 flex gap-2">
            {["IN", "TG", "VK", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-xl border hairline text-xs font-bold text-[var(--color-muted-foreground)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
          <a
            href="#"
            className="mt-6 inline-block text-xs text-[var(--color-muted-foreground)] hover:text-white"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--color-muted-foreground)] sm:flex-row">
          <span>© {new Date().getFullYear()} Leadflow. Все права защищены.</span>
          <span>Сделано с фокусом на результат.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-white">{title}</div>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] transition hover:text-white"
            >
              {it.icon && <it.icon className="h-4 w-4" />}
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Landing -------------------- */

function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white">
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Process />
        <Cases />
        <Numbers />
        <Testimonials />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Briefcase, Mail, MessageCircle, Palette, Phone, Paperclip, Download, X, Coffee,
  ChevronLeft, ChevronRight, Film, Store, CalendarDays, Megaphone, Play, FileText,
  Send, ImageOff,
} from "lucide-react";
import { portfolioData as D } from "./portfolioData";

/* ---------- utilidades ---------- */
const ICONS = {
  briefcase: Briefcase, mail: Mail, whatsapp: MessageCircle, canva: Palette,
  film: Film, store: Store, events: CalendarDays, megaphone: Megaphone,
};
const Icon = ({ name, ...p }) => {
  const C = ICONS[name] || FileText;
  return <C aria-hidden="true" {...p} />;
};

function useIsMobile() {
  const q = "(max-width: 767px)";
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = (e) => setM(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return m;
}

function parseVideo(src) {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) return { kind: "file", src };
  return { kind: "iframe", src };
}
const isVideo = (m) => m.type === "video" || (!m.type && /\.(mp4|webm|ogg)|youtu|vimeo/i.test(m.src));

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Special+Elite&family=Lora:wght@400;600&display=swap');
.font-hand{font-family:'Caveat','Segoe Print',cursive}
.font-type{font-family:'Special Elite','Courier New',monospace}
.font-body{font-family:'Lora',Georgia,serif}
.wood{background-color:#6b4429;background-image:
  repeating-linear-gradient(92deg,rgba(0,0,0,.07) 0 2px,transparent 2px 9px),
  repeating-linear-gradient(90deg,rgba(255,220,170,.06) 0 1px,transparent 1px 23px),
  radial-gradient(ellipse at 30% 20%,rgba(255,210,150,.28),transparent 60%),
  radial-gradient(ellipse at 80% 95%,rgba(0,0,0,.4),transparent 60%)}
.lined{background-image:repeating-linear-gradient(transparent 0 31px,rgba(70,110,170,.22) 31px 32px)}
button:focus-visible,a:focus-visible{outline:3px solid #f59e0b;outline-offset:3px}
`;

/* ---------- Post-it ---------- */
function PostIt({ note, desk, index = 0, constraintsRef }) {
  const content = (
    <>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-2 bg-white/50 shadow-sm" />
      <h3 className="font-hand text-3xl font-bold leading-none text-stone-800">{note.title}</h3>
      <ul className="mt-2 space-y-1 font-hand text-[1.35rem] leading-6 text-stone-800">
        {note.lines.map((l) => <li key={l}>{l}</li>)}
      </ul>
    </>
  );
  const base = "relative p-5 shadow-[2px_8px_14px_rgba(0,0,0,.35)]";
  if (!desk) {
    return (
      <div className={`${base} mx-auto my-5 max-w-xs`} style={{ background: note.color, rotate: `${note.rotate / 2}deg` }}>
        {content}
      </div>
    );
  }
  return (
    <motion.div
      drag dragConstraints={constraintsRef} dragMomentum={false}
      initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 + index * 0.09, type: "spring", stiffness: 160, damping: 16 }}
      whileDrag={{ scale: 1.06, zIndex: 30, rotate: 0 }} whileHover={{ scale: 1.03 }}
      className={`${base} absolute cursor-grab active:cursor-grabbing`}
      style={{ left: note.pos.left, top: note.pos.top, width: note.width, background: note.color, rotate: note.rotate }}
    >
      {content}
    </motion.div>
  );
}

/* ---------- CV con clip ---------- */
function CVPaper({ className = "", style }) {
  const cv = D.cv;
  return (
    <motion.div
      whileHover={{ rotate: 0, y: -4 }}
      className={`relative w-[300px] max-w-full bg-[#fbf8ee] p-5 pt-9 font-body text-sm text-stone-800 shadow-[3px_10px_18px_rgba(0,0,0,.4)] ${className}`}
      style={style}
    >
      <Paperclip aria-hidden="true" strokeWidth={1.4} className="absolute -top-4 left-7 h-12 w-12 -rotate-12 text-slate-400 drop-shadow" />
      <h3 className="font-type text-xl leading-tight">{D.profile.name}</h3>
      <p className="mt-1 text-xs leading-snug text-stone-600">{cv.summary}</p>
      <dl className="mt-3 space-y-1.5 border-t border-stone-300 pt-3">
        {cv.experience.map((e) => (
          <div key={e.company}>
            <dt className="font-semibold leading-tight">{e.company}</dt>
            <dd className="text-xs text-stone-600">{e.role} · {e.period}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 border-t border-stone-300 pt-3 text-xs text-stone-600">
        {cv.education.map((e) => <p key={e.title}>{e.title} — {e.place}, {e.period}</p>)}
      </div>
      <a
        href={cv.file} download={cv.downloadName}
        className="mt-4 flex items-center justify-center gap-2 rounded bg-[#b3322a] px-3 py-2 font-type text-white shadow hover:bg-[#8f2720]"
      >
        <Download className="h-4 w-4" aria-hidden="true" /> Descargar CV (PDF)
      </a>
    </motion.div>
  );
}

/* ---------- Carpeta ---------- */
function Folder({ d, onOpen, className = "", style }) {
  return (
    <motion.button
      onClick={() => onOpen(d)}
      whileHover={{ y: -14, rotate: 0 }} whileTap={{ scale: 0.97 }}
      aria-label={`Abrir expediente: ${d.title}`}
      className={`relative h-36 text-left ${className}`} style={style}
    >
      <span aria-hidden="true" className="absolute -top-3 left-3 h-4 w-20 rounded-t-md" style={{ background: d.color }} />
      <span
        className="absolute inset-0 rounded-md rounded-tl-none shadow-[2px_8px_14px_rgba(0,0,0,.45)]"
        style={{ background: `linear-gradient(160deg, ${d.color}, #b98c4c)` }}
      />
      <span className="absolute inset-x-3 bottom-3 top-6 flex flex-col justify-between rounded-sm bg-[#fbf8ee] p-2">
        <span className="font-type text-[12px] leading-tight text-stone-800">{d.title}</span>
        <span className="flex items-end justify-between gap-1">
          <span className="text-[10px] leading-tight text-stone-500">{d.client}</span>
          <Icon name={d.icon} className="h-4 w-4 shrink-0 text-stone-600" />
        </span>
      </span>
      <span aria-hidden="true" className="absolute right-1 top-2 -rotate-12 rounded-sm border-2 border-[#b3322a]/80 px-1 font-type text-[9px] text-[#b3322a]/80">
        Confidencial
      </span>
    </motion.button>
  );
}

/* ---------- Modal base ---------- */
function Overlay({ onClose, label, wide, children }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-3"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog" aria-modal="true" aria-label={label}
        initial={{ y: 50, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        className={`relative max-h-[92vh] w-full overflow-y-auto rounded-md shadow-2xl ${wide ? "max-w-5xl" : "max-w-md"}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Visor de medios ---------- */
function Media({ item }) {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [item.src]);
  if (isVideo(item)) {
    const v = parseVideo(item.src);
    return (
      <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
        {v.kind === "file" ? (
          <video src={v.src} controls playsInline className="h-full w-full" />
        ) : (
          <iframe src={v.src} title={item.caption || "Vídeo"} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        )}
      </div>
    );
  }
  if (err) {
    return (
      <div className="grid aspect-video place-items-center rounded-sm bg-stone-200 text-sm text-stone-500">
        <div className="text-center"><ImageOff className="mx-auto mb-1" aria-hidden="true" />No se encuentra {item.src}</div>
      </div>
    );
  }
  return <img src={item.src} alt={item.caption || ""} onError={() => setErr(true)} className="max-h-[60vh] w-full rounded-sm bg-stone-100 object-contain" />;
}

/* ---------- Modal de expediente ---------- */
function DossierModal({ d, onClose }) {
  const [pi, setPi] = useState(0);
  const [mi, setMi] = useState(0);
  const p = d.projects[pi];
  const m = p.media?.[mi];
  const pick = (i) => { setPi(i); setMi(0); };
  return (
    <Overlay onClose={onClose} label={`Expediente ${d.title}`} wide>
      <div className="flex items-center gap-3 px-5 py-3 text-stone-900" style={{ background: d.color }}>
        <Icon name={d.icon} className="h-6 w-6 shrink-0" />
        <div className="flex-1">
          <h2 className="font-type text-xl leading-tight">{d.title}</h2>
          <p className="text-sm opacity-80">{d.client}</p>
        </div>
        <button onClick={onClose} aria-label="Cerrar expediente" className="rounded-full p-2 hover:bg-black/10"><X /></button>
      </div>
      <div className="flex flex-col bg-[#efe3c2] font-body text-stone-800 md:flex-row">
        <nav aria-label="Proyectos" className="flex gap-2 overflow-x-auto p-3 md:w-56 md:shrink-0 md:flex-col md:border-r md:border-stone-400/40">
          {d.projects.map((x, i) => (
            <button
              key={x.id} onClick={() => pick(i)} aria-current={i === pi}
              className={`shrink-0 rounded px-3 py-2 text-left text-sm ${i === pi ? "bg-white font-semibold shadow" : "hover:bg-white/50"}`}
            >
              {x.title}
              <span className="block text-xs font-normal text-stone-500">{x.period}</span>
            </button>
          ))}
        </nav>
        <article className="min-w-0 flex-1 space-y-4 p-4 md:p-6">
          {m ? <Media item={m} /> : <p className="text-sm">Añade fotos o vídeos en portfolioData.js.</p>}
          {m?.caption && <p className="text-center text-xs text-stone-500">{m.caption}</p>}
          {p.media?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Medios del proyecto">
              {p.media.map((x, i) => (
                <button
                  key={x.src} onClick={() => setMi(i)} aria-label={x.caption || `Medio ${i + 1}`} aria-current={i === mi}
                  className={`grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-sm bg-stone-300 ring-2 ${i === mi ? "ring-[#b3322a]" : "ring-transparent"}`}
                >
                  {isVideo(x) ? <Play className="h-5 w-5" aria-hidden="true" /> : <img src={x.src} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />}
                </button>
              ))}
            </div>
          )}
          <div>
            <h3 className="font-type text-2xl leading-tight">{p.title}</h3>
            <p className="text-sm text-stone-600">{p.role} · {p.period}</p>
            <p className="mt-2 max-w-prose leading-relaxed">{p.summary}</p>
            {p.highlights?.length > 0 && (
              <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags?.map((t) => <span key={t} className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs">{t}</span>)}
            </div>
          </div>
          {d.projects.length > 1 && (
            <div className="flex justify-between border-t border-stone-400/40 pt-3">
              <button disabled={pi === 0} onClick={() => pick(pi - 1)} className="flex items-center gap-1 text-sm disabled:opacity-30"><ChevronLeft className="h-4 w-4" aria-hidden="true" />Anterior</button>
              <button disabled={pi === d.projects.length - 1} onClick={() => pick(pi + 1)} className="flex items-center gap-1 text-sm disabled:opacity-30">Siguiente<ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
            </div>
          )}
        </article>
      </div>
    </Overlay>
  );
}

/* ---------- Café virtual ---------- */
function CoffeeModal({ onClose }) {
  const c = D.coffee;
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (c.formEndpoint) {
      setBusy(true);
      try {
        const r = await fetch(c.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: f.name, email: f.email, message: f.msg }),
        });
        if (!r.ok) throw new Error();
        setSent(true);
      } catch {
        setErr("No se pudo enviar. Inténtalo de nuevo o escríbeme por email.");
      }
      setBusy(false);
    } else {
      const body = `${f.msg}\n\n— ${f.name} (${f.email})`;
      window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    }
  };

  const field = "w-full rounded border border-stone-400 bg-white/80 px-3 py-2 font-body text-sm";
  return (
    <Overlay onClose={onClose} label="Invítame a un café">
      <div className="bg-[#fbf8ee] p-6 font-body text-stone-800">
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 rounded-full p-2 hover:bg-black/10"><X /></button>
        <Coffee className="mb-2 h-8 w-8 text-[#6b4429]" aria-hidden="true" />
        <h2 className="font-type text-2xl">Invítame a un café virtual</h2>
        {sent ? (
          <p className="mt-4">Mensaje listo. Gracias por pasarte por mi escritorio.</p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <label className="block text-sm">Nombre<input required value={f.name} onChange={set("name")} className={field} /></label>
            <label className="block text-sm">Email<input required type="email" value={f.email} onChange={set("email")} className={field} /></label>
            <label className="block text-sm">Mensaje<textarea required rows={4} value={f.msg} onChange={set("msg")} className={field} /></label>
            {err && <p role="alert" className="text-sm text-[#b3322a]">{err}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded bg-[#6b4429] px-3 py-2 font-type text-white hover:bg-[#54331e] disabled:opacity-60">
              <Send className="h-4 w-4" aria-hidden="true" />{busy ? "Enviando…" : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </Overlay>
  );
}

/* ---------- Walkie-talkie (menú flotante) ---------- */
function Walkie() {
  const [o, setO] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {o && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
            className="w-56 rounded-xl bg-[#263238] p-2 shadow-2xl ring-1 ring-white/10"
          >
            {D.contacts.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-50 hover:bg-white/10"
                >
                  <Icon name={c.icon} className="h-4 w-4 text-amber-300" />{c.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        onClick={() => setO(!o)} aria-expanded={o} aria-label="Accesos rápidos de contacto"
        className="relative flex h-24 w-14 flex-col items-center rounded-xl bg-[#37474f] pt-3 shadow-xl ring-2 ring-black/30"
      >
        <span aria-hidden="true" className="absolute -top-5 right-2 h-6 w-1.5 rounded-t bg-stone-800" />
        <span aria-hidden="true" className="h-7 w-9 rounded" style={{ background: "repeating-linear-gradient(0deg,#111 0 2px,#37474f 2px 5px)" }} />
        <Phone className="mt-3 h-5 w-5 text-amber-300" aria-hidden="true" />
        <span aria-hidden="true" className={`mt-2 h-2 w-2 rounded-full bg-red-500 ${o ? "" : "animate-pulse"}`} />
      </button>
    </div>
  );
}

/* ---------- Mancha de café ---------- */
function CoffeeStain({ onClick, className = "" }) {
  return (
    <motion.button
      onClick={onClick} whileHover={{ scale: 1.08, rotate: 8 }} aria-label="Invítame a un café virtual (abrir formulario)"
      title="¿Un café?" className={className}
    >
      <svg viewBox="0 0 120 120" className="h-28 w-28 mix-blend-multiply" aria-hidden="true">
        <defs>
          <radialGradient id="cf" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6b3d1c" stopOpacity=".15" />
            <stop offset=".8" stopColor="#4a2a14" stopOpacity=".5" />
            <stop offset="1" stopColor="#3b200f" stopOpacity=".7" />
          </radialGradient>
        </defs>
        <path d="M60 8c22-2 44 14 48 38 4 22-8 46-30 56-22 10-52 4-64-18C2 64 8 36 26 22 36 14 48 9 60 8z" fill="url(#cf)" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="#3b200f" strokeOpacity=".55" strokeWidth="4" />
        <path d="M98 78c6 6 8 16 4 24-2 4-8 4-8-2 0-8 2-14 4-22z" fill="#4a2a14" fillOpacity=".5" />
      </svg>
    </motion.button>
  );
}

/* ---------- Escritorio (desktop) ---------- */
function Desk({ onOpen, onCoffee }) {
  const ref = useRef(null);
  return (
    <main ref={ref} className="wood relative w-full overflow-hidden" style={{ minHeight: "max(100vh, 860px)" }}>
      <div className="absolute left-[3%] top-[5%] -rotate-1 bg-[#fbf8ee] px-6 py-4 shadow-[2px_8px_14px_rgba(0,0,0,.4)]" style={{ width: 340 }}>
        <h1 className="font-type text-3xl leading-tight text-stone-800">{D.profile.name}</h1>
        <p className="mt-1 font-body text-sm text-stone-600">{D.profile.role}</p>
      </div>

      {D.notes.map((n, i) => <PostIt key={n.id} note={n} desk index={i} constraintsRef={ref} />)}

      <CVPaper className="absolute right-[5%] top-[6%] rotate-2" />

      <div className="absolute bottom-[7%] left-1/2 flex -translate-x-1/2 gap-6">
        {D.dossiers.map((d, i) => (
          <Folder key={d.id} d={d} onOpen={onOpen} className="w-44" style={{ rotate: (i % 2 ? 2 : -2) - i * 0.5 }} />
        ))}
      </div>

      <CoffeeStain onClick={onCoffee} className="absolute bottom-6 left-6" />
    </main>
  );
}

/* ---------- Cuaderno (móvil) ---------- */
const TABS = [
  { id: "about", label: "Sobre mí", color: "#fde68a" },
  { id: "skills", label: "Habilidades", color: "#f9a8d4" },
  { id: "cv", label: "CV", color: "#93c5fd" },
  { id: "dossiers", label: "Dossiers", color: "#fdba74" },
  { id: "contact", label: "Contacto", color: "#86efac" },
];

function Notebook({ onOpen, onCoffee }) {
  const [tab, setTab] = useState("about");
  return (
    <main className="wood min-h-screen p-3 pb-32">
      <header className="mb-4 -rotate-1 bg-[#fbf8ee] px-4 py-3 shadow-lg">
        <h1 className="font-type text-2xl leading-tight text-stone-800">{D.profile.name}</h1>
        <p className="font-body text-xs text-stone-600">{D.profile.role}</p>
      </header>
      <div role="tablist" aria-label="Secciones" className="flex gap-1 overflow-x-auto px-2">
        {TABS.map((t) => (
          <button
            key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-t-lg px-3 py-2 font-type text-sm text-stone-800 shadow ${tab === t.id ? "pb-3" : "opacity-75"}`}
            style={{ background: t.color }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <section role="tabpanel" className="lined min-h-[60vh] rounded-b-md rounded-tr-md border-l-8 border-[#8f2720]/70 bg-[#fbf8ee] p-4 shadow-xl">
        {tab === "about" && D.notes.filter((n) => n.group === "about").map((n) => <PostIt key={n.id} note={n} />)}
        {tab === "skills" && D.notes.filter((n) => n.group === "skills").map((n) => <PostIt key={n.id} note={n} />)}
        {tab === "cv" && <CVPaper className="mx-auto" />}
        {tab === "dossiers" && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-3">
            {D.dossiers.map((d) => <Folder key={d.id} d={d} onOpen={onOpen} className="w-full" />)}
          </div>
        )}
        {tab === "contact" && (
          <div className="space-y-3 font-body">
            <button onClick={onCoffee} className="flex w-full items-center gap-3 rounded bg-[#6b4429] px-4 py-3 font-type text-white">
              <Coffee className="h-5 w-5" aria-hidden="true" />Invítame a un café virtual
            </button>
            {D.contacts.map((c) => (
              <a key={c.id} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="flex items-center gap-3 rounded bg-white/80 px-4 py-3 text-stone-800 shadow">
                <Icon name={c.icon} className="h-5 w-5" />{c.label}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ---------- App ---------- */
export default function App() {
  const mobile = useIsMobile();
  const [dossier, setDossier] = useState(null);
  const [coffee, setCoffee] = useState(false);
  useEffect(() => { document.title = D.siteTitle; }, []);

  return (
    <MotionConfig reducedMotion="user">
      <style>{STYLES}</style>
      {mobile
        ? <Notebook onOpen={setDossier} onCoffee={() => setCoffee(true)} />
        : <Desk onOpen={setDossier} onCoffee={() => setCoffee(true)} />}
      <Walkie />
      <AnimatePresence>
        {dossier && <DossierModal key={dossier.id} d={dossier} onClose={() => setDossier(null)} />}
        {coffee && <CoffeeModal key="coffee" onClose={() => setCoffee(false)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}

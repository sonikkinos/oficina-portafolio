// ============================================================
//  portfolioData.js  ·  TODO el contenido de la web vive aquí.
//  Edita textos, enlaces, fotos y vídeos sin tocar App.jsx.
//
//  IMÁGENES: ponlas en  /public/fotos/  y refiérelas como "/fotos/nombre.jpg"
//            (.jpg, .png y .gif animados funcionan igual).
//  VÍDEOS:   pega la URL tal cual. Se detecta solo:
//            · YouTube  → "https://www.youtube.com/watch?v=XXXXXXXXXXX" o "https://youtu.be/XXXXXXXXXXX"
//            · Vimeo    → "https://vimeo.com/123456789"
//            · MP4/WebM → "/videos/mi-video.mp4" (en /public/videos/) o URL directa
//            · Otros embeds → cualquier URL de iframe
//  CV:       copia tu PDF en /public/CV-Daniel-Esteve-Quesada.pdf
// ============================================================

export const portfolioData = {
  siteTitle: "Daniel Esteve Quesada · Portafolio",

  profile: {
    name: "Daniel Esteve Quesada",
    role: "Publicidad · Marketing 360 · Producción Audiovisual · Ventas",
  },

  // ---------- CV (hoja con clip) ----------
  cv: {
    file: "/CV-Daniel-Esteve-Quesada.pdf",
    downloadName: "CV-Daniel-Esteve-Quesada.pdf",
    summary:
      "Especialista en publicidad y marketing 360 con experiencia en producción audiovisual, eventos en vivo y venta consultiva.",
    experience: [
      { company: "Xiaomi · MediaMarkt", role: "Especialista de ventas", period: "20XX – 20XX" },
      { company: "TCL", role: "Experiencia comercial", period: "20XX – 20XX" },
      { company: "MaQasa Inmobiliaria", role: "Producción y edición audiovisual", period: "20XX – 20XX" },
      { company: "GrupoIDEX", role: "Eventos y producción en vivo", period: "20XX – 20XX" },
      { company: "V3RTICE", role: "Marketing digital y Community Management", period: "20XX – 20XX" },
    ],
    education: [
      { title: "[Tu titulación en Publicidad / Marketing]", place: "[Centro]", period: "20XX – 20XX" },
      { title: "[Curso o máster complementario]", place: "[Centro]", period: "20XX" },
    ],
  },

  // ---------- POST-ITS ----------
  // group: "about" | "skills"  ·  pos = posición en escritorio (%)  ·  rotate = grados
  notes: [
    {
      id: "about",
      group: "about",
      title: "Sobre mí",
      color: "#fff1a8",
      rotate: -4,
      width: 260,
      pos: { left: "4%", top: "31%" },
      lines: [
        "Cuento historias con imagen, datos y buen trato al cliente.",
        "Me muevo igual de cómodo en una suite de edición, en un evento en vivo o en una tienda.",
        "Busco proyectos donde creatividad y resultados vayan de la mano.",
      ],
    },
    {
      id: "skills-audiovisual",
      group: "skills",
      title: "Imagen y vídeo",
      color: "#ffc9de",
      rotate: 3,
      width: 230,
      pos: { left: "37%", top: "7%" },
      lines: ["DaVinci Resolve", "Photoshop", "Dirección y rodaje", "Edición y postproducción"],
    },
    {
      id: "skills-marketing",
      group: "skills",
      title: "Marketing 360",
      color: "#b9e6ff",
      rotate: -3,
      width: 230,
      pos: { left: "55%", top: "33%" },
      lines: ["Meta Ads", "Google Ads", "Community Management", "Estrategia de campañas"],
    },
    {
      id: "skills-ventas",
      group: "skills",
      title: "Ventas",
      color: "#c8f2c2",
      rotate: 5,
      width: 220,
      pos: { left: "28%", top: "38%" },
      lines: ["Ventas Xiaomi", "Experiencia de cliente", "Venta consultiva", "Negociación"],
    },
  ],

  // ---------- DOSSIERS (carpetas) ----------
  dossiers: [
    {
      id: "audiovisual",
      title: "Producción & Edición Audiovisual",
      client: "MaQasa Inmobiliaria",
      icon: "film",
      color: "#d9b26f",
      projects: [
        {
          id: "maqasa-tour",
          title: "Vídeo tour de propiedades",
          role: "Dirección, rodaje y edición",
          period: "20XX",
          summary: "Describe aquí el proyecto: objetivo, qué hiciste y para quién.",
          highlights: ["Resultado o cifra clave", "Herramientas: DaVinci Resolve, Photoshop"],
          tags: ["Vídeo", "Inmobiliaria", "DaVinci"],
          media: [
            { src: "/fotos/maqasa-1.jpg", caption: "Fotograma del tour" },
            { src: "/fotos/maqasa-animacion.gif", caption: "Animación para redes" },
            // { type: "video", src: "https://www.youtube.com/watch?v=XXXXXXXXXXX", caption: "Tour completo" },
            { type: "video", src: "/videos/maqasa-tour.mp4", caption: "Tour completo" },
          ],
        },
      ],
    },
    {
      id: "comercial",
      title: "Estrategia & Experiencia Comercial",
      client: "Xiaomi MediaMarkt / TCL",
      icon: "store",
      color: "#e0a458",
      projects: [
        {
          id: "xiaomi-mediamarkt",
          title: "Xiaomi en MediaMarkt",
          role: "Especialista de ventas",
          period: "20XX – 20XX",
          summary: "Describe aquí tu labor: ventas, formación al cliente, objetivos alcanzados.",
          highlights: ["Objetivo superado en X %", "Acciones de venta consultiva"],
          tags: ["Ventas", "Retail", "Xiaomi"],
          media: [{ src: "/fotos/xiaomi-1.jpg", caption: "Espacio Xiaomi" }],
        },
        {
          id: "tcl",
          title: "Experiencia comercial TCL",
          role: "Promoción y venta",
          period: "20XX",
          summary: "Describe aquí la acción comercial y el resultado.",
          highlights: ["Dato o resultado destacado"],
          tags: ["Retail", "TCL"],
          media: [{ src: "/fotos/tcl-1.jpg", caption: "Acción en tienda" }],
        },
      ],
    },
    {
      id: "eventos",
      title: "Eventos & Producción en Vivo",
      client: "GrupoIDEX",
      icon: "events",
      color: "#c99a6b",
      projects: [
        {
          id: "idex-evento",
          title: "Producción de evento en directo",
          role: "Producción y coordinación",
          period: "20XX",
          summary: "Describe aquí el evento: aforo, tu rol y qué salió especialmente bien.",
          highlights: ["Aforo / alcance", "Equipo coordinado"],
          tags: ["Eventos", "Directo", "Producción"],
          media: [{ src: "/fotos/idex-1.jpg", caption: "Montaje del evento" }],
        },
      ],
    },
    {
      id: "digital",
      title: "Marketing Digital & CM",
      client: "V3RTICE",
      icon: "megaphone",
      color: "#cfae7a",
      projects: [
        {
          id: "v3rtice-campana",
          title: "Campaña en redes y ads",
          role: "Community Manager y Paid Media",
          period: "20XX",
          summary: "Describe aquí la estrategia, el calendario de contenidos y las campañas en Meta Ads y Google Ads.",
          highlights: ["Alcance o crecimiento", "Resultado de campaña (CTR, ROAS, leads…)"],
          tags: ["Meta Ads", "Google Ads", "Community Management"],
          media: [{ src: "/fotos/v3rtice-1.png", caption: "Pieza de campaña" }],
        },
      ],
    },
  ],

  // ---------- WALKIE-TALKIE (accesos rápidos) ----------
  contacts: [
    { id: "linkedin", label: "LinkedIn", icon: "briefcase", href: "https://www.linkedin.com/in/TU-USUARIO" },
    { id: "email", label: "Email", icon: "mail", href: "mailto:tu@email.com" },
    { id: "whatsapp", label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/34600000000" },
    { id: "canva", label: "Portfolio Canva", icon: "canva", href: "https://www.canva.com/TU-PORTFOLIO" },
  ],

  // ---------- MANCHA DE CAFÉ (formulario) ----------
  coffee: {
    email: "tu@email.com",
    subject: "Café virtual desde tu portafolio",
    // Opcional: pega un endpoint de Formspree (https://formspree.io/f/xxxx) para enviar sin abrir el correo.
    formEndpoint: "",
  },
};

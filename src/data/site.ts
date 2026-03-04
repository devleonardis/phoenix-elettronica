import { siteConfig } from "@/lib/site";

export const company = {
  name: siteConfig.legalName,
  shortName: siteConfig.siteName,
  description: siteConfig.description,
  area: "Bari (BA) e provincia",
  phone: siteConfig.nap.phone,
  phoneHref: siteConfig.nap.phoneHref,
  mobile: siteConfig.nap.mobile,
  mobileHref: siteConfig.nap.mobileHref,
  email: siteConfig.nap.email,
  emailHref: siteConfig.nap.emailHref,
  address: "Via Papa Innocenzo XII, 19 - 70124 Bari (BA)",
  mapsHref: `https://maps.google.com/?q=${encodeURIComponent("Via Papa Innocenzo XII, 19 - 70124 Bari (BA)")}`,
  coordinates: {
    lat: 41.1025334,
    lng: 16.8635539,
  },
  vat: siteConfig.nap.vat,
  siteUrl: siteConfig.domain,
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/contatti", label: "Contatti" },
];

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  includes: string[];
  audience: string;
  timing: string;
  icon: string;
};

export const services: ServiceItem[] = [
  {
    slug: "manutenzione-condomini",
    title: "Manutenzione condomini",
    short: "Assistenza puntuale per impianti, parti comuni e interventi ricorrenti.",
    detail:
      "Gestiamo manutenzioni ordinarie e straordinarie per condomini con tempi rapidi, coordinamento chiaro e attenzione alla continuita' del servizio.",
    includes: [
      "Verifica impianti scale e aree comuni",
      "Piccoli guasti e ripristini urgenti",
      "Programmazione manutenzioni periodiche",
    ],
    audience: "Amministratori di condominio e complessi residenziali.",
    timing: "Interventi programmati o rapidi in base all'urgenza.",
    icon: "building",
  },
  {
    slug: "videosorveglianza-antifurti",
    title: "Videosorveglianza e antifurti",
    short: "Protezione affidabile per abitazioni, aziende e spazi comuni.",
    detail:
      "Progettiamo sistemi di sicurezza su misura per monitoraggio, prevenzione intrusioni e controllo accessi con componenti affidabili.",
    includes: [
      "Telecamere e copertura punti sensibili",
      "Sensori, centrali e dispositivi di allarme",
      "Configurazione base e supporto all'utilizzo",
    ],
    audience: "Privati, condomini e attivita' commerciali.",
    timing: "Installazione modulata in base alla dimensione dell'impianto.",
    icon: "shield",
  },
  {
    slug: "citofonia-videocitofonia",
    title: "Citofonia e videocitofonia",
    short: "Impianti moderni per comunicazione, controllo accessi e sicurezza.",
    detail:
      "Installiamo e aggiorniamo sistemi citofonici e videocitofonici per abitazioni singole, palazzi e strutture multiutenza.",
    includes: [
      "Nuove installazioni e sostituzioni",
      "Adeguamenti per condomini",
      "Diagnosi guasti e ripristino linee",
    ],
    audience: "Condomini, villette, uffici e piccoli complessi.",
    timing: "Tempistiche variabili in base al numero di utenze.",
    icon: "monitor-smartphone",
  },
  {
    slug: "automazione-home-automation",
    title: "Automazione e home automation",
    short: "Automazioni pratiche per accessi, serrande, cancelli e comfort.",
    detail:
      "Realizziamo sistemi per cancelli, porte, portoni, serrande e saracinesche, integrando funzioni smart quando servono davvero.",
    includes: [
      "Motorizzazioni e automazioni accessi",
      "Comandi, telecomandi e sicurezza d'uso",
      "Soluzioni personalizzate per casa e impresa",
    ],
    audience: "Privati, aziende, condomini e attivita' commerciali.",
    timing: "Intervento definito su misura dopo sopralluogo.",
    icon: "zap",
  },
  {
    slug: "impianti-telefonici-centralini",
    title: "Impianti telefonici e centralini",
    short: "Comunicazione interna efficiente per uffici, reception e attivita'.",
    detail:
      "Configuriamo impianti telefonici e centralini per strutture che cercano affidabilita', ordine e continuita' nella gestione delle chiamate.",
    includes: [
      "Predisposizione linee e terminali",
      "Centralini per piccole e medie strutture",
      "Supporto per ampliamenti e manutenzioni",
    ],
    audience: "Uffici, studi e aziende.",
    timing: "Installazione rapida per impianti standard.",
    icon: "phone-call",
  },
  {
    slug: "diffusione-sonora",
    title: "Impianti di diffusione sonora",
    short: "Sistemi audio chiari e funzionali per spazi professionali e comuni.",
    detail:
      "Progettiamo diffusione sonora per ambienti che richiedono copertura equilibrata, chiarezza e gestione semplice nel tempo.",
    includes: [
      "Distribuzione audio in ambienti dedicati",
      "Selezione punti di diffusione",
      "Impostazione pratica e manutenzione",
    ],
    audience: "Aziende, condomini, sale d'attesa e attivita'.",
    timing: "Tempi definiti in base a metratura e punti audio.",
    icon: "radio",
  },
  {
    slug: "cablaggio-reti-lan",
    title: "Cablaggio reti LAN",
    short: "Cablaggi ordinati e stabili per reti locali affidabili.",
    detail:
      "Realizziamo cablaggi LAN con approccio pulito e pratico, per connessioni stabili in ambienti domestici, professionali e aziendali.",
    includes: [
      "Stesura e organizzazione cablaggi",
      "Punti rete e distribuzione interna",
      "Supporto per ampliamenti o revisioni",
    ],
    audience: "Uffici, aziende, studi e abitazioni evolute.",
    timing: "Da mezzo giorno a piu' giornate in base al progetto.",
    icon: "network",
  },
];

export const whyPhoenix = [
  {
    title: "Affidabilita' operativa",
    text: "Interventi gestiti con metodo, puntualita' e attenzione reale al risultato.",
  },
  {
    title: "Tempi rapidi",
    text: "Sopralluoghi e lavorazioni organizzati per ridurre attese e disagi.",
  },
  {
    title: "Preventivi chiari",
    text: "Proposte comprensibili, senza linguaggio tecnico inutile e senza ambiguita'.",
  },
  {
    title: "Qualita' materiali",
    text: "Scelta di soluzioni affidabili, pensate per durare e non solo per costare meno.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Sopralluogo",
    text: "Ascoltiamo il problema, valutiamo spazi, vincoli e obiettivi.",
  },
  {
    step: "02",
    title: "Preventivo",
    text: "Definiamo la soluzione piu' adatta con tempi e priorita' chiare.",
  },
  {
    step: "03",
    title: "Intervento",
    text: "Eseguiamo il lavoro con ordine, precisione e attenzione ai dettagli.",
  },
];

export const testimonials = [
  {
    name: "Amministratore condominiale, Bari",
    quote:
      "Gestione precisa delle manutenzioni e tempi rapidi sugli interventi urgenti. Collaborazione seria e affidabile.",
  },
  {
    name: "Titolare studio professionale",
    quote:
      "Impianto ordinato, preventivo chiaro e lavori eseguiti con pulizia. Molto apprezzata la capacita' di proporre soluzioni pratiche.",
  },
  {
    name: "Cliente privato, provincia di Bari",
    quote:
      "Installazione videocitofono e automazione cancello senza complicazioni. Comunicazione chiara e risultato pulito.",
  },
];

export const technicalFeatures = [
  {
    title: "Impianti elettrici",
    eyebrow: "Abilitazione L. 37/08",
    text: "Impianti civili e industriali, adeguamenti, manutenzioni e interventi per migliorare sicurezza e continuita' del servizio.",
    bullets: ["Nuove installazioni", "Adeguamenti tecnici", "Manutenzione e sicurezza"],
    icon: "bolt",
  },
  {
    title: "Ricerca dispersioni elettriche",
    eyebrow: "Diagnosi mirata",
    text: "Analisi e risoluzione di dispersioni, corti e anomalie con interventi puntuali per ridurre fermo e rischi.",
    bullets: ["Verifiche mirate", "Individuazione cause", "Ripristino rapido"],
    icon: "search",
  },
  {
    title: "Rifacimento illuminazione LED",
    eyebrow: "Upgrade efficiente",
    text: "Aggiornamento dell'illuminazione per migliorare resa, consumi e gestione degli spazi residenziali o professionali.",
    bullets: ["Maggiore efficienza", "Riduzione consumi", "Migliore qualita' visiva"],
    icon: "lightbulb",
  },
];

export const audience = [
  "Amministratori di condominio",
  "Aziende e attivita' professionali",
  "Privati e abitazioni",
];

export const contactOptions = [
  {
    title: "Telefono ufficio",
    value: company.phone,
    href: company.phoneHref,
    note: "Per richieste rapide e coordinamento interventi.",
    icon: "phone",
  },
  {
    title: "Cellulare",
    value: company.mobile,
    href: company.mobileHref,
    note: "Canale diretto per contatti veloci.",
    icon: "smartphone",
  },
  {
    title: "Email",
    value: company.email,
    href: company.emailHref,
    note: "Ideale per richieste dettagliate e preventivi.",
    icon: "mail",
  },
  {
    title: "Sede",
    value: company.address,
    href: company.mapsHref,
    note: "Bari, zona servita con interventi in citta' e provincia.",
    icon: "map-pin",
  },
];

export const serviceOptions = services.map((service) => ({
  label: service.title,
  value: service.title,
}));

export const urgencyOptions = [
  { label: "Da programmare", value: "Da programmare" },
  { label: "Entro pochi giorni", value: "Entro pochi giorni" },
  { label: "Urgente", value: "Urgente" },
];

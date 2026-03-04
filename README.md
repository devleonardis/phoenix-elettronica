# Phoenix Elettronica

Sito Next.js App Router ottimizzato per SEO locale a Bari.

## Avvio

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
npm run start
```

## Invio email

Il progetto usa route backend Next.js e SMTP per inviare le richieste dei form.

1. Crea `.env.local` partendo da `.env.example`
2. Inserisci i dati SMTP reali
3. Per test, il destinatario predefinito e' `simonedele03@gmail.com`

Esempio minimo:

```bash
cp .env.local .env.local
```

Variabili richieste:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`

## SEO e deployment

- Canonical host: scegli una sola versione pubblica, consigliato `https://phoenixelettronica.net` senza `www`.
- HTTPS: forza sempre HTTPS da Cloudflare o dal provider hosting.
- Redirect host: configura un redirect 301 da `http://phoenixelettronica.net`, `http://www.phoenixelettronica.net` e `https://www.phoenixelettronica.net` verso `https://phoenixelettronica.net`.
- Redirect legacy: se esistono vecchie URL come `/news`, `/azienda`, `/contatti.php`, crea redirect 301 verso la pagina piu' pertinente, ad esempio `/`, `/chi-siamo`, `/contatti`.
- Sitemap: invia `https://phoenixelettronica.net/sitemap.xml` in Google Search Console.
- Robots: verifica la pubblicazione di `https://phoenixelettronica.net/robots.txt`.

## Checklist post-deploy

- Google Search Console: crea la proprieta' dominio e invia la sitemap.
- Rich Results Test: verifica LocalBusiness, Service, FAQPage e BreadcrumbList.
- PageSpeed Insights / Lighthouse: controlla SEO, Performance e Core Web Vitals su home e landing locali.
- Open Graph: testa anteprime con condivisione WhatsApp, LinkedIn e Facebook.
- Canonical: verifica che ogni pagina esponga il canonical corretto e non indicizzi versioni duplicate.

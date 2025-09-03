# DLQuick Dynamic Website (Next.js 14 + Tailwind)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Publish with GitHub Desktop (fără token în terminal)
1. Descarcă acest folder pe Mac (loc ușor, ex: Desktop).
2. Deschide **GitHub Desktop** → **File → Add local repository…** → alege folderul.
3. **Publish repository** → nume repo: `dlquick-web`. (Branch va fi `main`.)

## AWS Amplify — Hosting
1. AWS Console → Amplify → **Host web app** → **Connect app** → GitHub → repo `dlquick-web`, branch **main** → Deploy.
2. **Domain management → Add domain** → `dlquick.co.uk` (root + www). Dacă ai Route53, adaugă automat recordurile; altfel copiază **CNAME/TXT** la registrar.

## Form Partners → Email (SES/Lambda/APIGW) — ulterior
- Editează `app/api/partner/route.ts` ca să trimită POST la API Gateway (care cheamă o Lambda ce folosește SES).
- În Amplify → App settings → **Environment variables** adaugă:
  - `DLQ_PARTNER_API=https://abc123.execute-api.eu-west-1.amazonaws.com/partner`
- Redeploy. Formularele vor trimite email.

## Ce e inclus
- Pagini: Home, Services (dinamic din JSON), Track (mock), Partners (form), Legal (Terms/Privacy/Cookies), sitemap, robots.
- Component: Nav cu highlight, Footer, CookieBanner.
- Stil brand: royal blue + chrome gold.
- SEO OG image placeholder (`/public/og.jpg`).

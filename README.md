# Maaf Fashion — Corporate Website

Full-stack, production-ready corporate website for Maaf Fashion
(maaffashion.com), a manufacturing/export knitwear business, built per the
project proposal (headless Next.js + Django REST Framework architecture).

## What's included

```
maaf-fashion/
├── backend/    Django REST Framework API (products, categories, gallery,
│               certifications, capacity, stats, inquiries) + Admin
└── frontend/   Next.js + Tailwind + Bootstrap site, 10 pages, connected
                to the API with automatic mock-data fallback
```

## Quick start

**1. Backend**
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data      # sample products, certifications, etc.
python manage.py runserver
```
API: http://localhost:8000/api/ · Admin: http://localhost:8000/admin/

**2. Frontend** (in a second terminal)
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Site: http://localhost:3000

Each half has its own detailed README with full setup, API reference, and
Namecheap cPanel deployment instructions:
- [`backend/README.md`](backend/README.md)
- [`frontend/README.md`](frontend/README.md)

## What's built

- **8 data models** (Category, Product, ProductImage, GalleryItem,
  Certification, Department, CompanyStat, Inquiry) with full DRF
  serializers, ViewSets, filtering, and Django Admin CRUD screens
- **Editor vs Super Admin** role separation via Django Groups
- **10 frontend pages**: Home, About, Products (filterable), Manufacturing
  Capacity, Compliance & Safety, Gallery (filterable + lightbox), Contact
  (working inquiry form wired to the API), Privacy, Terms
- A distinctive navy/charcoal + gold visual identity with a custom "stitch
  line" signature motif, built specifically for this brief rather than a
  generic template
- Verified: backend migrations + seed data run cleanly, API endpoints
  tested live, and `npm run build` produces a clean production build of
  all 10 routes

## Not included (explicitly out of scope for this pass)

- Real product/factory photography (placeholders are used — drop images
  into the Django Admin and they'll render automatically)
- Live SMTP credentials / production secrets (see `.env.example` files)
- Automated tests
- Multilingual support, PDF catalogue generator, blog module, live chat
  (listed as optional add-ons in the original proposal)

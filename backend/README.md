# Maaf Fashion — Backend (Django REST Framework)

Headless API powering the Maaf Fashion corporate website. Serves products,
categories, gallery media, certifications, manufacturing-capacity data and
handles inquiry (contact-form) submissions.

## Stack

- Django 6 + Django REST Framework
- SQLite for local development, MySQL for production (cPanel-ready)
- django-cors-headers, django-filter
- Pillow for image handling

## Local setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env              # defaults work out of the box for local dev

python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data        # optional: populate sample content
python manage.py runserver
```

API is now live at `http://localhost:8000/api/`, admin at
`http://localhost:8000/admin/`.

## API endpoints

| Method | Endpoint                              | Notes                                   |
|--------|----------------------------------------|------------------------------------------|
| GET    | `/api/categories/`                    | List categories                          |
| GET    | `/api/products/`                      | `?category__slug=mens-wear&search=tee`   |
| GET    | `/api/products/{slug}/`               | Single product                           |
| GET    | `/api/gallery/`                       | `?category=process`                      |
| GET    | `/api/certifications/`                | List certifications                      |
| GET    | `/api/capacity/`                      | Manufacturing departments                |
| GET    | `/api/stats/`                         | Home-page stat banner                    |
| POST   | `/api/inquiries/`                     | Submit contact form (validated + email)  |

All GET endpoints are public/read-only. `POST /api/inquiries/` validates
`name`, `email`, and `message` server-side and triggers an email
notification to `SALES_NOTIFICATION_EMAIL` (fails silently if SMTP isn't
configured, so a lead is never lost even if email delivery fails).

## Admin & roles

Two groups are created by `seed_data`:

- **Super Admin** — full access (assign manually via `is_superuser`).
- **Editor** — can manage Products, Categories, Gallery, Certifications,
  Capacity and Stats, but not Inquiries or user accounts. Assign staff to
  this group from `/admin/auth/group/`.

Inquiries are read-only in the admin (buyers submit them from the site;
staff can mark them "processed" but not fabricate new ones).

## Deploying to Namecheap cPanel (MySQL)

1. In cPanel, create a MySQL database + user under **MySQL Databases**.
2. In cPanel, create a Python App (**Setup Python App**) pointed at this
   `backend/` directory, running on the `api.maaffashion.com` subdomain.
3. Copy `.env.example` to `.env` on the server and set:
   ```
   DEBUG=False
   DB_ENGINE=mysql
   DB_NAME=<cpanel_db_name>
   DB_USER=<cpanel_db_user>
   DB_PASSWORD=<cpanel_db_password>
   ALLOWED_HOSTS=api.maaffashion.com
   CORS_ALLOWED_ORIGINS=https://maaffashion.com,https://www.maaffashion.com
   ```
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py collectstatic --noinput`
7. `python manage.py createsuperuser`
8. Restart the Python app from cPanel.

No code changes are required to move from SQLite to MySQL — only the `.env`
values change.

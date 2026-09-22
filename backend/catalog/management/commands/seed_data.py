from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand

from catalog.models import (
    Category, Product, Certification, Department, CompanyStat, GalleryItem, GalleryCategory,
)


class Command(BaseCommand):
    help = "Seed the database with sample content so the frontend has real data to render."

    def handle(self, *args, **options):
        self._seed_categories()
        self._seed_products()
        self._seed_certifications()
        self._seed_departments()
        self._seed_stats()
        self._seed_gallery()
        self._seed_groups()
        self.stdout.write(self.style.SUCCESS("Sample content seeded successfully."))

    def _seed_categories(self):
        self.categories = {}
        for name in ["Men's Wear", "Women's Wear", "Kids' Wear", "Baby Wear"]:
            cat, _ = Category.objects.get_or_create(name=name)
            self.categories[name] = cat

    def _seed_products(self):
        sample_products = [
            ("Men's Wear", "MW-1001", "Classic Crew Neck T-Shirt", "100% combed cotton, 180 GSM, single jersey knit."),
            ("Men's Wear", "MW-1042", "Zip-Through Fleece Hoodie", "Brushed-back fleece, 320 GSM, YKK zipper."),
            ("Women's Wear", "WW-2010", "Ribbed Tank Top", "Stretch cotton-elastane rib, 210 GSM."),
            ("Women's Wear", "WW-2077", "Relaxed Fit Sweatshirt", "Loopback cotton fleece, garment-washed."),
            ("Kids' Wear", "KW-3005", "Printed Graphic Tee", "Organic cotton, water-based ink print."),
            ("Kids' Wear", "KW-3019", "Jogger Set (2-piece)", "Interlock cotton, elasticated waistband."),
            ("Baby Wear", "BW-4002", "Bodysuit 3-Pack", "GOTS-certified organic cotton, snap closures."),
            ("Baby Wear", "BW-4015", "Knit Romper", "Soft rib knit, flatlock seams for sensitive skin."),
        ]
        for cat_name, sku, name, desc in sample_products:
            Product.objects.get_or_create(
                sku_style_code=sku,
                defaults=dict(name=name, category=self.categories[cat_name], description=desc),
            )

    def _seed_certifications(self):
        certs = [
            ("ISO 9001:2015", "Quality Management System", "International Organization for Standardization"),
            ("WRAP", "Worldwide Responsible Accredited Production", "WRAP"),
            ("BSCI", "Business Social Compliance Initiative", "amfori"),
            ("SEDEX / SMETA", "Ethical trade audit membership", "Sedex"),
            ("OEKO-TEX Standard 100", "Tested for harmful substances", "OEKO-TEX"),
            ("GOTS", "Global Organic Textile Standard", "GOTS"),
            ("BCI", "Better Cotton Initiative member", "Better Cotton"),
        ]
        for i, (name, desc, issuer) in enumerate(certs):
            Certification.objects.get_or_create(
                name=name, defaults=dict(description=desc, issuing_body=issuer, order=i)
            )

    def _seed_departments(self):
        departments = [
            ("Knitting", "State-of-the-art circular and flat knitting floor.",
             "18 x Single Jersey Circular Knitting Machines\n6 x Rib Knitting Machines\n4 x Flatbed Knitting Machines",
             "30,000 pcs/day"),
            ("Dyeing", "High-precision dyeing with reduced water consumption.",
             "8 x High-Temperature Dyeing Machines\n4 x Sample Dyeing Units\n2 x Effluent Treatment Plants",
             "20,000 kg/day"),
            ("Printing & Embroidery", "In-house print and embroidery for full vertical control.",
             "6 x Automatic Screen Printing Machines\n10 x Computerized Embroidery Heads\n2 x Digital Printing Units",
             "15,000 pcs/day"),
        ]
        for i, (name, desc, equipment, capacity) in enumerate(departments):
            Department.objects.get_or_create(
                name=name,
                defaults=dict(description=desc, equipment_list=equipment, daily_capacity=capacity, order=i),
            )

    def _seed_stats(self):
        stats = [
            ("Years of Experience", "15", "+"),
            ("Daily Production Capacity", "65,000", "pcs"),
            ("Workforce", "1,200", "staff"),
            ("Export Markets", "20", "+ countries"),
        ]
        for i, (label, value, suffix) in enumerate(stats):
            CompanyStat.objects.get_or_create(
                label=label, defaults=dict(value=value, suffix=suffix, order=i)
            )

    def _seed_gallery(self):
        items = [
            ("Factory Floor Overview", GalleryCategory.INFRASTRUCTURE),
            ("Central Warehouse", GalleryCategory.INFRASTRUCTURE),
            ("Knitting Line in Operation", GalleryCategory.PROCESS),
            ("Quality Control Checkpoint", GalleryCategory.PROCESS),
            ("Worker Welfare Facility", GalleryCategory.WELFARE),
            ("On-Site Medical Center", GalleryCategory.WELFARE),
        ]
        for i, (title, category) in enumerate(items):
            GalleryItem.objects.get_or_create(
                title=title, defaults=dict(category=category, order=i, caption=title)
            )

    def _seed_groups(self):
        editor_group, created = Group.objects.get_or_create(name="Editor")
        if created:
            editable_models = ["product", "category", "galleryitem", "certification", "department", "companystat"]
            perms = Permission.objects.filter(
                content_type__app_label="catalog",
                content_type__model__in=editable_models,
            )
            editor_group.permissions.set(perms)
        Group.objects.get_or_create(name="Super Admin")

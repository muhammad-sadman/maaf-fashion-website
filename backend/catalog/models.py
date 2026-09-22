from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Product category, e.g. Men's, Women's, Kids', Baby wear."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """A single product / style within the catalogue."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    sku_style_code = models.CharField("SKU / Style Code", max_length=60, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.sku_style_code}-{self.name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.sku_style_code} — {self.name}"


class ProductImage(models.Model):
    """Additional gallery images for a product (beyond the primary image)."""
    product = models.ForeignKey(Product, related_name="gallery_images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/gallery/")
    alt_text = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return f"Image for {self.product.sku_style_code}"


class GalleryCategory(models.TextChoices):
    INFRASTRUCTURE = "infrastructure", "Infrastructure"
    PROCESS = "process", "Manufacturing Process"
    WELFARE = "welfare", "Sustainability & Welfare"


class GalleryItem(models.Model):
    """Media grid item for the visual-proof-of-operations Gallery page."""
    title = models.CharField(max_length=150)
    category = models.CharField(
        max_length=20, choices=GalleryCategory.choices, default=GalleryCategory.INFRASTRUCTURE
    )
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return self.title


class Certification(models.Model):
    """Compliance / certification credential, e.g. ISO, WRAP, BSCI."""
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="certifications/", blank=True, null=True)
    description = models.TextField(blank=True)
    issuing_body = models.CharField(max_length=150, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Department(models.Model):
    """Manufacturing capacity department, e.g. Knitting, Dyeing, Printing & Embroidery."""
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    description = models.TextField(blank=True)
    equipment_list = models.TextField(
        blank=True, help_text="One item per line, e.g. '12 x Circular Knitting Machines'"
    )
    daily_capacity = models.CharField(max_length=120, blank=True, help_text="e.g. '25,000 pcs/day'")
    photo = models.ImageField(upload_to="capacity/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def equipment_items(self):
        return [line.strip() for line in self.equipment_list.splitlines() if line.strip()]

    def __str__(self):
        return self.name


class CompanyStat(models.Model):
    """A key stat shown on the Home page stat banner (years of experience, capacity, staff)."""
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50, help_text="e.g. '15+', '25,000', '1,200'")
    suffix = models.CharField(max_length=20, blank=True, help_text="e.g. 'years', 'pcs/day', 'staff'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.value} {self.suffix} — {self.label}"


class AboutSection(models.TextChoices):
    HERO = "hero", "Hero / Top of Page"
    STORY = "story", "Our Story"
    CREDENTIALS = "credentials", "Company Credentials"
    QUALITY_CONTROL = "quality_control", "Quality Control"
    WELFARE = "welfare", "Employee Welfare"
    GENERAL = "general", "General / Unassigned"


class AboutImage(models.Model):
    """Admin-managed photo shown on the About page, grouped by section so
    editors can control exactly where each image appears without touching code."""
    title = models.CharField(max_length=150, help_text="Internal label, e.g. 'Factory floor wide shot'")
    section = models.CharField(
        max_length=20, choices=AboutSection.choices, default=AboutSection.GENERAL,
        help_text="Which part of the About page this image should appear in.",
    )
    image = models.ImageField(upload_to="about/")
    caption = models.CharField(max_length=255, blank=True, help_text="Optional alt text / caption shown on the site.")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first within a section.")
    is_active = models.BooleanField(default=True, help_text="Uncheck to hide without deleting.")

    class Meta:
        ordering = ["section", "order", "-id"]
        verbose_name = "About Page Image"
        verbose_name_plural = "About Page Images"

    def __str__(self):
        return f"[{self.get_section_display()}] {self.title}"


class Inquiry(models.Model):
    """Contact-form submission from a prospective buyer."""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.submitted_at:%Y-%m-%d}"

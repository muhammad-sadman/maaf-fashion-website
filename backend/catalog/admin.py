from django.contrib import admin
from .models import (
    Category, Product, ProductImage, GalleryItem, Certification,
    Department, CompanyStat, Inquiry, AboutImage,
)

admin.site.site_header = "Maaf Fashion — Content Administration"
admin.site.site_title = "Maaf Fashion Admin"
admin.site.index_title = "Manage website content"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "product_count")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)

    @admin.display(description="Products")
    def product_count(self, obj):
        return obj.products.count()


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("sku_style_code", "name", "category", "is_featured", "created_at")
    list_filter = ("category", "is_featured")
    search_fields = ("name", "sku_style_code", "description")
    prepopulated_fields = {"slug": ("sku_style_code", "name")}
    inlines = [ProductImageInline]


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order")
    list_filter = ("category",)
    list_editable = ("order",)
    search_fields = ("title", "caption")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuing_body", "order")
    list_editable = ("order",)
    search_fields = ("name", "issuing_body")


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "daily_capacity", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(CompanyStat)
class CompanyStatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "suffix", "order")
    list_editable = ("value", "suffix", "order")


@admin.register(AboutImage)
class AboutImageAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "order", "is_active")
    list_filter = ("section", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("title", "caption")


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "subject", "submitted_at", "is_processed")
    list_filter = ("is_processed", "submitted_at")
    list_editable = ("is_processed",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "phone", "subject", "message", "submitted_at")

    def has_add_permission(self, request):
        # Inquiries are only ever created by prospective buyers via the website form.
        return False

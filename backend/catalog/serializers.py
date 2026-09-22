from rest_framework import serializers
from .models import (
    Category, Product, ProductImage, GalleryItem, Certification,
    Department, CompanyStat, Inquiry, AboutImage,
)


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "product_count"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_slug = serializers.SlugRelatedField(
        source="category", slug_field="slug", queryset=Category.objects.all(), write_only=True
    )
    gallery_images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "category", "category_slug", "sku_style_code",
            "description", "image", "is_featured", "created_at", "gallery_images",
        ]


class GalleryItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = GalleryItem
        fields = ["id", "title", "category", "category_display", "image", "caption", "order"]


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["id", "name", "logo", "description", "issuing_body", "order"]


class DepartmentSerializer(serializers.ModelSerializer):
    equipment_items = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = [
            "id", "name", "slug", "description", "equipment_list",
            "equipment_items", "daily_capacity", "photo", "order",
        ]

    def get_equipment_items(self, obj):
        return obj.equipment_items()


class CompanyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyStat
        fields = ["id", "label", "value", "suffix", "order"]


class AboutImageSerializer(serializers.ModelSerializer):
    section_display = serializers.CharField(source="get_section_display", read_only=True)

    class Meta:
        model = AboutImage
        fields = ["id", "title", "section", "section_display", "image", "caption", "order"]


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["id", "name", "email", "phone", "subject", "message", "submitted_at", "is_processed"]
        read_only_fields = ["id", "submitted_at", "is_processed"]

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Please provide a bit more detail in your message (min 10 characters).")
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return value

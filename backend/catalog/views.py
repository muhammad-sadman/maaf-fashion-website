from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Category, Product, GalleryItem, Certification, Department, CompanyStat, Inquiry, AboutImage,
)
from .serializers import (
    CategorySerializer, ProductSerializer, GalleryItemSerializer,
    CertificationSerializer, DepartmentSerializer, CompanyStatSerializer, InquirySerializer,
    AboutImageSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related("category").prefetch_related("gallery_images").all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category__slug", "is_featured"]
    search_fields = ["name", "sku_style_code", "description"]


class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category"]


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [permissions.AllowAny]


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class CompanyStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyStat.objects.all()
    serializer_class = CompanyStatSerializer
    permission_classes = [permissions.AllowAny]


class AboutImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutImage.objects.filter(is_active=True)
    serializer_class = AboutImageSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["section"]


class InquiryCreateView(generics.CreateAPIView):
    """POST /api/inquiries/ — public lead-capture endpoint."""
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        inquiry = serializer.save()
        self._notify(inquiry)

    def _notify(self, inquiry):
        """Send an email notification to the sales inbox. Fails silently
        so a misconfigured SMTP backend never blocks a lead being saved."""
        try:
            send_mail(
                subject=f"New website inquiry: {inquiry.subject or 'General inquiry'}",
                message=(
                    f"Name: {inquiry.name}\n"
                    f"Email: {inquiry.email}\n"
                    f"Phone: {inquiry.phone}\n\n"
                    f"{inquiry.message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.SALES_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass

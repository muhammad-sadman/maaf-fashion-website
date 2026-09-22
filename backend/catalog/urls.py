from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CategoryViewSet, ProductViewSet, GalleryItemViewSet,
    CertificationViewSet, DepartmentViewSet, CompanyStatViewSet, InquiryCreateView,
    AboutImageViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("gallery", GalleryItemViewSet, basename="gallery")
router.register("certifications", CertificationViewSet, basename="certification")
router.register("capacity", DepartmentViewSet, basename="department")
router.register("stats", CompanyStatViewSet, basename="companystat")
router.register("about-images", AboutImageViewSet, basename="aboutimage")

urlpatterns = [
    path("", include(router.urls)),
    path("inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
]

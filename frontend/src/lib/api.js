import axios from "axios";
import {
  mockCategories,
  mockProducts,
  mockCertifications,
  mockDepartments,
  mockStats,
  mockGallery,
  mockAboutImages,
} from "./mockData";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
});

/**
 * Every getter below tries the live Django API first and silently falls
 * back to bundled mock data if the API is unreachable (e.g. during frontend
 * -only development, static export preview, or if the backend is down).
 * This keeps every page renderable without requiring the backend to be running.
 */
async function safeGet(path, fallback, params) {
  try {
    const res = await client.get(path, { params });
    return res.data?.results ?? res.data;
  } catch {
    return fallback;
  }
}

export async function getCategories() {
  return safeGet("/categories/", mockCategories);
}

export async function getProducts({ category, search } = {}) {
  const params = {};
  if (category) params["category__slug"] = category;
  if (search) params["search"] = search;
  return safeGet("/products/", mockProducts, params);
}

export async function getProduct(slug) {
  try {
    const res = await client.get(`/products/${slug}/`);
    return res.data;
  } catch {
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getCertifications() {
  return safeGet("/certifications/", mockCertifications);
}

export async function getDepartments() {
  return safeGet("/capacity/", mockDepartments);
}

export async function getStats() {
  return safeGet("/stats/", mockStats);
}

export async function getGallery({ category } = {}) {
  const params = {};
  if (category) params["category"] = category;
  return safeGet("/gallery/", mockGallery, params);
}

export async function getAboutImages() {
  return safeGet("/about-images/", mockAboutImages);
}

/**
 * Groups a flat list of AboutImage records by their `section` field, so the
 * About page can pull `bySection.story`, `bySection.welfare`, etc.
 */
export function groupAboutImagesBySection(images) {
  return images.reduce((acc, img) => {
    (acc[img.section] ||= []).push(img);
    return acc;
  }, {});
}

export async function submitInquiry(payload) {
  const res = await client.post("/inquiries/", payload);
  return res.data;
}

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${base}${path}`;
}

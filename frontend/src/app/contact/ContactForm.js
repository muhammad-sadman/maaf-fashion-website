"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    try {
      await submitInquiry(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      const apiErrors = err?.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(apiErrors);
      }
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-line rounded-sm p-8 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-success/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-medium mt-4">Inquiry sent</h3>
        <p className="text-slate-600 text-sm mt-2">
          Thanks for reaching out — our sourcing team will respond within two
          business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line rounded-sm p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
        <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Message <span className="text-gold-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your product, target volume, and timeline…"
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message[0]}</p>}
      </div>

      {status === "error" && !Object.keys(errors).length && (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please try again, or
          email us directly at sales@maaffashion.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-sm bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold px-7 py-3.5 transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", value, onChange, error, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink mb-1.5">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-line rounded-sm px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      />
      {error && <p className="text-xs text-red-600 mt-1">{Array.isArray(error) ? error[0] : error}</p>}
    </div>
  );
}

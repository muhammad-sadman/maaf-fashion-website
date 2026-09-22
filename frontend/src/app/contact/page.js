import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Maaf Fashion",
  description: "Get in touch with Maaf Fashion for sourcing inquiries, factory visits, and quotations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Tell us what you're sourcing — we'll confirm capacity and lead time."
        description="Reach our team directly, or send your specs through the inquiry form below."
      />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <InfoBlock
              title="Registered Office"
              lines={["Plot #111 (8th Floor), Ranavola Avenue, Road #13, Sector #10, Uttara",  "Dhaka-1230, Bangladesh"]}
            />
            <InfoBlock
              title="Factory Address"
              lines={["South Debipur (Ranigonj), Ghoraghat, (post code- 5290)", "Dinajpur, Bangladesh."]}
            />
            <InfoBlock
              title="Direct Contact"
              lines={["+880 1777 304 871", "contact@maaffashion.com"]}
            />        

            <div className="rounded-sm overflow-hidden border border-line h-72">
              <iframe
                title="Maaf Fashion factory location"
                src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ title, lines }) {
  return (
    <div className="border-l-2 border-gold-500 pl-5">
      <h3 className="font-display text-lg font-medium">{title}</h3>
      {lines.map((line) => (
        <p key={line} className="text-slate-600 text-sm mt-1">{line}</p>
      ))}
    </div>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Enzo’s Concrete LLC collects, uses and protects the information you share through this website.",
  path: "/privacy-policy",
});

const updated = "October 14, 2026";
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]} title="Privacy policy">
        <p>Last updated {updated}</p>
      </PageHero>
      <section className="section">
        <div className="container prose prose--narrow">
          <p>
            {business.name} (“we”, “us”) respects your privacy. This policy explains what information we collect through
            this website, why we collect it and how we handle it.
          </p>

          <h2>Information you give us</h2>
          <p>When you send an estimate request, we collect the details you enter:</p>
          <ul>
            <li>Your name and phone number</li>
            <li>Your email address, if you provide it</li>
            <li>The type of project, the city or township where it’s located, and any project details you choose to share</li>
            <li>How you’d prefer us to contact you</li>
          </ul>
          <p>
            If you call or email us directly, we receive your phone number or email address and whatever you tell us.
          </p>

          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your inquiry, prepare estimates, schedule and carry out work you
            request, and keep records of our communication with you. We do not sell or rent your personal information,
            and we do not use it for unrelated marketing.
          </p>

          <h2>How it’s handled</h2>
          <p>
            Estimate requests are transmitted securely (HTTPS) and delivered to our business email through an email
            delivery provider that processes the message on our behalf. We keep inquiry records only as long as needed
            to respond, provide our services and meet our business and legal obligations.
          </p>

          <h2>Cookies and analytics</h2>
          {analyticsEnabled ? (
            <p>
              We use Google Analytics to understand how visitors use this website, such as which pages are viewed and
              whether the estimate form or phone links are used. Google Analytics uses cookies and collects information
              such as your approximate location, device and browser. You can opt out with Google’s{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">
                Analytics opt-out browser add-on
              </a>
              .
            </p>
          ) : (
            <p>
              This website does not currently use advertising or analytics cookies. If we add analytics in the future, we
              will update this policy to describe it.
            </p>
          )}
          <p>
            Our hosting provider may keep standard server logs (such as IP address, browser type and the time of a
            request) for security and reliability.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, unless we
            need to keep it for an active project or a legal reason.
          </p>

          <h2>Children</h2>
          <p>This website is intended for adults and is not directed to children under 13.</p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy or your information? Call <a href={business.phone.href}>{business.phone.display}</a>,
            email <a href={`mailto:${business.email}`}>{business.email}</a>, or use our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

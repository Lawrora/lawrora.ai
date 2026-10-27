import type { Metadata } from "next"
import Link from "next/link"
import LegalPage, { CONTACT_EMAIL, LegalSection } from "../components/LegalPage"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using Lawrora, including the SMS Terms for text messages sent through Lawrora.",
  alternates: { canonical: "/terms" },
}

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the websites, client portals, messaging and other
          services of Lawrora Technologies, Inc. (&ldquo;<strong>Lawrora</strong>,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
          By using the services you agree to these Terms and to our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      }
    >
      <LegalSection title="What Lawrora is">
        <p>
          Lawrora provides software that law firms use to take in inquiries, manage cases and communicate with clients.
          <strong> Lawrora is not a law firm and does not provide legal advice.</strong> Using the services, including
          talking to an AI assistant, does not create an attorney-client relationship with Lawrora. Any legal relationship
          is between you and the law firm you contact, and only once that firm agrees to represent you.
        </p>
      </LegalSection>

      <LegalSection id="sms-terms" title="SMS Terms">
        <p>
          <strong>Program.</strong> Lawrora sends text messages on behalf of the law firms that use it. Messages start
          with the name of the law firm you contacted and relate only to your own inquiry or case: replies to your
          inquiry, case updates, treatment check-ins, client-portal sign-in passcodes and reminders, and conversation with
          your legal team. Replies may be answered by an AI assistant until a team member joins.
        </p>
        <p>
          <strong>Opt-in.</strong> You receive texts only after you agree to them, for example by ticking the consent
          box on a firm&apos;s intake form, texting or calling the firm&apos;s intake line, or entering your mobile number to
          receive a passcode. Consent is not a condition of getting help or of any purchase.
        </p>
        <p><strong>Message frequency varies</strong> depending on your inquiry or case.</p>
        <p><strong>Message and data rates may apply.</strong> Check your mobile plan for details.</p>
        <p>
          <strong>Opt-out.</strong> Reply <strong>STOP</strong> to any message to stop receiving texts from that firm. You
          will receive one confirmation and no further texts unless you opt in again. Passcodes are sent only when you
          request one.
        </p>
        <p>
          <strong>Help.</strong> Reply <strong>HELP</strong> for help, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          <strong>Carriers.</strong> Mobile carriers are not liable for delayed or undelivered messages. Delivery is not
          guaranteed.
        </p>
        <p>
          <strong>Privacy.</strong> We do not sell or share your SMS opt-in data or personal information with third
          parties for marketing purposes. See our <Link href="/privacy#sms">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Accounts and the client portal">
        <p>
          Keep your sign-in details private and tell the law firm if you think someone else has accessed your account.
          You may only access your own cases. We may suspend access to protect the service or other people.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <ul>
          <li>Don&apos;t use the services to break the law, harass anyone, or send spam or messages without consent.</li>
          <li>Don&apos;t try to access other people&apos;s information, or probe, disrupt or reverse-engineer the services.</li>
          <li>Give accurate information; law firms rely on it to evaluate your matter.</li>
        </ul>
      </LegalSection>

      <LegalSection title="AI-generated content">
        <p>
          Some responses, summaries and drafts are produced with AI and can be wrong. Law firms review AI output before
          relying on it. Don&apos;t treat an AI response as legal advice.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers and liability">
        <p>
          The services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the extent the law allows, Lawrora
          disclaims implied warranties and is not liable for indirect, incidental or consequential damages arising from
          your use of the services.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may update these Terms. The date at the top shows when they last changed, and continued use means you accept them.</p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about these Terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}

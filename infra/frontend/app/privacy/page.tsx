import type { Metadata } from "next"
import Link from "next/link"
import LegalPage, { CONTACT_EMAIL, LegalSection } from "../components/LegalPage"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lawrora collects, uses and protects personal information, including SMS opt-in data.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          This Privacy Policy explains how Lawrora Technologies, Inc. (&ldquo;<strong>Lawrora</strong>,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) collects, uses and protects personal information. Lawrora provides client-intake, case-management
          and messaging software to law firms. When you contact a law firm that uses Lawrora, for example through its
          website form, by phone or by text, we process your information on that firm&apos;s behalf to help it respond to
          you and handle your matter.
        </p>
      }
    >
      <LegalSection title="Information we collect">
        <ul>
          <li><strong>Contact details:</strong> your name, mobile number, email address and preferred way to be contacted.</li>
          <li><strong>Information about your matter:</strong> what happened, when and where, injuries, medical treatment, insurance, and documents or photos you choose to share.</li>
          <li><strong>Communications:</strong> texts, chat messages, emails, and call recordings and transcripts between you and the law firm, including conversations handled by an AI assistant.</li>
          <li><strong>Consent records:</strong> whether you agreed to receive texts or calls, the exact wording you agreed to, and the date, time and IP address of your consent.</li>
          <li><strong>Client portal account:</strong> your sign-in email or mobile number and activity in the portal.</li>
          <li><strong>Technical information:</strong> device, browser and log data needed to run and secure the service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use information">
        <ul>
          <li>To pass your inquiry to the law firm you contacted, and to help it evaluate, accept and work on your matter.</li>
          <li>To send the messages you asked for or agreed to, such as replies to your inquiry, case updates, treatment check-ins, sign-in passcodes and reminders.</li>
          <li>To give you access to the firm&apos;s client portal, where you can follow your case, message your legal team and sign documents.</li>
          <li>To keep the service secure, prevent abuse, meet legal obligations and improve the service.</li>
        </ul>
        <p>We do not use your information to advertise to you, and we do not sell it.</p>
      </LegalSection>

      <LegalSection id="sms" title="Text messages (SMS) and your opt-in data">
        <p>
          If you agree to receive text messages from a law firm through Lawrora, we use your mobile number and consent
          record only to send you messages about your inquiry or case and to honour your choices. Message frequency
          varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time, or{" "}
          <strong>HELP</strong> for help.
        </p>
        <p>
          <strong>
            We do not sell or share your SMS opt-in data or personal information with third parties for marketing
            purposes.
          </strong>{" "}
          No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
          Text messaging originator opt-in data and consent are not shared with any third parties, except the service
          providers that deliver the messages for us.
        </p>
        <p>
          See the <Link href="/terms#sms-terms">SMS Terms</Link> in our Terms of Service for more about the messaging
          program.
        </p>
      </LegalSection>

      <LegalSection title="Who we share information with">
        <ul>
          <li><strong>The law firm you contacted</strong>, which decides how your matter is handled.</li>
          <li>
            <strong>Service providers</strong> that run parts of the service for us under confidentiality obligations:
            cloud hosting and databases, text and voice delivery, speech recognition, AI processing, email delivery and
            electronic signatures. They may use your information only to provide those services.
          </li>
          <li><strong>Legal and safety reasons:</strong> when required by law, legal process, or to protect rights and safety.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep information">
        <p>
          We keep information for as long as the law firm needs it for your matter and its legal and professional record-keeping
          obligations, or as long as needed to provide the service. Consent and opt-out records are kept to show we honoured
          your choices.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use encryption in transit, access controls limited to authorised staff, and audit logs. No system is perfectly
          secure, but we work to protect your information and to limit who can see it.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <ul>
          <li>Reply <strong>STOP</strong> to any text to stop messages from that firm, or tell the firm you no longer want to be contacted.</li>
          <li>You can ask to see, correct or delete your information. Because we act for the law firm, we may pass your request to it, and some records may be kept where the law requires.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Children">
        <p>The service is not directed to children under 13, and we do not knowingly collect their information directly from them.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>We may update this policy. The date at the top shows when it last changed.</p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about this policy or your information: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}

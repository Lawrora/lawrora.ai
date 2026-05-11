export default function PersonalLiabilityIntakePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 border-b pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Client Intake Form
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            Personal Injury / Liability Intake
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please complete the form below and upload any relevant case files.
          </p>
        </div>

        <form className="space-y-10">
          <Section title="1) Client Information">
            <Grid>
              <Input label="Full Name" />
              <Input label="Date of Birth" type="date" />
              <Input label="Phone Number" type="tel" />
              <Input label="Email Address" type="email" />
              <Input label="Home Address" className="md:col-span-2" />
            </Grid>

            <CheckboxGroup
              label="Preferred Contact Method"
              options={["Phone", "Email", "Text"]}
            />
          </Section>

          <Section title="2) Incident Information">
            <Grid>
              <Input label="Date of Incident" type="date" />
              <Input label="Time of Incident" type="time" />
              <Input
                label="Location of Incident"
                placeholder="City / address / place"
                className="md:col-span-2"
              />
            </Grid>

            <CheckboxGroup
              label="Type of Incident"
              options={[
                "Motor Vehicle Accident",
                "Slip / Trip / Fall",
                "Workplace Injury",
                "Dog Bite / Animal Attack",
                "Medical Negligence",
                "Product Injury",
                "Other",
              ]}
            />

            <Textarea
              label="Brief Description of What Happened"
              placeholder="Write 1–3 sentences..."
            />
          </Section>

          <Section title="3) Injury Information">
            <CheckboxGroup label="Did you suffer injuries?" options={["Yes", "No"]} />

            <Textarea label="Describe your injuries" />

            <CheckboxGroup
              label="Did you receive medical treatment?"
              options={["Yes", "No"]}
            />

            <Textarea label="Name of hospital / clinic / doctor, if known" />
          </Section>

          <Section title="4) Insurance Information">
            <Grid>
              <Input label="Your Insurance Company" />
              <Input label="Claim Number" />
              <Input
                label="Other Party’s Insurance Company"
                className="md:col-span-2"
              />
            </Grid>
          </Section>

          <Section title="5) Document / Case File Upload">
            <p className="mb-4 text-sm text-slate-600">
              Upload police reports, medical bills, photos, insurance letters,
              repair estimates, receipts, or any other related documents.
            </p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-50">
              <span className="text-sm font-semibold text-slate-700">
                Click to upload files
              </span>
              <span className="mt-1 text-xs text-slate-500">
                PDF, images, documents, or receipts
              </span>
              <input type="file" multiple className="hidden" />
            </label>
          </Section>

          <Section title="6) Consent & Signature">
            <p className="mb-5 text-sm leading-6 text-slate-600">
              I certify that the information provided is true and accurate to the
              best of my knowledge. Submitting this form does not create an
              attorney-client relationship until a written agreement is signed.
            </p>

            <Grid>
              <Input label="Signature" />
              <Input label="Date" type="date" />
            </Grid>
          </Section>

          <div className="flex justify-end border-t pt-6">
            <button
              type="submit"
              className="rounded-2xl bg-slate-950 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Submit Intake Form
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-5 text-xl font-bold text-slate-900">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function Input({
  label,
  type = "text",
  placeholder = "",
  className = "",
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder = "",
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-slate-700">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
          >
            <input type="checkbox" className="h-4 w-4 accent-blue-600" />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
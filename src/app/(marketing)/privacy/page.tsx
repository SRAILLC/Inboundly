export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Account information (name, email, business name)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Call recordings and transcripts</li>
              <li>Text message content</li>
              <li>Contact information you upload</li>
              <li>Knowledge base documents you provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and improve our AI receptionist services</li>
              <li>Process calls and send text messages on your behalf</li>
              <li>Train and improve our AI models (anonymized)</li>
              <li>Process payments and maintain your account</li>
              <li>Send service-related communications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
            <p className="text-muted-foreground">
              We use industry-standard security measures to protect your data. Data is stored on secure servers
              with encryption at rest and in transit. Call recordings are stored for 30 days unless you choose
              to retain them longer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We use trusted third-party services to operate:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Clerk - Authentication</li>
              <li>Stripe - Payment processing</li>
              <li>Telnyx - Phone and SMS services</li>
              <li>Vapi - Voice AI processing</li>
              <li>OpenAI - AI language processing</li>
              <li>Supabase - Database hosting</li>
              <li>Vercel - Application hosting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell your personal information. We may share data with service providers who help us
              operate our business, or when required by law. Your call and message data is only used to provide
              services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground">
              We use essential cookies to maintain your session and preferences. We do not use tracking cookies
              for advertising purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our Service is not intended for children under 18. We do not knowingly collect personal information
              from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of material changes by
              email or through the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related questions, please contact us at privacy@aireceptionist.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

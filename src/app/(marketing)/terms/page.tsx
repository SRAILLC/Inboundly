export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using AI Receptionist (&quot;Service&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground">
              AI Receptionist provides AI-powered call answering, text messaging automation, and appointment booking
              services for businesses. The Service includes voice AI, SMS automation, and related features as described
              on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="text-muted-foreground">
              You must provide accurate and complete information when creating an account. You are responsible for
              maintaining the security of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Billing and Payment</h2>
            <p className="text-muted-foreground mb-4">
              Subscription fees are billed monthly. Usage fees (calls, texts, phone numbers) are deducted from your
              prepaid balance. You agree to maintain sufficient balance for your usage.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Free trial period is 7 days with valid payment method required</li>
              <li>Subscription renewals are automatic unless cancelled</li>
              <li>Refunds are provided at our discretion</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use the Service for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Sending spam or unsolicited messages</li>
              <li>Illegal activities or fraud</li>
              <li>Harassing or threatening communications</li>
              <li>Violating TCPA, GDPR, or other applicable regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. SMS Compliance</h2>
            <p className="text-muted-foreground">
              You are responsible for ensuring your use of SMS features complies with TCPA and carrier requirements.
              You must honor opt-out requests immediately. Our Service automatically handles STOP requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              The Service is provided &quot;as is&quot; without warranties. We are not liable for any indirect, incidental,
              or consequential damages. Our total liability is limited to the amount you paid in the past 12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="text-muted-foreground">
              We may suspend or terminate your account for violations of these terms. You may cancel your subscription
              at any time through your account settings. Cancellations take effect at the end of your billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of the Service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at support@aireceptionist.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

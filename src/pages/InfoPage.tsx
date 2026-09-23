import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const pageContent = {
  '/shipping-policy': {
    title: 'Shipping Policy',
    intro: 'Everything you need to know about delivery from TRIMATRIK.',
    sections: [
      ['Delivery coverage', 'We deliver across Bangladesh. Delivery availability and charges are shown during checkout.'],
      ['Processing time', 'Orders are prepared after confirmation. We will contact you if an item needs additional time.'],
      ['Order updates', 'For delivery updates, contact our team by phone or Facebook Inbox.'],
    ],
  },
  '/return-policy': {
    title: 'Return Policy',
    intro: 'We want your TRIMATRIK order to feel right for you.',
    sections: [
      ['Before delivery', 'Please check your order at delivery whenever possible.'],
      ['Need help?', 'If there is an issue with an item, contact us promptly with your order details and photos if applicable.'],
      ['Support', 'Our team will review your request and guide you through the available next steps.'],
    ],
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    intro: 'Quick answers for shopping with TRIMATRIK.',
    sections: [
      ['How do I place an order?', 'Choose a product, add it to your cart, then complete checkout with your delivery details.'],
      ['Can I contact you before ordering?', 'Yes. Use Facebook Inbox or call +880 1995-909243.'],
      ['Where do you deliver?', 'We serve customers throughout Bangladesh.'],
    ],
  },
} as const;

export default function InfoPage() {
  const location = useLocation();
  const page = pageContent[location.pathname as keyof typeof pageContent] || pageContent['/faq'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-16">
        <section className="container-custom max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">TRIMATRIK</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">{page.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{page.intro}</p>
          <div className="mt-10 space-y-5">
            {page.sections.map(([heading, body]) => (
              <article key={heading} className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <Link to="/contact" className="mt-10 inline-flex font-semibold text-primary hover:underline">
            Need more help? Contact TRIMATRIK
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

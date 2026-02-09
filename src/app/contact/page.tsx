import type { Metadata } from 'next';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Contact Us - VMR Solution | Get in Touch',
  description: 'Contact VMR Solution for inquiries, bulk orders, or support. We are here to help you with quality plastic household products.',
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <ContactInteractive />
    </div>
  );
}

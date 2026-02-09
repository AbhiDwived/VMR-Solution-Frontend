'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useSubmitContactMutation } from '@/store/api/contactApi';

const ContactInteractive = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      await submitContact(formData).unwrap();
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error?.data?.message || 'Failed to send message. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Manufacturer of Plastic Housemould Products
            </p>
            <p className="mt-2 text-base text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information Cards */}
          <div className="space-y-4 lg:col-span-1">
            {/* Phone */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1 transition-smooth hover:shadow-elevation-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name="PhoneIcon" size={24} className="text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-2">Mon-Sat: 9 AM - 6 PM</p>
              <a href="tel:+919810092418" className="text-primary hover:underline">
                +91 98100 92418
              </a>
            </div>

            {/* Email */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1 transition-smooth hover:shadow-elevation-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name="EnvelopeIcon" size={24} className="text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-2">We'll respond within 24 hours</p>
              <a href="mailto:vmrsolutions11@gmail.com" className="text-primary hover:underline">
                vmrsolutions11@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1 transition-smooth hover:shadow-elevation-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name="MapPinIcon" size={24} className="text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Visit Us</h3>
              <p className="text-sm text-muted-foreground">
                Plot No. 53, Murad Nagar Ind. Area<br />
                Abupur, Ghaziabad (UP) – 201206
              </p>
            </div>

            {/* Social Media */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
              <h3 className="mb-4 font-semibold text-card-foreground">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Icon name="ShareIcon" size={20} />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Icon name="CameraIcon" size={20} />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Icon name="ChatBubbleLeftRightIcon" size={20} />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Icon name="BuildingOfficeIcon" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1 sm:p-6">
              <h2 className="mb-4 font-heading text-2xl font-semibold text-card-foreground">
                Send us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-3">
                  <div className="flex items-center">
                    <Icon name="CheckCircleIcon" size={20} className="text-green-600 mr-2" />
                    <p className="text-sm text-green-800">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
                  <div className="flex items-center">
                    <Icon name="XCircleIcon" size={20} className="text-red-600 mr-2" />
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-card-foreground">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-card-foreground">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-card-foreground">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-card-foreground">
                      Subject <span className="text-error">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-card-foreground">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-smooth hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-card-foreground">Quick Answers</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="QuestionMarkCircleIcon" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">What are your business hours?</p>
                    <p className="text-muted-foreground">We're available Monday to Saturday, 9 AM - 6 PM IST.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="QuestionMarkCircleIcon" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Do you offer bulk discounts?</p>
                    <p className="text-muted-foreground">Yes! Contact us for special pricing on bulk orders.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="QuestionMarkCircleIcon" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">How long does shipping take?</p>
                    <p className="text-muted-foreground">Standard delivery takes 3-7 business days across India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-4 text-center font-heading text-2xl font-semibold text-foreground">
            Find Us on Map
          </h2>
          <div className="overflow-hidden rounded-lg border border-border shadow-elevation-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4!2d77.5!3d28.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDUxJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VMR Solutions Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInteractive;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useQueries';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const submitInquiry = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-spice-brown mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have questions about our products? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="border-spice-orange/20">
              <CardHeader>
                <CardTitle className="text-spice-brown">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-spice-red hover:bg-spice-red/90 text-white"
                    disabled={submitInquiry.isPending}
                  >
                    {submitInquiry.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-spice-orange/20">
              <CardHeader>
                <CardTitle className="text-spice-brown">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-spice-red mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-spice-brown mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Alabaskpur, Gaurichak<br />
                      Patna, Bihar 800007<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-spice-red mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-spice-brown mb-1">Phone</h3>
                    <p className="text-muted-foreground">7488064910</p>
                   
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-spice-red mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-spice-brown mb-1">Email</h3>
                    <p className="text-muted-foreground">biharimasala589@gmail.com</p>
                    
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-spice-red mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-spice-brown mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-muted-foreground">Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-spice-orange/20 bg-gradient-to-br from-spice-red/5 to-spice-orange/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-spice-brown mb-2">Why Choose Bihari Masala?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 100% Natural ingredients</li>
                  <li>✓ Traditional recipes passed down through generations</li>
                  <li>✓ Handcrafted with care and attention</li>
                  <li>✓ No artificial colors or preservatives</li>
                  <li>✓ Fresh and authentic flavors</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
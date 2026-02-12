export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">About Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Welcome to our platform. We are dedicated to providing exceptional service and innovative solutions.
          </p>
          <p className="text-muted-foreground">
            Our team is committed to excellence and continuous improvement in everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}

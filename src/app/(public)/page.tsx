export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-8 gap-8">
      <div style={{ maxWidth: "800px" }}>
        <h1 className="mb-4">
          Empowering the <span className="gradient-text">Church</span> through Organized Service.
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--foreground)", opacity: 0.8 }} className="mb-8">
          Manage volunteers, schedule services, and automate birthday greetings effortlessly.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="/login" className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}>
            Get Started
          </a>
          <a href="/dashboard" className="btn btn-secondary glass" style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}>
            View Dashboard
          </a>
        </div>
      </div>

      <div className="grid mt-8 gap-4 w-full" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div className="card glass">
          <h3 className="mb-4 gradient-text">Smart Scheduling</h3>
          <p>Easily assign volunteers to services and roles. Keep track of upcoming events.</p>
        </div>
        <div className="card glass">
          <h3 className="mb-4 gradient-text">User Hierarchy</h3>
          <p>Organize users by roles: Super User, Leader, and Volunteer.</p>
        </div>
        <div className="card glass">
          <h3 className="mb-4 gradient-text">Automated Greetings</h3>
          <p>Never miss a birthday. Our system automatically sends out blessings.</p>
        </div>
      </div>
    </div>
  );
}

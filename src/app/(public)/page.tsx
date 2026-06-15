import { ArrowRight, CalendarDays, Users, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Empowering the <span className="text-indigo-600">Church</span> through Organized Service.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">Manage volunteers, schedule services, and automate birthday greetings effortlessly.</p>

          <div className="flex justify-center gap-4 mb-12">
            <a href="/login" className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/dashboard" className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl">
              View Dashboard
            </a>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <FeatureCard title="Smart Scheduling" description="Easily assign volunteers to services and roles. Keep track of upcoming events." icon={<CalendarDays className="w-6 h-6 text-indigo-600" />} />
            <FeatureCard title="User Hierarchy" description="Organize users by roles: Super User, Leader, and Volunteer." icon={<Users className="w-6 h-6 text-indigo-600" />} />
            <FeatureCard title="Automated Greetings" description="Never miss a birthday. Our system automatically sends out blessings." icon={<Heart className="w-6 h-6 text-indigo-600" />} />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}

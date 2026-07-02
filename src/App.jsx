import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import logo from './assets/insidetech-logo.png'
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Cloud,
  Code2,
  Headphones,
  Menu,
  MonitorSmartphone,
  Palette,
  Play,
  Rocket,
  Send,
  X,
} from 'lucide-react'
import './App.css'
import {
  company,
  contactItems,
  faqs,
  featureHighlights,
  footerServices,
  navItems,
  processSteps,
  progress,
  seoMap,
  serviceDetails,
  serviceCapabilities,
  services,
  specialtyCards,
  stats,
  team,
} from './data/siteData'
import { applySeo } from './utils/seo'

const SiteContentContext = createContext({
  services,
  team,
  faqs,
  stats,
  serviceDetails,
  testimonials: [
    {
      name: 'Siddhant',
      role: 'ACAKJ Services',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      message: 'We consulted InsideTech Softwares during a critical tech transition. Their insights were spot-on from system architecture to deployment planning. Their consulting gave us a clear roadmap and saved time.',
    },
  ],
})

const serviceIconMap = {
  BarChart3,
  Cloud,
  Code2,
  Headphones,
  MonitorSmartphone,
  Palette,
}

function useSiteContent() {
  return useContext(SiteContentContext)
}

const heroImage =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
const aboutImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80'
const consultImage =
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
const serviceImage =
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'

function Logo() {
  return (
    <a href="/" className="brand-logo" aria-label="InsideTech home">
      <img src={logo} alt="InsideTech" />
    </a>
  )
}

function DesktopNavItem({ item, path }) {
  const { services: dynamicServices } = useSiteContent()

  if (item.path !== '/services') {
    return (
      <a className={`nav-link ${path === item.path ? 'active' : ''}`} href={item.path}>
        {item.label}
      </a>
    )
  }

  return (
    <div className="nav-dropdown">
      <a className={`nav-link nav-dropdown-trigger ${path.startsWith('/services') ? 'active' : ''}`} href={item.path}>
        Services <ChevronDown size={14} className="dropdown-icon" aria-hidden="true" />
      </a>
      <div className="services-menu" role="menu" aria-label="Services menu">
        <div className="services-menu-grid">
          {dynamicServices.map((service) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="services-menu-item services-menu-item--title-only"
              role="menuitem"
            >
              <span className="service-title">{service.title}</span>
            </a>
          ))}
        </div>
        <a className="services-menu-link-more" href="/services">
          Explore all services
        </a>
      </div>
    </div>
  )
}

function Header({ path }) {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { services: dynamicServices } = useSiteContent()

  return (
    <header className="site-header">
      <nav className="site-container nav-shell">
        <div className="hidden flex-1 items-center justify-end gap-8 lg:flex ">
          {navItems.slice(0, 3).map((item) => (
            <DesktopNavItem key={item.path} item={item} path={path} />
          ))}
        </div>

        <Logo />

        <div className="hidden flex-1 items-center gap-6 lg:flex ">
          {navItems.slice(3).map((item) => (
            <DesktopNavItem key={item.path} item={item} path={path} />
          ))}
        </div>

        <button
          type="button"
          className="grid size-12 place-items-center rounded-md border border-slate-200 text-brand lg:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="ml-auto flex h-full w-80 max-w-[86vw] flex-col gap-3 bg-white p-6 shadow-panel transition-transform duration-300 ease-in-out transform translate-x-0"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                className="grid size-10 place-items-center rounded-md bg-soft text-brand"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            {navItems.map((item) => {
              if (item.path !== '/services') {
                return (
                  <a
                    key={item.path}
                    className={`rounded-md px-4 py-3 font-semibold transition-all duration-200 ${
                      path === item.path
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    href={item.path}
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <div key={item.path} className="mobile-nav-group">
                  <button
                    type="button"
                    className={`mobile-nav-toggle rounded-md px-4 py-3 font-semibold transition-all duration-200 ${
                      path.startsWith('/services')
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                        : 'text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services-list"
                    onClick={() => setServicesOpen((prev) => !prev)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={18} className={servicesOpen ? 'mobile-chevron open' : 'mobile-chevron'} aria-hidden="true" />
                  </button>
                  {servicesOpen && (
                    <div id="mobile-services-list" className="mobile-services-submenu">
                      {dynamicServices.map((service) => (
                        <a
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className={`rounded-md px-4 py-3 text-slate-700 transition-colors duration-200 hover:bg-slate-100 ${
                            path === `/services/${service.slug}` ? 'bg-slate-100 font-semibold text-blue-700' : ''
                          }`}
                        >
                          {service.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="site-container grid min-h-[560px] items-center gap-12 py-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow mb-6">Technology and IT Solutions</p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-normal text-slate-950">
            Digital <span className="text-skybrand">Technology</span>,{' '}
            <span className="text-accent">IT Solution</span> and Services Around the World
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-muted">
            Empowering businesses worldwide with practical, impact-driven solutions for over 4 years.
          </p>
          <a className="btn-primary mt-7" href="/contact">
            Get Started <ArrowRight size={18} />
          </a>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="tech-window" />
          <span className="floating-person one" />
          <span className="floating-person two" />
        </div>
      </div>
    </section>
  )
}

function Specialty() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="site-container grid items-center gap-14 lg:grid-cols-2">
        <div className="grid gap-5 sm:grid-cols-2">
          {specialtyCards.map(({ title, icon: Icon, className }) => (
            <div key={title} className={`min-h-56 rounded-lg bg-gradient-to-br ${className} p-9 text-white shadow-soft`}>
              <span className="mb-8 grid size-16 place-items-center rounded-full bg-white/95 text-brand">
                <Icon size={30} />
              </span>
              <h3 className="text-2xl font-extrabold leading-snug">{title}</h3>
            </div>
          ))}
        </div>
        <div>
          <p className="eyebrow mb-5">Our Specialty</p>
          <h2 className="text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
            What is So Special About Insidetech Softwares?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            InsideTech Softwares stands out for an innovative approach to digital transformation, blending modern
            technology with user-focused design. From web and mobile development to secure, scalable software, we
            deliver value-driven results.
          </p>
          <div className="mt-8 space-y-6">
            {progress.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-base font-semibold text-slate-700">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBand({ variant = 'bright' }) {
  const { stats: dynamicStats } = useSiteContent()

  return (
    <section className={`${variant === 'dark' ? 'bg-brand' : 'blue-panel'} py-16 text-white`}>
      <div className="site-container grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((item) => (
          <div key={item.label}>
            <strong className="block text-5xl font-black md:text-6xl">{item.value}</strong>
            <span className="mt-3 block text-xl font-semibold text-white/88">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceGrid({ compact = false }) {
  const { services: dynamicServices } = useSiteContent()

  return (
    <div className={`grid gap-7 ${compact ? 'md:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
      {dynamicServices.map(({ slug, title, summary, icon }, index) => {
        const Icon = typeof icon === 'string' ? serviceIconMap[icon] || Code2 : icon
        return (
        <a
          key={title}
          href={`/services/${slug}`}
          className={`service-card flex min-h-48 gap-7 rounded-md border border-slate-100 bg-white p-8 text-left text-inherit no-underline shadow-soft ${
            !compact && index === 4 ? 'bg-gradient-to-r from-emerald-700 to-teal-400 text-white' : ''
          }`}
        >
          <span className="grid size-16 shrink-0 place-items-center rounded-md bg-soft text-skybrand">
            <Icon size={34} />
          </span>
          <span>
            <h3 className="text-2xl font-extrabold tracking-normal">{title}</h3>
            <p className={`mt-4 leading-8 ${!compact && index === 4 ? 'text-white/92' : 'text-muted'}`}>{summary}</p>
          </span>
        </a>
        )
      })}
    </div>
  )
}

function FeaturedServices() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <div className="mb-14 text-center">
          <p className="eyebrow">Our Services</p>
          <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">Our Featured Services</h2>
        </div>
        <ServiceGrid />
      </div>
    </section>
  )
}

function Testimonials() {
  const { testimonials } = useSiteContent()
  const review = testimonials[0]

  if (!review) return null

  return (
    <section className="section-pad bg-white">
      <div className="site-container text-center">
        <p className="eyebrow">Client Reviews</p>
        <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">What Saying Our Customers</h2>
        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-8 rounded-md bg-white p-8 text-left shadow-panel md:grid-cols-[220px_1fr]">
          <img
            src={review.image}
            alt={`${review.name} testimonial`}
            className="h-64 w-full rounded-lg object-cover md:h-56"
          />
          <div>
            <p className="text-2xl italic leading-10 text-slate-800">
              {review.message}
            </p>
            <h3 className="mt-8 text-xl font-black">{review.name}</h3>
            <p className="text-muted">{review.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCta() {
  return (
    <section className="blue-panel px-4 py-24 text-center text-white">
      <RocketIcon />
      <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-tight tracking-normal md:text-5xl">
        Let us Start a Cool Project With <span className="text-orange-200">InsideTech</span>
      </h2>
      <a className="btn-primary btn-orange mt-9" href="/contact">
        Get Started
      </a>
    </section>
  )
}

function RocketIcon() {
  return (
    <span className="mx-auto grid size-20 place-items-center rounded-full bg-white/12 text-accent">
      <Rocket size={46} />
    </span>
  )
}

function Footer() {
  return (
    <footer className="bg-[#eaf3ff] pt-20 text-slate-700">
      <div className="site-container grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-7 leading-8">
            At Inside Tech Softwares, we empower businesses by integrating intelligent automation to streamline
            workflows, enhance efficiency, and reduce costs through secure technology solutions.
          </p>
        </div>
        <div>
          <h3 className="mb-7 text-2xl font-black text-slate-950">IT Services</h3>
          <ul className="space-y-4">
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-7 text-2xl font-black text-slate-950">Contact Info</h3>
          <p className="leading-8">{company.address}</p>
          <p className="mt-4">{company.phone}</p>
          <p className="mt-4">{company.email}</p>
          <p className="mt-4">Opening Hours: {company.hours}</p>
        </div>
        <div>
          <h3 className="mb-7 text-2xl font-black text-slate-950">What is New at Insidetech Softwares</h3>
          <p className="leading-8">Sneak peek into our roadmap. Whether you are building, scaling, or exploring, there is something here for everyone.</p>
          <form className="mt-8 flex overflow-hidden rounded-full bg-white shadow-soft">
            <input className="min-w-0 flex-1 px-6 outline-none" placeholder="Your email address" type="email" />
            <button className="grid size-16 shrink-0 place-items-center rounded-full bg-brand text-white" aria-label="Subscribe" type="submit">
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/80 py-6">
        <div className="site-container flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 All Rights Reserved. Design and Developed By InsideTech Softwares</p>
          <div className="flex gap-5">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/faqs">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Specialty />
      <StatsBand />
      <FeaturedServices />
      <Testimonials />
      <ProjectCta />
    </>
  )
}

function PageHero({ title, image = heroImage }) {
  return (
    <section className="relative grid min-h-[420px] place-items-center overflow-hidden text-center text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-slate-950/48" />
      <div className="relative z-10 px-4">
        <h1 className="text-5xl font-black tracking-normal md:text-6xl">{title}</h1>
        <p className="mt-5 font-medium">{company.legalName} / {title}</p>
      </div>
    </section>
  )
}

function AboutIntro() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <img src={aboutImage} alt="InsideTech team collaboration" className="aspect-square w-full rounded-full object-cover shadow-soft" />
          <span className="absolute -bottom-4 left-16 h-28 w-8 rotate-45 rounded-full bg-brand/35" />
          <span className="absolute -bottom-8 left-28 h-28 w-8 rotate-45 rounded-full bg-skybrand/35" />
        </div>
        <div>
          <span className="rounded-full bg-soft px-8 py-3 font-bold uppercase text-skybrand">About Us</span>
          <h2 className="mt-7 text-4xl font-black leading-tight tracking-normal md:text-5xl">
            We Are Increasing Business Success With Technology
          </h2>
          <p className="mt-6 text-xl leading-9 text-muted">
            Over 4+ years working in IT services developing software applications and mobile apps for clients all over
            the world.
          </p>
          <p className="mt-7 leading-8 text-muted">
            At Inside Tech Softwares, we transform the way businesses operate by integrating intelligent automation into
            everyday workflows. Our passion lies in helping organizations streamline operations, boost efficiency, and
            reduce operational costs through scalable technology.
          </p>
          <a className="btn-primary mt-9" href="/services">Learn More</a>
        </div>
      </div>
    </section>
  )
}

function TeamBand() {
  const { team: dynamicTeam } = useSiteContent()

  return (
    <section className="blue-panel section-pad text-white">
      <div className="site-container text-center">
        <span className="rounded-full bg-white/12 px-8 py-3 font-bold uppercase">Team</span>
        <h2 className="mt-7 text-4xl font-black tracking-normal md:text-5xl">Meet With IT Experts</h2>
        <div className="mt-14 grid gap-9 md:grid-cols-3">
          {dynamicTeam.slice(0, 3).map((member) => (
            <TeamMember key={member.name} member={member} dark />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessTimeline() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container text-center">
        <span className="rounded-full bg-soft px-8 py-3 font-bold uppercase text-skybrand">Process</span>
        <h2 className="mt-7 text-4xl font-black tracking-normal md:text-5xl">Our Working Process</h2>
        <div className="relative mt-16 grid gap-10 lg:grid-cols-4">
          <span className="timeline-line absolute left-0 right-0 top-20 hidden h-1 lg:block" />
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mx-auto grid size-40 place-items-center rounded-full border-2 border-dashed border-brand bg-white p-4 shadow-soft">
                <img
                  src={`https://images.unsplash.com/photo-${['1517048676732-d65bc937f952', '1553877522-43269d4ea984', '1556761175-5973dc0f32e7', '1551836022-deb4988cc6c0'][index]}?auto=format&fit=crop&w=400&q=80`}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConsultationForm({ blue = false }) {
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    setStatusType('')

    const formElement = event.currentTarget
    const payload = Object.fromEntries(new FormData(formElement).entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || 'Unable to submit form. Please try again.')
      }

      formElement.reset()
      setStatusType('success')
      setStatus(data?.message || 'Thanks. Your request has been received.')
    } catch (error) {
      setStatusType('error')
      setStatus(error?.message || 'Unable to submit form. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${blue ? 'text-white' : ''}`}>
      <div className="grid gap-6 sm:grid-cols-2">
        <input className="field" name="name" placeholder="Name" required />
        <input className="field" name="email" placeholder="E-Mail" type="email" required />
        <input className="field" name="phone" placeholder="Phone Number" />
        <input className="field" name="website" placeholder="Your Website" />
      </div>
      <textarea className="field mt-6 min-h-40 py-5" name="message" placeholder="Your Message Here" required />
      <button className="btn-primary mt-7" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Now'}
      </button>
      {status && (
        <p
          className={`mt-5 font-semibold ${blue ? 'text-white' : statusType === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}
        >
          {status}
        </p>
      )}
    </form>
  )
}

function FreeConsultation() {
  return (
    <section className="blue-panel section-pad">
      <div className="site-container">
        <h2 className="mb-14 text-center text-4xl font-black tracking-normal text-white md:text-5xl">Request A Free Consultation</h2>
        <div className="grid overflow-hidden rounded-md bg-white shadow-panel lg:grid-cols-2">
          <div className="relative min-h-[460px]">
            <img src={consultImage} alt="Consultation meeting" className="absolute inset-0 h-full w-full object-cover" />
            <button className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-panel" aria-label="Play video" type="button">
              <Play fill="currentColor" size={28} />
            </button>
          </div>
          <div className="p-8 md:p-14">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero title="About" image={aboutImage} />
      <AboutIntro />
      <TeamBand />
      <ProcessTimeline />
      <FreeConsultation />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <section className="section-pad bg-slate-50">
        <div className="site-container">
          <ServiceGrid compact />
        </div>
      </section>
      <WorkingProcess />
      <QuoteSection />
    </>
  )
}

function WorkingProcess() {
  return (
    <section className="blue-panel section-pad text-white">
      <div className="site-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg bg-white/10 p-10 backdrop-blur">
          <p className="mb-5 uppercase">Working Process</p>
          <h2 className="text-4xl font-black leading-tight tracking-normal">Our Working Process - How We Work For Our Customers</h2>
          <a className="btn-primary mt-9" href="/contact">Contact Us</a>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <div key={step.title}>
              <strong className="text-6xl font-black">{index + 1}.</strong>
              <h3 className="mt-4 text-2xl font-black">{step.title}</h3>
              <p className="mt-5 leading-8 text-white/82">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container grid overflow-hidden rounded-md shadow-panel lg:grid-cols-2">
        <div className="relative min-h-[540px]">
          <img src={consultImage} alt="Project quote discussion" className="absolute inset-0 h-full w-full object-cover" />
          <button className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white" aria-label="Play video" type="button">
            <Play fill="currentColor" size={28} />
          </button>
        </div>
        <div className="bg-gradient-to-br from-brand to-skybrand p-8 md:p-14">
          <p className="font-bold uppercase text-white/80">Let us Talk</p>
          <h2 className="mt-5 text-4xl font-black tracking-normal text-white md:text-5xl">Request a Free Quote</h2>
          <div className="mt-9">
            <ConsultationForm blue />
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceDetailPage({ slug }) {
  const { services: dynamicServices, serviceDetails } = useSiteContent()
  const service = dynamicServices.find((item) => item.slug === slug) || dynamicServices[0]
  const detail = serviceDetails.find((item) => item.slug === slug) || {}
  const title = detail.title || `Professional ${service?.title || 'Service'} Solutions`
  const subtitle = detail.subtitle || service?.title || 'Service'
  const description =
    detail.description ||
    service?.summary ||
    'We deliver reliable, scalable, and business-focused technology solutions tailored to your goals.'
  const contentImage = detail.image || serviceImage
  const hero = detail.heroImage || heroImage
  const highlights = (detail.highlights || 'Expert Peoples|First Growing Process|Creative Ideas')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <>
      <PageHero title={service?.title || 'Service Details'} image={hero} />
      <section className="section-pad bg-white">
        <div className="site-container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-5 font-bold uppercase text-brand">{subtitle}</p>
            <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
              {title}
            </h1>
            <div className="my-7 h-1 w-24 rounded-full bg-skybrand" />
            <p className="text-xl leading-9 text-muted">
              {description}
            </p>
            <a className="btn-primary mt-9" href="/contact">Contact Us</a>
          </div>
          <div className="relative">
            <img src={contentImage} alt={service?.title || 'Service detail'} className="aspect-square w-full rounded-full object-cover shadow-soft" />
          </div>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="site-container grid gap-6 md:grid-cols-3">
          {featureHighlights.slice(0, 3).map(({ text, icon: Icon }, index) => (
            <div key={highlights[index] || text} className="flex gap-6 rounded-md bg-soft p-8">
              <Icon className="shrink-0 text-skybrand" size={46} />
              <div>
                <h3 className="text-xl font-black">{highlights[index] || `Service Strength ${index + 1}`}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad bg-[#eef5ff]">
        <div className="site-container grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {serviceCapabilities.map(({ label, icon: Icon }) => (
              <div key={label} className="rounded-md bg-white p-6 shadow-soft">
                <Icon className="text-brand" size={34} />
                <p className="mt-4 font-bold">{label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-5 font-bold uppercase text-brand">Why Choose Us</p>
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
              Your Vision, Our Expertise - A Partnership That Delivers
            </h2>
            <p className="mt-6 text-xl leading-9 text-muted">
              We blend innovation, expertise, and dedication to deliver reliable, high-quality digital solutions focused
              on growth and client success.
            </p>
            <div className="mt-8 space-y-5">
              {[
                ['Software Development', 92],
                ['Web Development', 90],
                ['Cloud Hosting', 85],
                ['Cyber Security', 95],
                ['Mobile Solution', 90],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between font-black uppercase tracking-normal">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 bg-blue-100">
                    <div className="h-2 bg-brand" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <StatsBand variant="dark" />
    </>
  )
}

function TeamMember({ member, dark = false }) {
  return (
    <article className={dark ? 'text-white' : 'text-center text-slate-950'}>
      <img src={member.image} alt={member.name} className="mx-auto aspect-square w-full max-w-80 rounded-lg object-cover shadow-soft" />
      <h3 className="mt-7 text-2xl font-black uppercase">{member.name}</h3>
      <p className={`mt-2 ${dark ? 'text-white/82' : 'text-muted'}`}>{member.role}</p>
      <a href={member.linkedin || 'https://www.linkedin.com'} aria-label={`${member.name} LinkedIn`} className="mx-auto mt-4 inline-flex text-current">
        <span className="text-xl font-black">in</span>
      </a>
    </article>
  )
}

function TeamPage() {
  const { team: dynamicTeam } = useSiteContent()

  return (
    <section className="section-pad bg-white">
      <div className="site-container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {dynamicTeam.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>
    </section>
  )
}

function FaqPage() {
  const [active, setActive] = useState(0)
  const { faqs: dynamicFaqs } = useSiteContent()

  return (
    <section className="section-pad bg-slate-50">
      <div className="site-container grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <img src={aboutImage} alt="InsideTech support" className="aspect-square w-full rounded-full object-cover shadow-soft" />
        <div>
          <span className="rounded-full bg-white px-8 py-3 font-bold uppercase text-skybrand">FAQs</span>
          <h1 className="mt-7 text-4xl font-black tracking-normal md:text-5xl">Do You Have Any Questions?</h1>
          <div className="mt-10 space-y-5">
            {dynamicFaqs.map((faq, index) => (
              <div key={faq.question} className="rounded-3xl bg-white p-7 shadow-soft">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left text-xl font-black"
                  onClick={() => setActive(active === index ? -1 : index)}
                >
                  {faq.question}
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <ChevronDown className={active === index ? 'rotate-180 transition' : 'transition'} size={24} />
                  </span>
                </button>
                {active === index && <p className="mt-6 leading-8 text-muted">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="site-container grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-md bg-gradient-to-br from-brand to-skybrand p-10 text-white shadow-panel">
            <p className="font-bold uppercase text-white/80">Let us Talk</p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal">Speak With Expert Engineers.</h1>
            <div className="mt-10 space-y-8">
              {contactItems.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex gap-5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-brand">
                    <Icon size={24} />
                  </span>
                  <div>
                    <strong>{label}:</strong>
                    <p className="mt-2 leading-7 text-white/90">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <div>
            <p className="mb-5 font-bold uppercase tracking-normal text-skybrand">Get in Touch</p>
            <h2 className="text-4xl font-black tracking-normal md:text-5xl">Fill The Form Below</h2>
            <div className="mt-10">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
      <iframe
        title="InsideTech Jaipur map"
        src="https://www.google.com/maps?q=Krishna%20Sagar%20Colony%20Jaipur%20Rajasthan%20302020&output=embed"
        className="h-[420px] w-full border-0"
        loading="lazy"
      />
    </>
  )
}

const contentLabels = {
  services: 'Services',
  serviceDetails: 'Service Details',
  team: 'Team Members',
  faqs: 'FAQs',
  stats: 'Stats',
  testimonials: 'Client Reviews',
}

const emptyItems = {
  services: { title: '', slug: '', summary: '', icon: 'Code2', order: 0, isActive: true },
  serviceDetails: {
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    image: '',
    heroImage: '',
    highlights: '',
    order: 0,
    isActive: true,
  },
  team: { name: '', role: '', image: '', order: 0, isActive: true },
  faqs: { question: '', answer: '', order: 0, isActive: true },
  stats: { value: '', label: '', order: 0, isActive: true },
  testimonials: { name: '', role: '', image: '', message: '', order: 0, isActive: true },
}

const fieldMap = {
  services: [
    ['title', 'Title'],
    ['slug', 'Slug'],
    ['summary', 'Summary'],
    ['icon', 'Icon'],
    ['order', 'Order'],
  ],
  serviceDetails: [
    ['slug', 'Service Slug'],
    ['subtitle', 'Small Heading'],
    ['title', 'Main Title'],
    ['description', 'Description'],
    ['image', 'Content Image URL'],
    ['heroImage', 'Hero Image URL'],
    ['highlights', 'Highlights (separate with |)'],
    ['order', 'Order'],
  ],
  team: [
    ['name', 'Name'],
    ['role', 'Role'],
    ['image', 'Image Upload'],
    ['linkedin', 'LinkedIn URL'],
    ['order', 'Order'],
  ],
  faqs: [
    ['question', 'Question'],
    ['answer', 'Answer'],
    ['order', 'Order'],
  ],
  stats: [
    ['value', 'Value'],
    ['label', 'Label'],
    ['order', 'Order'],
  ],
  testimonials: [
    ['name', 'Client Name'],
    ['role', 'Client Company / Role'],
    ['image', 'Image URL'],
    ['message', 'Review Message'],
    ['order', 'Order'],
  ],
}

function AdminLogin() {
  const [message, setMessage] = useState('')

  async function handleLogin(event) {
    event.preventDefault()
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries())

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      localStorage.setItem('insideTechAdminToken', data.token)
      window.history.pushState({}, '', '/admin/dashboard')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (error) {
      setMessage(error.message || 'Unable to login.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-16">
      <section className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-panel">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Admin Login</h1>
        {/* <p className="mt-3 text-muted">Use the credentials from your `.env` file.</p> */}
        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <input className="field" name="email" type="email" defaultValue="admin@insidetechsoft.com" placeholder="Admin email" required />
          <input className="field" name="password" type="password" defaultValue="admin123" placeholder="Password" required />
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
        {message && <p className="mt-5 font-semibold text-accent">{message}</p>}
      </section>
    </main>
  )
}

function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem('insideTechAdminToken') || '')
  const [type, setType] = useState('services')
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }), [token])

  useEffect(() => {
    if (!token) return

    async function loadItems() {
      setIsLoading(true)
      const url = type === 'team' ? '/api/team?all=true' : `/api/admin/content/${type}`
      const response = await fetch(url, { headers: authHeaders })
      if (response.status === 401) {
        localStorage.removeItem('insideTechAdminToken')
        setToken('')
        return
      }
      setItems(await response.json())
      setEditing(null)
      setImagePreview('')
      setIsLoading(false)
    }

    loadItems()
  }, [authHeaders, token, type])

  useEffect(() => {
    if (!token) return

    async function loadLeads() {
      const response = await fetch('/api/admin/leads', { headers: authHeaders })
      if (response.ok) setLeads(await response.json())
    }

    loadLeads()
  }, [authHeaders, token])

  if (!token) return <AdminLogin />

  async function saveItem(event) {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    const rawFormData = new FormData(event.currentTarget)
    let body = rawFormData
    const headers = { Authorization: `Bearer ${token}` }
    let url = editing?._id ? `/api/admin/content/${type}/${editing._id}` : `/api/admin/content/${type}`
    const method = editing?._id ? 'PUT' : 'POST'

    if (type !== 'team') {
      const formData = Object.fromEntries(rawFormData.entries())
      body = JSON.stringify({
        ...formData,
        order: Number(formData.order || 0),
        isActive: formData.isActive === 'on',
      })
      headers['Content-Type'] = 'application/json'
    } else {
      rawFormData.set('isActive', rawFormData.get('isActive') === 'on' ? 'true' : 'false')
      const imageFile = rawFormData.get('image')
      if (editing?._id && imageFile instanceof File && imageFile.size === 0) {
        rawFormData.delete('image')
      }
      url = editing?._id ? `/api/team/${editing._id}` : '/api/team'
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setMessage(data.message || 'Unable to save item.')
      setIsSaving(false)
      return
    }

    const listUrl = type === 'team' ? '/api/team?all=true' : `/api/admin/content/${type}`
    const listResponse = await fetch(listUrl, { headers: authHeaders })
    setItems(await listResponse.json())
    setEditing(null)
    setImagePreview('')
    setMessage('Saved successfully.')
    setIsSaving(false)
  }

  async function deleteItem(id) {
    const url = type === 'team' ? `/api/team/${id}` : `/api/admin/content/${type}/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: authHeaders,
    })

    if (!response.ok) {
      setMessage('Unable to delete item.')
      return
    }

    setItems(items.filter((item) => item._id !== id))
    setMessage('Deleted successfully.')
  }

  const current = editing || emptyItems[type]
  const currentPreview = imagePreview || current.image || ''

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-soft">
        <div className="site-container flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <Logo />
          <div className="flex flex-wrap gap-3">
            <a className="btn-primary min-h-11 px-5" href="/">View Website</a>
            <button
              className="rounded-md bg-slate-900 px-5 py-3 font-bold text-white"
              type="button"
              onClick={() => {
                localStorage.removeItem('insideTechAdminToken')
                setToken('')
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="site-container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg bg-white p-5 shadow-soft">
          <h1 className="mb-5 text-2xl font-black">Admin Panel</h1>
          <div className="space-y-2">
            {Object.entries(contentLabels).map(([key, label]) => (
              <button
                key={key}
                className={`w-full rounded-md px-4 py-3 text-left font-bold ${type === key ? 'bg-brand text-white' : 'bg-soft text-slate-800'}`}
                type="button"
                onClick={() => setType(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          <section className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">{editing ? 'Edit' : 'Add'} {contentLabels[type]}</h2>
            {type === 'serviceDetails' && (
              <p className="mt-2 text-muted">
                Fill in the service detail fields below. The <strong>Service Slug</strong> must match the service URL slug (for example <code>software-development</code> or <code>web-development</code>).
              </p>
            )}
            <form key={`${type}-${editing?._id || 'new'}`} className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={saveItem}>
              {fieldMap[type].map(([name, label]) => (
                <label key={name} className={['summary', 'answer', 'message', 'description', 'highlights'].includes(name) ? 'md:col-span-2' : ''}>
                  <span className="mb-2 block font-bold text-slate-700">{label}</span>
                  {type === 'team' && name === 'image' ? (
                    <>
                      <input
                        className="field py-4"
                        name={name}
                        type="file"
                        accept="image/*"
                        required={!editing}
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          setImagePreview(file ? URL.createObjectURL(file) : current.image || '')
                        }}
                      />
                      {currentPreview && (
                        <img
                          src={currentPreview}
                          alt="Team member preview"
                          className="mt-4 h-28 w-28 rounded-md object-cover shadow-soft"
                        />
                      )}
                    </>
                  ) : ['summary', 'answer', 'message', 'description', 'highlights'].includes(name) ? (
                    <textarea className="field min-h-28 py-4" name={name} defaultValue={current[name] || ''} required />
                  ) : (
                    <input className="field" name={name} defaultValue={current[name] || ''} required={name !== 'image'} />
                  )}
                </label>
              ))}
              <label className="flex items-center gap-3 font-bold">
                <input name="isActive" type="checkbox" defaultChecked={current.isActive !== false} />
                Active on website
              </label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button className="btn-primary" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                {editing && (
                  <button
                    className="rounded-md bg-slate-200 px-6 py-3 font-bold"
                    type="button"
                    onClick={() => {
                      setEditing(null)
                      setImagePreview('')
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            {message && <p className="mt-5 font-semibold text-brand">{message}</p>}
          </section>

          <section className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Manage {contentLabels[type]}</h2>
            {isLoading && <p className="mt-4 font-semibold text-brand">Loading...</p>}
            <div className="mt-6 overflow-x-auto">
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
                  No items found. Add a new {contentLabels[type]} entry above to populate this section.
                </div>
              ) : (
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-b text-sm uppercase text-muted">
                      <th className="py-3">Primary</th>
                      <th className="py-3">Secondary</th>
                      <th className="py-3">Order</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-4 font-bold">{item.title || item.name || item.question || item.value}</td>
                        <td className="max-w-md py-4 text-muted">{item.summary || item.description || item.role || item.answer || item.message || item.label}</td>
                        <td className="py-4">{item.order}</td>
                        <td className="py-4">{item.isActive ? 'Active' : 'Hidden'}</td>
                        <td className="space-x-3 py-4 text-right">
                          <button
                            className="font-bold text-brand"
                            type="button"
                            onClick={() => {
                              setEditing(item)
                              setImagePreview(item.image || '')
                            }}
                          >
                            Edit
                          </button>
                          <button className="font-bold text-accent" type="button" onClick={() => deleteItem(item._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Recent Leads</h2>
            <div className="mt-5 grid gap-4">
              {leads.length === 0 && <p className="text-muted">No saved leads yet. Add `MONGODB_URI` to persist form submissions.</p>}
              {leads.map((lead) => (
                <div key={lead._id} className="rounded-md border border-slate-100 p-4">
                  <strong>{lead.name}</strong>
                  <p className="text-muted">{lead.email} {lead.phone ? `- ${lead.phone}` : ''}</p>
                  <p className="mt-2">{lead.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      className="fixed bottom-7 right-7 z-40 grid size-14 place-items-center rounded-full bg-brand text-white shadow-panel"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ChevronDown className="rotate-180" size={28} />
    </button>
  )
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')
  const [siteContent, setSiteContent] = useState({
    services,
    team,
    faqs,
    stats,
    serviceDetails,
    testimonials: [
      {
        name: 'Siddhant',
        role: 'ACAKJ Services',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
        message: 'We consulted InsideTech Softwares during a critical tech transition. Their insights were spot-on from system architecture to deployment planning. Their consulting gave us a clear roadmap and saved time.',
      },
    ],
  })

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a')
      if (!anchor) return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      window.history.pushState({}, '', url.pathname)
      setPath(url.pathname.replace(/\/$/, '') || '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePop)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePop)
    }
  }, [])

  useEffect(() => {
    applySeo(seoMap[path] || seoMap['/'])
  }, [path])

  useEffect(() => {
    if (path.startsWith('/admin')) return

    async function loadContent() {
      try {
        const [contentResponse, teamResponse] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/team'),
        ])
        const data = contentResponse.ok ? await contentResponse.json() : {}
        const dynamicTeam = teamResponse.ok ? await teamResponse.json() : []
        setSiteContent((current) => ({
          services: data.services?.length ? data.services : current.services,
          team: dynamicTeam.length ? dynamicTeam : data.team?.length ? data.team : current.team,
          faqs: data.faqs?.length ? data.faqs : current.faqs,
          stats: data.stats?.length ? data.stats : current.stats,
          serviceDetails: data.serviceDetails?.length ? data.serviceDetails : current.serviceDetails,
          testimonials: data.testimonials?.length ? data.testimonials : current.testimonials,
        }))
      } catch {
        setSiteContent((current) => current)
      }
    }

    loadContent()
  }, [path])

  const page = useMemo(() => {
    const serviceDetailMatch = path.match(/^\/services\/([^/]+)$/)
    if (path === '/admin' || path === '/admin/login') return <AdminLogin />
    if (path === '/admin/dashboard') return <AdminDashboard />
    if (path === '/') return <HomePage />
    if (path === '/about') return <AboutPage />
    if (path === '/services') return <ServicesPage />
    if (serviceDetailMatch) return <ServiceDetailPage slug={serviceDetailMatch[1]} />
    if (path === '/our-team') return <TeamPage />
    if (path === '/faqs') return <FaqPage />
    if (path === '/contact') return <ContactPage />
    return <HomePage />
  }, [path])

  return (
    <SiteContentContext.Provider value={siteContent}>
      {path.startsWith('/admin') ? (
        page
      ) : (
        <>
          <Header path={path} />
          <main>{page}</main>
          <Footer />
          <BackToTop />
        </>
      )}
    </SiteContentContext.Provider>
  )
}

export default App

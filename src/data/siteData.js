import {
  BarChart3,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cloud,
  Code2,
  DatabaseZap,
  Globe2,
  Headphones,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UsersRound,
  Wrench,
} from 'lucide-react'

import saurav from '../assets/team/saurav.jpeg'
import avaneesh from '../assets/team/Avaneesh.jpg'
import amit from '../assets/team/amit.jpeg'
import rahul from '../assets/team/rahul.jpeg'
import anuj from '../assets/team/team.jpg'

export const company = {
  name: 'InsideTech',
  legalName: 'InsideTech Softwares Private Limited',
  email: 'contact@insidetechsoft.com',
  phone: '+91 979-910-2494',
  address: 'Naman Residency 2, Krishna Sagar colony, Jaipur, Rajasthan - 302020',
  hours: '10:00 - 18:00',
}

export const serviceDetails = [
  {
    slug: 'software-development',
    title: 'Professional Software Development',
    subtitle: 'Software Development',
    description:
      'Designing and building custom software solutions to automate workflows, integrate systems, and accelerate growth. We deliver end-to-end development from discovery through maintenance.',
    image: 'https://images.unsplash.com/photo-1526378721071-3e0c4b1f6f6d?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    highlights: 'Scalable Architecture|Agile Delivery|Robust Testing',
    order: 0,
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    subtitle: 'Web Development',
    description:
      'Building fast, accessible, and responsive websites and web applications tailored to your brand and users. We create performant frontends and reliable backends.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
    highlights: 'Responsive UI|Performance Optimized|SEO Ready',
    order: 1,
  },
  {
    slug: 'analytic-solutions',
    title: 'Analytic Solutions',
    subtitle: 'Analytic Solutions',
    description:
      'Turn data into insight with dashboards, reporting, and analytics platforms that surface actionable metrics and trends for smarter decisions.',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80',
    highlights: 'Data Engineering|Interactive Dashboards|KPIs & Reports',
    order: 2,
  },
  {
    slug: 'cloud-hosting',
    title: 'Cloud Hosting',
    subtitle: 'Cloud Hosting',
    description:
      'Managed cloud hosting with high availability, backups, and security best practices so your applications stay reliable and performant.',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1400&q=80',
    highlights: 'Auto-scaling|Secure Backups|24/7 Monitoring',
    order: 3,
  },
  {
    slug: 'product-design',
    title: 'Product Design',
    subtitle: 'Product Design',
    description:
      'Crafting intuitive product experiences through user research, interaction design, and high-fidelity prototyping focused on usability and conversion.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80',
    highlights: 'UX Research|Prototyping|Design Systems',
    order: 4,
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    subtitle: 'IT Consulting',
    description:
      'Expert IT strategy and advisory services to modernize systems, optimize costs, and design roadmaps that meet your business objectives.',
    image: 'https://images.unsplash.com/photo-1526378721071-3e0c4b1f6f6d?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1526378721071-3e0c4b1f6f6d?auto=format&fit=crop&w=1400&q=80',
    highlights: 'Strategy|Architecture|Roadmaps',
    order: 5,
  },
]

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services +', path: '/services' },
  { label: 'Our Team', path: '/our-team' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contact', path: '/contact' },
]

export const stats = [
  { value: '15+', label: 'Happy Clients' },
  { value: '20+', label: 'Projects Done' },
  { value: '08+', label: 'Partner Companies' },
  { value: '15+', label: 'Team Members' },
]

export const services = [
  {
    slug: 'software-development',
    title: 'Software Development',
    icon: Code2,
    summary: 'Designing custom software solutions to streamline operations, boost efficiency, and solve specific business challenges.',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: MonitorSmartphone,
    summary: 'Creating responsive, user-friendly websites optimized for performance, branding, and customer engagement.',
  },
  {
    slug: 'analytic-solutions',
    title: 'Analytic Solutions',
    icon: BarChart3,
    summary: 'Delivering data-driven dashboards and reporting systems to improve decision making and performance tracking.',
  },
  {
    slug: 'cloud-hosting',
    title: 'Cloud Hosting',
    icon: Cloud,
    summary: 'Providing secure cloud hosting with high availability, performance, and cost efficiency for web applications.',
  },
  {
    slug: 'product-design',
    title: 'Product Design',
    icon: Palette,
    summary: 'Crafting intuitive, polished digital products focused on usability, functionality, and brand alignment.',
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    icon: Headphones,
    summary: 'Offering expert guidance to align IT strategy, infrastructure, and implementation with business goals.',
  },
]

export const specialtyCards = [
  { title: 'Expert Problem Solvers', icon: Lightbulb, className: 'from-orange-400 to-amber-300' },
  { title: 'Regular Updates and Fixes', icon: Wrench, className: 'from-sky-500 to-blue-400' },
  { title: 'Creative Product Analytics', icon: DatabaseZap, className: 'from-violet-600 to-fuchsia-400' },
  { title: 'High Rated Quick Support', icon: ShieldCheck, className: 'from-pink-500 to-rose-300' },
]

export const progress = [
  { label: 'Analytics', value: 95, color: 'bg-accent' },
  { label: 'Development', value: 75, color: 'bg-violet-600' },
  { label: 'Solutions', value: 85, color: 'bg-skybrand' },
]

export const processSteps = [
  {
    title: 'Discovery',
    text: 'Identifying business goals, challenges, and user needs to define clear project objectives.',
  },
  {
    title: 'Planning',
    text: 'Structuring timelines, resources, technologies, and milestones for a managed delivery path.',
  },
  {
    title: 'Execute',
    text: 'Building scalable, functional, and high-performance deliverables through agile collaboration.',
  },
  {
    title: 'Deliver',
    text: 'Launching the final product with deployment, documentation, and support for smooth adoption.',
  },
]

export const team = [
  {
    name: 'Saurav Srivastava',
    role: 'Co-Founder and CEO',
    image: saurav,
  },
  {
    name: 'Avaneesh Awasthi',
    role: 'Co-Founder and CTO',
    image: avaneesh,
  },
  {
    name: 'Amit Kumar',
    role: 'Co-Founder and Marketing Head',
    image: amit,
  },
  {
    name: 'Rahul Gupta',
    role: 'Business Consultant',
    image: rahul,
  },
  {
    name: 'Anuj Patel',
    role: 'Cloud Engineer',
    image: anuj,
  },
]

export const faqs = [
  {
    question: 'What can you help me with?',
    answer: 'We provide AI solutions, business automation, custom software development, web and mobile application development, cloud hosting, and IT consulting.',
  },
  {
    question: 'Can you build software specifically for my business needs?',
    answer: 'Yes. We begin with discovery and map requirements into a custom, scalable product roadmap before development starts.',
  },
  {
    question: 'How do I start a project with you?',
    answer: 'Share your goals through the contact form or phone call. Our team reviews the requirement and schedules a consultation.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We work with React, Node.js, Express, MongoDB, cloud platforms, APIs, analytics tools, and modern automation stacks.',
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer: 'Yes. We support updates, monitoring, bug fixes, infrastructure improvements, and new feature releases after launch.',
  },
]

export const footerServices = ['Software Development', 'Web Development', 'Analytic Solutions', 'Cloud Hosting', 'Product Design']

export const featureHighlights = [
  { title: 'Expert Peoples', icon: UsersRound, text: 'Skilled professionals with deep industry knowledge and delivery discipline.' },
  { title: 'First Growing Process', icon: Rocket, text: 'A rapid, structured approach to scale ideas into successful digital solutions.' },
  { title: 'Creative Ideas', icon: Sparkles, text: 'Fresh thinking for impactful, user-focused products and automation workflows.' },
]

export const serviceCapabilities = [
  { label: 'Automation Systems', icon: Bot },
  { label: 'Ecommerce Platforms', icon: ShoppingCart },
  { label: 'Secure Infrastructure', icon: ShieldCheck },
  { label: 'API Integrations', icon: Boxes },
  { label: 'Cloud Databases', icon: DatabaseZap },
  { label: 'Growth Campaigns', icon: Megaphone },
  { label: 'Global Delivery', icon: Globe2 },
  { label: 'Business Platforms', icon: BriefcaseBusiness },
]

export const contactItems = [
  { label: 'Email', value: company.email, icon: Mail },
  { label: 'Phone', value: company.phone, icon: Phone },
  { label: 'Address', value: company.address, icon: MapPin },
]

export const seoMap = {
  '/': {
    title: 'InsideTech Softwares | Digital Technology and IT Solutions',
    description: 'MERN-ready InsideTech Softwares website for software development, automation, cloud hosting, and IT consulting services.',
  },
  '/about': {
    title: 'About InsideTech Softwares | Technology Partner',
    description: 'Learn about InsideTech Softwares, a Jaipur based team building automation, software, web, and cloud solutions.',
  },
  '/services': {
    title: 'IT Services | InsideTech Softwares',
    description: 'Explore software development, web development, analytics, cloud hosting, product design, and IT consulting services.',
  },
  '/services/software-development': {
    title: 'Software Development Services | InsideTech Softwares',
    description: 'Custom software development and automation services from InsideTech Softwares for scalable business systems.',
  },
  '/services/web-development': {
    title: 'Web Development Services | InsideTech Softwares',
    description: 'Responsive web development, e-commerce and frontend/backend solutions to grow your online presence.',
  },
  '/services/analytic-solutions': {
    title: 'Analytic Solutions | InsideTech Softwares',
    description: 'Data analytics, dashboards and reporting to help you make better business decisions.',
  },
  '/services/cloud-hosting': {
    title: 'Cloud Hosting Services | InsideTech Softwares',
    description: 'Secure, scalable cloud hosting and infrastructure management for production-ready applications.',
  },
  '/services/product-design': {
    title: 'Product Design Services | InsideTech Softwares',
    description: 'User-centered product design, UX/UI and prototyping to build delightful digital experiences.',
  },
  '/services/it-consulting': {
    title: 'IT Consulting | InsideTech Softwares',
    description: 'Strategic IT consulting to align technology, processes, and teams with your business goals.',
  },
  '/our-team': {
    title: 'Our Team | InsideTech Softwares',
    description: 'Meet the InsideTech Softwares leadership and delivery team.',
  },
  '/faqs': {
    title: 'FAQs | InsideTech Softwares',
    description: 'Answers to common questions about InsideTech Softwares services, technologies, delivery, and maintenance.',
  },
  '/contact': {
    title: 'Contact InsideTech Softwares | Free Consultation',
    description: 'Contact InsideTech Softwares in Jaipur for software development, automation, IT consulting, and cloud services.',
  },
}

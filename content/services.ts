export type Service = {
  id: string;
  title: string;
  titleLine2?: string;
  headline: string;
  description: string;
  points: string[];
  tags: string[];
};

export const services: Service[] = [
  {
    id: "web",
    title: "Web",
    titleLine2: "Applications",
    headline: "Secure, scalable digital products",
    description:
      "We design and develop secure, scalable web apps that deliver performance and polish across all devices.",
    points: [
      "Marketing sites, dashboards, and full-stack platforms",
      "Modern React and Next.js architectures",
      "Performance-first builds with Core Web Vitals in mind",
    ],
    tags: ["Next.js", "React", "APIs", "Dashboards"],
  },
  {
    id: "ai",
    title: "Artificial",
    titleLine2: "Intelligence",
    headline: "Intelligent systems that scale",
    description:
      "We create custom AI models and intelligent systems that automate, predict, and optimize business outcomes.",
    points: [
      "Custom model development and fine-tuning",
      "Automation workflows and intelligent assistants",
      "Predictive analytics integrated into your products",
    ],
    tags: ["LLMs", "Automation", "ML Ops", "Agents"],
  },
  {
    id: "data-science",
    title: "Data",
    titleLine2: "Science",
    headline: "Insights that drive decisions",
    description:
      "We extract actionable insights from your data using advanced analytics, ML models, and custom dashboards.",
    points: [
      "Exploratory analysis and statistical modeling",
      "Custom ML pipelines and forecasting",
      "Interactive dashboards and reporting tools",
    ],
    tags: ["Analytics", "ML", "Dashboards", "Forecasting"],
  },
  {
    id: "database",
    title: "Database",
    titleLine2: "Solutions",
    headline: "Reliable data foundations",
    description:
      "Designing and optimizing reliable, high-performance databases tailored for speed, scale, and security.",
    points: [
      "Schema design, migrations, and optimization",
      "High-availability and replication strategies",
      "Query tuning and performance monitoring",
    ],
    tags: ["PostgreSQL", "MySQL", "Redis", "Optimization"],
  },
  {
    id: "cloud",
    title: "Cloud",
    titleLine2: "Solutions",
    headline: "Scale fast and securely",
    description:
      "From cloud-native apps to infrastructure automation, we help you scale fast and securely in the cloud.",
    points: [
      "Cloud-native architecture and deployment",
      "Infrastructure as code and CI/CD pipelines",
      "Cost optimization and security best practices",
    ],
    tags: ["AWS", "Azure", "DevOps", "Kubernetes"],
  },
  {
    id: "mobile",
    title: "Mobile",
    titleLine2: "Applications",
    headline: "Apps built for millions",
    description:
      "From MVPs to full-scale platforms, we build mobile apps that are intuitive, powerful, and ready for millions.",
    points: [
      "iOS and Android native and cross-platform builds",
      "MVPs through production-ready releases",
      "Offline support, push notifications, and analytics",
    ],
    tags: ["iOS", "Android", "React Native", "Flutter"],
  },
];

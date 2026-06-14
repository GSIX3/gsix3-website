export type WorkItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
};

export const workItems: WorkItem[] = [
  {
    id: "commerce-platform",
    title: "E-Commerce Platform",
    category: "Web App",
    description:
      "Full-stack storefront with inventory management, payment integration, and admin dashboard serving thousands of monthly orders.",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "smart-monitoring",
    title: "Smart Facility Monitoring",
    category: "IoT",
    description:
      "Sensor network with edge gateways, cloud ingestion, and a real-time dashboard for temperature, humidity, and alerts.",
    tags: ["ESP32", "MQTT", "AWS"],
  },
  {
    id: "managed-hosting",
    title: "Managed Hosting Migration",
    category: "Hosting",
    description:
      "Zero-downtime migration of legacy apps to modern cloud infrastructure with automated backups and 24/7 monitoring.",
    tags: ["Docker", "CI/CD", "Monitoring"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We learn your goals, constraints, and technical landscape.",
  },
  {
    step: "02",
    title: "Design",
    description: "Architecture, UX, and a clear roadmap before we write code.",
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative development with regular demos and feedback loops.",
  },
  {
    step: "04",
    title: "Support",
    description: "Launch, monitor, and maintain — we stay with you long-term.",
  },
] as const;

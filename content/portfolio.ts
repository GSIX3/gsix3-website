export type PortfolioProject = {
  slug: string;
  client: string;
  clientLabel: string;
  clientLogo?: string;
  title: string;
  excerpt: string;
  coverImage: string;
  about: string;
  objectives: string[];
  solution: string;
  tags: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "vida-edgewater",
    client: "VIDA Edgewater",
    clientLabel: "VIDA",
    clientLogo: "/urbana_bueno.png",
    title:
      "Developing a Real-Time Price Prediction & Unit History System for VIDA Edgewater",
    excerpt:
      "We engineered a data-driven platform that empowers VIDA Edgewater to optimize pricing strategies and gain deeper insights into unit history through real-time analytics and predictive modeling.",
    coverImage: "/vida.jpg",
    about:
      "VIDA Edgewater Hotel & Residences is a high-end mixed-use development located in the heart of Edgewater, Miami. As a forward-thinking real estate brand, VIDA aims to combine luxury living with smart, tech-enabled decision-making. To support their data strategy, VIDA partnered with us to develop a real-time pricing and unit intelligence platform that supports agile pricing, inventory insights, and historical data analysis. This solution helps VIDA respond to market demand more effectively while maximizing profitability and operational visibility.",
    objectives: [
      "Design and develop a real-time price prediction engine for residential units based on market demand, seasonal trends, and competitive data.",
      "Implement a historical data management system that tracks unit performance, booking history, pricing trends, and occupancy.",
      "Enable dynamic pricing strategies that can be applied across short-term and long-term rental options.",
      "Deliver dashboards and analytics tools to empower VIDA's internal teams to make data-informed decisions on unit marketing and revenue strategies.",
    ],
    solution:
      "Our team built a scalable, cloud-native platform integrating machine learning–based price prediction with robust unit history tracking. The system ingests real-time data from multiple sources—including local demand signals, seasonal patterns, and competitive benchmarks—and generates optimal pricing recommendations per unit. The history module allows VIDA to monitor past performance, unit turnover, and revenue trends. The platform includes an admin dashboard with intuitive data visualizations, automated alerts, and predictive forecasting tools that drive higher ROI across VIDA's property portfolio.",
    tags: ["Web App", "Data Analytics", "Machine Learning", "Cloud"],
  },
  {
    slug: "atlacarte",
    client: "Atlacarte",
    clientLabel: "Atlacarte",
    clientLogo: "/atlacarte-logo-orange.svg",
    title:
      "Building a Real-Time Digital Ordering & Messaging-Based CX Platform for Atlacarte",
    excerpt:
      "We partnered with Atlacarte to build a messaging-first ordering ecosystem that redefines hospitality by enabling social ordering, remote collaboration, and fully integrated guest services across one unified platform.",
    coverImage: "/atlacarte_banner.png",
    about:
      "Atlacarte is revolutionizing hospitality technology through a digital-first approach that blends customer experience and operational efficiency. Traditional takeaway and web-shop systems overlook the human connection central to hospitality. To preserve that bond in digital environments, Atlacarte built an all-in-one messaging-based ordering and engagement solution. This platform empowers venues to manage room service, events, bar and table orders, concierge, and more—while guests enjoy an intuitive, chat-based interface that allows them to order together and stay connected. As proud Oracle partners, Atlacarte integrates seamlessly with Simphony POS, ensuring smooth enterprise and SMB adoption.",
    objectives: [
      "Develop a real-time messaging-based ordering platform that enhances customer experience and guest engagement.",
      "Enable guests to place individual or group (social) orders through chat interfaces, reducing friction in multi-person settings.",
      "Allow staff to manage orders and customer interactions remotely, including collaboration with in-house teams.",
      "Integrate the solution with third-party systems like Oracle Simphony for seamless enterprise compatibility.",
      "Ensure the platform is cloud-native, scalable, and adaptable to varied hospitality workflows, branding, and services.",
    ],
    solution:
      "We built a cloud-based, white-label ready platform that unifies digital ordering, communication, and staff collaboration into a single powerful system. The messaging-first design enables guests to order food, book services, or chat with staff in real time—individually or as a group. Staff can respond remotely or let smart bots handle basic requests through AI automation. The system includes modules for room service, event ordering, bar/table service, and more—customizable per venue. A smart dashboard and VM Timeline ensure efficient operations, while integrations with Oracle Simphony and other systems ensure enterprise-grade compatibility. With this platform, Atlacarte is enabling a new standard in hospitality technology.",
    tags: ["Web App", "Messaging", "Hospitality", "Cloud", "Oracle Simphony"],
  },
];

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

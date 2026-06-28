import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const products = [
    {
      title: "Pharmaceutical Distribution System & Mobile App",
      description:
        "A secure and scalable platform designed to streamline pharmaceutical distribution. Features include order management, inventory tracking, delivery monitoring, and real-time reporting to improve operational efficiency.",
      src: "/assets/product-showcase/ai-suite.png",
      customers: ["JGP Marketing Services (Pvt) Ltd"],
    },
    {
      title: "Cheque Management System",
      description:
        "A digital cheque management solution that eliminates manual cheque writing. It helps organizations generate, track, and manage cheques efficiently while reducing errors and saving valuable time.",
      src: "/assets/product-showcase/cloud-ops.png",
      customers: ["Jansiri Motor Stores"],
    },
    {
      title: "Multi-Location Attendance System & Mobile App",
      description:
        "A comprehensive attendance management platform that supports multiple branches and locations. The system integrates fingerprint, facial recognition, and RFID technologies to accurately track employee attendance across different sectors from a single dashboard.",
      src: "/assets/product-showcase/data-dashboard.png",
      customers: ["Bowatte Beheth Shalawa (Pvt) Ltd"],
    },
  ];

  return <AnimatedTestimonials testimonials={products} />;
}

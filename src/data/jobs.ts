export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  posted: string;
}

export const jobListings: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    description: "We are seeking a Senior Full Stack Developer to join our innovative team building next-generation web applications. You'll work with cutting-edge technologies and lead technical initiatives that impact millions of users.",
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Solid understanding of database design and optimization",
      "Bachelor's degree in Computer Science or related field"
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams to define product requirements",
      "Mentor junior developers and conduct code reviews",
      "Optimize application performance and user experience",
      "Lead technical architecture decisions"
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "GraphQL", "Docker", "Kubernetes"],
    posted: "2 days ago"
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $140k",
    description: "Join our fast-growing startup as a Product Manager and help shape the future of our SaaS platform. You'll drive product strategy, work closely with engineering teams, and analyze user data to make informed decisions.",
    requirements: [
      "3+ years of product management experience",
      "Experience with SaaS products and B2B markets",
      "Strong analytical skills and data-driven mindset",
      "Excellent communication and leadership abilities",
      "MBA or equivalent experience preferred"
    ],
    responsibilities: [
      "Define product roadmap and prioritize features",
      "Conduct user research and gather customer feedback",
      "Work with engineering teams to deliver high-quality products",
      "Analyze product metrics and user behavior",
      "Present product updates to stakeholders"
    ],
    skills: ["Product Strategy", "User Research", "Data Analysis", "Agile", "Jira", "Figma", "SQL", "A/B Testing"],
    posted: "1 week ago"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Full-time",
    salary: "$75k - $110k",
    description: "We're looking for a talented UX/UI Designer to create beautiful, intuitive user experiences. You'll work on diverse projects ranging from mobile apps to web platforms, collaborating with product and engineering teams.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, or Adobe Creative Suite",
      "Strong portfolio demonstrating design thinking",
      "Experience with user research and usability testing",
      "Understanding of front-end development principles"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability studies",
      "Collaborate with product managers and developers",
      "Maintain design systems and style guides",
      "Present design concepts to stakeholders"
    ],
    skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research", "HTML", "CSS", "Design Systems"],
    posted: "3 days ago"
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "DataCorp",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $160k",
    description: "Join our data science team to build machine learning models and extract insights from large datasets. You'll work on challenging problems in recommendation systems, fraud detection, and predictive analytics.",
    requirements: [
      "Master's or PhD in Data Science, Statistics, or related field",
      "4+ years of experience in machine learning and data analysis",
      "Proficiency in Python, R, and SQL",
      "Experience with ML frameworks like TensorFlow or PyTorch",
      "Strong statistical and mathematical background"
    ],
    responsibilities: [
      "Develop and deploy machine learning models",
      "Analyze large datasets to identify trends and insights",
      "Collaborate with engineering teams to productionize models",
      "Present findings to technical and non-technical stakeholders",
      "Research and implement new ML techniques"
    ],
    skills: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Statistics", "Machine Learning", "AWS", "Spark"],
    posted: "5 days ago"
  }
];
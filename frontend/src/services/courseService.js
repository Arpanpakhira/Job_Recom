// Curated Database of high-quality courses mapping to the primary skills list
const COURSES_DB = [
  // Software Development
  {
    course_id: "c1",
    title: "Java Programming Masterclass for Software Developers",
    provider: "Udemy",
    instructor: "Tim Buchalka",
    rating: 4.7,
    students_count: 320140,
    duration: "80h total",
    level: "Beginner to Advanced",
    price_type: "Paid",
    skills: ["Java", "OOP", "Data Structures"],
    url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
    description: "Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills and Java Certification."
  },
  {
    course_id: "c2",
    title: "React - The Complete Guide (incl Hands-on Projects)",
    provider: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.8,
    students_count: 754020,
    duration: "48.5h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["React", "JavaScript", "Redux", "TypeScript"],
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    description: "Dive in and learn React.js from scratch! Learn React, Redux, React Router, Next.js, Hooks, animations, and much more."
  },
  {
    course_id: "c3",
    title: "Complete Python Bootcamp: Go from Zero to Hero in Python",
    provider: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    students_count: 1850120,
    duration: "22h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["Python", "Algorithms", "Programming Basics"],
    url: "https://www.udemy.com/course/complete-python-bootcamp/",
    description: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games."
  },
  {
    course_id: "c4",
    title: "Docker and Kubernetes: The Complete Guide",
    provider: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.8,
    students_count: 145890,
    duration: "22h total",
    level: "Intermediate",
    price_type: "Paid",
    skills: ["Docker", "Kubernetes", "DevOps"],
    url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    description: "Build, test, and deploy Docker applications with Kubernetes. Master container orchestration from scratch."
  },
  {
    course_id: "c5",
    title: "Spring Boot Microservices and Spring Cloud",
    provider: "Udemy",
    instructor: "John Thompson",
    rating: 4.7,
    students_count: 65420,
    duration: "28h total",
    level: "Advanced",
    price_type: "Paid",
    skills: ["Spring Boot", "Microservices", "Java", "JPA", "Hibernate"],
    url: "https://www.udemy.com/course/spring-boot-microservices-and-spring-cloud/",
    description: "Develop Cloud Native Java Applications using Spring Boot, Spring Cloud, and Spring Security."
  },
  {
    course_id: "c6",
    title: "The Complete JavaScript Course 2026: From Zero to Expert",
    provider: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    students_count: 852400,
    duration: "69h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["JavaScript", "TypeScript", "REST API"],
    url: "https://www.udemy.com/course/the-complete-javascript-course/",
    description: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges, theory, and ES6+ features."
  },
  // Data Science & Data Analytics
  {
    course_id: "c7",
    title: "Machine Learning A-Z: AI, Python & R in Data Science",
    provider: "Coursera",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    students_count: 980340,
    duration: "44h total",
    level: "All Levels",
    price_type: "Free Audit",
    skills: ["Machine Learning", "Data Science", "Python", "Scikit-Learn"],
    url: "https://www.coursera.org/learn/machine-learning",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Templates included."
  },
  {
    course_id: "c8",
    title: "Deep Learning Specialization",
    provider: "Coursera",
    instructor: "Andrew Ng",
    rating: 4.9,
    students_count: 780000,
    duration: "3 months (9h/wk)",
    level: "Advanced",
    price_type: "Free Audit",
    skills: ["Deep Learning", "TensorFlow", "PyTorch", "Artificial Intelligence", "Neural Networks"],
    url: "https://www.coursera.org/specializations/deep-learning",
    description: "Become a Machine Learning expert. Master Deep Learning, Neural Networks, Computer Vision, and NLP."
  },
  {
    course_id: "c9",
    title: "Microsoft Power BI Desktop for Business Intelligence",
    provider: "Udemy",
    instructor: "Maven Analytics",
    rating: 4.7,
    students_count: 145000,
    duration: "15h total",
    level: "Beginner to Intermediate",
    price_type: "Paid",
    skills: ["Power BI", "Data Analytics", "Tableau", "Excel"],
    url: "https://www.udemy.com/course/microsoft-power-bi-up-running/",
    description: "Master Power BI Desktop for data modeling, visualization, DAX calculations, and sharing reports."
  },
  {
    course_id: "c10",
    title: "Data Analysis with Pandas and NumPy (Data Science BootCamp)",
    provider: "Udemy",
    instructor: "Boris Paskhaver",
    rating: 4.7,
    students_count: 85200,
    duration: "21.5h total",
    level: "Intermediate",
    price_type: "Paid",
    skills: ["Pandas", "NumPy", "Python", "Data Science"],
    url: "https://www.udemy.com/course/data-analysis-with-pandas/",
    description: "Analyze large datasets easily. Learn how to clean, filter, aggregate, group, and merge data using Python."
  },
  // DevOps & Cloud
  {
    course_id: "c11",
    title: "AWS Certified Solutions Architect Associate",
    provider: "Udemy",
    instructor: "Stephane Maarek",
    rating: 4.8,
    students_count: 420950,
    duration: "27h total",
    level: "Intermediate",
    price_type: "Paid",
    skills: ["AWS", "Cloud Computing", "Terraform", "Google Cloud Platform", "Azure"],
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    description: "Pass the AWS Solutions Architect Associate Certification. Learn about EC2, S3, RDS, Lambda, VPC, and more."
  },
  {
    course_id: "c12",
    title: "DevOps Beginners Bootcamp: CI/CD Jenkins & Ansible",
    provider: "edX",
    instructor: "Linux Foundation",
    rating: 4.6,
    students_count: 48900,
    duration: "6 weeks (5h/wk)",
    level: "Beginner",
    price_type: "Free Audit",
    skills: ["CI/CD", "Jenkins", "Ansible", "Linux", "Git"],
    url: "https://www.edx.org/course/devops-basics",
    description: "Acquire the core foundational concepts of DevOps. Master automation, monitoring, Jenkins pipelines, and configuration management."
  },
  // Cyber Security
  {
    course_id: "c13",
    title: "The Complete Ethical Hacking Course: Beginner to Advanced",
    provider: "Udemy",
    instructor: "Ermin Kreponic",
    rating: 4.5,
    students_count: 245000,
    duration: "25h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["Ethical Hacking", "Penetration Testing", "Cyber Security", "Network Security", "Cryptography"],
    url: "https://www.udemy.com/course/penetration-testing/",
    description: "Learn penetration testing from scratch. Cover Metasploit, Nmap, Wireshark, system hacking, and network security auditing."
  },
  // UI/UX & Design
  {
    course_id: "c14",
    title: "Figma UI/UX Design Essentials",
    provider: "Udemy",
    instructor: "Daniel Walter Scott",
    rating: 4.8,
    students_count: 135400,
    duration: "11.5h total",
    level: "Beginner",
    price_type: "Paid",
    skills: ["Figma", "UI Design", "UX Design", "Graphic Design"],
    url: "https://www.udemy.com/course/figma-ux-ui-design-essentials/",
    description: "Use Figma to design mobile apps, web layouts, and interactive prototypes. Covers UX principles, components, and color theory."
  },
  // Business, Project Management & HR
  {
    course_id: "c15",
    title: "Google Project Management Professional Certificate",
    provider: "Coursera",
    instructor: "Google Career Certificates",
    rating: 4.8,
    students_count: 380400,
    duration: "6 months (10h/wk)",
    level: "Beginner",
    price_type: "Free Audit",
    skills: ["Project Management", "Agile", "Scrum", "Kanban"],
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    description: "Start a career in Project Management. Learn Agile methodologies, project lifecycle, scoping, budgeting, and Kanban."
  },
  {
    course_id: "c16",
    title: "Human Resource Management Specialization",
    provider: "Coursera",
    instructor: "University of Minnesota",
    rating: 4.7,
    students_count: 95000,
    duration: "4 months (8h/wk)",
    level: "All Levels",
    price_type: "Free Audit",
    skills: ["Recruitment", "Talent Acquisition", "Employee Relations", "Performance Management", "HR Analytics"],
    url: "https://www.coursera.org/specializations/human-resource-management",
    description: "Master the skills needed to hire, reward, motivate, and manage employees effectively in a business."
  },
  {
    course_id: "c17",
    title: "SEO 2026: Complete SEO Training + SEO for WordPress",
    provider: "Udemy",
    instructor: "Arun Nagarathanam",
    rating: 4.6,
    students_count: 65400,
    duration: "10h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["SEO", "Digital Marketing", "Google Ads", "Content Marketing"],
    url: "https://www.udemy.com/course/seo-get-free-traffic/",
    description: "Learn SEO search engine optimization from scratch. Cover keyword research, on-page SEO, speed optimization, and links."
  },
  // Finance & Accounting
  {
    course_id: "c18",
    title: "The Complete Financial Analyst Course 2026",
    provider: "Udemy",
    instructor: "365 Careers",
    rating: 4.6,
    students_count: 290500,
    duration: "22.5h total",
    level: "All Levels",
    price_type: "Paid",
    skills: ["Financial Analysis", "Tally", "GST", "Taxation", "Auditing", "Investment Analysis"],
    url: "https://www.udemy.com/course/the-complete-financial-analyst-course/",
    description: "Excel, Financial Analysis, Forecasting, Accounting, Presentation, Business Analysis. Complete toolkit for analysts."
  },
  // Soft Skills & General
  {
    course_id: "c19",
    title: "Creative Writing Specialization",
    provider: "Coursera",
    instructor: "Wesleyan University",
    rating: 4.7,
    students_count: 154000,
    duration: "4 months (6h/wk)",
    level: "All Levels",
    price_type: "Free Audit",
    skills: ["Content Writing", "Copywriting", "Technical Writing", "Blog Writing"],
    url: "https://www.coursera.org/specializations/creative-writing",
    description: "Master the elements of story structure, character development, setting, and style. Write like a pro."
  },
  {
    course_id: "c20",
    title: "Learning How to Learn: Powerful mental tools to master tough subjects",
    provider: "Coursera",
    instructor: "Barbara Oakley",
    rating: 4.8,
    students_count: 3200000,
    duration: "15h total",
    level: "All Levels",
    price_type: "Free",
    skills: ["Problem Solving", "Critical Thinking", "Teaching", "Lesson Planning"],
    url: "https://www.coursera.org/learn/learning-how-to-learn",
    description: "Learn about the illusions of competence, memory techniques, dealing with procrastination, and study best practices."
  }
];

/**
 * Searches for recommended courses from the simulated local database.
 * Matches keywords against course titles, descriptions, skills, or providers.
 * Supports pagination, returning responses just like the recommended jobs API.
 * @param {string} query - The search query (e.g. "React", "Python" or a skill name)
 * @param {object} options - Search options
 * @param {number} [options.page] - Page number (1-indexed)
 * @param {string} [options.provider] - Filter by provider ("Udemy", "Coursera", etc.)
 * @param {string} [options.level] - Filter by level
 * @param {string} [options.priceType] - "Free" | "Paid" | "All"
 * @returns {Promise<{ courses: Array, totalCount: number, page: number, totalPages: number }>}
 */
export async function searchCourses(query = "", options = {}) {
  const {
    page = 1,
    provider = "",
    level = "",
    priceType = "All"
  } = options;

  // Add realistic network delay (500ms - 800ms) to simulate calling an API
  await new Promise((resolve) => setTimeout(resolve, 600));

  const lowerQuery = query.trim().toLowerCase();

  let filtered = COURSES_DB;

  // Match keyword query
  if (lowerQuery) {
    filtered = COURSES_DB.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(lowerQuery);
      const descMatch = course.description.toLowerCase().includes(lowerQuery);
      const skillsMatch = course.skills.some((s) => s.toLowerCase().includes(lowerQuery));
      const instMatch = course.instructor.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch || skillsMatch || instMatch;
    });
  }

  // Filter by provider
  if (provider) {
    filtered = filtered.filter((course) =>
      course.provider.toLowerCase() === provider.toLowerCase()
    );
  }

  // Filter by level
  if (level) {
    filtered = filtered.filter((course) =>
      course.level.toLowerCase().includes(level.toLowerCase())
    );
  }

  // Filter by price type
  if (priceType !== "All") {
    filtered = filtered.filter((course) => {
      if (priceType === "Free") {
        return course.price_type.toLowerCase().includes("free");
      } else {
        return course.price_type.toLowerCase() === "paid";
      }
    });
  }

  // Paginate (10 courses per page)
  const itemsPerPage = 8;
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return {
    courses: paginated,
    totalCount,
    page,
    totalPages: totalPages || 1,
    status: "success"
  };
}

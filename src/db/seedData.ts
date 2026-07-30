import {
  ISiteSettings,
  ISocialProfile,
  IProject,
  ITechnology,
  ISkillNode,
  ICertification,
  IAchievement,
  IGalleryItem,
} from "@/types";

export const initialSiteSettings: ISiteSettings = {
  name: "Mithun M P",
  headline: "MCA Student · Aspiring Software Engineer · Full Stack Developer",
  statement:
    "Building resilient full-stack systems, high-performance web interfaces, and real-time software solutions. Focused on clean architecture, dynamic UI engineering, and continuous technical evolution.",
  availabilityStatus: "AVAILABLE FOR ROLES & COLLABORATION",
  contactEmail: "mithunmp2004@gmail.com",
  resumeUrl: "#resume",
  githubUrl: "https://github.com/mithun-mp",
  linkedinUrl: "https://www.linkedin.com/in/mithun-m-p-70781628b",
  leetcodeUrl: "https://leetcode.com/u/IhErLgx6Zl/",
  hackerrankUrl: "https://www.hackerrank.com/profile/mithunmp2004",
};

export const initialSocialProfiles: ISocialProfile[] = [
  {
    platform: "GitHub",
    handle: "mithun-mp",
    url: "https://github.com/mithun-mp",
    statSnapshot: "Active Developer",
    caption: "Full stack repositories, web platform implementations, and open software experiments.",
  },
  {
    platform: "LeetCode",
    handle: "IhErLgx6Zl",
    url: "https://leetcode.com/u/IhErLgx6Zl/",
    statSnapshot: "Problem Solver",
    caption: "Algorithmic problem solving, data structures, and core coding challenges.",
  },
  {
    platform: "HackerRank",
    handle: "mithunmp2004",
    url: "https://www.hackerrank.com/profile/mithunmp2004",
    statSnapshot: "Certified Programmer",
    caption: "Problem Solving, Python, and JavaScript verified skills certifications.",
  },
  {
    platform: "LinkedIn",
    handle: "mithun-m-p-70781628b",
    url: "https://www.linkedin.com/in/mithun-m-p-70781628b",
    statSnapshot: "Professional Network",
    caption: "Professional trajectory, academic updates, and technical networking.",
  },
];

export const initialProjects: IProject[] = [
  {
    slug: "synchronis",
    title: "Synchronis — Smart Attendance Management System",
    tagline: "Smart attendance platform using geofencing, facial recognition, & real-time analytics",
    summary:
      "A comprehensive attendance monitoring and verification platform designed for academic and organizational settings. Uses geofencing and facial analytics to guarantee physical presence.",
    problemSolved:
      "Eliminated proxy attendance and manual roll call overhead by combining device GPS geofencing, facial feature verification, and real-time subject-wise analytics reporting.",
    technologies: ["Python", "Django", "Flutter", "HTML", "CSS", "JavaScript", "SQLite3"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Architected REST APIs between Django backend and Flutter mobile applications.",
      "Implemented server-side geofence boundary calculation and coordinate validation.",
      "Engineered real-time attendance analytics dashboards with SQLite aggregations.",
    ],
    featured: true,
    order: 1,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        caption: "Synchronis System Control Dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "Geofencing & Facial Verification View",
      },
    ],
  },
  {
    slug: "live-sports-scoreboard",
    title: "Live Sports Scoreboard System",
    tagline: "Independent dual-display real-time scoreboard with controller and presentation screens",
    summary:
      "Dual-screen real-time sports telemetry system featuring a dedicated score control dashboard and an independent public presentation screen.",
    problemSolved:
      "Solved dual-window sync latency without external server dependencies by using browser BroadcastChannel API and localized state synchronization.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Mastered inter-window communication and BroadcastChannel API.",
      "Built keyboard-driven score controller shortcuts for fast live match updates.",
      "Designed high-contrast, scalable broadcast layout for stadium displays.",
    ],
    featured: true,
    order: 2,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
        caption: "Presentation Display Output",
      },
      {
        url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        caption: "Refined Controller Interface",
      },
    ],
  },
  {
    slug: "gect-connect",
    title: "GECT Connect",
    tagline: "Java Swing campus communication platform with chat and campus broadcasts",
    summary:
      "Campus network desktop application enabling real-time chat, media sharing, privacy controls, and institution-wide announcements across campus subnets.",
    problemSolved:
      "Provided a localized, private communication platform for students and faculty inside campus infrastructure without requiring third-party cloud messaging services.",
    technologies: ["Java", "Java Swing"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Implemented multithreaded socket servers for low-latency peer messaging.",
      "Designed custom Java Swing glass-style desktop UI components.",
      "Handled encrypted local message caching and broadcast channel permissions.",
    ],
    featured: true,
    order: 3,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        caption: "GECT Connect Main Interface",
      },
    ],
  },
  {
    slug: "cbt-platform",
    title: "Computer Based Test Platform",
    tagline: "Web examination system with Google Sheets backend and graphical analytics",
    summary:
      "Lightweight web-based examination engine featuring timed tests, automated scoring, Google Sheets data backend, and graphic performance analysis.",
    problemSolved:
      "Delivered a zero-hosting-cost examination solution that automatically evaluates student submissions and plots performance breakdowns into instructor Google Sheets.",
    technologies: ["HTML", "CSS", "JavaScript", "Google Apps Script", "Google Sheets"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Built serverless API endpoints using Google Apps Script Web Apps.",
      "Implemented client-side timer security and automatic answer auto-submission.",
      "Generated dynamic SVG performance charts for instant test result visualizer.",
    ],
    featured: true,
    order: 4,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        caption: "Test Interface and Graphical Performance Analysis",
      },
    ],
  },
  {
    slug: "haritha-karma-sena",
    title: "Haritha Karma Sena Data Management System",
    tagline: "Waste-management monitoring system for data collection & trend analysis",
    summary:
      "Municipal environmental waste tracking application for recording waste collection data, evaluating collector efficiency, and calculating regional recycling trends.",
    problemSolved:
      "Replaced paper logbooks with a NoSQL web platform, allowing municipal supervisors to track real-time collection metrics and trend anomalies.",
    technologies: ["MongoDB", "HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Structured MongoDB document schemas for time-series collection metrics.",
      "Integrated aggregation pipelines to extract monthly efficiency trends.",
      "Constructed clean tabular management views for field supervisors.",
    ],
    featured: true,
    order: 5,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
        caption: "Haritha Karma Sena Analytics Dashboard",
      },
    ],
  },
  {
    slug: "freshpick-vegetable-delivery",
    title: "FreshPick Vegetable Delivery Website",
    tagline: "Responsive vegetable ordering platform with WhatsApp delivery integration",
    summary:
      "Direct-to-consumer farm fresh produce ordering website with dynamic cart calculation and direct WhatsApp order dispatching.",
    problemSolved:
      "Eliminated checkout barriers for local users by transforming cart data into structured WhatsApp API messages sent directly to vendor delivery drivers.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/mithun-mp",
    keyLearnings: [
      "Optimized client-side cart state management using browser localStorage.",
      "Crafted dynamic WhatsApp URI payload formatting for order itemization.",
      "Designed mobile-first product cards with instant item search filtering.",
    ],
    featured: true,
    order: 6,
    status: "published",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
        caption: "FreshPick Product Catalog & Mobile Ordering View",
      },
    ],
  },
];

export const initialTechnologies: ITechnology[] = [
  // Languages
  {
    name: "Python",
    category: "Languages",
    iconName: "SiPython",
    description: "Primary backend and scripting language used for Django web applications, data analytics, and automation.",
    relatedProjectSlugs: ["synchronis"],
  },
  {
    name: "Java",
    category: "Languages",
    iconName: "SiOpenjdk",
    description: "Object-oriented programming language used for desktop GUI applications, multithreaded networking, and core software engineering.",
    relatedProjectSlugs: ["gect-connect"],
  },
  {
    name: "JavaScript",
    category: "Languages",
    iconName: "SiJavascript",
    description: "Core web development language used across interactive frontends, DOM manipulation, asynchronous APIs, and serverless logic.",
    relatedProjectSlugs: ["synchronis", "live-sports-scoreboard", "cbt-platform", "haritha-karma-sena", "freshpick-vegetable-delivery"],
  },
  {
    name: "HTML",
    category: "Languages",
    iconName: "SiHtml5",
    description: "Semantic web markup structure providing accessibility, visual hierarchy, and SEO structure.",
    relatedProjectSlugs: ["synchronis", "live-sports-scoreboard", "cbt-platform", "haritha-karma-sena", "freshpick-vegetable-delivery"],
  },
  {
    name: "CSS",
    category: "Languages",
    iconName: "SiCss3",
    description: "Modern CSS styling, glassmorphism, responsive grid layouts, animations, and custom design tokens.",
    relatedProjectSlugs: ["synchronis", "live-sports-scoreboard", "cbt-platform", "haritha-karma-sena", "freshpick-vegetable-delivery"],
  },
  {
    name: "SQL",
    category: "Languages",
    iconName: "SiPostgresql",
    description: "Relational database querying, schema design, joins, and data indexing.",
    relatedProjectSlugs: ["synchronis"],
  },

  // Technologies
  {
    name: "Django",
    category: "Technologies",
    iconName: "SiDjango",
    description: "Python web framework for secure REST APIs, ORM data modelling, and authentication.",
    relatedProjectSlugs: ["synchronis"],
  },
  {
    name: "Flutter",
    category: "Technologies",
    iconName: "SiFlutter",
    description: "Cross-platform mobile UI framework for reactive Android and iOS mobile applications.",
    relatedProjectSlugs: ["synchronis"],
  },
  {
    name: "REST API Integration",
    category: "Technologies",
    iconName: "TbApi",
    description: "Designing and consuming asynchronous HTTP REST endpoints with JSON payloads.",
    relatedProjectSlugs: ["synchronis", "cbt-platform"],
  },
  {
    name: "MongoDB",
    category: "Technologies",
    iconName: "SiMongodb",
    description: "NoSQL document database utilized for flexible JSON data stores and aggregation pipelines.",
    relatedProjectSlugs: ["haritha-karma-sena"],
  },
  {
    name: "SQLite3",
    category: "Technologies",
    iconName: "SiSqlite",
    description: "Embedded SQL database engine for rapid local development and lightweight data storage.",
    relatedProjectSlugs: ["synchronis"],
  },
  {
    name: "Google Apps Script",
    category: "Technologies",
    iconName: "SiGoogle",
    description: "Serverless cloud scripting platform for extending Google Workspace and creating cloud web hooks.",
    relatedProjectSlugs: ["cbt-platform"],
  },
  {
    name: "Google Sheets Database Integration",
    category: "Technologies",
    iconName: "SiGooglesheets",
    description: "Utilizing Google Sheets as a structured cloud database with real-time spreadsheet updates.",
    relatedProjectSlugs: ["cbt-platform"],
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    iconName: "SiGit",
    description: "Distributed version control system for code tracking, branching, and collaboration.",
    relatedProjectSlugs: ["synchronis", "gect-connect"],
  },
  {
    name: "GitHub",
    category: "Tools",
    iconName: "SiGithub",
    description: "Cloud repository hosting platform for continuous deployment, code review, and project management.",
    relatedProjectSlugs: ["synchronis", "live-sports-scoreboard", "gect-connect", "cbt-platform"],
  },
  {
    name: "Linux",
    category: "Tools",
    iconName: "SiLinux",
    description: "Unix terminal environments, shell scripting, package managers, and server deployment.",
    relatedProjectSlugs: ["synchronis"],
  },
  {
    name: "VS Code",
    category: "Tools",
    iconName: "SiVisualstudiocode",
    description: "Primary integrated development environment configured for full-stack JavaScript, Python, and web development.",
    relatedProjectSlugs: ["synchronis", "live-sports-scoreboard", "cbt-platform"],
  },
  {
    name: "Android Studio",
    category: "Tools",
    iconName: "SiAndroidstudio",
    description: "Mobile software development tool suite for building, emulation, and debugging Flutter and Android apps.",
    relatedProjectSlugs: ["synchronis"],
  },
];

export const initialSkillsNodes: ISkillNode[] = [
  {
    id: "full-stack",
    label: "Full Stack Development",
    category: "Core Capability",
    description: "End-to-end web application architecture from reactive frontend UI components to relational/NoSQL backends and REST APIs.",
    relatedTechs: ["Python", "Django", "JavaScript", "HTML", "CSS", "MongoDB", "SQLite3"],
    relatedCerts: ["HackerRank Certification — Python", "HackerRank Certification — JavaScript"],
    relatedProjects: ["Synchronis — Smart Attendance Management System", "Haritha Karma Sena Data Management System"],
  },
  {
    id: "realtime-systems",
    label: "Real-Time System Development",
    category: "Specialized Engineering",
    description: "Engineering low-latency, event-driven interfaces with synchronized multi-display outputs and local messaging channels.",
    relatedTechs: ["JavaScript", "Java", "REST API Integration"],
    relatedCerts: ["NPTEL Certification — Introduction to Internet of Things"],
    relatedProjects: ["Live Sports Scoreboard System", "GECT Connect"],
  },
  {
    id: "responsive-design",
    label: "Responsive Web Design",
    category: "UI/UX Engineering",
    description: "Crafting fluid, high-contrast visual layouts across 360px mobile viewports to 1440px desktop screens with glassmorphism and motion polish.",
    relatedTechs: ["HTML", "CSS", "JavaScript"],
    relatedCerts: ["HackerRank Certification — JavaScript"],
    relatedProjects: ["FreshPick Vegetable Delivery Website", "Live Sports Scoreboard System"],
  },
  {
    id: "logical-problem-solving",
    label: "Logical Problem Solving",
    category: "Algorithmic Foundation",
    description: "Applying algorithm analysis, optimized data structures, and edge-case testing to solve complex technical requirements.",
    relatedTechs: ["Python", "Java", "JavaScript", "SQL"],
    relatedCerts: ["HackerRank Certification — Problem Solving"],
    relatedProjects: ["Computer Based Test Platform", "Synchronis — Smart Attendance Management System"],
  },
  {
    id: "oop-architecture",
    label: "Object-Oriented Programming",
    category: "Software Principles",
    description: "Enforcing clean encapsulation, inheritance, modular class hierarchies, and robust design patterns across Java and Python software.",
    relatedTechs: ["Java", "Python"],
    relatedCerts: ["HackerRank Certification — Python"],
    relatedProjects: ["GECT Connect", "Synchronis — Smart Attendance Management System"],
  },
  {
    id: "frontend-backend-integration",
    label: "Frontend & Backend Integration",
    category: "API & Data Sync",
    description: "Connecting asynchronous client components to serverless functions, Google Apps Script backends, and cloud databases.",
    relatedTechs: ["JavaScript", "Django", "Google Apps Script", "Google Sheets Database Integration"],
    relatedCerts: ["Cognitive Class — Machine Learning with Python"],
    relatedProjects: ["Computer Based Test Platform", "Synchronis — Smart Attendance Management System"],
  },
];

export const initialCertifications: ICertification[] = [
  {
    title: "NPTEL Certification — Introduction to Internet of Things",
    issuer: "IIT Kharagpur",
    grade: "Elite Silver (81%)",
    date: "2024",
    credentialUrl: "https://nptel.ac.in/",
    isElite: true,
  },
  {
    title: "HackerRank Certification — Problem Solving",
    issuer: "HackerRank",
    grade: "Verified Certificate",
    date: "2024",
    credentialUrl: "https://www.hackerrank.com/profile/mithunmp2004",
    isElite: false,
  },
  {
    title: "HackerRank Certification — Python",
    issuer: "HackerRank",
    grade: "Verified Certificate",
    date: "2024",
    credentialUrl: "https://www.hackerrank.com/profile/mithunmp2004",
    isElite: false,
  },
  {
    title: "HackerRank Certification — JavaScript",
    issuer: "HackerRank",
    grade: "Verified Certificate",
    date: "2024",
    credentialUrl: "https://www.hackerrank.com/profile/mithunmp2004",
    isElite: false,
  },
  {
    title: "Cognitive Class — Machine Learning with Python",
    issuer: "IBM / Cognitive Class",
    grade: "Completed",
    date: "2024",
    credentialUrl: "https://cognitiveclass.ai/",
    isElite: false,
  },
  {
    title: "Python 101 for Data Science",
    issuer: "IBM / Cognitive Class",
    grade: "Completed",
    date: "2023",
    credentialUrl: "https://cognitiveclass.ai/",
    isElite: false,
  },
];

export const initialAchievements: IAchievement[] = [
  {
    title: "NPTEL IoT Elite Silver Recognition",
    description: "Achieved Elite Silver badge with 81% score in the rigorous IIT Kharagpur NPTEL Internet of Things course.",
    date: "2024",
  },
  {
    title: "Full-Stack Software Portfolio Development",
    description: "Independently architected and deployed multiple production-grade web applications, Flutter mobile tools, and desktop Java software.",
    date: "2022–2025",
  },
  {
    title: "Computer Based Test Platform Innovation",
    description: "Engineered a zero-cost serverless examination platform powered by Google Apps Script and Google Sheets backend.",
    date: "2024",
  },
  {
    title: "Dual-Display Sports Scoreboard System",
    description: "Built a synchronized real-time dual-screen score presentation platform using native browser BroadcastChannels.",
    date: "2024",
  },
  {
    title: "Continuous Software Engineering Learning",
    description: "Pursuing MCA at Government Engineering College Thrissur while maintaining active software development and competitive problem solving.",
    date: "2025–Present",
  },
];

export const initialGalleryItems: IGalleryItem[] = [
  {
    title: "Synchronis Architecture Diagram",
    caption: "Data flow breakdown between Flutter client app, Django REST API, geofencing module, and SQLite database.",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    order: 1,
  },
  {
    title: "Live Scoreboard Presentation Display",
    caption: "High-contrast public stadium scoreboard interface displaying match metrics, timers, and active penalties.",
    category: "UI Design",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    order: 2,
  },
  {
    title: "Computer Based Test Graphical Analytics",
    caption: "SVG-rendered performance chart detailing score distributions and time-per-question metrics.",
    category: "Data Visualization",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    order: 3,
  },
  {
    title: "GECT Connect Desktop Interface",
    caption: "Custom glassmorphism Swing desktop UI layout featuring chat channels and campus broadcast feeds.",
    category: "Software",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    order: 4,
  },
];

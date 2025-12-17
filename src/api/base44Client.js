// Mock Base44 API Client with Abenathi's Portfolio Data

const siteSettings = [{
  artist_name: 'Abenathi Sindapi',
  tagline: 'Junior Software Developer & QA Testing Specialist',
  email: 'abenathi.sindaphi201@gmail.com',
  phone: '065 838 0423',
  location: 'Khayelitsha, Cape Town, 7784',
  github: 'Abenathi201',
  bio: 'I got into coding because a mentor from my neighborhood saw something in me I didn\'t see in myself. I didn\'t have direction back then. Honestly, I still don\'t have it all figured out. But I\'m working towards something and that\'s what matters.\n\nI did a 6-month bootcamp at Life Choices Academy where I really got my hands dirty with HTML, CSS, JavaScript, Bootstrap, Vue.js, Node.js and MySQL. That\'s where it clicked: the problem-solving, the building and the satisfaction when something finally works after hours of breaking it.\n\nNow I\'m working as a Software Support and Testing Agent at KwantuIT. I\'m the person who finds what breaks before users do. I\'ve logged over 100 bugs across different systems and what I\'ve learned is this: good testing isn\'t just clicking buttons and filling out forms. It\'s thinking about edge cases, asking "what if someone does this wrong" and catching problems before they become disasters. I write SQL queries to manage databases and build internal tools to automate the repetitive stuff so people can focus on work that actually matters.\n\nI build web applications with React and Node.js, stuff that needs to handle real data, real users and real problems. I\'m drawn to projects where the backend logic actually has to work correctly because people depend on it. I care about things working smoothly and looking good while doing it.\n\nI\'m here because I want to create software that actually solves problems, not just check boxes on a ticket. If you need someone who questions assumptions, spots patterns and won\'t just build something because that\'s what the spec says, someone who thinks about why we\'re building it in the first place, let\'s talk.',
}];

const cvData = [
  {
    slug: 'developer',
    title: 'Junior Software Developer',
    contact: {
      name: 'Abenathi Sindapi',
      phone: '065 838 0423',
      email: 'abenathi.sindaphi201@gmail.com',
      location: 'Khayelitsha, Cape Town, 7784',
      github: 'https://github.com/Abenathi201',
      portfolio: 'https://professional-portfolio-phi-kohl.vercel.app'
    },
    summary: 'Junior software developer with hands-on experience in full-stack web development and 8 months of professional experience in software testing and database management. Currently working as a Software Support and Testing Agent, gaining real-world exposure to software workflows, bug identification, and database operations. Self-taught in modern web technologies with a focus on building responsive, user-friendly applications using React, Node.js, and MySQL.',
    skills: [
      {
        category: 'Frontend Development',
        items: [
          'React (with Hooks, React Router, React Query)',
          'Vue.js',
          'HTML, CSS, JavaScript (ES6+)',
          'Tailwind CSS, Framer Motion',
          'Responsive design principles'
        ]
      },
      {
        category: 'Backend Development',
        items: [
          'Node.js, Express',
          'RESTful API development',
          'MySQL, MongoDB',
          'SQL database queries and management'
        ]
      },
      {
        category: 'Tools & Practices',
        items: [
          'Git/GitHub version control',
          'Software testing and bug documentation',
          'Agile methodologies',
          'Problem-solving and debugging'
        ]
      }
    ],
    experience: [
      {
        title: 'Software Support and Testing Agent',
        company: 'KwantuIT',
        period: 'April 2024 - Present',
        responsibilities: [
          'Execute comprehensive software testing across 4 enterprise systems, identifying and documenting 100+ bugs including workflow blockers and data handling issues',
          'Manage MySQL database operations using SQL queries for user account creation, privilege assignment, and system usage tracking',
          'Provide technical support to users, troubleshooting system errors and guiding them through complex software workflows',
          'Developed and executed comprehensive test case suites covering user role permissions, data validation, and system workflows, achieving a 97% pass rate',
          'Developed internal tool (Harambee Server) to streamline user management processes and reduce direct database manipulation'
        ]
      }
    ],
    projects: [
      {
        title: 'Professional Portfolio Website',
        link: 'https://professional-portfolio-phi-kohl.vercel.app',
        tech: 'React, Vite, Tailwind CSS, Framer Motion, React Router, React Query',
        description: [
          'Personal portfolio website showcasing development projects and technical skills with modern design and smooth animations',
          'Implemented responsive design with dynamic CV generation, project showcase, and contact form integration',
          'Built with modern React 19 features and optimized animations using Framer Motion for smooth user interactions'
        ]
      },
      {
        title: 'Harambee Server (Internal Tool)',
        link: 'https://github.com/Abenathi201',
        tech: 'Node.js, Express, MySQL',
        description: [
          'Backend API for user management system designed to reduce direct database workload by providing controlled UI access for user operations',
          'Implemented CRUD operations for user accounts with middleware for authentication and authorization',
          'Built RESTful API endpoints with proper error handling and data validation to ensure system integrity'
        ]
      }
    ],
    education: [
      {
        degree: 'Systems Development',
        institution: 'On The Ball College',
        period: 'April 2024 - September 2024'
      },
      {
        degree: 'Web Development',
        institution: 'Life Choices Academy',
        period: 'April 2023 - September 2023'
      }
    ]
  },
  {
    slug: 'qa-tester',
    title: 'QA Testing Specialist',
    contact: {
      name: 'Abenathi Sindapi',
      phone: '065 838 0423',
      email: 'abenathi.sindaphi201@gmail.com',
      location: 'Khayelitsha, Cape Town, 7784',
      github: 'https://github.com/Abenathi201',
      portfolio: 'https://professional-portfolio-phi-kohl.vercel.app'
    },
    summary: 'Detail-oriented Software Support and Testing Agent with 8 months of hands-on experience in QA testing, database management, and technical support. Proven track record of identifying and documenting 100+ bugs, developing comprehensive test cases, and maintaining system integrity through SQL database operations. Strong problem-solving skills with the ability to troubleshoot complex workflows and provide user support in fast-paced environments.',
    skills: [
      {
        category: 'QA & Testing',
        items: [
          'Manual testing (UI, workflows, functional testing)',
          'Test case development and execution',
          'Bug identification, documentation, and tracking',
          'Role-based access control testing',
          'User acceptance testing'
        ]
      },
      {
        category: 'Database & Tools',
        items: [
          'MySQL database management (SQLyog)',
          'SQL queries (user management, privilege assignment, data tracking)',
          'Excel (VLOOKUP, formulas, data preparation)',
          'Tawk.to (customer support platform)',
          'Bug tracking systems'
        ]
      },
      {
        category: 'Development Skills',
        items: [
          'HTML, CSS, JavaScript',
          'Node.js, Express',
          'React, Vue.js, Tailwind CSS',
          'Git/GitHub version control'
        ]
      }
    ],
    experience: [
      {
        title: 'Software Support and Testing Agent',
        company: 'KwantuIT',
        period: 'April 2024 - Present',
        responsibilities: [
          'Identified and logged 100+ bugs across 4 enterprise software systems, including critical workflow blockers and data handling issues that prevented system functionality',
          'Developed and executed 4 comprehensive test case suites covering user role permissions, data validation, and system workflows, achieving a 97% pass rate',
          'Perform daily database operations using SQL queries in SQLyog to create and manage user accounts, assign privileges, and track system usage across MySQL databases',
          'Provide technical support to users via Tawk.to platform, troubleshooting system errors, resolving access issues, and guiding users through complex workflows',
          'Document testing processes, bug reports, and system procedures using Excel to maintain accurate records for development team and system administration',
          'Cleaned and prepared datasets using Excel (VLOOKUP, formulas) for system upload during initial data capture phase, ensuring data accuracy and reducing errors'
        ]
      }
    ],
    projects: [],
    education: [
      {
        degree: 'Systems Development',
        institution: 'On The Ball College',
        period: 'April 2024 - September 2024'
      },
      {
        degree: 'Web Development',
        institution: 'Life Choices Academy',
        period: 'April 2023 - September 2023'
      }
    ]
  }
];

const projects = [];

export const base44 = {
  entities: {
    SiteSettings: {
      list: async () => {
        return siteSettings;
      },
      get: async (id) => {
        return siteSettings[0];
      },
    },
    Project: {
      list: async () => {
        return projects;
      },
      filter: async (filters, sortField, limit) => {
        let filteredProjects = [...projects];

        if (filters?.featured) {
          filteredProjects = filteredProjects.filter(p => p.featured === filters.featured);
        }

        if (limit) {
          filteredProjects = filteredProjects.slice(0, limit);
        }

        return filteredProjects;
      },
      get: async (id) => {
        return projects.find(p => p.id === id) || null;
      },
    },
    CV: {
      list: async () => {
        return cvData;
      },
      filter: async (filters) => {
        let filteredCVs = [...cvData];

        if (filters?.slug) {
          filteredCVs = filteredCVs.filter(cv => cv.slug === filters.slug);
        }

        return filteredCVs;
      },
      get: async (slug) => {
        return cvData.find(cv => cv.slug === slug) || null;
      },
    },
  },
};

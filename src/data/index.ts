// Data exports for portfolio components
export { default as aboutData } from './about.json';
export { default as projectsData } from './projects.json';
export { default as skillsData } from './skills.json';
export { default as experienceData } from './experience.json';
export { default as educationData } from './education.json';
export { default as contactData } from './contact.json';
export { default as heroData } from './hero.json';

// Type definitions for better TypeScript support
export interface PersonalInfo {
  name: string;
  title: string;
  focus: string;
  experience: string;
  impact: string;
  location: string;
}

export interface Skill {
  name: string;
  tools: string[];
  level: number;
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  metric: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  achievements: string[];
  status: string;
  timeline: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  status: string;
  gpa: string;
  description: string;
  coursework: string[];
  highlights: string[];
}

export interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string | null;
  description: string;
}

export interface Certification {
  title: string;
  provider: string;
  status: string;
  icon: string;
  certificate?: string;
}

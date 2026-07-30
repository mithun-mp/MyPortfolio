export interface ISiteSettings {
  name: string;
  headline: string;
  statement: string;
  availabilityStatus: string;
  contactEmail: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  hackerrankUrl: string;
}

export interface ISocialProfile {
  _id?: string;
  platform: 'GitHub' | 'LeetCode' | 'HackerRank' | 'LinkedIn';
  handle: string;
  url: string;
  statSnapshot: string;
  caption: string;
}

export interface IProject {
  _id?: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problemSolved: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  keyLearnings: string[];
  featured: boolean;
  order: number;
  status: 'draft' | 'published' | 'archived';
  images: { url: string; caption: string }[];
}

export interface ITechnology {
  _id?: string;
  name: string;
  category: 'Languages' | 'Technologies' | 'Tools';
  iconName: string;
  description: string;
  relatedProjectSlugs: string[];
}

export interface ISkillNode {
  _id?: string;
  id: string;
  label: string;
  category: string;
  description: string;
  relatedTechs: string[];
  relatedCerts: string[];
  relatedProjects: string[];
}

export interface ICertification {
  _id?: string;
  title: string;
  issuer: string;
  grade: string;
  date: string;
  credentialUrl?: string;
  isElite?: boolean;
}

export interface IAchievement {
  _id?: string;
  title: string;
  description: string;
  date?: string;
}

export interface IGalleryItem {
  _id?: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  isFeatured: boolean;
  order: number;
}

export interface IContactSubmission {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt?: string;
  status?: 'unread' | 'read' | 'archived';
}

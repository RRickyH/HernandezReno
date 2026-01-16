const API_URL = import.meta.env.VITE_API_URL;
const CDN_URL = import.meta.env.VITE_CDN_URL;

export type Project = {
  id: number;
  title: string;
  imageKeys: string[];
  date: string;
  tags: string[];
  description: string;
};

export type Person = {
  id: number;
  name: string;
  role: string;
  photoURL: string;
  description: string;
};

export type SiteSettings = {
  titleText: string;
  accentText: string;
  tagLine: string;
  heroImageURL: string;
  aboutDescription: string;
  aboutImageURL: string;
};

export function getProjectURL(project: Project) {
  return `${API_URL}/projects/${project.id}`;
}

export function getImageURL(imageKey: string): string {
  return `${CDN_URL}/${imageKey}`;
}

export function getImageURLs(imageKeys: string[]) {
  if (!imageKeys) {
    return [];
  }
  const imageURLs: string[] = [];
  for (const imageKey of imageKeys.values()) {
    imageURLs.push(getImageURL(imageKey));
  }
  return imageURLs;
}

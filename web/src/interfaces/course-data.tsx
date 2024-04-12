import { VideoData } from "./video-data";

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  description: string;
  endDate?: string;
  videos?: VideoData[]
}
import { VideoData } from "./video-data";

export interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  expiration_date: string;
  videos: VideoData[] | []
}
import { useEffect, useState } from "react";

import { api } from "../lib/api";

import { CourseData } from "../interfaces/course-data";

import { useToast } from "@chakra-ui/react";

export function useFetchCourseInfo(slug: string) {
  const toast = useToast();
  const [course, setCourse] = useState<CourseData | null>(null);

  async function fetchCourseInfo(): Promise<void> {
    try {
      const response = await api.get(`/courses/${slug}`);

      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar os dados do curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });      }

      setCourse(response.data.course);
    } catch (error) {
      toast({
        title: 'Erro ao buscar os dados do curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(error);
      setCourse(null);
    }
  }

  useEffect(() => {
    fetchCourseInfo();
  }, [slug]);

  return { course, fetchCourseInfo };
}

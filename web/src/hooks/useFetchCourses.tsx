import { useEffect, useState } from "react";

import { api } from "../lib/api";

import { CourseData } from "../interfaces/course-data";

import { useToast } from "@chakra-ui/react";

export function useFetchCourses() {
  const toast = useToast();
  const [courses, setCourses] = useState<CourseData[]>([]);

  async function fetchCourses(): Promise<void> {
    try {
      const response = await api.get('/courses?filtro=nao-expirados');

      if (response.status !== 200) {
        toast({
          title: 'Erro ao listar os cursos!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }

      setCourses(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar os cursos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(error);
      setCourses([]);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, fetchCourses };
}

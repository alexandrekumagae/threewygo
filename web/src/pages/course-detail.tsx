import { useEffect, useState } from "react"

import { Box, Container, Heading, Text, useToast } from "@chakra-ui/react";

import { CourseData } from "../interfaces/course-data"

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { CourseVideos } from "../components/course-videos";

export function CourseDetail() {
  const toast = useToast()

  const [course, setCourse] = useState<CourseData>()

  async function getCourseInfo(): Promise<void> {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      setCourse({
        "id": "1",
        "thumb": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        "title": "Fundamentos e Metodologia da Educação Corporativa",
        "slug": "fundamentos-e-metodologia-da-educacao-corporativa",
        "summary": "Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
        "description": "No cenário globalizado, as organizações governamentais têm percebido os servidores públicos como seu principal ativo, o que faz com que a educação corporativa assuma um papel essencial no desenvolvimento e aprimoramento das competências profissionais. Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
        "videos": [
          {
            "id": "1",
            "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          },
          {
            "id": "2",
            "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          }
        ]
      })
    } catch (error) {
      toast({
        title: 'Erro ao buscar os dados do curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }  

  useEffect(() => {
    getCourseInfo()
  }, [])
  
  return (
    <>
      <Header />
      {course && (
        <>
          <Container maxW="container.md" py="12">
            <Box mb="8">
              <CourseVideos videos={course.videos} />
            </Box>
            {/* <Image
              src={course.thumb}
              alt={course.thumb}
              maxH="200px"
              width="auto"
              mb="8"
            /> */}
            <Box mb="8">
              <Heading as="h1" size="xl">{course.title}</Heading>
            </Box>
            <Box>
              <Text>{course.description}</Text>
            </Box>
          </Container>
        </>
      )} 
      <Footer />
    </>
  )
}
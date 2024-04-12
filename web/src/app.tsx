import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { Header } from "./components/header"

import { Footer } from "./components/footer"

import { Box, Button, Container, Grid, Heading, Stack, useToast } from "@chakra-ui/react"

import bgBannerHome from "/img/bg-banner-home.png"

import { Course } from "./components/course"

import { CourseData } from "./interfaces/course-data"

import cursosJson from './../courses.json';

function App() {
  const toast = useToast()

  const [courses, setCourses] = useState<CourseData[]>([])

  async function getCourses(): Promise<void> {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      setCourses(cursosJson)
    } catch (error) {
      toast({
        title: 'Erro ao listar os cursos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      
      setCourses([])
    }
  }
  

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <>
      <Header />
      <Box bgImage={bgBannerHome} bgSize="cover" bgPosition="center" minH="400px">
        <Container maxW="container.lg">
          <Stack maxWidth="xl" pt="12" mb="4">
            <Heading as="h1" size="xl">Threewygo LMS</Heading>
            <Heading as="h2" size="lg" fontWeight="normal">A melhor plataforma de cursos de treinamento do mercado.</Heading>
          </Stack>
          <Link to="/#cursos"><Button variant="threewygo">Ver cursos</Button></Link>
        </Container>
      </Box>
      <Box id="cursos" py="12">
        <Container maxW="container.lg">
          <Heading as="h3" size="lg" mb="8">Cursos</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {courses && courses.map((course) => (
              <div key={course.id}>
                <Course course={course} />
              </div>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default App

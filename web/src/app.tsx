import { useFetchCourses } from "./hooks/useFetchCourses"

import { scrollToSection } from "./utils/scrollToSection"

import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Course } from "./components/course"

import { Box, Button, Container, Grid, Heading, Stack } from "@chakra-ui/react"

function App() {
  const { courses } = useFetchCourses();

  return (
    <>
      <Header />

      <Box bgColor="#EAF3F9" minH="300px">
        <Container maxW="container.lg">
          <Stack maxWidth="xl" pt="12" mb="4">
            <Heading as="h1" size="xl" color="threewygoPurple">Threewygo LMS</Heading>
            <Heading as="h2" size="lg" fontWeight="normal">A melhor plataforma de cursos de treinamento do mercado.</Heading>
          </Stack>
          <Button variant="threewygo" onClick={() => scrollToSection('cursos')}>Ver cursos</Button>
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

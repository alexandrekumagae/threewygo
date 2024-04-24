import { useFetchCoursesNonExpired } from "./hooks/useFetchCoursesNonExpired"

import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Banner } from "./components/home/banner"
import { CoursesList } from "./components/courses/courses-list"

import { Box, Container, Heading } from "@chakra-ui/react"

function App() {
  const { courses } = useFetchCoursesNonExpired();

  return (
    <>
      <Header />

      <Banner />

      <Box id="cursos" py="12">
        <Container maxW="container.lg">
          <Heading as="h3" size="lg" mb="8">Cursos</Heading>
          <CoursesList courses={courses} />
        </Container>
      </Box>
      
      <Footer />
    </>
  )
}

export default App

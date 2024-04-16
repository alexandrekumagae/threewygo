import { Link, useParams } from 'react-router-dom';

import { useFetchCourseInfo } from "../hooks/useFetchCourseInfo";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { CourseVideos } from "../components/course-videos";
import { CourseBreadcrumb } from '../components/course-breadcrumb';

import { Box, Button, Container, Grid, Heading, Text } from "@chakra-ui/react";

export function CourseDetail() {
  const { slug } = useParams();
  const { course } = useFetchCourseInfo(slug || '');
  
  return (
    <Box>
      <Header />
      
      <Container maxW="container.lg" py="6" pb={{ base: "8", md: "12" }} minH="80vh">
        {course ? (
          <>
            <Grid templateColumns={{ base: "1fr", lg: "1fr 35%" }} gap="8">
              <Box order={{ base: 2, lg: "unset" }}>
                <CourseBreadcrumb courseTitle={course.title} />

                <Box mb="8">
                  <Heading as="h1" size="xl">{course.title}</Heading>
                </Box>
                <Box>
                  <Text>{course.description}</Text>
                </Box>
              </Box>

              <Box mb={{ base: "4", md: "8" }} order={{ base: 1, lg: "unset" }}>
                <CourseVideos videos={course.videos} />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Heading as="h1" size="xl" mb="4">Curso não encontrado!</Heading>
            <Link to="/">
              <Button variant='threewygo'>
                Ver cursos
              </Button>
            </Link>
          </>
        )} 
      </Container>

      <Footer />
    </Box>
  )
}
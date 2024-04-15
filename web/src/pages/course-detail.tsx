import { useEffect, useState } from "react"

import { Link, useParams } from 'react-router-dom';

import { api } from "../lib/api";

import { CourseData } from "../interfaces/course-data"

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { CourseVideos } from "../components/course-videos";

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Grid, Heading, Text, useToast } from "@chakra-ui/react";

export function CourseDetail() {
  const toast = useToast()

  const { slug } = useParams();

  const [course, setCourse] = useState<CourseData>()

  async function getCourseInfo(): Promise<void> {
    try {
      const response = await api.get(`/courses/${slug}`)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar os dados do curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      setCourse(response.data.course)
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
      
      <Container maxW="container.lg" py="6" pb={{ base: "8", md: "12" }}>
        {course ? (
          <>
              <Grid templateColumns={{ base: "1fr", lg: "1fr 35%" }} gap="8">
                <Box order={{ base: 2, lg: "unset" }}>
                  <Breadcrumb mb="4">
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>{course.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
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
    </>
  )
}
import { useEffect, useState } from "react"

import { useParams } from 'react-router-dom';

import { api } from "../lib/api";

import { CourseData } from "../interfaces/course-data"

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { CourseVideos } from "../components/course-videos";

import { Box, Button, Container, Grid, Heading, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
      {course && (
        <>
          <Container maxW="container.lg" py="12">
            <Button onClick={() => history.go(-1)} variant="threewygo" mb="8" flex="" gap="2"><ArrowBackIcon /> Voltar</Button>
            <Grid templateColumns="1fr 30%" gap="8">
              <Box>
                <Box mb="8">
                  <Heading as="h1" size="xl">{course.title}</Heading>
                </Box>
                <Box>
                  <Text>{course.description}</Text>
                </Box>
              </Box>
              <Box mb="8">
                <CourseVideos videos={course.videos} />
              </Box>
            </Grid>
          </Container>
        </>
      )} 
      <Footer />
    </>
  )
}
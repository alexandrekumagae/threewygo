import { useParams } from 'react-router-dom'

import { useFetchCourseInfo } from "../../hooks/useFetchCourseInfo";

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { EditCourseForm } from "../../components/admin/edit-course-form";

import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export function EditCourse() {
  const { slug } = useParams();

  const { course, fetchCourseInfo } = useFetchCourseInfo(slug || '');

  return (
    <>
      <Header />

      <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
        <Box>
          <Heading as="h1" mb="2">Editar curso</Heading>

          <Button onClick={() => history.go(-1)} variant="threewygo" mb="8" flex="" gap="2"><ArrowBackIcon /> Voltar</Button>

          {course && (
            <EditCourseForm course={course} fetchCourseInfo={fetchCourseInfo} />
          )}
        </Box>
      </Container>
      
      <Footer />
    </>
  )
}
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { CreateCourseForm } from "../../components/admin/create-course-form";

import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export function CreateCourse() {
  return (
    <>
      <Header />
      
      <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
        <Box>
          <Heading as="h1" mb="2">Cadastro de novo curso</Heading>
          
          <Button onClick={() => history.go(-1)} variant="threewygo" mb="8" flex="" gap="2"><ArrowBackIcon /> Voltar</Button>

          <CreateCourseForm />
        </Box>
      </Container>

      <Footer />
    </>
  )
}

import { useState, useRef } from "react";

import { Link } from "react-router-dom";

import { api } from "../../lib/api";

import { useFetchTotalVideosSize } from "../../hooks/useFetchTotalVideoSize";
import { useFetchCourses } from "../../hooks/useFetchCourses";

import { HeaderAdmin } from "../../components/admin/header-admin";
import { Footer } from "../../components/footer";
import { ModalCourseDeleteConfirmation } from "../../components/modals/modal-course-delete-confirmation";
import { CardVideosStatistics } from "../../components/admin/card-videos-statistics";
import { CoursesTable } from "../../components/admin/courses-table";

import { Box, Button, Container, Flex, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export function Dashboard() {
  const toast = useToast()
  
  const { courses, fetchCourses } = useFetchCourses();
  const { totalVideosSize, fetchTotalVideosSize } = useFetchTotalVideosSize();

  const [courseIdInConfirmation, setCourseIdInConfirmation] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleOpenDeleteCourseConfirmation(id: string) {
    onOpen()

    setCourseIdInConfirmation(id)
  }

  async function handleConfirmDeleteCourse(): Promise<void> {
    try {
      const response = await api.delete(`/courses/${courseIdInConfirmation}`)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao excluir o curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      toast({
        title: 'Curso deletado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch {
      toast({
        title: 'Erro ao excluir o curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } finally {
      fetchCourses()
      fetchTotalVideosSize();

      onClose()
    }
  }

  return (
    <>
      <HeaderAdmin />

      <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
        <Box mb="8">
          <Heading as="h1">Dashboard</Heading>
        </Box>

        <Box mb="8">
          <CardVideosStatistics totalVideosSize={totalVideosSize} />
        </Box>

        <Box pb="8">
          <Flex gap="4">
            <Heading as="h3" mb="2">Cursos</Heading>
            <Link to="/admin/cursos/novo"><Button flex="" gap="2" mb="8"><AddIcon />Adicionar novo curso</Button></Link>
          </Flex>

          <CoursesTable courses={courses} handleOpenDeleteCourseConfirmation={handleOpenDeleteCourseConfirmation} />
        </Box>
      </Container>

      <ModalCourseDeleteConfirmation isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} handleConfirmDeleteCourse={handleConfirmDeleteCourse} />

      <Footer />
    </>
  )
}
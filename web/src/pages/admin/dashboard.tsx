
import { useState, useRef } from "react";

import { Link } from "react-router-dom";

import { api } from "../../lib/api";

import { useFetchTotalVideosSize } from "../../hooks/useFetchTotalVideoSize";
import { useFetchCourses } from "../../hooks/useFetchCourses";

import { formatIsoDateToDdMmYyyy } from "../../utils/format-iso-date-to-dd-mm-yyyy";

import { HeaderAdmin } from "../../components/admin/header-admin";
import { Footer } from "../../components/footer";
import { ModalCourseDeleteConfirmation } from "../../components/admin/modal-course-delete-confirmation";

import { Box, Button, Card, CardBody, Container, Flex, Heading, IconButton, Stat, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
          <Card maxW="sm">
            <CardBody>
              <Stat>
                <StatLabel>Tamanho total ocupado pelos vídeos</StatLabel>
                <StatNumber>{totalVideosSize ? totalVideosSize : '0'} mb</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        <Box pb="8">
          <Flex gap="4">
            <Heading as="h3" mb="2">Cursos</Heading>
            <Link to="/admin/cursos/novo"><Button flex="" gap="2" mb="8"><AddIcon />Adicionar novo curso</Button></Link>
          </Flex>

          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th width="50%">Título</Th>
                  <Th>Data de Término</Th>
                  <Th width="10%">Ações</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses && courses.map(course => (
                  <Tr key={course.id}>
                    <Td>{course.title}</Td>
                    <Td>{formatIsoDateToDdMmYyyy(course.expiration_date)}</Td>
                    <Td>
                      <Flex gap="2">
                        <Link to={`/admin/cursos/editar/${course.slug}`}><IconButton aria-label="Editar curso" icon={<EditIcon />} colorScheme="blue" /></Link>
                        <IconButton aria-label="Excluir curso" icon={<DeleteIcon />} colorScheme="red" onClick={() => handleOpenDeleteCourseConfirmation(course.id)} />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <ModalCourseDeleteConfirmation isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} handleConfirmDeleteCourse={handleConfirmDeleteCourse} />

      <Footer />
    </>
  )
}
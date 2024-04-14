
import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";

import { api } from "../../lib/api";

import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { Footer } from "../../components/footer";

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, Container, Flex, Heading, IconButton, Stat, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { CourseData } from "../../interfaces/course-data";
import { formatIsoDateToDdMmYyyy } from "../../utils/formatIsoDateToDdMmYyyy";

export function Dashboard() {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [courseIdInConfirmation, setCourseIdInConfirmation] = useState("")
  const [totalVideosSize, setTotalVideosSize] = useState('0')
  const [courses, setCourses] = useState<CourseData[]>()

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
      fetchData()

      onClose()
    }
  }

  async function getTotalVideosSize() {
    try {
      const response = await api.get('/videos/total-video-size')
      
      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar o tamanho total dos vídeos!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
      setTotalVideosSize(response.data.totalSize)
    } catch {
      toast({
        title: 'Erro ao buscar o tamanho total dos vídeos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  async function getCourses() {
    try {
      const response = await api.get('/courses')

      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar os cursos!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      setCourses(response.data)
    } catch {
      toast({
        title: 'Erro ao buscar os cursos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  async function fetchData() {
    await getTotalVideosSize()
    await getCourses()
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir curso
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja realmente excluir esse curso?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => handleConfirmDeleteCourse()} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Footer />
    </>
  )
}
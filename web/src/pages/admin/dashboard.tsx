
import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { Footer } from "../../components/footer";

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, Container, Flex, Heading, IconButton, Stat, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";

export function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [courseIdInConfirmation, setCourseIdInConfirmation] = useState("")

  function handleOpenDeleteCourseConfirmation(id: string) {
    onOpen()

    setCourseIdInConfirmation(id)
  }

  async function handleConfirmDeleteCourse(): Promise<void> {
    onClose()
  }

  return (
    <>
      <HeaderAdmin />
      <Container maxW="container.lg" py="12">
        <Box mb="8">
          <Heading as="h1">Dashboard</Heading>
        </Box>
        <Box mb="8">
          <Card maxW="sm">
            <CardBody>
              <Stat>
                <StatLabel>Tamanho total ocupado pelos vídeos</StatLabel>
                <StatNumber>10gb</StatNumber>
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
                <Tr>
                  <Td>Curso</Td>
                  <Td>01/01/2000</Td>
                  <Td>
                    <Flex gap="2">
                      <Link to={`/admin/cursos/editar/1`}><IconButton aria-label="Editar curso" icon={<EditIcon />} colorScheme="blue" /></Link>
                      <IconButton aria-label="Excluir curso" icon={<DeleteIcon />} colorScheme="red" onClick={() => handleOpenDeleteCourseConfirmation("1")} />
                    </Flex>
                  </Td>
                </Tr>
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
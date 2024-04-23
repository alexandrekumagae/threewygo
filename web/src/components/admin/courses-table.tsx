import { Link } from "react-router-dom";

import { CourseData } from "../../interfaces/course-data";

import { formatIsoDateToDdMmYyyy } from "../../utils/format-iso-date-to-dd-mm-yyyy";

import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface CoursesTableProps {
  courses: CourseData[]
  handleOpenDeleteCourseConfirmation: (id: string) => void
}

export function CoursesTable({courses, handleOpenDeleteCourseConfirmation}: CoursesTableProps) {
  return (
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
  )
}
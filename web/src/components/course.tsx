import { Link } from "react-router-dom";

import { CourseData } from "../interfaces/course-data";

import { truncateString } from "../utils/truncate-string";
import { formatIsoDateToDdMmYyyy } from "../utils/format-iso-date-to-dd-mm-yyyy";

import { Card, CardBody, Stack, Heading, CardFooter, Button, Text, Flex } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

interface CourseProps {
  course: CourseData
}

export function Course({course}: CourseProps) {
  return (
    <Link to={`/curso/${course.slug}`}>
      <Card height="100%">
        <CardBody>
          <Stack spacing='3'>
            <Heading size='md'>{course.title}</Heading>
            <Text>
              {truncateString(course.description, 120)}
            </Text>
          </Stack>
        </CardBody>
        
        <CardFooter pt="0">
          <Stack>
            <Flex alignItems="center" gap="2" fontSize="sm" mb="2">
              <CalendarIcon />
              <Text fontWeight="bold">Término em {formatIsoDateToDdMmYyyy(course.expiration_date)}</Text>
            </Flex>
            <Button variant='threewygo'>
              Saiba Mais
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </Link>
  )
}
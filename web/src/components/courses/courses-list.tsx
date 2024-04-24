import { CourseData } from "../../interfaces/course-data";

import { Course } from "./course";

import { Grid } from "@chakra-ui/react";

interface CoursesListProps {
  courses: CourseData[]
}

export function CoursesList({ courses }: CoursesListProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
      {courses && courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
        </div>
      ))}
    </Grid>
  )
}
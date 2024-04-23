import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface CourseBreadcrumbProps {
  courseTitle: string
}

export function CourseBreadcrumb({ courseTitle }: CourseBreadcrumbProps) {
  return (
    <Breadcrumb mb="4">
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>{courseTitle}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
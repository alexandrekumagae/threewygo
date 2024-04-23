import { Container, Stack, Heading, Button, Box } from "@chakra-ui/react";

import { scrollToSection } from "../../utils/scroll-to-section";

export function Banner() {
  return (
    <Box bgColor="#EAF3F9" minH="300px">
      <Container maxW="container.lg">
        <Stack maxWidth="xl" pt="12" mb="4">
          <Heading as="h1" size="xl" color="threewygoPurple">Threewygo LMS</Heading>
          <Heading as="h2" size="lg" fontWeight="normal">A melhor plataforma de cursos de treinamento do mercado.</Heading>
        </Stack>
        <Button variant="threewygo" onClick={() => scrollToSection('cursos')}>Ver cursos</Button>
      </Container>
    </Box>
  )
}
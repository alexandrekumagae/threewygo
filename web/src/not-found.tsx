import { Link } from "react-router-dom";

import { Button, Container, Flex, Heading, Stack } from "@chakra-ui/react";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function NotFound() {
  return (
    <>
      <Header />
      <Container maxW="container.lg">
        <Flex alignItems="center" justifyContent="center" textAlign="center" minH="75vh">
          <Stack>
            <Heading as="h1" mb="4">404 Página não encontrada</Heading>
            <Link to="/#cursos">
              <Button variant='threewygo'>
                Ver cursos
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Container>
      <Footer />
    </>
  )
}
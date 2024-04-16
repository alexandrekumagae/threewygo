import { Link } from "react-router-dom";

import { Box, Button, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export function HeaderAdmin() {
  return (
    <>
      <Container maxW="container.lg">
        <Flex py="4" flexFlow={{ base: "wrap" }} gap="3">
          <Box>
            <Link to="/">
              <Heading color="threewygoPurple">Threewygo</Heading>
            </Link>
          </Box>
          
          <Spacer />
          
          <Box>
            <Link to="/">
              <Button variant="threewygo" flex="" gap="2"><ArrowBackIcon /> Voltar para o site</Button>
            </Link>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
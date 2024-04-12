import { Link } from "react-router-dom";

import { Box, Button, Container, Flex, Heading, Spacer } from "@chakra-ui/react";

export function Header() {
  return (
    <>
      <Container maxW="container.lg">
        <Flex py="4">
          <Box>
            <Link to="/">
              <Heading color="threewygoPurple">Threewygo</Heading>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Link to="/admin">
              <Button variant="threewygo">Dashboard</Button>
            </Link>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
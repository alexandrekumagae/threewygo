import { Container, Box } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box py="4" borderTop="1px" borderColor="rgba(31,32,65,.0784313725)">
      <Container maxW="container.lg" textAlign="center">
        Copyright © 2024 Threewygo - Todos os direitos reservados
      </Container>
    </Box>
  )
}
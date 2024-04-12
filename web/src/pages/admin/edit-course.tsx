import { z } from "zod";
import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { Footer } from "../../components/footer";

import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowBackIcon } from "@chakra-ui/icons";

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'O título precisa ter no mínimo 3 caracteres.',
  }),
  description: z.string().min(3, {
    message: 'A descrição precisa ter no mínimo 3 caracteres.',
  }),
  endDate: z.string().min(3, {
    message: 'A data de término está inválida.',
  }),
  videos: z.string().min(3, {
    message: 'Vídeos inválidos.',
  }),
})

type FormData = z.infer<typeof formSchema>

export function EditCourse() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      endDate: '',
      videos: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('data', data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <HeaderAdmin />
      <Container maxW="container.lg" py="12">
        <Box>
          <Heading as="h1" mb="2">Editar curso</Heading>
          <Button onClick={() => history.go(-1)} variant="threewygo" mb="8" flex="" gap="2"><ArrowBackIcon /> Voltar</Button>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FormControl isRequired mb="6">
              <FormLabel>Título</FormLabel>
              <Input placeholder='Insira o Título' {...register('title')} />
            </FormControl>

            <FormControl isRequired mb="6">
              <FormLabel>Descrição</FormLabel>
              <Textarea placeholder='Insira a Descrição' {...register('description')} />
            </FormControl>
            
            <FormControl isRequired mb="6">
              <FormLabel>Data de Término</FormLabel>
              <Input type="date" placeholder='Insira a Data de Término' {...register('endDate')} />
            </FormControl>
            
            <FormControl isRequired mb="6">
              <FormLabel>Vídeos</FormLabel>
              <Input type="file" placeholder='Vídeos' multiple {...register('videos')} />
            </FormControl>

            <Button type="submit" variant="threewygo">Adicionar</Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
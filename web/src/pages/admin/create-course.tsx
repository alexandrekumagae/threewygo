import { useState } from "react";

import { useNavigate } from 'react-router-dom'

import { api } from "../../lib/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { Footer } from "../../components/footer";

import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Header } from "../../components/header";

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'O título precisa ter no mínimo 3 caracteres.',
  }),
  slug: z.string().min(3, {
    message: 'O slug precisa ter no mínimo 3 caracteres.',
  }),
  description: z.string().min(3, {
    message: 'A descrição precisa ter no mínimo 3 caracteres.',
  }),
  expiration_date: z.string().min(3, {
    message: 'A data de término está inválida.',
  }),
  videos: z.any().optional(),
})

type FormData = z.infer<typeof formSchema>

export function CreateCourse() {
  const navigate = useNavigate()
  const toast = useToast()

  const [slug, setSlug] = useState('');

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      expiration_date: '',
      videos: [],
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.post('/courses', data)

      if (response.status !== 201) {
        toast({
          title: 'Erro ao cadastrar o curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      if (data.videos && response.data.course) {
        const uploadVideoResponse = await api.post(`/courses/${response.data.course.id}/videos`, data.videos, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (uploadVideoResponse.status !== 201) {
          toast({
            title: 'Erro ao realizar o upload dos vídeos!',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      }

      toast({
        title: 'Curso criado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/admin')
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar o curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSlug = event.target.value.replace(/\s+/g, '-').toLowerCase();
    setSlug(newSlug);
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
        <Box>
          <Heading as="h1" mb="2">Cadastro de novo curso</Heading>
          <Button onClick={() => history.go(-1)} variant="threewygo" mb="8" flex="" gap="2"><ArrowBackIcon /> Voltar</Button>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FormControl isRequired mb="6">
              <FormLabel>Título</FormLabel>
              <Input placeholder='Insira o Título' {...register('title')} onChange={handleTitleChange} required />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired mb="6">
              <FormLabel>Slug</FormLabel>
              <Input placeholder='Insira o Slug' {...register('slug')} value={slug} required />
              {errors.slug && (
                <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired mb="6">
              <FormLabel>Descrição</FormLabel>
              <Textarea placeholder='Insira a Descrição' {...register('description')} required rows={12} />
              {errors.description && (
                <FormErrorMessage>{errors.description.message}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl isRequired mb="6">
              <FormLabel>Data de Término</FormLabel>
              <Input type="date" placeholder='Insira a Data de Término' {...register('expiration_date')} required />
              {errors.expiration_date && (
                <FormErrorMessage>{errors.expiration_date.message}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl mb="6">
              <FormLabel>Vídeos (somente .mp4)</FormLabel>
              <Input type="file" placeholder='Vídeos' multiple {...register('videos')} accept=".mp4" />
              {errors.videos && (
                <FormErrorMessage>{errors.videos.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" variant="threewygo">Adicionar</Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
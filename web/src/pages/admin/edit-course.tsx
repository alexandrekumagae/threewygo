import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom'

import { api } from "../../lib/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { Footer } from "../../components/footer";

import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { CourseData } from "../../interfaces/course-data";
import { formatIsoDateToYyyyMmDd } from "../../utils/formatIsoDateToYyyyMmDd";

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
  videos: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

export function EditCourse() {
  const toast = useToast()

  const { slug } = useParams();

  const [courseId, setCourseId] = useState('')

  const { register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      expiration_date: '',
      videos: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.put(`/courses/${courseId}`, data)

      console.log(response)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao atualizar o curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      toast({
        title: 'Curso atualizado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Erro ao atualizar o curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  async function getCourseData() {
    try {
      const response = await api.get(`/courses/${slug}`)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar os dados do curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      setCourseId(response.data.course.id)

      await updateFormValues(response.data.course)
    } catch {
      toast({
        title: 'Erro ao buscar os dados do curso!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  async function updateFormValues(course: CourseData): Promise<void> {
    return new Promise<void>((resolve) => {
      setValue('title', course?.title ?? '');
      setValue('slug', course?.slug ?? '');
      setValue('description', course?.description ?? '');
      setValue('expiration_date', course?.expiration_date ? formatIsoDateToYyyyMmDd(course.expiration_date) : '');
  
      resolve();
    });
  }
  
  useEffect(() => {
    getCourseData()
  }, [])

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
              <Input placeholder='Insira o Título' {...register('title')} required />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired mb="6">
              <FormLabel>Slug</FormLabel>
              <Input placeholder='Insira o Título' {...register('slug')} required />
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
              <FormLabel>Vídeos</FormLabel>
              <Input type="file" placeholder='Vídeos' multiple {...register('videos')} />
              {errors.videos && (
                <FormErrorMessage>{errors.videos.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" variant="threewygo">Atualizar</Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
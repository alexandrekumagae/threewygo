import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom'

import { api } from "../../lib/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { CourseData } from "../../interfaces/course-data";
import { VideoData } from "../../interfaces/video-data";

import { formatIsoDateToYyyyMmDd } from "../../utils/format-iso-date-to-yyyy-mm-dd";

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Textarea, useToast } from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";

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
  videos: z.any().optional()
})

type FormData = z.infer<typeof formSchema>

export function EditCourse() {
  const toast = useToast()

  const { slug } = useParams();

  const [courseId, setCourseId] = useState('')
  const [videos, setVideos] = useState<VideoData[]>([])
  
  const { register, handleSubmit, setValue, formState: { errors }} = useForm({
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
      const response = await api.put(`/courses/${courseId}`, data)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao atualizar o curso!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      if (data.videos) {
        const uploadVideoResponse = await api.post(`/courses/${courseId}/videos`, data.videos, {
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
        title: 'Curso atualizado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

      getCourseData()
    } catch {
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
      setVideos(response.data.course.videos)

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

  async function handleDeleteVideo(id: string) {
    try {
      const response = await api.delete(`/videos/${id}`)

      if (response.status !== 200) {
        toast({
          title: 'Erro ao deletar o vídeo!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

      toast({
        title: 'Vídeo excluído com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

      getCourseData()
    } catch {
      toast({
        title: 'Erro ao deletar o vídeo!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  
  useEffect(() => {
    getCourseData()
  }, [])

  return (
    <>
      <Header />

      <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
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
              <Input placeholder='Insira o Slug' {...register('slug')} required />
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
              {videos && (
                <>
                  <Heading as="h3" mt="4" mb="4" fontSize="18">Videos enviados:</Heading>
                  <Flex gap="2" flexFlow="column">
                    {videos && videos.map(video => (
                      <div key={video.id}>
                        {video.name} <IconButton aria-label='Deletar vídeo' icon={<DeleteIcon />} ml="2" onClick={() => handleDeleteVideo(video.id)} />
                      </div>
                    ))}
                  </Flex>
                </>
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
import { useState, useEffect } from 'react';

import { api } from '../lib/api';
import { useToast } from '@chakra-ui/react';

export function useFetchTotalVideosSize() {
  const toast = useToast();
  const [totalVideosSize, setTotalVideosSize] = useState('0');

  async function fetchTotalVideosSize() {
    try {
      const response = await api.get('/videos/total-video-size')
      
      if (response.status !== 200) {
        toast({
          title: 'Erro ao buscar o tamanho total dos vídeos!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
      setTotalVideosSize(response.data.totalSize)
    } catch {
      toast({
        title: 'Erro ao buscar o tamanho total dos vídeos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchTotalVideosSize()
  }, [])

  return { totalVideosSize, fetchTotalVideosSize };
}
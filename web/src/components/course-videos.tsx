import { useEffect, useState } from "react";

import { VideoData } from "../interfaces/video-data"

import { VITE_VIDEO_PATH } from "../config";

import { AspectRatio, Box, Text, Grid, Modal, ModalBody, ModalContent, ModalOverlay, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, ModalCloseButton } from "@chakra-ui/react";

import { TriangleDownIcon } from "@chakra-ui/icons";

interface CourseVideoProps {
  videos: VideoData[]
}

export function CourseVideos({videos}: CourseVideoProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen && selectedVideo) {
      const videoElement = document.getElementById(`video-${selectedVideo.id}`) as HTMLVideoElement | null;
      if (videoElement) {
        videoElement.play();
      }
    }
  }, [isModalOpen, selectedVideo]);

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      {videos.length > 0 && (
        <>
          <Box key={videos[0].id} onClick={() => handleVideoClick(videos[0])} cursor="pointer" maxWidth="100%">
            <Box pointerEvents="none" position="relative">
              <Box display="flex" justifyContent="center" alignItems="center" position="absolute" height="100%" width="100%" zIndex="1" background="rgba(0, 0, 0, .3)">
                <Box backgroundColor="white" padding="3" borderRadius="100%" display="flex" justifyContent="center" alignItems="center">
                  <TriangleDownIcon position="relative" color="black" transform="rotate(270deg)" height="8" width="8" marginRight="-3px" />
                </Box>
              </Box>
              <AspectRatio maxW='100%' ratio={16/9}>
                <video width="100%" height="auto" muted={true} playsInline={true} style={{ maxHeight: "320px", maxWidth: "100vw" }}>
                  <source src={`${VITE_VIDEO_PATH}/${videos[0].path}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
            </Box>
          </Box>
          {videos.length > 1 && (
            <Accordion allowToggle mt="4">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Ver mais vídeos
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid pb="8" gap="4">
                    {videos.slice(1).map(video => (
                      <Box key={video.id} onClick={() => handleVideoClick(video)} cursor="pointer" maxWidth="100%">
                        <Box pointerEvents="none" position="relative">
                          <Box display="flex" justifyContent="center" alignItems="center" position="absolute" height="100%" width="100%" zIndex="1" background="rgba(0, 0, 0, .3)">
                            <Box backgroundColor="white" padding="3" borderRadius="100%" display="flex" justifyContent="center" alignItems="center">
                              <TriangleDownIcon position="relative" color="black" transform="rotate(270deg)" height="8" width="8" marginRight="-3px" />
                            </Box>
                          </Box>
                          <AspectRatio maxW='100%' ratio={16/9}>
                            <video controls={false} width="100%" height="auto" muted={true} playsInline={true} style={{ maxHeight: "320px", maxWidth: "100vw" }}>
                              <source src={`${VITE_VIDEO_PATH}/${video.path}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </AspectRatio>
                        </Box>
                        <Text fontSize='sm'>{video.name}</Text>
                      </Box>
                    ))}
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
          <Modal blockScrollOnMount={false} isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton position="absolute" top="-10%" right="-2%" zIndex="9" color="white" />
              <ModalBody p={0}>
                {selectedVideo && (
                  <AspectRatio>
                    <video id={`modal-video-${selectedVideo.id}`} controls autoPlay={true} style={{ width: '100%' }}>
                      <source src={`${VITE_VIDEO_PATH}/${selectedVideo.path}`}  type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </AspectRatio>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}
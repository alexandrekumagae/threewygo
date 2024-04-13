import { VideoData } from "../interfaces/video-data"

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AspectRatio, Box, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CourseVideoProps {
  videos: VideoData[]
}

export function CourseVideos({videos}: CourseVideoProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    if (isModalOpen && selectedVideo) {
      // Play the video when the modal is opened
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
      {videos && (
        <>
          <Slider {...settings}>
            {videos.map(video => (
              <Box key={video.id} onClick={() => handleVideoClick(video)} cursor="pointer">
                <AspectRatio maxW='100%' ratio={1}>
                  <video controls style={{ width: "100%" }}>
                    <source src={`${import.meta.env.VITE_VIDEO_PATH}/${video.path}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </AspectRatio>
              </Box>
            ))}
          </Slider>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody p={0}>
                {selectedVideo && (
                  <AspectRatio maxW="container.lg">
                    <video id={`modal-video-${selectedVideo.id}`} controls style={{ width: '100%' }}>
                      <source src={`${import.meta.env.VITE_VIDEO_PATH}/${selectedVideo.path}`}  type="video/mp4" />
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
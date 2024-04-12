import { VideoData } from "../interfaces/video-data"

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CourseVideoProps {
  videos: VideoData[]
}

export function CourseVideos({videos}: CourseVideoProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      {videos && (
        <Slider {...settings}>
          {videos.map((video) => (
            <div key={video.id}>
              <video controls style={{ width: "100%" }}>
                <source src={video.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Slider>
      )}
    </>
  )
}
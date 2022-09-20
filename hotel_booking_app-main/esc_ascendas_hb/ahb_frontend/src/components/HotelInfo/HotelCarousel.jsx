import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
function HotelCarousel(props) {
  let imgCount = props.currentHotel.image_details.count;
  const range = (start, end) => {
    let nums = [];
    for (let i = start; i < end; i++) nums.push(i);
    return nums;
  };

  let imgArr = range(0, imgCount); //get number of images to use for carousel

  return (
    <Carousel>
      {imgArr.map((i, index) => (
        <CarouselItem key={index}>
          <img
            src={
              props.currentHotel.image_details.prefix +
              i +
              props.currentHotel.image_details.suffix
            }
            style={{
              height: "323px",
              width: "100%",
              borderRadius: "3px",
              display: "block",
              margin: "auto",
              objectFit: "cover",
            }}
          />
          <Carousel.Caption>
            <p>{i + 1 + "/" + imgCount}</p>
          </Carousel.Caption>
        </CarouselItem>
      ))}
    </Carousel>
  );
}

export default HotelCarousel;

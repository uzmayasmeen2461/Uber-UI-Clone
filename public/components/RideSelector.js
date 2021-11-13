import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "./data/carList";
import Map from "./Map";

const RideSelector = ({ pickupcoordinates, dropoffcoordinates }) => {
  const [rideDuration, setRideduration] = useState(0);
  //get ride duration from mapbox api two points for x and y axis
  useEffect(() => {
    rideDuration = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupcoordinates[0]},${pickupcoordinates[1]};${dropoffcoordinates[0]},
      ${dropoffcoordinates[1]}?access_token=pk.eyJ1IjoidXptYTI0NjEiLCJhIjoiY2t2bWxkNXJ5MHdsNjJvbzVkYmRucmJyZyJ9.4U7WWBq2voTweqvhop9GXQ`
    )
      .then((res) => res.json())
      .then((data) => {
        const duration = data.routes[0].duration;

        setRideduration(duration / 100);
      });
  }, [pickupcoordinates, dropoffcoordinates]); //to refresh while page loads
  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <Price>{"$" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div` flex flex-col
flex-1 overflow-y-scroll`;

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b`;

const CarList = tw.div`overflow-y-scroll`;

const Car = tw.div`
flex  flex-1 p-4 items-center`;

const CarImage = tw.img` h-14 mr-4`;

const CarDetails = tw.div`flex-1`;

const Service = tw.div`font-medium `;

const Time = tw.div`text-xs text-blue-500`;
const Price = tw.div`text-sm`;

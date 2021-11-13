import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../public/components/Map";
import RideSelector from "../public/components/RideSelector";
import { useRouter } from "next/router";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoidXptYTI0NjEiLCJhIjoiY2t2bWxkNXJ5MHdsNjJvbzVkYmRucmJyZyJ9.4U7WWBq2voTweqvhop9GXQ",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropOffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoidXptYTI0NjEiLCJhIjoiY2t2bWxkNXJ5MHdsNjJvbzVkYmRucmJyZyJ9.4U7WWBq2voTweqvhop9GXQ",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setdropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropOffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/Search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>

      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector
          pickupcoordinates={pickupCoordinates}
          dropoffcoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
flex flex-col flex-1 h-screen`;

const RideContainer = tw.div`
flex-1 flex flex-col text-red h-1/2
`;

const ConfirmButton = tw.div`bg-black text-white my-4 mx-4 py-4 text-center text-xl rounded-lg cursor-pointer`;

const ConfirmButtonContainer = tw.div`
border-t-2 z-10
`;

const BackButton = tw.img`h-full object-contain`;

const ButtonContainer = tw.div`rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer`;

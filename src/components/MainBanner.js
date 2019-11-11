import React from "react";
import styled from "styled-components";

import device from "assets/device";

const MainBanner = ({ left = "0px", imgMaxWid = "400px", imgMinWid = "300px", translateY = "0%", img, title = "", description = "", ...props }) => {
  return (
    <BannerWrapper>
      <BannerLeft>
        <Image left={left} imgMaxWid={imgMaxWid} imgMinWid={imgMinWid} translateY={translateY} src={img} alt="BannerImage" />
      </BannerLeft>
      <BannerRight>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </BannerRight>
    </BannerWrapper>
  );
};

export default MainBanner;

const BannerWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #5ca4bd;
  height: 320px;
  font-family: "Dosis", sans-serif;
  color: #d9eeec;
  text-align: right;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  white-space: nowrap;

  @media ${device.laptop} {
    text-align: center;
    justify-content: center;
    text-shadow: 0px 3px rgba(0, 0, 0, 0.8);
    height: 300px;
  }

  @media ${device.tablet} {
    height: 250px;
  }

  @media ${device.mobile} {
  }
}
`;

const BannerLeft = styled.div``;

const BannerRight = styled.div`
  padding: 0 20px;
  padding-right: 60px;
  @media ${device.laptop} {
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  margin: 20px;
  z-index: 2;
  position: relative;
  white-space: normal;

  @media ${device.tablet} {
    font-size: 3.5rem;
  }
  @media ${device.mobile} {
    font-size: 2.5rem;
  }
`;

const Description = styled.h2`
  font-size: 2rem;
  z-index: 2;
  position: relative;
  margin-bottom: 60px;

  @media ${device.tablet} {
    white-space: normal;
    font-size: 1.7rem;
  }
  @media ${device.mobile} {
    white-space: normal;
    font-size: 1.2rem;
  }
`;

const Image = styled.img`
  height: auto;
  max-width: ${props => props.imgMaxWid};
  min-width: ${props => props.imgMinWid};
  position: relative;
  transform: translateY(${props => props.translateY});
  left: ${props => props.left};

  @media ${device.laptop} {
    position: absolute;
    left: 10px;
    transform: translateY(-75%) scale(0.7);
    filter: opacity(0.9);
  }
  @media ${device.mobile} {
    transform: translateY(-68%) scale(0.5);
  }
`;

import React from "react";
import styled from "styled-components";

const Divider = ({ title }) => {
  return (
    <DividerWrapper>
      <DividerTitle>{title}</DividerTitle>
      <Line />
    </DividerWrapper>
  );
};

const DividerWrapper = styled.div`
  width: 100%;
  margin: 15px 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.text.dark};
`;

const DividerTitle = styled.div`
  position: relative;
  left: 5vw;
  top: 10px;
  font-size: 18px;
  background-color: white;
  width: fit-content;
  padding: 0px 10px;
  font-family: "Raleway";
  font-weight: 600;
`;

export default Divider;

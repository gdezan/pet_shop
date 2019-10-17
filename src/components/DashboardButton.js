import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardButton = ({ icon, title, href }) => {
  return (
    <Wrapper href={href}>
      {icon && <FontAwesomeIcon icon={icon} />} <Title>{title}</Title>
    </Wrapper>
  );
};

export default DashboardButton;

const Wrapper = styled.a`
  cursor: pointer;
  padding: 20px;
  text-align: left;
  border: 2px solid #ccc;
  border-radius: 3px;
  color: ${props => props.theme.text.dark};
  display: flex;
  align-items: center;
  transition: all 0.15s;
  text-decoration: none;
  background-color: white;

  &:hover {
    color: ${props => props.theme.light};
    transform: scale(1.02);
  }
`;

const Title = styled.span`
  margin-left: 10px;
  font-weight: 600;
`;

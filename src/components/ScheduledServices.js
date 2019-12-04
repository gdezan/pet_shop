import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
import Divider from "base-components/Divider";
import { format } from "date-fns";

const Service = ({ service, pet, user }) => {
  return (
    <ServiceWrapper>
      <Row border>
        <Title>{service.service}</Title>
        <Time>{format(new Date(service.date), "HH:mm")}</Time>
      </Row>
      <Row>
        <Time>Cliente: {user.name}</Time>
        <Time>Pet: {`${pet.name}, ${pet.breed}, ${pet.age} anos`}</Time>
      </Row>
    </ServiceWrapper>
  );
};

const ScheduledServices = () => {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    fetch("api/services/schedule", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        data.sort(function(a, b) {
          return a.service.date < b.service.date ? -1 : a.service.date > b.service.date ? 1 : 0;
        });
        setSchedule(data);
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  }, []);

  if (!schedule) return null;
  let date;
  return (
    <Wrapper>
      {schedule.map(serv => {
        const { service, pet, user } = serv;
        const newDate = format(new Date(service.date), "dd/MM");
        if (newDate !== date) {
          date = newDate;
          return (
            <React.Fragment key={service._id}>
              <Divider title={newDate} /> <Service service={service} user={user} pet={pet} />
            </React.Fragment>
          );
        }
        return <Service key={service._id} service={service} user={user} pet={pet} />;
      })}
    </Wrapper>
  );
};

export default ScheduledServices;

const Wrapper = styled.div`
  width: 90%;
  height: 60vh;
  overflow-y: auto;
  border: 1px solid #ccc;
`;

const ServiceWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  background-color: #f7f7f7;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;

  ${props =>
    props.border &&
    css`
      border-bottom: 1px dashed #333;
      margin-bottom: 10px;
    `}
`;

const Title = styled.div`
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const Time = styled.div`
  font-size: 16px;
`;

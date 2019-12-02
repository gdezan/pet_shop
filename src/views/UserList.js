import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";
import TextField from "base-components/TextField";

const UserList = ({ adminUsers = false }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Wrapper>
      <Title>{`Consulta de ${adminUsers ? "Administradores" : "Usuários"}`}</Title>
      <Divider title="Pesquisar" />
      <TextField value={search} onChange={e => setSearch(e.target.value)} label="Usuário" lightBg />
      <Divider title={adminUsers ? "Administradores" : "Usuários"} />
      <ListWrapper>
        {users
          .filter(user => {
            const inSearch =
              search === "" || user.name.toLowerCase().includes(search.toLowerCase());
            if (adminUsers) {
              return user.isAdmin && inSearch;
            }
            return inSearch;
          })
          .map(user => (
            <UserWrapper key={user.id}>
              <Text bold>{user.name}</Text>
              <Text>E-Mail: {user.email}</Text>
              <Text>Endereço: {user.address}</Text>
              <Text>Telephone: {user.phone}</Text>
            </UserWrapper>
          ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default UserList;

const Wrapper = styled.div`
  background-color: white;
  width: 90%;
  margin: 120px auto;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;
`;

const Title = styled.h1`
  width: 95%;
  text-align: left;
  margin: 0 0 10px;
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const UserWrapper = styled.div`
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 10px;
  font-weight: ${props => (props.bold ? "bold" : "regular")};
`;

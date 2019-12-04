import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";
import TextField from "base-components/TextField";
import { UserContext } from "components/UserContext";
import Button from "base-components/Button";
import Swal from "sweetalert2";

const UserList = ({ adminUsers = false }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  const fetchUsers = () => {
    fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onAddAdmin = u => {
    Swal.fire({
      title: "Adicionar como administrador?",
      icon: "warning",
      text: `Deseja mesmo adicionar o usuário ${u.name} como administrador?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        fetch(`/api/users/${u._id}/admin`, {
          method: "POST",
          body: JSON.stringify({ isAdmin: true }),
          headers: { "Content-Type": "application/json" },
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire("Modificado", `O usuário ${u.name} é agora um administrador`, "success");
            fetchUsers();
          })
          .catch(err => Swal.fire("Erro", err.message, "error"));
      }
    });
  };

  const onRemoveAdmin = u => {
    Swal.fire({
      title: "Remover como administrador?",
      icon: "warning",
      text: `Deseja mesmo remover o usuário ${u.name} como administrador?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        fetch(`/api/users/${u._id}/admin`, {
          method: "POST",
          body: JSON.stringify({ isAdmin: false }),
          headers: { "Content-Type": "application/json" },
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire(
              "Modificado",
              `O usuário ${u.name} agora não é mais um administrador`,
              "success",
            );
            fetchUsers();
          })
          .catch(err => Swal.fire("Erro", err.message, "error"));
      }
    });
  };

  return (
    <Wrapper>
      <Title>{`Consulta de ${adminUsers ? "Administradores" : "Usuários"}`}</Title>
      <Divider title="Pesquisar" />
      <TextField value={search} onChange={e => setSearch(e.target.value)} label="Usuário" lightBg />
      <Divider title={adminUsers ? "Administradores" : "Usuários"} />
      <ListWrapper>
        {users
          .filter(u => {
            const inSearch = search === "" || u.name.toLowerCase().includes(search.toLowerCase());
            if (adminUsers) {
              return u.isAdmin && inSearch;
            }
            return inSearch;
          })
          .map(u => {
            return (
              <UserWrapper key={u._id}>
                <Text bold>{u.name}</Text>
                <Text>E-Mail: {u.email}</Text>
                <Text>Endereço: {u.address}</Text>
                <Text>Telephone: {u.phone}</Text>
                {user._id !== u._id &&
                  (u.isAdmin ? (
                    <RemoveAdmin onClick={() => onRemoveAdmin(u)}>Remover Admin</RemoveAdmin>
                  ) : (
                    <AddAdmin onClick={() => onAddAdmin(u)}>Tornar Admin</AddAdmin>
                  ))}
              </UserWrapper>
            );
          })}
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

const RemoveAdmin = styled(Button)`
  font-size: 12px;
  background-color: #d9534f;
`;

const AddAdmin = styled(Button)`
  font-size: 12px;
  background-color: #5cb85c;
`;

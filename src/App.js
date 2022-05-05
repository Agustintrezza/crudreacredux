import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  deleteUser,
  updateUsername,
  updateName,
} from "./features/Users";
import { SiRedux } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [newUsername, setNewUserName] = useState("");
  const [newName, setNewName] = useState("");

  return (
    <div className="App">
      <div className="contenedor-titulos">
        <div className="contenedor-logos">
          <div className="logo-titulo">
            <div className="logos">
              <FaReact onClick={() => window.location.reload()} />
              <SiRedux onClick={() => window.location.reload()} />
            </div>
            <h2 className="descripcion"> CRUD con Redux</h2>
          </div>

          <div className="addUser">
            <input
              type="text"
              placeholder="Nombre"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Nombre de Usuario"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <button
              disabled = {!name || !username}
              name="boton"
              className="agregar"
              onClick={() => {
                dispatch(
                  addUser({
                    id: userList[userList.length - 1].id + 1,
                    name: name,
                    username: username,
                  })
                );
              }}
            >
              Agregar Usuario
            </button>
            
          </div>
        </div>
      </div>

      <div className="displayUsers">
        {userList.map((user) => {
          return (
            <div key={user.id} className="edicion">
              <div className="titulos">
                <h1 className="h1"> {user.name} </h1>
                <h1> {user.username}</h1>
              </div>

              <div className="contenedor1">
              <input
                  type="text"
                  placeholder="Editar Nombre"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    dispatch(updateName({ id: user.id, name: newName }));
                  }}
                >
                  Actualizar Nombre
                </button>
              </div>

              <div className="contenedor2">
              <input
                  type="text"
                  placeholder="Editar Usuario"
                  onChange={(event) => {
                    setNewUserName(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    dispatch(
                      updateUsername({ id: user.id, username: newUsername })
                    );
                  }}
                >
                  Actualizar Usuario
                </button>
              </div>
              <div className="tachito">
                <MdDeleteOutline
                  className="eliminar-btn"
                  onClick={() => {
                    dispatch(deleteUser({ id: user.id }));
                  }}
                >
                  Eliminar Usuario
                </MdDeleteOutline>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

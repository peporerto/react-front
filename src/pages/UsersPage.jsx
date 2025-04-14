import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersRequest,updateUserRequest  } from "../api/auth"; // Función que obtiene la lista de usuarios
import { Card, Button } from "../componets/ui";
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
import EditUserModal from "./EditUserModal"; // Asegúrate de la ruta correcta

function UsersPage() {
  // Obtenemos el estado de autenticación y el usuario actual del contexto
  const { isAuthenticated, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Usuario que se va a editar
  const navigate = useNavigate(); // Hook para la navegación

  // Si el usuario está autenticado, se redirige a /users
  useEffect(() => {
    if (isAuthenticated) navigate("/users");
  }, [isAuthenticated, navigate]);

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await usersRequest(); // Llamar a la API
        setUsers(response.data); // Guardar la lista en el estado
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);
    // Función para abrir el modal y seleccionar el usuario a editar
    const handleEditClick = (user) => {
      setSelectedUser(user);
    };
      // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };
   // Función para guardar la actualización del usuario
   const handleSave = async (updatedData) => {
    console.log("Enviando datos actualizados:", updatedData);
    try {
      await updateUserRequest(selectedUser.id, updatedData);
      console.log("Petición de actualización enviada");
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === selectedUser.id ? { ...u, ...updatedData } : u
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  



  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((u) => (
            <Card key={u.id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{u.name}</h2>
              <p className="text-gray-600">{u.email}</p>
              <p className="text-sm font-medium mt-2">
                Role:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    u.role === "admin"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {u.role}
                </span>
              </p>
              <div className="flex gap-2 mt-4">
                <Button className="w-full">View Profile</Button>
                {!(currentUser && currentUser.user_data.id === u.id) && (
                  <Button className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleEditClick(u)}>
                    Edit
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}
      </div>
         {/* Mostrar el modal de edición si se ha seleccionado un usuario */}
         {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UsersPage;

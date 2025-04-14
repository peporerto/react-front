import { useState, useEffect } from "react";
import { Button, Input, Label } from "../componets/ui";

const EditUserModal = ({ user, onClose, onSave }) => {
  // Creamos un estado local para los campos del formulario, inicializado con la información del usuario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    phone: "",
    role: "",
  });

  // Al montar el modal, pre-populamos el formulario
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        name: user.name || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, [user]);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Al enviar el formulario, se llama a onSave con los datos actualizados
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="name">First Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="lastname">Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone:</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="role">Role:</Label>
            <Input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Save
            </Button>
            <Button type="button" onClick={onClose} className="w-full bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

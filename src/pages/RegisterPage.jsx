import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../componets/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-20">
    <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto p-4">
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              placeholder="Write your username"
              {...register("username")}
              autoFocus
              className="w-full"
            />
            {errors.username?.message && (
              <p className="text-red-500">{errors.username?.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email")}
              className="w-full"
            />
            {errors.email?.message && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="name">First Name:</Label>
            <Input
              type="text"
              name="name"
              placeholder="Write your first name"
              {...register("name")}
              className="w-full"
            />
            {errors.name?.message && (
              <p className="text-red-500">{errors.name?.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastname">Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              placeholder="Write your last name"
              {...register("lastname")}
              className="w-full"
            />
            {errors.lastname?.message && (
              <p className="text-red-500">{errors.lastname?.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone:</Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Write your phone number"
              {...register("phone")}
              className="w-full"
            />
            {errors.phone?.message && (
              <p className="text-red-500">{errors.phone?.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender:</Label>
            <select
              name="gender"
              className="border border-gray-300 rounded p-2 w-full bg-white text-black"
              {...register("gender")}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender?.message && (
              <p className="text-red-500">{errors.gender?.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password")}
              className="w-full"
            />
            {errors.password?.message && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
              className="w-full"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            )}
          </div>

          <Button className="w-full">Submit</Button>
        </form>
        <p className="mt-4 text-center">
          Already Have an Account?{" "}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;

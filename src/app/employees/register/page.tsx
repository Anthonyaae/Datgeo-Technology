"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";

export default function RegisterEmployeePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    documents: "",
    job_title: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:3000/auth/register`, formData);
      alert("Empleado registrado con éxito");
      router.push("/employees");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrar el empleado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, backgroundColor: "#1976D2", borderRadius: 3, p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Alta de Empleado
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField fullWidth label="Nombre" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <TextField fullWidth label="Apellido" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <TextField fullWidth label="Correo" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <TextField fullWidth label="Puesto" name="job_title" value={formData.job_title} onChange={handleChange} required />
          <TextField fullWidth label="Documento de Identidad" name="documents" value={formData.documents} onChange={handleChange} required />
          <TextField fullWidth label="Salario" name="salary" type="number" value={formData.salary} onChange={handleChange} required />

          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            sx={{ mt: 2 }} 
            disabled={!isFormValid || loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            color="secondary" 
            onClick={() => router.push("/employees")} 
            sx={{ mt: 1 }}
          >
            Salir
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || localStorage.getItem("userId");

  const [userData, setUserData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("ID no encontrado en la URL");
      return;
    }

    axios
      .get(`http://localhost:3000/employees/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching employee:", err));

    axios
      .get(`http://localhost:3000/documents/${id}`)
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error("Error fetching documents:", err));
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !id) {
      alert("Selecciona un archivo y asegúrate de que el ID del empleado es válido");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(`http://localhost:3000/documents/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDocuments([...documents, { fileUrl: res.data.fileUrl }]);
      setSelectedFile(null);
      alert("Archivo subido con éxito");
    } catch (error) {
      alert("Error al subir el archivo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#1976D2", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", backgroundColor: "#fff" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Mi Perfil
          </Typography>

          {id ? (
            userData ? (
              <Box sx={{ mb: 3 }}>
                <Typography>
                  <strong>Nombre:</strong> {userData.user?.first_name} {userData.user?.last_name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {userData.user?.email}
                </Typography>
                <Typography>
                  <strong>Puesto:</strong> {userData.job_title}
                </Typography>
                <Typography>
                  <strong>Salario:</strong> S/.{userData.salary}
                </Typography>
              </Box>
            ) : (
              <Typography>Cargando datos...</Typography>
            )
          ) : (
            <Typography color="error">ID no encontrado en la URL</Typography>
          )}

          <Typography variant="h5" sx={{ mt: 3 }}>
            Documentos Subidos
          </Typography>
          <List>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Documento ${index + 1}`} secondary={doc.fileUrl} />
                  <IconButton color="primary" href={doc.fileUrl} target="_blank">
                    <VisibilityIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography>No hay documentos subidos</Typography>
            )}
          </List>

          <Box sx={{ mt: 3 }}>
            <input type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              sx={{ mt: 2 }}
            >
              Subir Documento
            </Button>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

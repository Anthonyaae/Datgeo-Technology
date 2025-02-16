Prueba Técnica Desarrollador Full Stack
          Datgeo Technology

Desarrollar una aplicación web para la gestión de empleados en
una empresa. El área de Recursos Humanos será responsable de registrar a los
empleados en la aplicación, tras lo cual cada empleado deberá iniciar sesión y subir
tres documentos escaneados (documento de identidad, licencia de conducir y CV)
requeridos por la empresa en formato PDF. Para el backend deberá utilizar NestJS con
TypeORM y PostgreSQL como base de datos, y en el frontend Next.js y Material UI.

## 🚀 Tecnologías utilizadas
- Backend: NestJS, TypeORM, PostgreSQL
- Frontend: NextJS y Material UI
- Base de datos: PostgreSQL

EndPoints Para Recursos Humanos

http://localhost:3000/auth/register
POST
{
  "first_name": "Luis",
  "last_name": "Aguilar",
  "email": "luis.aguilar@gmail.com",
  "password": "luis123",
  "job_title": "RH",
  "salary": 3000,
  "documents": "74884775"
}

EndPoint Para otros tipos de trabajo
POST
http://localhost:3000/auth/register
{
  "first_name": "prueba",
  "last_name": "prueba",
  "email": "prueba@gmail.com",
  "password": "prueba123",
  "job_title": "Sistemas",
  "salary": 2000,
  "documents": "77777778"
}

EndPoints Para login
POST
http://localhost:3000/auth/login
{
  "email": "luis.aguilar@gmail.com",
  "password": "luis123"
}

EndPoints Para empleados
GET
http://localhost:3000/employees


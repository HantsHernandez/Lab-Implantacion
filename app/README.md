## Descripción 
La app es un sistema para llevar el control de las tareas pendientes y completadas

# Tecnologías -
Backend: Node.js + Express + PostgreSQL 
Frontend: HTML + CSS + JavaScript + Nginx 
Orquestación: Docker + Docker Compose 
## Requisitos Previos 
Docker 20+ 
Docker Compose 2+ 
Git 

## Instalación y Ejecución 

### 1. Clonar repositorio 
git clone https://github.com/HantsHernandez/Lab-Implantacion.git

## Comandos Útiles 
### 2. Levantar servicios 

# Construir imágenes 
docker-compose build 
# Levantar servicios 
docker-compose up -d 
# Ver logs de todos los servicios 
docker-compose logs -f 
# Ver logs de un servicio específico 
docker-compose logs -f backend 
# Detener servicios 
docker-compose down
# Detener Y eliminar volúmenes 
docker-compose down -v 
# Ver estado de servicios 
docker-compose ps 
# Ejecutar comando en contenedor 
docker-compose exec backend sh 

### 3. Acceder a la aplicación
Frontend: http://localhost:8080
Backend (API): http://localhost:3000
Healthcheck (API): http://localhost:3000/health

## Estructura del Proyecto 
app/
│
├─ backend/
│  ├─ src/
│  │  └─ index.js
│  ├─ package.json
│  ├─ Dockerfile
│  └─ .dockerignore
│
├─ docs/
│  ├─ arquitectura.md
|
├─ frontend/
│  ├─ index.html
│  ├─ main.js
│  ├─ nginx.conf
│  └─ Dockerfile
│
├─ docker-compose.yml
├─ .gitignore
└─ README.md

## API Endpoints
Estado del servidor
GET:	/health

Listar todas las tareas
GET:	/tasks

Crear una tarea	{ "title": "Nueva tarea" }
POST:	/tasks

Marcar completada/no completada	{ "completed": true }
PUT:	/tasks/:id

Eliminar una tarea
DELETE:	/tasks/:id

## Autores 
Estudiante 1: Hants Aaron Hernandez Menjivar
Estudiante 2: Yohalmo Alexander Vasquez Garcia

## Fecha 
2025-10-15
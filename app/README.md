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
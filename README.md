# Vehículos REST API
API REST implementada con la pila MEAN, utilizada como ejemplo de consulta desde CKAN en mi Trabajo Fin de Grado Creación de un Portal de Datos Abiertos y Acceso a un Conjunto de Datos mediante API REST.

## Endpoints
| Método | Ruta | Descripción |
| -- | -- | -- |
| POST | /vehiculo | Añadir vehículo a la base de datos |
| GET | / | Obtiene un vehículo cualquiera (endpoint simple para probar) |
| GET | /matricula/{matricula} | Obtener vehículo por matrícula |
| GET | /todos | Obtiene lista de vehículos |
| GET | /operativos | Obtener lista de vehículos operativos (estado = true) |
| GET | /tipo/{tipo} | Obtener vehículos por tipo |
| GET | /marca/{marca} | Obtener vehículos por marca |
| GET | /anio_alta/{anio_alta} | Obtener vehículos por año de alta. |
| GET | /anio/{anio} | Obtener vehículos que hayan estado operativos cierto año |
| POST | /vehiculo/{matricula} | Actualizar vehículo |
| DELETE | /vehiculo/{matricula} | Eliminar vehículo |
| -- | -- | -- |
| POST | /auth/signup | Registrar a usuario en la base de datos |
| POST | /auth/login | Iniciar sesión de un usuario ya registrado |

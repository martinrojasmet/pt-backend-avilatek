# API REST de Comercio Electrónico - Prueba Técnica Avila Tek - Martín Rojas

## **Diseño**  
Se decidió utilizar una arquitectura monolítica para concentrar todos los endpoints del negocio en un solo proyecto debido a su simplicidad. Esto reduce la complejidad operativa y posibles costos al tener un único punto de despliegue. Sin embargo, si en el futuro algunos servicios requieren escalar independientemente, podría ser necesaria una migración a microservicios.  

Para la base de datos, se eligió MongoDB porque el esquema flexible de NoSQL permite añadir campos sobre la marcha y escalar horizontalmente, lo que sería ideal para el historial de pedidos. Además, facilita el manejo de datos jerárquicos, como los ítems dentro de una orden. Como ventaja adicional, MongoDB permite hostear la base de datos en la nube sin costos iniciales y de manera sencilla, por lo que se optó por esta opción. Para los modelos de datos, se utilizó Mongoose por su capacidad para simplificar validaciones y la integración con la base de datos.  

Como medida de escalabilidad, se podría empaquetar la API en un contenedor Docker y utilizar un orquestador como Kubernetes para manejar picos de tráfico.   


## **Documentación**

### **Seguridad y Roles**  
- **Administrador**:  
  - Acceso completo a todos los endpoints (CRUD de productos, gestión de usuarios, etc.).  
  - Se creó manualmente en la base de datos.  

- **Cliente**:  
  - Solo puede:  
    - Consultar productos y ver detalles.  
    - Crear/cancelar órdenes propias.  
    - Registrar su cuenta e iniciar sesión (JWT).  

### **Detalles**  
Para utilizar los servicios:  
1. Realizar **SignUp** o **SignIn** para obtener un JWT (campo de token).  
2. Incluir el token en el header `Authorization` de las solicitudes (bearer token).  

#### **Base de datos**
![DB Diagram](https://raw.githubusercontent.com/martinrojasmet/pt-backend-avilatek/refs/heads/main/DB%20Diagram.png)

Para acceder a la documentación detallada se debe ejecutar el proyecto y acceder al swagger:  

1. Crear un archivo `.env.production.local` en el root con:  
   ```env
   PORT=3000
   NODE_ENV=production
   DB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/ecommerce
   JWT_SECRET=secret
   JWT_EXPIRES_IN=1d
(Envio por correo el URI de la BD y las credenciales del usuario administrador)

1. npm install
   
2. npm start / npm run dev

3. http://localhost:3000/api/v1/swagger/

4. Cualquier comentario o duda estoy atento :)
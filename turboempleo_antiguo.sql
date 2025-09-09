-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-08-2025 a las 00:52:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turboempleo`
--
CREATE DATABASE IF NOT EXISTS `turboempleo_2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `turboempleo_2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aspirante`
--

CREATE TABLE `aspirante` (
  `idAspirante` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `estado` varchar(80) NOT NULL,
  `curriculum` varchar(20) NOT NULL,
  `idUser_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aspirante`
--

INSERT INTO `aspirante` (`idAspirante`, `Nombre`, `Apellido`, `correo`, `telefono`, `estado`, `curriculum`, `idUser_fk`) VALUES
(1, 'Juan', 'Perez', 'juan.perez@example.com', '3001234567', 'Activo', 'CV_JuanPerez.pdf', 2),
(2, 'Luisa', 'Gomez', 'luisa.gomez@example.com', '3019876543', 'Activo', 'CV_LuisaGomez.pdf', NULL),
(3, 'Andres', 'Diaz', 'andres.diaz@example.com', '3025551122', 'Inactivo', 'CV_AndresDiaz.pdf', NULL),
(4, 'Carolina', 'Ramirez', 'caro.ramirez@example.com', '3037778899', 'Activo', 'CV_CarolinaR.pdf', NULL),
(5, 'Miguel', 'Castro', 'miguel.c@example.com', '3043334455', 'Activo', 'CV_MiguelC.pdf', NULL),
(6, 'Valeria', 'Silva', 'valeria.s@example.com', '3056667788', 'Activo', 'CV_ValeriaS.pdf', NULL),
(7, 'Ricardo', 'Torres', 'ricardo.t@example.com', '3069990011', 'Inactivo', 'CV_RicardoT.pdf', NULL),
(8, 'Isabel', 'Vargas', 'isabel.v@example.com', '3071112233', 'Activo', 'CV_IsabelV.pdf', NULL),
(9, 'Fernando', 'Mendez', 'fernando.m@example.com', '3084445566', 'Activo', 'CV_FernandoM.pdf', NULL),
(10, 'Gabriela', 'Ortega', 'gabriela.o@example.com', '3097778800', 'Activo', 'CV_GabrielaO.pdf', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallevacante`
--

CREATE TABLE `detallevacante` (
  `idAspirante_fk` int(11) NOT NULL,
  `idVacante_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallevacante`
--

INSERT INTO `detallevacante` (`idAspirante_fk`, `idVacante_fk`) VALUES
(1, 1),
(1, 10),
(2, 2),
(3, 1),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `sector` varchar(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `ubicacion` varchar(20) DEFAULT NULL,
  `idUser_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `sector`, `correo`, `telefono`, `ubicacion`, `idUser_FK`) VALUES
(1, 'TechSolutions S.A.', 'Tecnología', 'info@techsolutions.com', '6011112233', 'Bogotá', 3),
(2, 'Manufacturas Acme', 'Manufactura', 'contacto@acme.com', '6024445566', 'Medellín', NULL),
(3, 'Servicios Globales', 'Servicios', 'hr@serviciosglobales.com', '6037778899', 'Cali', NULL),
(4, 'Consultoría Innova', 'Consultoría', 'info@innova.com', '6042223344', 'Barranquilla', NULL),
(5, 'Retail Express', 'Comercio', 'contact@retailexpress.com', '6055556677', 'Bogotá', NULL),
(6, 'Salud Integral', 'Salud', 'info@saludintegral.com', '6068889900', 'Bucaramanga', NULL),
(7, 'Financiera Segura', 'Finanzas', 'atencion@financierasegura.com', '6071234567', 'Manizales', NULL),
(8, 'Agroindustria Verde', 'Agricultura', 'ventas@agroverde.com', '6089876543', 'Pereira', NULL),
(9, 'Construcciones Futur', 'Construcción', 'contacto@futuraco.com', '6093219876', 'Cartagena', NULL),
(10, 'Educación Digital', 'Educación', 'info@edudigital.com', '6010102030', 'Bogotá', NULL),
(11, 'TechSolutions S.A.', 'Tecnología', 'info@techsolutions.com', '6011112233', 'Bogotá', 3),
(12, 'Manufacturas Acme', 'Manufactura', 'contacto@acme.com', '6024445566', 'Medellín', 5),
(13, 'Servicios Globales', 'Servicios', 'hr@serviciosglobales.com', '6037778899', 'Cali', 7),
(14, 'Consultoría Innova', 'Consultoría', 'info@innova.com', '6042223344', 'Barranquilla', 9),
(15, 'Retail Express', 'Comercio', 'contact@retailexpress.com', '6055556677', 'Bogotá', 10),
(16, 'Salud Integral', 'Salud', 'info@saludintegral.com', '6068889900', 'Bucaramanga', 3),
(17, 'Financiera Segura', 'Finanzas', 'atencion@financierasegura.com', '6071234567', 'Manizales', 5),
(18, 'Agroindustria Verde', 'Agricultura', 'ventas@agroverde.com', '6089876543', 'Pereira', 7),
(19, 'Construcciones Futur', 'Construcción', 'contacto@futuraco.com', '6093219876', 'Cartagena', 9),
(20, 'Educación Digital', 'Educación', 'info@edudigital.com', '6010102030', 'Bogotá', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesoseleccion`
--

CREATE TABLE `procesoseleccion` (
  `idProceso` int(11) NOT NULL,
  `tipoEntrevista` varchar(30) NOT NULL,
  `Modalidad` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `Ubicacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Estado` varchar(11) DEFAULT NULL,
  `idEmpresa_FK` int(11) DEFAULT NULL,
  `idAspirante_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procesoseleccion`
--

INSERT INTO `procesoseleccion` (`idProceso`, `tipoEntrevista`, `Modalidad`, `direccion`, `Ubicacion`, `Descripcion`, `Estado`, `idEmpresa_FK`, `idAspirante_FK`) VALUES
(1, 'Técnica', 'Virtual', 'Google Meet Link', 'Bogotá', 'Entrevista técnica con equipo de desarrollo.', 'En Proceso', 1, 1),
(2, 'HR', 'Presencial', 'Calle 100 #20-30', 'Medellín', 'Entrevista inicial con recursos humanos.', 'Finalizado', 2, 2),
(3, 'Panel', 'Virtual', 'Zoom Meeting ID', 'Cali', 'Presentación a panel de gerentes.', 'Pendiente', 1, NULL),
(4, 'Comportamental', 'Presencial', 'Av. Siempre Viva 123', 'Bogotá', 'Evaluación de competencias blandas.', 'En Proceso', 3, 4),
(5, 'Técnica', 'Virtual', 'MS Teams', 'Barranquilla', 'Segunda entrevista técnica.', 'Pendiente', 4, 5),
(6, 'HR', 'Presencial', 'Carrera 7 #72-80', 'Bogotá', 'Entrevista con la gerente de tienda.', 'En Proceso', 5, 6),
(7, 'Clínica', 'Presencial', 'Calle 50 #10-15', 'Bucaramanga', 'Evaluación médica ocupacional.', 'Finalizado', 6, 7),
(8, 'Financiera', 'Virtual', 'Google Meet Link', 'Manizales', 'Entrevista sobre conocimientos financieros.', 'En Proceso', 7, 8),
(9, 'Campo', 'Presencial', 'Finca La Esperanza', 'Pereira', 'Visita a campo y evaluación práctica.', 'Finalizado', 8, 9),
(10, 'Arquitectura', 'Virtual', 'Zoom Meeting ID', 'Bogotá', 'Entrevista con el arquitecto principal.', 'Pendiente', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombreRol`) VALUES
(1, 'Administrador'),
(2, 'Aspirante'),
(3, 'Empresa'),
(4, 'Reclutador'),
(5, 'Invitado'),
(6, 'Moderador'),
(7, 'Analista'),
(8, 'Gerente'),
(9, 'Soporte'),
(10, 'Desarrollador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUser` int(11) NOT NULL,
  `User` varchar(50) NOT NULL,
  `Contrasena` varchar(12) NOT NULL,
  `idRol_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUser`, `User`, `Contrasena`, `idRol_fk`) VALUES
(1, 'admin_user', 'admin123', 1),
(2, 'juan_aspirante', 'pass456', 2),
(3, 'empresa_xyz', 'xyzcorp789', 3),
(4, 'maria_reclutador', 'recruitpass', 4),
(5, 'pedro_invitado', 'guestpass', 5),
(6, 'ana_moderador', 'modsecure', 6),
(7, 'carlos_analista', 'analysist', 7),
(8, 'sofia_gerente', 'manageit', 8),
(9, 'david_soporte', 'helpsupport', 9),
(10, 'laura_dev', 'devcode', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacante`
--

CREATE TABLE `vacante` (
  `idVacante` int(11) NOT NULL,
  `Titulo` varchar(30) NOT NULL,
  `Requisitos` varchar(50) NOT NULL,
  `Salario` double NOT NULL,
  `Ubicacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Estado` varchar(11) DEFAULT NULL,
  `idEmpresa_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacante`
--

INSERT INTO `vacante` (`idVacante`, `Titulo`, `Requisitos`, `Salario`, `Ubicacion`, `Descripcion`, `Estado`, `idEmpresa_FK`) VALUES
(1, 'Desarrollador Java Senior', '5+ años experiencia Java, Spring Boot', 5000000, 'Bogotá', 'Desarrollo de aplicaciones empresariales.', 'Abierta', 1),
(2, 'Analista de Datos Jr.', 'Excel, SQL, Python básico', 2500000, 'Medellín', 'Análisis de bases de datos y reportes.', 'Abierta', 2),
(3, 'Gerente de Proyectos TI', 'Certificación PMP, Scrum', 7000000, 'Cali', 'Liderar equipos de desarrollo.', 'Cerrada', 1),
(4, 'Asistente Administrativo', 'Manejo de Office, Proactividad', 1800000, 'Bogotá', 'Soporte administrativo general.', 'Abierta', 3),
(5, 'Ingeniero de Soporte', 'ITIL, Redes, Troubleshooting', 3000000, 'Barranquilla', 'Soporte técnico a usuarios.', 'Abierta', 4),
(6, 'Vendedor Tienda Retail', 'Experiencia en ventas, Servicio al cliente', 1500000, 'Bogotá', 'Atención al cliente y venta de productos.', 'Abierta', 5),
(7, 'Médico General', 'Título profesional, Experiencia en urgencias', 4500000, 'Bucaramanga', 'Atención primaria de pacientes.', 'Abierta', 6),
(8, 'Asesor Financiero', 'Experiencia en banca, Manejo de cartera', 3500000, 'Manizales', 'Asesoría a clientes en productos financieros.', 'Abierta', 7),
(9, 'Ingeniero Agrónomo', 'Conocimiento en cultivos, Manejo de plagas', 4000000, 'Pereira', 'Supervisión de proyectos agrícolas.', 'Cerrada', 8),
(10, 'Arquitecto de Software', 'Experiencia en microservicios, AWS', 6500000, 'Bogotá', 'Diseño de arquitectura de software.', 'Abierta', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aspirante`
--
ALTER TABLE `aspirante`
  ADD PRIMARY KEY (`idAspirante`),
  ADD KEY `idUser_fk` (`idUser_fk`);

--
-- Indices de la tabla `detallevacante`
--
ALTER TABLE `detallevacante`
  ADD PRIMARY KEY (`idAspirante_fk`,`idVacante_fk`),
  ADD KEY `idVacante_fk` (`idVacante_fk`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD KEY `idUser_FK` (`idUser_FK`);

--
-- Indices de la tabla `procesoseleccion`
--
ALTER TABLE `procesoseleccion`
  ADD PRIMARY KEY (`idProceso`),
  ADD KEY `idEmpresa_FK` (`idEmpresa_FK`),
  ADD KEY `idAspirante_FK` (`idAspirante_FK`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `idRol_fk` (`idRol_fk`);

--
-- Indices de la tabla `vacante`
--
ALTER TABLE `vacante`
  ADD PRIMARY KEY (`idVacante`),
  ADD KEY `idEmpresa_FK` (`idEmpresa_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aspirante`
--
ALTER TABLE `aspirante`
  MODIFY `idAspirante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `procesoseleccion`
--
ALTER TABLE `procesoseleccion`
  MODIFY `idProceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vacante`
--
ALTER TABLE `vacante`
  MODIFY `idVacante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aspirante`
--
ALTER TABLE `aspirante`
  ADD CONSTRAINT `aspirante_ibfk_1` FOREIGN KEY (`idUser_fk`) REFERENCES `usuario` (`idUser`);

--
-- Filtros para la tabla `detallevacante`
--
ALTER TABLE `detallevacante`
  ADD CONSTRAINT `detallevacante_ibfk_1` FOREIGN KEY (`idAspirante_fk`) REFERENCES `aspirante` (`idAspirante`),
  ADD CONSTRAINT `detallevacante_ibfk_2` FOREIGN KEY (`idVacante_fk`) REFERENCES `vacante` (`idVacante`);

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`idUser_FK`) REFERENCES `usuario` (`idUser`);

--
-- Filtros para la tabla `procesoseleccion`
--
ALTER TABLE `procesoseleccion`
  ADD CONSTRAINT `procesoseleccion_ibfk_1` FOREIGN KEY (`idEmpresa_FK`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `procesoseleccion_ibfk_2` FOREIGN KEY (`idAspirante_FK`) REFERENCES `aspirante` (`idAspirante`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol_fk`) REFERENCES `rol` (`idRol`);

--
-- Filtros para la tabla `vacante`
--
ALTER TABLE `vacante`
  ADD CONSTRAINT `vacante_ibfk_1` FOREIGN KEY (`idEmpresa_FK`) REFERENCES `empresa` (`idEmpresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import db from './db.js';

dotenv.config();

const port = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Registro
app.post('/registro', async (req, res) => {
    try {
        const { email, password, nombres, apellidos, vinculacion } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'pregrado'; // Establecer el rol como pregrado por defecto
        // Verificar si el correo electrónico ya está registrado
        db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Registro fallido');
                } else if (result.length > 0) {
                    res.status(400).send('El correo electrónico ya está registrado');
                } else {
                    // Insertar usuario si el correo electrónico no está registrado
                    db.query(
                        'INSERT INTO usuarios (email, password, role, nombres, apellidos, vinculacion) VALUES (?, ?, ?, ?, ?, ?)',
                        [email, hashedPassword, role, nombres, apellidos, vinculacion],
                        (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('Registro fallido');
                            } else {
                                res.status(201).send('Usuario registrado!');
                            }
                        }
                    );
                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Registro fallido');
    }
});

// Obtener todos los correos electrónicos de los usuarios
app.get('/usuarios', (req, res) => {
    db.query(
        'SELECT email FROM usuarios',
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al obtener los correos electrónicos de los usuarios');
            } else {
                const emails = result.map(user => user.email);
                res.status(200).send(emails);
            }
        }
    );
});


// Inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (err, result) => {
                if (err) {
                    res.status(500).send('Inicio de sesión fallido');
                } else if (result.length === 0) {
                    res.status(401).send('Nombre de usuario o contraseña incorrecta');
                } else {
                    const usuario = result[0];
                    const match = await bcrypt.compare(password, usuario.password);
                    if (match) {
                        const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET);
                        res.status(200).send({ token, role: usuario.role });
                    } else {
                        res.status(401).send('Nombre de usuario o contraseña incorrecta');
                    }
                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Inicio de sesión fallido');
    }
});

// Ruta protegida que requiere un rol específico
app.get('/admin', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }
        if (decoded.role !== 'admin') {
            return res.status(403).send('Acceso denegado');
        }
        // Aquí puedes devolver la vista para los administradores
        res.send('Vista de administrador');
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

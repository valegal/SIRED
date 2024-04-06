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
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const role = 'pregrado'; 
        db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Registro fallido');
                }
                if (result.length > 0) {
                    return res.status(400).send('El correo electrónico ya está registrado');
                }
                // Insertar usuario si el correo electrónico no ha sido registrado antes
                db.query(
                    'INSERT INTO usuarios (email, password, role, nombres, apellidos, vinculacion) VALUES (?, ?, ?, ?, ?, ?)',
                    [email, hashedPassword, role, nombres, apellidos, vinculacion],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Registro fallido');
                        }
                        res.status(201).send('Usuario registrado!');
                    }
                );
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
                return res.status(500).send('Error al obtener los correos electrónicos de los usuarios');
            }
            const emails = result.map(user => user.email);
            res.status(200).send(emails);
        }
    );
});

// Endpoit de Inicio de sesión /login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (err, result) => {
                if (err) {
                    return res.status(500).send('Inicio de sesión fallido');
                }
                if (result.length === 0) {
                    return res.status(401).send('Nombre de usuario o contraseña incorrecta');
                }
                const usuario = result[0];
                const match = await bcrypt.compare(password, usuario.password);
                if (match) {
                    const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET);
                    res.cookie('token', token, { maxAge: 900000, httpOnly: true, secure: true }); 
                    return res.status(200).send({ token, role: usuario.role });
                }
                return res.status(401).send('Nombre de usuario o contraseña incorrecta');
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Inicio de sesión fallido');
    }
});


// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userRole = req.cookies.userRole; // Leer el rol desde la cookie
    if (!token || !userRole) {
        return res.status(401).send('Se requiere autenticación');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }
        req.user = { ...decoded, role: userRole }; // Agregar el rol al objeto req.user
        next();
    });
};

app.use((req, res, next) => {
    // Verificar si se intenta acceder a una ruta protegida sin autenticación
    if (req.path.startsWith('/datos') && !req.headers.authorization) {
        return res.status(401).send('Se requiere autenticación');
    }
    next();
});

// Aplicar el middleware de autenticación JWT a las rutas protegidas
app.use('/datos', authenticateJWT);

// Logout
app.get('/logout', (req, res) => {
    // Borrar la cookie 'userRole'
    res.clearCookie('userRole', { secure: true });

    // Invalidar el token JWT si existe en las cookies del cliente
    if (req.cookies.token) {
        res.clearCookie('token', { secure: true });
    }

    return res.json({ status: "Success" });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

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


// --------------------- Autenticación & Autorizacion basado en roles ---------------------------

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

// Endpoint de Inicio de sesión /login
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
                    res.cookie('userRole', usuario.role, { maxAge: 900000, httpOnly: true, secure: true });
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
    const userRole = req.cookies.userRole; 
    if (!token || !userRole) {
        return res.status(401).send('Se requiere autenticación');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }
        req.user = { ...decoded, role: userRole };
        next();
    });
};

app.use((req, res, next) => {
    if (req.path.startsWith('/datos') && !req.headers.authorization) {
        return res.status(401).send('Se requiere autenticación');
    }
    next();
});

app.use('/datos', authenticateJWT);

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('userRole', { secure: true });

    if (req.cookies.token) {
        res.clearCookie('token', { secure: true });
    }

    return res.json({ status: "Success" });
});


// --------------------- Tablas ---------------------------

// Obtener todos los datos de los usuarios
app.get('/usuarios/todos', (req, res) => {
    db.query(
        'SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de los usuarios');
            }
            res.status(200).send(result);
        }
    );
});


// Obtener información de un usuario por su ID sin necesidad de autenticación
app.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    db.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener la información del usuario');
            }
            if (result.length === 0) {
                return res.status(404).send('Usuario no encontrado');
            }
            const usuario = result[0];
            res.status(200).send(usuario);
        }
    );
});

// Eliminar un usuario por su ID sin necesidad de autenticación
app.delete('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    db.query(
        'DELETE FROM usuarios WHERE id = ?',
        [userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al eliminar el usuario');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Usuario no encontrado');
            }
            res.status(200).send('Usuario eliminado correctamente');
        }
    );
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

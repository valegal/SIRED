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


// --------------------- Tabla usuarios ---------------------------

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

// Cambiar el valor de la columna 'role' de un usuario por su ID
app.put('/usuarios/:id/role', (req, res) => {
    const userId = req.params.id;
    const newRole = req.body.role; 

    if (!newRole) {
        return res.status(400).send('El nuevo valor de "role" es requerido');
    }

    db.query(
        'UPDATE usuarios SET role = ? WHERE id = ?',
        [newRole, userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al cambiar el valor de "role"');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Usuario no encontrado');
            }
            res.status(200).send('Valor de "role" cambiado correctamente');
        }
    );
});


// --------------------- Tabla mediciones ---------------------------

//Endpoint de tabla de mediciones
app.get('/medicionestodas', (req, res) => {
    db.query(
        'SELECT * FROM mediciones',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de las mediciones');
            }
            res.status(200).send(result);
        }
    );
});

app.get('/medicionesconteo', (req, res) => {
    db.query(
        'SELECT COUNT(*) as total FROM mediciones',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener la cantidad de filas de la tabla mediciones');
            }
            res.status(200).send({ total: result[0].total });
        }
    );
});

app.get('/mediciones', (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10; // Parsea el valor a un entero
    const offset = (page - 1) * limit;
    db.query(
        'SELECT idmedicion, SUBSTRING_INDEX(fecha, " ", 1) AS fecha, SUBSTRING_INDEX(fecha, " ", -1) AS hora, tiempoLectura, equipos_idequipo FROM mediciones LIMIT ? OFFSET ?',
        [limit, offset],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de las mediciones');
            }
            res.status(200).send(result);
        }
    );
});

// Endpoint para obtener las variables de una medición específica
app.get('/variables/:idmedicion', (req, res) => {
    const idmedicion = req.params.idmedicion;
    db.query(
        'SELECT idmedicion, variables, equipos_idequipo FROM mediciones WHERE idmedicion = ?',
        [idmedicion],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de la medición');
            }

            // Formatear la columna 'variables' a formato JSON
            const variablesJSON = result.map(row => {
                const variablesArray = row.variables.split(';').map(parseFloat);
                return variablesArray;
            });

            // Construir un nuevo objeto con las tres columnas
            const data = variablesJSON.map((variables, index) => ({
                idmedicion: result[index].idmedicion,
                variables: variables,
                equipos_idequipo: result[index].equipos_idequipo
            }));

            // Enviar la respuesta con los datos en formato JSON
            res.status(200).send(data);
        }
    );
});

// Ruta para filtro avanzado
app.get('/medicionesfiltroavanzado', (req, res) => {
    const { fecha, hora, equipo, cantidad } = req.query;

    let filteredMediciones = [...mediciones];

    if (fecha) {
        filteredMediciones = filteredMediciones.filter(medicion =>
            medicion.fecha.toLowerCase().includes(fecha.toLowerCase())
        );
    }

    if (hora) {
        filteredMediciones = filteredMediciones.filter(medicion =>
            medicion.hora.toLowerCase().includes(hora.toLowerCase())
        );
    }

    if (equipo) {
        filteredMediciones = filteredMediciones.filter(medicion =>
            medicion.equipos_idequipo.toLowerCase().includes(equipo.toLowerCase())
        );
    }

    const cantidadNumerica = parseInt(cantidad);
    const paginatedMediciones = filteredMediciones.slice(0, cantidadNumerica);

    res.json(paginatedMediciones);
});


// --------------------- Tablas indicadores ---------------------------


//Endpoint de tabla de indicadores
app.get('/indicadores', (req, res) => {
    db.query(
        'SELECT * FROM indicadores',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de los indicadores');
            }
            res.status(200).send(result);
        }
    );
});

app.get('/indicadoresconteo', (req, res) => {
    db.query(
        'SELECT COUNT(*) as total FROM indicadores',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener la cantidad de filas de la tabla indicadores');
            }
            res.status(200).send({ total: result[0].total });
        }
    );
});

// --------------------- Tablas grupos & equipos_has_grupos ---------------------------

//Endpoint de tabla grupos
app.get('/grupos', (req, res) => {
    db.query(
        'SELECT * FROM grupos',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de los grupos');
            }
            res.status(200).send(result);
        }
    );
});

//Endpoint de tabla equipos_has_grupos
app.get('/has', (req, res) => {
    db.query(
        'SELECT * FROM equipos_has_grupos',
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al obtener los datos de equipos_has_grupos');
            }
            res.status(200).send(result);
        }
    );
});


// --------------------- Otras ---------------------------









// --------------------- Port ---------------------------

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

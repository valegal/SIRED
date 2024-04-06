// Ruta protegida para admin
app.get('/datos/administrador', authenticateJWT, (req, res) => {
    if (req.user.role !== 'administrador') {
        return res.status(403).send('Acceso denegado');
    }
    // Lógica para obtener datos de admin
    res.send('Datos de administrador');
});

// Ruta protegida para pregrado
app.get('/datos/pregrado', authenticateJWT, (req, res) => {
    if (req.user.role !== 'pregrado') {
        return res.status(403).send('Acceso denegado');
    }
    // Lógica para obtener datos de pregrado
    res.send('Datos de pregrado');
});

// Ruta protegida para posgrado
app.get('/datos/posgrado', authenticateJWT, (req, res) => {
    if (req.user.role !== 'posgrado') {
        return res.status(403).send('Acceso denegado');
    }
    // Lógica para obtener datos de posgrado
    res.send('Datos de posgrado');
});

const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const usuarios = [{nombre: 'Ryu', edad: 23, lugarProcedencia: 'Japon',},
{nombre: 'Ken', edad: 22, lugarProcedencia: 'EUA',},
{nombre: 'Chun-li', edad: 19, lugarProcedencia: 'China',},
{nombre: 'Guile', edad: 27, lugarProcedencia: 'EUA',},
{nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
{nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
]
app.get('/usuarios', (req, res) => {
    res.send(`<h1>Lista de usuarios</h1>
        <ul>${usuarios.map(element => 
        `<li>Nombre: ${element.nombre} | Edad: ${element.edad} | Procedencia: ${element.lugarProcedencia}</li>`)
        .join(' ')}</ul>
        <form action="/usuarios/add" method="post">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required>
        <label for="edad">Edad</label>
        <input type="text" id="edad" name="edad" required>
        <label for="procedencia">Procedencia</label>
        <input type="text" id="procedencia" name="procedencia" required>
        <button type="submit">Agregar Usuario</button>
        </form>
        <a href="/usuarios/add">Usuarios formato json</a>`)
})
app.get('/usuarios/add', (req, res) => {
    res.json(usuarios);
  });
app.post('/usuarios/add', (req, res) => {
    const nuevoUsuario = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.procedencia
      };
      usuarios.push(nuevoUsuario);
      res.redirect('/usuarios');
})
app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params
    let usuario 
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].nombre == nombre){
            usuario = usuarios[i]
        }
    }
	if (!usuario)
		return res.status(404).json({ message: 'Este personaje no esta en la lista' })
    res.send(`<h1>${usuario.nombre}</h1>
    <ul><li>Edad: ${usuario.edad}</li><li>Procedencia: ${usuario.lugarProcedencia}</li></ul>
    <a href="/usuarios">Lista completa</a>`)
})
app.delete('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params
    usuarios = usuarios.filter(element => !element.nombre == nombre)
    req.send(usuarios)
})
app.listen(3000, () => {
    console.log('Server on')
})
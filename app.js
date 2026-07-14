var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var sequelize = require('./models');
var Usuario = require('./models/Usuario');
var Curso = require('./models/Curso');
var Tarea = require('./models/Tarea');
var Evento = require('./models/Evento');
var Nota = require('./models/Nota');
var Grupo = require('./models/Grupo');
var Archivo = require('./models/Archivo');
var Chat = require('./models/Chat');
var Mensaje = require('./models/Mensaje');

var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// atrapa cualquier error de base de datos y responde 500 en vez de tumbar el servidor
function manejarError(res) {
  return function (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrio un error en el servidor' });
  };
}

app.get('/api/health', function (req, res) {
  res.json({ ok: true });
});

// ================= Registro y login (sin JWT, version simple) =================
app.post('/api/registro', function (req, res) {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var password = req.body.password;
  var ciclo = req.body.ciclo;
  var carrera = req.body.carrera;

  Usuario.findOne({ where: { email: email } })
    .then(function (existente) {
      if (existente) {
        return res.status(400).json({ error: 'Ese correo ya esta registrado' });
      }

      Usuario.create({
        nombre: nombre,
        email: email,
        password: password,
        ciclo: ciclo,
        carrera: carrera,
      })
        .then(function (usuario) {
          res.json(usuario);
        })
        .catch(manejarError(res));
    })
    .catch(manejarError(res));
});

app.post('/api/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  Usuario.findOne({ where: { email: email, password: password } })
    .then(function (usuario) {
      if (!usuario) {
        return res
          .status(401)
          .json({ error: 'Correo o contrasena incorrectos' });
      }
      res.json(usuario);
    })
    .catch(manejarError(res));
});

app.post('/api/usuarios/:id', function (req, res) {
  Usuario.update(
    {
      nombre: req.body.nombre,
      ciclo: req.body.ciclo,
      carrera: req.body.carrera,
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      Usuario.findByPk(req.params.id)
        .then(function (usuario) {
          res.json(usuario);
        })
        .catch(manejarError(res));
    })
    .catch(manejarError(res));
});

// ================= Cursos (cada usuario escribe los suyos) =================
app.get('/api/cursos', function (req, res) {
  var usuarioId = req.query.usuario_id;
  Curso.findAll({ where: { UsuarioId: usuarioId } })
    .then(function (cursos) {
      res.json(cursos);
    })
    .catch(manejarError(res));
});

app.post('/api/cursos', function (req, res) {
  Curso.create({
    nombre: req.body.nombre,
    profe: req.body.profe,
    horario: req.body.horario,
    creditos: req.body.creditos,
    ciclo: req.body.ciclo,
    UsuarioId: req.body.usuario_id,
  })
    .then(function (curso) {
      res.json(curso);
    })
    .catch(manejarError(res));
});

// no hay PATCH: se usa POST a la ruta del recurso para editar
app.post('/api/cursos/:id', function (req, res) {
  Curso.update(
    {
      nombre: req.body.nombre,
      profe: req.body.profe,
      horario: req.body.horario,
      creditos: req.body.creditos,
      ciclo: req.body.ciclo,
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

app.delete('/api/cursos/:id', function (req, res) {
  Curso.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

// ================= Tareas (GET, POST, POST de accion, DELETE) =================
app.get('/api/tareas', function (req, res) {
  var usuarioId = req.query.usuario_id;
  Tarea.findAll({ where: { UsuarioId: usuarioId } })
    .then(function (tareas) {
      res.json(tareas);
    })
    .catch(manejarError(res));
});

app.post('/api/tareas', function (req, res) {
  Tarea.create({
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    estado: 'pendiente',
    CursoId: req.body.curso_id,
    UsuarioId: req.body.usuario_id,
  })
    .then(function (tarea) {
      res.json(tarea);
    })
    .catch(manejarError(res));
});

// no hay PATCH: se usa POST a una ruta de accion
app.post('/api/tareas/:id/estado', function (req, res) {
  Tarea.update({ estado: req.body.estado }, { where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

app.delete('/api/tareas/:id', function (req, res) {
  Tarea.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

// ================= Eventos (GET, POST, DELETE) =================
app.get('/api/eventos', function (req, res) {
  var usuarioId = req.query.usuario_id;
  Evento.findAll({ where: { UsuarioId: usuarioId } })
    .then(function (eventos) {
      res.json(eventos);
    })
    .catch(manejarError(res));
});

app.post('/api/eventos', function (req, res) {
  Evento.create({
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    tipo: req.body.tipo,
    UsuarioId: req.body.usuario_id,
  })
    .then(function (evento) {
      res.json(evento);
    })
    .catch(manejarError(res));
});

app.delete('/api/eventos/:id', function (req, res) {
  Evento.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

// ================= Notas (GET, POST, POST de accion, DELETE) =================
app.get('/api/notas', function (req, res) {
  var usuarioId = req.query.usuario_id;
  Nota.findAll({ where: { UsuarioId: usuarioId }, include: Curso })
    .then(function (notas) {
      res.json(notas);
    })
    .catch(manejarError(res));
});

app.post('/api/notas', function (req, res) {
  Nota.create({
    title: req.body.title,
    content: req.body.content,
    UsuarioId: req.body.usuario_id,
    CursoId: req.body.curso_id,
  })
    .then(function (nota) {
      Nota.findByPk(nota.id, { include: Curso })
        .then(function (notaConCurso) {
          res.json(notaConCurso);
        })
        .catch(manejarError(res));
    })
    .catch(manejarError(res));
});

// no hay PATCH: se usa POST a la ruta del recurso para editar el contenido
app.post('/api/notas/:id', function (req, res) {
  Nota.update(
    {
      title: req.body.title,
      content: req.body.content,
      CursoId: req.body.curso_id,
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      Nota.findByPk(req.params.id, { include: Curso })
        .then(function (nota) {
          res.json(nota);
        })
        .catch(manejarError(res));
    })
    .catch(manejarError(res));
});

app.delete('/api/notas/:id', function (req, res) {
  Nota.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

// ================= Grupos (GET, y accion para unirse) =================
app.get('/api/grupos', function (req, res) {
  var usuarioId = req.query.usuario_id;
  Grupo.findAll({ include: [Usuario, Curso] })
    .then(function (grupos) {
      var conUnido = grupos.map(function (grupo) {
        var data = grupo.toJSON();
        data.unido = data.Usuarios.some(function (u) {
          return String(u.id) === String(usuarioId);
        });
        delete data.Usuarios;
        return data;
      });
      res.json(conUnido);
    })
    .catch(manejarError(res));
});

app.post('/api/grupos', function (req, res) {
  Grupo.create({
    nombre: req.body.nombre,
    maximo: req.body.maximo,
    CursoId: req.body.curso_id,
  })
    .then(function (grupo) {
      res.json(grupo);
    })
    .catch(manejarError(res));
});

app.post('/api/grupos/:id/unirse', function (req, res) {
  var usuarioId = req.body.usuario_id;

  Grupo.findByPk(req.params.id)
    .then(function (grupo) {
      if (!grupo) {
        return res.status(404).json({ error: 'Grupo no encontrado' });
      }

      Usuario.findByPk(usuarioId)
        .then(function (usuario) {
          // addUsuario lo crea automaticamente Sequelize por el belongsToMany
          grupo
            .addUsuario(usuario)
            .then(function () {
              grupo.miembros = grupo.miembros + 1;
              grupo
                .save()
                .then(function () {
                  res.json(grupo);
                })
                .catch(manejarError(res));
            })
            .catch(manejarError(res));
        })
        .catch(manejarError(res));
    })
    .catch(manejarError(res));
});

app.delete('/api/grupos/:id', function (req, res) {
  Grupo.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.json({ ok: true });
    })
    .catch(manejarError(res));
});

// ================= Archivos (GET, POST -- solo la ficha) =================
app.get('/api/archivos', function (req, res) {
  Archivo.findAll()
    .then(function (archivos) {
      res.json(archivos);
    })
    .catch(manejarError(res));
});

app.post('/api/archivos', function (req, res) {
  Archivo.create({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    CursoId: req.body.curso_id,
    UsuarioId: req.body.usuario_id,
  })
    .then(function (archivo) {
      res.json(archivo);
    })
    .catch(manejarError(res));
});

// ================= Chats y mensajes (GET, POST) =================
app.get('/api/chats', function (req, res) {
  Chat.findAll()
    .then(function (chats) {
      res.json(chats);
    })
    .catch(manejarError(res));
});

app.get('/api/chats/:id/mensajes', function (req, res) {
  Mensaje.findAll({
    where: { ChatId: req.params.id },
    order: [['createdAt', 'ASC']],
    include: { model: Usuario, as: 'Autor' },
  })
    .then(function (mensajes) {
      res.json(mensajes);
    })
    .catch(manejarError(res));
});

app.post('/api/chats/:id/mensajes', function (req, res) {
  Mensaje.create({
    texto: req.body.texto,
    ChatId: req.params.id,
    AutorId: req.body.usuario_id,
  })
    .then(function (mensaje) {
      res.json(mensaje);
    })
    .catch(manejarError(res));
});

// la primera vez no hay cursos ni grupos, se dejan los mismos que tenia el frontend
function sembrarDatos() {
  return Curso.count().then(function (cantidad) {
    if (cantidad > 0) return;

    return Curso.bulkCreate([
      {
        nombre: 'Programación Web',
        profe: 'Ing. Ramirez',
        creditos: 4,
        horario: 'Lun / Mie 10:00am',
        ciclo: 7,
      },
      {
        nombre: 'Base de Datos',
        profe: 'Ing. Torres',
        creditos: 3,
        horario: 'Mar / Jue 8:00am',
        ciclo: 6,
      },
      {
        nombre: 'Calculo 2',
        profe: 'Dr. Mendoza',
        creditos: 4,
        horario: 'Lun / Mie / Vie 7:00am',
        ciclo: 3,
      },
      {
        nombre: 'Economía',
        profe: 'Lic. Flores',
        creditos: 3,
        horario: 'Mar / Jue 2:00pm',
        ciclo: 4,
      },
      {
        nombre: 'Comunicación',
        profe: 'Lic. Vargas',
        creditos: 2,
        horario: 'Vie 10:00am',
        ciclo: 2,
      },
    ]).then(function () {
      return Grupo.count().then(function (cantidadGrupos) {
        if (cantidadGrupos > 0) return;

        return Curso.findAll().then(function (cursos) {
          function idDe(nombre) {
            return cursos.find(function (c) {
              return c.nombre === nombre;
            }).id;
          }

          return Grupo.bulkCreate([
            {
              nombre: 'Grupo PW - Proyecto Final',
              miembros: 0,
              maximo: 6,
              CursoId: idDe('Programación Web'),
            },
            {
              nombre: 'Estudio BD Parcial',
              miembros: 0,
              maximo: 5,
              CursoId: idDe('Base de Datos'),
            },
            {
              nombre: 'Cálculo 2 - Práctica',
              miembros: 0,
              maximo: 4,
              CursoId: idDe('Calculo 2'),
            },
            {
              nombre: 'Economía - Casos',
              miembros: 0,
              maximo: 5,
              CursoId: idDe('Economía'),
            },
          ]).then(function (grupos) {
            return Chat.count().then(function (cantidadChats) {
              if (cantidadChats > 0) return;

              return Chat.bulkCreate([
                {
                  nombre: 'Grupo PW - Proyecto Final',
                  tipo: 'grupo',
                  GrupoId: grupos[0].id,
                },
                {
                  nombre: 'Economía - Casos',
                  tipo: 'grupo',
                  GrupoId: grupos[3].id,
                },
              ]);
            });
          });
        });
      });
    });
  });
}

// sync() crea las tablas en la base de datos si todavia no existen
sequelize.sync().then(function () {
  sembrarDatos().then(function () {
    app.listen(port, function () {
      console.log('Servidor funcionando en el puerto ' + port);
    });
  });
});

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const ActualizarDatos = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numero_identificacion, setNumero_identificacion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [datosOriginales, setDatosOriginales] = useState({});

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAlerta({
            msg: 'No se ha encontrado el token',
            error: true,
          });
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get('/usuarios/perfil', config);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setTipoDocumento(data.tipoDocumento);
        setNumero_identificacion(data.numero_identificacion);
        setEmail(data.email);
        setDatosOriginales(data);
      } catch (error) {
        console.log(error);
        setAlerta({
          msg: 'Error al cargar los datos',
          error: true,
        });
      }
    };
    cargarDatosUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, apellido, email, tipoDocumento, numero_identificacion].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (!email.includes('@')) {
      setAlerta({
        msg: 'El email debe contener un @',
        error: true,
      });
      return;
    }

    if (password && password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords no coinciden',
        error: true,
      });
      return;
    }

    if (password && password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto, agrega mínimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlerta({});

    const datosActualizados = {};
    if (nombre !== datosOriginales.nombre) datosActualizados.nombre = nombre;
    if (apellido !== datosOriginales.apellido) datosActualizados.apellido = apellido;
    if (tipoDocumento !== datosOriginales.tipoDocumento) datosActualizados.tipoDocumento = tipoDocumento;
    if (numero_identificacion !== datosOriginales.numero_identificacion) datosActualizados.numero_identificacion = numero_identificacion;
    if (email !== datosOriginales.email) datosActualizados.email = email;
    if (password) datosActualizados.password = password;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAlerta({
          msg: 'No se ha encontrado el token',
          error: true,
        });
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put('/usuarios/perfil', datosActualizados, config);

      setAlerta({
        msg: data.msg,
        error: false,
      });

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-6">
            <h1 className="text-primary text-3xl font-black">
              Actualiza tus Datos
            </h1>
          </div>
          {msg && <Alerta alerta={alerta} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="my-1">
              <label
                className="uppercase text-primary block text-lg font-bold"
                htmlFor="nombre"
              >
                Nombres
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label
                className="uppercase text-primary block text-lg font-bold"
                htmlFor="apellido"
              >
                Apellidos
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Apellidos"
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>
          <div className="my-5">
            <label className="uppercase text-primary block text-lg font-bold"
            htmlFor="tipoDocumento">
                Tipo de Documento
            </label>
            <select
                id="tipoDocumento"
                value={tipoDocumento}
                onChange={e => setTipoDocumento(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            >
                <option value="">Seleccione un tipo</option>
                <option value="CedulaCiudadania">Cédula Ciudadana</option>
                <option value="TarjetaIdentidad">Tarjeta de Identidad</option>
                <option value="RegistroCivil">Registro Civil</option>
                <option value="CedulaExtranjeria">Cédula Extranjera</option>
                <option value="CarnetIdentidad">Carnet de Identidad</option>
            </select>
          </div>
          
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="numero_identificacion"
            >
              N. identificación
            </label>
            <input
              id="numero_identificacion"
              type="number"
              placeholder="Número de identificación"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={numero_identificacion}
              onChange={(e) => setNumero_identificacion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="password"
            >
              Contraseña (opcional)
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="password2"
            >
              Repetir Contraseña (opcional)
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Repetir Contraseña"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Actualizar Datos"
            className="bg-azuloscuro w-full py-3 text-white uppercase font-bold rounded hover:bg-primary transition-colors"
          />
        </form>

        <nav className="mt-6 flex flex-col items-center space-y-4">
          <Link
            className="text-secondarytext uppercase text-sm"
            to="/InicioSer"
          >
            Volver al Inicio
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default ActualizarDatos;

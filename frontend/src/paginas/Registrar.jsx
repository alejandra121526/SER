import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numero_identificacion, setNumero_identificacion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos están completos
    if ([nombre, apellido, email, password, tipoDocumento, numero_identificacion, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    // Verificar que el campo email contiene un @
    if (!email.includes('@')) {
      setAlerta({
        msg: 'El email debe contener un @',
        error: true,
      });
      return;
    }
    // Verificar que las contraseñas coinciden
    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords no coinciden',
        error: true,
      });
      return;
    }
    // Verificar que la contraseña tiene al menos 6 caracteres
    if (password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto, agrega mínimo 6 caracteres',
        error: true,
      });
      return;
    }
    // Verificar que se seleccionó un tipo de documento
    if (!tipoDocumento) {
      setAlerta({
        msg: 'Debe seleccionar un tipo de documento',
        error: true,
      });
      return;
    }
    // Limpiar la alerta si todo está correcto
    setAlerta({});

    try {
      // Enviar los datos al servidor
      const { data } = await clienteAxios.post('/usuarios', 
        { nombre, apellido, tipoDocumento, numero_identificacion, email, password }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      // Limpiar los campos del formulario
      setNombre('');
      setApellido('');
      setTipoDocumento('');
      setNumero_identificacion('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="flex bg-gray-100 justify-center items-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-6">
            <h1 className="text-primary text-3xl font-black">
              Regístrate, {' '}
              <span className="text-azuloscuro">es rápido y fácil</span>
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
                required
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
              placeholder="Email de registro"
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
              Contraseña
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
              Repetir Contraseña
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
            value="Crear Cuenta"
            className="bg-azuloscuro w-full py-3 text-white uppercase font-bold rounded hover:bg-primary transition-colors"
          />
        </form>

        <nav className="mt-6 flex flex-col items-center space-y-4">
          <Link
            className="text-secondarytext uppercase text-sm"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="text-secondarytext uppercase text-sm"
            to="/olvide-password"
          >
            Olvidé mi Contraseña
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Registrar;
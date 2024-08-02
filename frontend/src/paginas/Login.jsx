import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      
      // Redirigir al usuario a la página de inicio
      navigate('/InicioSer');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <form
          className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://www1.funcionpublica.gov.co/documents/28587425/42384076/logoSena.png/b8131ab9-4c1f-4ef9-8dd4-569d6b7169b6?t=1701956509586"
              alt="Logo"
              className="w-24"
            />
          </div>
          <h1 className="text-primary text-3xl font-black text-center mb-6">
            Inicia{' '}
            <span className="text-azuloscuro"> Sesión</span>
          </h1>
          {msg && <Alerta alerta={alerta} />}
          <div className="mb-5">
            <center><label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="email"
            >
              Email
            </label></center>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <center><label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="password"
            >
              Contraseña
            </label></center>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-azuloscuro w-full py-3 text-white uppercase font-bold rounded hover:bg-primary transition-colors"
          />
        </form>
      </div>

      <nav className="mt-6 flex flex-col items-center space-y-4">
        <Link
          className="text-secondarytext uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          className="text-secondarytext uppercase text-sm"
          to="/olvide-password"
        >
          Olvidé mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
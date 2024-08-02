import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es obligatorio y debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });
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
    <div className="flex bg-gray-100 justify-center items-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-6">
            <h1 className="text-primary text-3xl font-black">
              Recupera {' '}
              <span className="text-azuloscuro">tu Cuenta</span>
            </h1>
          </div>
          {msg && <Alerta alerta={alerta} />}
          <div className="my-5 text-secondarytext block text-lg font-bold">
            <p>Introduce tu correo electrónico para enviarte las instrucciones para recuperar tu cuenta</p>
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

          <input
            type="submit"
            value="Enviar Instrucciones"
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
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default OlvidePassword;
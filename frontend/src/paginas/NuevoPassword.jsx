import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    };
    comprobarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="flex bg-gray-100 justify-center items-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-sky-600 text-3xl font-black capitalize">
            Restablece tu Password y no pierdas tus {' '}
            <span className="text-slate-700">proyectos</span>
          </h1>
        </div>

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form
            className="bg-white shadow-lg rounded-lg p-8"
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="password"
              >
                Nuevo Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Escribe tu Nuevo Password"
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition-colors"
            />
          </form>
        )}

        {passwordModificado && (
          <div className="text-center mt-6">
            <Link
              className="text-slate-500 uppercase text-sm"
              to="/"
            >
              Inicia Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevoPassword;
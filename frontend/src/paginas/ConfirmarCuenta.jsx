import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    };
    confirmarCuenta();
  }, [id]);

  const { msg } = alerta;

  return (
    <div className="flex bg-gray-100 justify-center items-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-azuloscuro font-black text-3xl capitalize">
            Confirma tu cuenta y comienza a crear tus {' '}
            <span className="text-azuloscuro">proyectos</span>
          </h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          {msg && <Alerta alerta={alerta} />}

          {cuentaConfirmada && (
            <div className="text-center mt-6">
              <Link
                className="text-azuloscuro uppercase text-sm"
                to="/"
              >
                Inicia Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
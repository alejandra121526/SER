import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    // Eliminar el token de autenticación (si estás usando localStorage)
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de inicio
    navigate('/');
  };

  return (
    <header className='bg-white border-b'>
      <div className="flex items-center space-x-10 p-2">
        <img
          src="https://www1.funcionpublica.gov.co/documents/28587425/42384076/logoSena.png/b8131ab9-4c1f-4ef9-8dd4-569d6b7169b6?t=1701956509586"
          alt="Logo SENA"
          className="w-24"
        />
        <h2 className="text-4xl text-azuloscuro font-black">
          SER EMPRENDE RURAL
        </h2>
      </div>

      <div className='flex items-center justify-between bg-azuloscuro p-1'>
        <div className='flex items-center gap-5'>
          <Link 
            to='/InicioSer'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Inicio
          </Link>
          <Link 
            to='/Ruta1'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Ruta 1
          </Link>
          <Link 
            to='/Ruta2'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Ruta 2
          </Link>
          <Link 
            to='/ActualizarDatos'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Actualiza
          </Link>
          <Link 
            to='/ListaProyectos'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Lista Proyectos
          </Link>
          <Link 
            to='/Noticias'
            className="font-bold uppercase text-white p-3 rounded-md hover:bg-primary transition-colors"
          >
            Noticias
          </Link>
        </div>

        <button
          type='button'
          className='text-white text-sm bg-primary p-3 rounded-md uppercase font-bold hover:bg-secondary transition-colors'
          onClick={handleCerrarSesion}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
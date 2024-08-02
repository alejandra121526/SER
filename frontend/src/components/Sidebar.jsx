import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav className="w-32 bg-gray-200 p-1">
    <ul>
      <li className="font-bold">Programas</li>
      <ul className="pl-4">
      <Link 
        to='/InicioSer'
        >SER
    </Link>
      </ul>
    </ul>
  </nav>
  )
}

export default Sidebar
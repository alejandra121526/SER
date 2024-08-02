

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-colorerror to-colorerror' : 
    'from-azuloscuro to-azuloscuro'} bg-gradient-to-br text-center p-3 rounded-xl 
    uppercase text-white font-bold text-sm my-10`}>
    {alerta.msg}
    </div>
  )
}

export default Alerta
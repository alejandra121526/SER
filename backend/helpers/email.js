import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    
    const { email, nombre, token } = datos

    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      });

      // Informacion del email
      const info = await transport.sendMail({
        from: '"UpTask - Comprueba tu Cuenta" <cuentas@uptask.com>',
        to: email,
        text: "Comprueba tu cuenta en Uptask",
        html: `<p>Hola:${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobar en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
        
        <p>Si tu No creaste esta cuenta puedes ignorar el mensaje</p>
         
        `,
        })
}
export const emailOlvidePassword = async (datos) => {
    
  const { email, nombre, token } = datos

  var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Informacion del email
    const info = await transport.sendMail({
      from: '"UpTask - Comprueba tu Cuenta" <cuentas@uptask.com>',
      to: email,
      subject: "Uptask - Reestablece tu Password",
      text: "Reestablece tu  Password de tu cuenta en Uptask",
      html: `<p>Hola:${nombre} has solicitado reestablecer tu password</p>
      <p> Dar click en el siguiente enlace para generar un nuevo password:</p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>
      
      <p>Si tu No solicitaste este email puedes ignorar el mensaje</p>
       
      `,
      })
}
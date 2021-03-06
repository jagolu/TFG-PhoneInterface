import { AlertInfoType } from 'src/app/models/models';

export function getMessage(type:AlertInfoType){
    let msg:string;

    switch(type){
      case AlertInfoType.LOSTCONNECTIONERROR:{
        msg = "Se ha perdido la conexión con el servidor.<br>"+
          "Por favor, revisa tu conexión a internet.";
        break;
      }
      case AlertInfoType.NOTVALIDROLE:{
        msg = "No estas autorizado para acceder a esa funcionalidad.";
        break;
      }
      case AlertInfoType.SERVERERROR:{
        msg = "Ha habido interno del servidor, vuelva a intentarlo más tarde.";
        break;
      }
      case AlertInfoType.VALIDATINGUSERERROR:{
        msg = "Ha habido un error validando los datos, vuelva a intentarlo más tarde.";
        break;
      }
      case AlertInfoType.YOUREBANNED:{
        msg = "No puedes utilizar la plataforma porque estás baneado.<br>"+
          "Deberías tener una notificación en tu correo.";
        break;
      }
      case AlertInfoType.GROUPBANNED:{
        msg = "No puedes utilizar las funciones de este grupo, ha sido bloqueado.<br>"+ 
          "Si crees que es un error con contacta con los administradores de la plataforma.";
        break;
      }
      case AlertInfoType.EMAILTAKENERROR:{
        msg = "El email con el que intenta registrarse ya está registrado";
        break;
      }
      case AlertInfoType.VERIFICATIONSENT:{
        msg = "Su registro se ha casi completado, solo es necesario un paso más.<br>"+
          "Verifique su correo mediante el enlace que se le ha enviado al mismo.";
        break;
      }
      case AlertInfoType.SOCIALERROR:{
        msg = "Ha habido un error con la red social con la que intentabas iniciar sesión<br>"+  
          "Vuelva a intentarlo más tarde.";
        break;
      }
      case AlertInfoType.WRONGEMAILORPASSWORD:{
        msg = "El correo o contraseña introducidos no son correctos.<br>"+ 
          "Vuelva a intentarlo";
        break;
      }
      case AlertInfoType.NOTSOCIALSIGNYET:{
        msg = "El email con el que intentas loguearte no está registrado<br>"+ 
          "Registrate primero.";
        break;
      }
      case AlertInfoType.NOTVALIDATEDYET:{
        msg = "El correo no se ha validado aun, revise su correo.";
        break;
      }
      case AlertInfoType.CANTDELETEACCOUNT:{
        msg = "No se pudo eliminar tu cuenta de usuario.<br>"+ 
            "Vuelva a intentarlo más tarde.";
        break;
      }
      case AlertInfoType.DELETEDACCOUNT:{
        msg = "Sentimos que te vayas.<br>"+
          "Ojalá vuelvas pronto.";
        break;
      }
      case AlertInfoType.SESSIONEXPIRED:{
        msg = "Tu sesión ha expirado.<br>"+ 
          "Vuelva a registrarte";
        break;
      }
      case AlertInfoType.LIMITATIONTIMECREATEGROUP:{
        msg = "No puedes crear más grupos esta semana.<br>"+
        "Si deseas crear más grupos deberás esperar al menos 7 dias.";
        break;
      }
      case AlertInfoType.LIMITATIONCREATEGROUP:{
        msg = "No puedes crear más grupos.<br>"+ 
        "Solo permitimos que cada jugador este en un máximo de 10 grupos."; 
        break;
      }
      case AlertInfoType.INCORRECTOLDPASSWORD:{
        msg = "La contraseña es incorrecta";
        break;
      }
      case AlertInfoType.PASSWORDCHANGED:{
        msg = "Tu contraseña ha cambiado";
        break;
      }
      case AlertInfoType.SUCCESFULLBUY:{
        msg = "Tu compra se ha realizado con exito.";
        break;
      }
      case AlertInfoType.ERRORBUY:{
        msg = "Hubo un error en tu compra.<br>"+
          "IMPLEMNTAR QUE PASA AQUI.";
        break;
      }
      case AlertInfoType.ENABLEDGROUPPASSWORD:{
        msg = "Ya puedes poner una contraseña al grupo.<br>"+ 
          "Dirigete tu o el administrador del grupo a la sección de información del grupo para escribir la nueva contraseña.";
        break;
      }
      case AlertInfoType.INCORRECTPASSWORDJOININGGROUP:{
        msg = "La contraseña que has introducido para unirte al grupo es incorrecta.";
        break;
      }
      case AlertInfoType.SUCCESFULLJOINGROUP:{
        msg = "Enhorabuena, ya formas parte del grupo<br>"+
          "Disfruta y sé respetuoso";
        break;
      }
      case AlertInfoType.SUCCESFULLCREATEDGROUP:{
        msg = "Enhorabuena, has creado tu propio grupo.<br>"+
          "Disfrutalo!";
        break;
      }
      case AlertInfoType.MAXGROUPJOINREACHED:{
        msg = "No puedes unirte al grupo. Has alcanzado el máximo número de grupos a los que puedes añadirte.<br>"+
          "Salte de alguno de ellos o compra más espacios de grupo a los que unirte.";
        break;
      }
      case AlertInfoType.EMAILDONTEXIST:{
        msg = "El email no existe.";
        break;
      }
      case AlertInfoType.CANTCHANGEPASSTODAY:{
        msg = "VirtualBet solo permite realizar la accion de recordar contraseña una vez al dia.<br>"+
          "Prueba una vez pasadas 24 desde que hiciste la anterior solicitud.";
        break;
      }
      case AlertInfoType.SUCCESSPASSWORDEMAIL:{
        msg = "Pronto recibirás un correo para cambiar tu contraseña actual.<br>"+
          "No elimines el correo hasta estar seguro, ya que solo permitimos un cambio de contraseña al día.";
        break;
      }
      case AlertInfoType.SUCCESFULLGROUPREMOVED:{
        msg = "Tu grupo se eliminó correctamente.";
        break;
      }
      case AlertInfoType.SUCCESFULLGROUPLEAVE:{
        msg = "Ya no formas parte del grupo.";
        break;
      }
      case AlertInfoType.SUCCESFULLFOOTBALLBET:{
        msg = "Se ha lanzado correctamente la apuesta deportiva.";
        break;
      }
      case AlertInfoType.BETHIGHERTHANYOURCOINS:{
        msg = "Cuiado, el mínimo de apuesta que has elegido es superior a las monedas que tienes actualmente.<br>"+
          "Si no consigues más monedas no podrás apostar en esta apuesta.";
        break;
      }
      case AlertInfoType.BETCANCELLED:{
        msg = "La apuesta en la que estas intentado apostar, se ha cancelado.";
        break;
      }
      case AlertInfoType.BETENDED:{
        msg = "La apuesta en la que estas intentado apostar, ha terminado.";
        break;
      }
      case AlertInfoType.BETLASTBETPASSED:{
        msg = "El tiempo para participar en esta apuesta ha acabado.";
        break;
      }
      case AlertInfoType.SUCCESFULLDOFOOTBALLBET:{
        msg = "Tu apuesta se ha realizado con exito.";
        break;
      }
      case AlertInfoType.CANCELBETCANCELLED:{
        msg = "No puedes cancelar tu apuesta, el evento de apuesta ha sido cancelado.<br>"+
          "Tus monedas deberían haber sido devueltas";
        break;
      }
      case AlertInfoType.CANCELBETENDED:{
        msg = "No puedes cancelar tu apuesta, el evento de apuesta ha terminado.";
        break;
      }
      case AlertInfoType.CANCELBETLASTBETPASSED:{
        msg = "No puedes cancelar tu apuesta, el tiempo para modificar las apuestas ha terminado.";
        break;
      }
      case AlertInfoType.SUCCESFULLCANCELFOOTBALLBET:{
        msg = "Tu apuesta se ha cancelado con exito. Puedes volver a apostar en el mismo evento de apuesta si lo deseas.<br>"+
          "Algunas monedas de las que apostaste se te habrán devuelto.";
        break;
      }
      case AlertInfoType.DMCREATED:{
        msg = "Conversación de mensajes directos creada, no olvide cerrarla al terminarla.";
        break;
      }
      case AlertInfoType.USERSUCCESFULLYBANNED:{
        msg = "Cuenta de usuario bloqueada con exito.";
        break;
      }
      case AlertInfoType.USERSUCCESFULLYUNBANNED:{
        msg = "Cuenta de usuario desbloqueada con exito.";
        break;
      }
      case AlertInfoType.GROUPSUCCESFULLYBANNED:{
        msg = "Grupo bloqueado con exito.";
        break;
      }
      case AlertInfoType.GROUPSUCCESFULLYUNBANNED:{
        msg = "Grupo desbloqueado con exito.";
        break;
      }
      case AlertInfoType.DELETEREQUEST:{
        msg = "Hace poco nos pediste eliminar la cuenta.<br>"+
          "Como aun no se han borrado los datos completamente, puedes iniciar sesión con normalidad.<br>"+ 
          "Al hacerlo cancelaremos el proceso de eliminación de cuenta.";
        break;
      }
      case AlertInfoType.RECVNOTEXIST:{
        msg = "El usuario con el que intentas crear una conversación directa no existe.";
        break;
      }
      case AlertInfoType.SUCCESSFULLWEEKLYPAYCHANGE:{
        msg = "Pagos semanales cambiados correctamente.<br>"+
              "Las monedas de los miembros del grupo se han ajustado al nuevo pago semanal.";
        break;
      }
      case AlertInfoType.SUCCESSFULLMANAGEPASSWORD:{
        msg = "Contraseña del grupo cambiada correctamente";
        break;
      }
      case AlertInfoType.YOUWEREKICKEDGROUP:{
        msg = "Fuiste expulsado del grupo al que intentas acceder.<br>"+
              "No podrás volver a unirte a el hasta pasados 7 dias";
        break;
      }
      case AlertInfoType.YOUHASLEAVEGROUP:{
        msg = "Dejaste el grupo al que intentas unirte.<br>"+
              "No podrás volver a unirte a el hasta pasados 7 dias";
        break;
      }
      case AlertInfoType.CANTCANCELTHEFOOTBALLBET:{
        msg = "El evento de apuesta que intentas cancelar está asociado a un partido que está en juego o que ya ha terminado.<br>"+
              "Por lo que no podrás cancelar el evento de apuesta";
        break;
      }
      case AlertInfoType.NOTFULLYREGISTER:{
        msg = "Aún no has completado tu registro en la plataforma por lo que no puedes recuperar ninguna contraseña.<br>"+
              "Revisa tu correo electrónico en busca de dicho correo.";
        break;
      }
      default:{
        msg = "";
        break;
      }
    }
    return msg;
  }
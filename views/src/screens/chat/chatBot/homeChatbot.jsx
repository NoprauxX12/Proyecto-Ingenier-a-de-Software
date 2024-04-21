import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#9D2DEB',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#9D2DEB',
  botFontColor: '#fff',
  userBubbleColor: '#0cb3c9',
  userFontColor: '#fff',
};

const ciudadesAntioquia = [
  "abriaqui", "altamira", "amalfi", "angostura", "anori", "anza", "apartado", "aragón", "arboletes", "bajirá", "bellavista", "belmira", "berlin",
  "betulia", "briceño", "builópolis", "buritica", "caicedo", "campamento", "carepa", "carolina", "caucasia", "cañasgordas", "cedeño", "cestillal",
  "chamuscados", "chigorodo", "concordia", "copacabana", "currulao", "caceres", "cordoba", "córdova", "dabeiba", "don matias", "ebejico", "el aro",
  "el bagre", "el brasil", "el carmen", "el cedro", "el oro", "el salto", "el tres", "entrerrios", "frontino", "giraldo", "guadalupe", "guasabra",
  "gómez plata", "güintar", "horizontes", "ituango", "jaiperá", "jardín", "juntas de uramita", "la encarnación", "la granja", "la merced", "la placita",
  "la playa", "labores", "liborina", "llanadas", "llanos de cuiva", "manguruma", "marinilla", "medellin", "murri", "mutatá", "nariño", "necocli",
  "nutibara", "ochali", "olaya", "palmitas", "pavarandocito", "peque", "pueblo nuevo", "puerto antioquia", "puerto berrio", "puerto valdivia",
  "quebrada seca", "quebradona", "remedios", "rioverde", "sabanalarga", "saiza", "san andrés", "san jerónimo", "san jose", "san juan de uraba",
  "san nicolás de titumate", "san pablo", "san pedro", "san pedro de uraba", "santa ana", "santa fe de antioquia", "santa rita", "santa rosa de osos",
  "sevilla", "sopetran", "sucre", "tabacal", "taraza", "toledo", "tonusco arriba", "turbo", "urama", "uramagrande", "uramita", "urrao", "valdivia",
  "vigía del fuerte", "yali", "yarumal"
];

export default class ElQueSabeChatbot extends Component {
  state = {
    showChatbot: false,
    showTooltip: false,
  };

  toggleChatbot = () => {
    this.setState((prevState) => ({
      showChatbot: !prevState.showChatbot,
    }));
  };

  toggleTooltip = () => {
    this.setState((prevState) => ({
      showTooltip: !prevState.showTooltip,
    }));
  };

  handleCityInput = (value) => {
    const ciudad = value.toLowerCase();
    if (ciudadesAntioquia.includes(ciudad)) {
      return 'disponible';
    } else {
      return 'noDisponible';
    }
  };

  render() {
    const { showChatbot, showTooltip } = this.state;

    return (
      <div>
        {showChatbot && (
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={[
                {
                  id: '1',
                  message: '¡Hola! Soy Hugo de El Que Sabe. ¿puedo ayudarte hoy?',
                  trigger: 'ayuda',
                },
                {
                  id: 'ayuda',
                  options: [
                    { value: 'si', label: 'Sí', trigger: 'nombre' },
                    { value: 'no', label: 'No', trigger: 'despedida'},
                  ],
                },
                {
                  id: 'nombre',
                  message: '¿Cómo te llamas?',
                  trigger: 'nombreInput',
                },
                {
                  id: 'nombreInput',
                  user: true,
                  trigger: 'saludoPersonalizado',
                },
                {
                  id: 'saludoPersonalizado',
                  message: '¡Hola {previousValue}! ¿En qué puedo ayudarte hoy?',
                  trigger: 'inicio',
                },
                {
                  id: 'inicio',
                  options: [
                    { value: 'trabajos', label: 'Información sobre trabajos', trigger: 'trabajos' },
                    { value: 'registro', label: 'Registro y cuenta', trigger: 'registro' },
                    { value: 'asistencia', label: 'Asistencia y soporte', trigger: 'asistencia' },
                  ],
                },
                // Trabajos
                {
                  id: 'trabajos',
                  message: '¿Qué te gustaría saber sobre los tipos de trabajos disponibles?',
                  trigger: 'trabajosOptions',
                },
                {
                  id: 'trabajosOptions',
                  options: [
                    { value: 'tipos', label: 'Tipos de trabajos', trigger: 'tiposTrabajos' },
                    { value: 'aplicar', label: 'Cómo aplicar a trabajos', trigger: 'aplicarTrabajos' },
                  ],
                },
                {
                  id: 'tiposTrabajos',
                  message: 'En El Que Sabe puedes encontrar una variedad de trabajos informales, tales como plomeria, carpinteria, mantenimiento etc.',
                  trigger: 'inicio',
                },
                {
                  id: 'aplicarTrabajos',
                  message: 'Para aplicar a trabajos, simplemente revisa las ofertas disponibles en nuestro sitio web y sigue las instrucciones para postularte.',
                  trigger: 'inicio',
                },
                // Registro
                {
                  id: 'registro',
                  message: '¿Necesitas ayuda con el registro y la gestión de tu cuenta?',
                  trigger: 'registroOptions',
                },
                {
                  id: 'registroOptions',
                  options: [
                    { value: 'crearCuenta', label: 'Crear una cuenta', trigger: 'crearCuenta' },
                    { value: 'gestionarCuenta', label: 'Gestionar mi cuenta', trigger: 'gestionarCuenta' },
                  ],
                },
                {
                  id: 'crearCuenta',
                  message: 'Para crear una cuenta, visita nuestra página de inicio y haz clic en el botón "sign up". Luego sigue los pasos para completar tu registro.',
                  trigger: 'inicio',
                },
                {
                  id: 'gestionarCuenta',
                  message: 'Para gestionar tu cuenta, inicia sesión en nuestro sitio web y visita tu perfil de usuario. Desde allí, podrás actualizar tu información personal, cambiar tu contraseña y más.',
                  trigger: 'inicio',
                },
                // Asistencia
                {
                  id: 'asistencia',
                  message: '¿Necesitas asistencia o soporte?',
                  trigger: 'asistenciaOptions',
                },
                {
                  id: 'asistenciaOptions',
                  options: [
                    { value: 'seguridad', label: 'Seguridad y privacidad', trigger: 'seguridad' },
                    { value: 'disponibilidad', label: 'Disponibilidad local', trigger: 'ciudad' },
                    { value: 'otraPregunta', label: 'Otra pregunta', trigger: 'otraPregunta' },
                  ],
                },
                {
                  id: 'seguridad',
                  message: 'La seguridad y la privacidad son fundamentales para nosotros. Utilizamos medidas de seguridad avanzadas para proteger la información de nuestros usuarios y garantizar la seguridad en sus hogares.',
                  trigger: 'inicio',
                },
                {
                  id: 'ciudad',
                  message: 'Por favor, ingresa tu ciudad:',
                  trigger: 'ciudadInput',
                },
                {
                  id: 'ciudadInput',
                  user: true,
                  trigger: ({ value }) => this.handleCityInput(value),
                },
                {
                  id: 'disponible',
                  message: '¡Excelente! Estamos disponibles en tu ciudad. ¿En qué más puedo ayudarte?',
                  trigger: 'inicio',
                },
                {
                  id: 'noDisponible',
                  message: 'Lo siento, actualmente no estamos disponibles en tu ciudad. ¿Hay algo más en lo que pueda ayudarte?',
                  trigger: 'inicio',
                },
                {
                  id: 'otraPregunta',
                  message: 'Lo siento, no tengo una respuesta para esa pregunta. ¿Hay algo más en lo que pueda ayudarte?',
                  trigger: 'inicio',
                },
                {
                  id: 'despedida',
                  message: '¡Gracias por visitar El Que Sabe! Si necesitas ayuda en el futuro, no dudes en volver.',
                  end: true, 
                },
              ]}
              floating
              opened={showChatbot}
              toggleFloating={() => this.toggleChatbot()}
            />
          </ThemeProvider>
        )}
        <button
          style={{
            position: 'fixed',
            bottom: 77,
            right: 20,
            zIndex: 9999,
            background: '#3D00B7',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 50,
            height: 50,
            fontSize: 20,
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            margin:0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={this.toggleChatbot}
          onMouseOver={this.toggleTooltip}
          onMouseOut={this.toggleTooltip}
        >
          {showTooltip && <span style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '5px 10px', borderRadius: 5 }}>Hugo Asistente virtual</span>}
          <FontAwesomeIcon icon={faRobot} style={{margin:0}}/>
        </button>
      </div>
    );
  }
}

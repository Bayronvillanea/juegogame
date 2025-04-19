import { useState } from 'react';
import emailjs from 'emailjs-com';

const EmocionRevelada = () => {
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Categorías y preguntas
  const categories = [
    {
      name: "😢 Melancólicas / Reflexivas",
      questions: [
        "¿Recuerdas ese momento en que pensaste que todo se iba a derrumbar… y aún así seguiste adelante?",
        "¿Cuándo fue la última vez que te abrazaron tan fuerte que sentiste que todo estaba bien?",
        "¿Qué le dirías hoy al niño que alguna vez fuiste?"
      ],
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "😲 Sorpresivas / Curiosas",
      questions: [
        "¿Y si mañana despertaras con la vida de tus sueños, qué sería lo primero que harías?",
        "¿Sabías que tu sonrisa puede estar salvándole el día a alguien ahora mismo?",
        "Si pudieras leer la mente de alguien por 10 segundos… ¿a quién elegirías?"
      ],
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      name: "😤 Intensas / Motivacionales",
      questions: [
        "¿Cuántas veces más vas a subestimarte antes de darte cuenta de lo increíble que eres?",
        "¿Y si el momento en que ibas a rendirte fuera justo antes de lograrlo?",
        "¿Estás viviendo o solo estás sobreviviendo?"
      ],
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "😂 Graciosas / Cotidianas",
      questions: [
        "¿Qué excusa ridícula usaste para no salir de casa la última vez?",
        "¿Alguna vez fingiste estar ocupado solo para no contestarle a alguien? ¿Quién fue? 👀",
        "¿Cuál ha sido tu peor 'momento tierra trágame'? No vale decir 'todos'"
      ],
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      name: "😏 Picaronas / Coquetas",
      questions: [
        "¿Y si esta noche no fuera como todas las demás… te atreverías a romper la rutina? 🔥",
        "¿Tú también tienes ese lado travieso que solo sale cuando nadie está mirando? 😉",
        "¿Cuál es ese secreto tuyo que solo se revela con caricias? 😈",
        "Si tus besos tuvieran un sabor… ¿a qué sabrían? Y no digas 'chicle' 😋",
        "¿En qué parte de tu cuerpo te gusta más que te besen… y por qué justo ahí? 😮‍💨"
      ],
      color: "bg-pink-600 hover:bg-pink-700"
    }
  ];

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const templateParams = {
      name: playerName || 'Anónimo', // Campo NAME agregado
      email: currentQuestion,
      message: playerAnswer,
      to_email: 'bvsoftware.company@gmail.com' // Correo válido
    };

    try {
      await emailjs.send(
        'service_q0stkbe',
        'template_0sgp5pg',
        templateParams,
        'vtBEmVaKqmpXFA2Nd'
      );
      setIsSubmitted(true);
      setPlayerAnswer('');
      setPlayerName('');
    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 animate-pulse">
          🎴 Confesiones Anónimas
          <span className="block text-xl mt-2 font-normal text-gray-300">¡Tu verdad interior revelada!</span>
        </h1>

        {!selectedCategory ? (
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`${category.color} p-8 rounded-xl shadow-2xl transform transition-all 
                  hover:scale-105 hover:rotate-1 duration-300 ease-in-out`}
              >
                <h2 className="text-xl font-bold text-center">{category.name}</h2>
              </button>
            ))}
          </div>
        ) : !currentQuestion ? (
          <div className="text-center space-y-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute left-4 top-4 text-2xl hover:text-yellow-400 transition-colors"
            >
              ↩
            </button>
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {selectedCategory.name}
            </h2>
            <div className="grid gap-4">
              {selectedCategory.questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(question)}
                  className="bg-gray-700 hover:bg-gray-600 p-5 rounded-xl transition-all 
                    hover:translate-x-3 hover:shadow-lg text-left"
                >
                  <span className="text-yellow-400 mr-2">✦</span>{question}
                </button>
              ))}
            </div>
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={handleSubmitAnswer} className="max-w-2xl mx-auto space-y-6">
            <button
              onClick={() => setCurrentQuestion(null)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center"
            >
              ↩ Volver a preguntas
            </button>

            <h2 className="text-2xl font-bold bg-gray-800 p-4 rounded-xl border-l-4 border-yellow-400">
              {currentQuestion}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="¿Cómo quieres que te llamemos? (opcional)"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 
                  focus:border-yellow-400 focus:ring-0 text-white placeholder-gray-400"
              />
              
              <textarea
                placeholder="Escribe tu confesión aquí..."
                value={playerAnswer}
                onChange={(e) => setPlayerAnswer(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 
                  focus:border-yellow-400 focus:ring-0 text-white placeholder-gray-400 h-48"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-4 rounded-xl font-bold text-lg transition-all
                ${isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-yellow-500 hover:bg-yellow-400 transform hover:scale-[1.02]'} 
                flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>🔥 Enviar Confesión Secreta</span>
                  <span className="text-xl">→</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              ¡Confesión Recibida!
            </h2>
            <p className="text-xl text-gray-300">
              Tu respuesta ha sido guardada en nuestro cofre secreto
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentQuestion(null);
                setSelectedCategory(null);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full 
                font-bold hover:scale-105 transition-transform"
            >
              Jugar Otra Vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmocionRevelada;
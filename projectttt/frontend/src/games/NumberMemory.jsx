import { useState, useEffect } from "react"

export default function NumberMemory() {
  // Уровни с разным временем показа
  const levels = {
    easy: { 
      count: 1, 
      name: "Easy", 
      color: "#22c55e", 
      desc: "1 число", 
      time: 2,
      icon: "🌱"
    },
    medium: { 
      count: 3, 
      name: "Medium", 
      color: "#eab308", 
      desc: "3 числа", 
      time: 3,
      icon: "🌿"
    },
    hard: { 
      count: 5, 
      name: "Hard", 
      color: "#f97316", 
      desc: "5 чисел", 
      time: 5,
      icon: "🌳"
    },
    extreme: { 
      count: 10, 
      name: "Extreme", 
      color: "#ef4444", 
      desc: "10 чисел", 
      time: 7,
      icon: "🔥"
    }
  }

  const [difficulty, setDifficulty] = useState("easy")
  const [sequence, setSequence] = useState([])
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)
  const [input, setInput] = useState("")
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(levels.easy.time)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [gameEnded, setGameEnded] = useState(false)

  // Таймер для показа чисел
  useEffect(() => {
    let interval
    if (show && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setShow(false)
      setPlaying(true)
      setGameEnded(false)
      setMessage("")
    }
    return () => clearInterval(interval)
  }, [show, timer])

  // Обновляем таймер при смене сложности
  useEffect(() => {
    setTimer(levels[difficulty].time)
  }, [difficulty])

  // Функция полного сброса игры
  function resetGame() {
    setShow(false)
    setPlaying(false)
    setStep(0)
    setInput("")
    setMessage("")
    setMessageType("")
    setGameEnded(false)
    setSequence([])
  }

  function start() {
    const level = levels[difficulty]
    const length = level.count
    let arr = []
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 901) + 100)
    }
    setSequence(arr)
    setShow(true)
    setPlaying(false)
    setStep(0)
    setInput("")
    setMessage("")
    setMessageType("")
    setGameEnded(false)
    setTimer(level.time)
  }

  function handleSubmit() {
    if (!playing || input === "" || gameEnded) return

    const currentNumber = sequence[step]
    const userNumber = Number(input)

    if (userNumber === currentNumber) {
      // Правильный ответ
      setMessage("✅ Правильно!")
      setMessageType("success")
      
      if (step === sequence.length - 1) {
        // Последнее число - победа!
        setScore(score + 1)
        
        setMessage("🎉 ПОБЕДА! Ты запомнил все числа!")
        setMessageType("win")
        setPlaying(false)
        setGameEnded(true)
        setInput("")
      } else {
        // Переход к следующему числу
        setTimeout(() => {
          setStep(step + 1)
          setInput("")
          setMessage("")
          setMessageType("")
          // Автофокус на инпут
          document.querySelector('input[type="number"]')?.focus()
        }, 500)
      }
    } else {
      // Неправильный ответ - сбрасываем счет в ноль
      setScore(0)
      setMessage(`❌ Неправильно! Правильное число: ${currentNumber}`)
      setMessageType("error")
      setPlaying(false)
      setGameEnded(true)
      setInput("")
    }
  }

  // Обработчик нажатия Enter
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  // Функция для повторной игры
  function playAgain() {
    resetGame()
    // Небольшая задержка чтобы убедиться что всё сброшено
    setTimeout(() => {
      start()
    }, 50)
  }

  // Прогресс в процентах
  const progress = playing ? ((step) / sequence.length) * 100 : 0

  // Цвет сообщения
  const messageColor = {
    success: "#22c55e",
    error: "#ef4444",
    win: "#8b5cf6"
  }[messageType] || "#64748b"

  return (
    <div style={{
      padding: 30,
      fontFamily: 'Arial',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: 20 }}>🧠 Number Memory</h1>
      
      {/* Карточки со статистикой */}
      <div style={{
        display: 'flex',
        gap: 30,
        marginBottom: 30,
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: '6px solid #eab308'
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>⭐ Счет</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: '#eab308' }}>
            {score}
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: `6px solid ${levels[difficulty].color}`
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>
            {levels[difficulty].icon} Уровень
          </div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: levels[difficulty].color }}>
            {levels[difficulty].name}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            {levels[difficulty].desc} · {levels[difficulty].time} сек
          </div>
        </div>
      </div>

      {/* Кнопки уровней */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginBottom: 30,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.entries(levels).map(([key, level]) => (
          <button
            key={key}
            onClick={() => {
              setDifficulty(key)
              resetGame()
            }}
            disabled={playing || show}
            style={{
              background: difficulty === key ? level.color : '#e2e8f0',
              color: difficulty === key ? 'white' : '#000000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 'bold',
              cursor: (playing || show) ? 'not-allowed' : 'pointer',
              opacity: (playing || show) ? 0.5 : 1,
              transition: '0.3s',
              boxShadow: difficulty === key ? `0 4px 6px ${level.color}80` : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>{level.icon}</span>
            {level.name} ({level.count})
          </button>
        ))}
      </div>

      {/* Кнопка Start */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <button
          onClick={start}
          disabled={playing || show}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '15px 50px',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 'bold',
            cursor: (playing || show) ? 'not-allowed' : 'pointer',
            opacity: (playing || show) ? 0.5 : 1,
            transition: '0.3s',
            boxShadow: '0 4px 6px rgba(59,130,246,0.3)'
          }}
        >
          🚀 Начать игру
        </button>
      </div>

      {/* Область показа чисел */}
      {show && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 40,
          borderRadius: 24,
          marginBottom: 30,
          textAlign: 'center',
          boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.5s'
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '10px',
            fontFamily: 'monospace'
          }}>
            {sequence.join('  ')}
          </div>
          
          <div style={{
            marginTop: 20,
            fontSize: 24,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}>
            <span>⏳</span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: 28,
              fontWeight: 'bold'
            }}>
              {timer}с
            </span>
          </div>

          <div style={{
            marginTop: 20,
            height: 8,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(timer / levels[difficulty].time) * 100}%`,
              background: 'white',
              transition: 'width 1s linear',
              borderRadius: 4
            }} />
          </div>
        </div>
      )}

      {/* Область ввода ответов */}
      {playing && !gameEnded && (
        <div style={{
          background: '#f8fafc',
          padding: 30,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          marginBottom: 20
        }}>
          <h3 style={{ color: '#0f172a', marginBottom: 10, textAlign: 'center' }}>
            Число #{step + 1} из {sequence.length}
          </h3>

          {/* Сообщение об ответе */}
          {message && (
            <div style={{
              textAlign: 'center',
              marginBottom: 20,
              padding: '10px',
              borderRadius: 8,
              backgroundColor: messageType === 'success' ? '#f0fdf4' : 
                             messageType === 'error' ? '#fef2f2' : 
                             messageType === 'win' ? '#faf5ff' : '#f8fafc',
              color: messageColor,
              fontSize: 18,
              fontWeight: 'bold',
              animation: 'slideIn 0.3s'
            }}>
              {message}
            </div>
          )}

          {/* Прогресс */}
          <div style={{
            marginBottom: 20,
            height: 8,
            background: '#e2e8f0',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: levels[difficulty].color,
              transition: 'width 0.3s',
              borderRadius: 4
            }} />
          </div>

          <div style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              type="number"
              placeholder="Введи число"
              autoFocus
              style={{
                padding: '15px 20px',
                fontSize: 18,
                border: `2px solid ${messageType === 'success' ? '#22c55e' : 
                                       messageType === 'error' ? '#ef4444' : 
                                       levels[difficulty].color}`,
                borderRadius: 12,
                width: 200,
                outline: 'none',
                fontWeight: 'bold'
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: messageType === 'success' ? '#22c55e' :
                           messageType === 'error' ? '#ef4444' :
                           levels[difficulty].color,
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {messageType === 'success' ? '✓ Принято' :
               messageType === 'error' ? '✗ Ошибка' :
               '✅ Проверить'}
            </button>
          </div>

          {/* Подсказка */}
          <div style={{
            marginTop: 15,
            textAlign: 'center',
            color: '#64748b',
            fontSize: 14
          }}>
            Нажми Enter для быстрой отправки
          </div>
        </div>
      )}

      {/* Сообщение о победе/поражении */}
      {gameEnded && (
        <div style={{
          background: messageType === 'win' ? '#faf5ff' : '#fef2f2',
          padding: 30,
          borderRadius: 16,
          marginBottom: 20,
          textAlign: 'center',
          border: `2px solid ${messageColor}`,
          animation: 'fadeIn 0.5s'
        }}>
          <div style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: messageColor,
            marginBottom: 20
          }}>
            {message}
          </div>
          
          {messageType === 'win' && (
            <div style={{
              fontSize: 48,
              marginBottom: 20
            }}>
              🏆
            </div>
          )}

          {/* Кнопка "Играть еще" */}
          <button
            onClick={playAgain}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 6px rgba(139,92,246,0.3)'
            }}
          >
            🔄 Играть еще
          </button>
        </div>
      )}

      {/* Инструкция */}
      <div style={{
        marginTop: 30,
        padding: 20,
        background: '#f1f5f9',
        borderRadius: 12,
        color: '#475569',
        fontSize: 14,
        textAlign: 'center'
      }}>
        <p>🎯 Запомни числа за отведенное время и введи их по порядку!</p>
        <p>⏱️ Время показа: Easy - 2с | Medium - 3с | Hard - 5с | Extreme - 7с</p>
        <p>⚡ После правильного ответа автоматически переходим к следующему числу!</p>
      </div>

      {/* Анимации */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

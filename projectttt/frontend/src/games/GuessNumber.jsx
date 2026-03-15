import { useState } from "react"

export default function GuessNumber() {
  const [level, setLevel] = useState(9)
  const [target, setTarget] = useState(Math.floor(Math.random() * 9))
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [attempts, setAttempts] = useState(0) // Общее количество попыток в текущей игре
  const [lastNumber, setLastNumber] = useState(null)
  const [hiddenNumber, setHiddenNumber] = useState(null)

  // Уровни сложности
  const levels = {
    easy: { max: 9, name: "Easy", color: "#22c55e", icon: "🌱", desc: "0-9" },
    medium: { max: 25, name: "Medium", color: "#eab308", icon: "🌿", desc: "0-25" },
    hard: { max: 50, name: "Hard", color: "#f97316", icon: "🌳", desc: "0-50" },
    impossible: { max: 100, name: "Impossible", color: "#ef4444", icon: "🔥", desc: "0-100" }
  }

  const start = (max, levelName) => {
    const newTarget = Math.floor(Math.random() * max)
    setLevel(max)
    setTarget(newTarget)
    setInput("")
    setMessage(`🎯 Новое число загадано! Диапазон 0-${max}`)
    setMessageType("info")
    setAttempts(0) // Сбрасываем попытки
    setScore(0)    // Сбрасываем счет
    setLastNumber(null)
    setHiddenNumber(null)
    
    // Фокус на инпут
    setTimeout(() => {
      document.querySelector('input[type="number"]')?.focus()
    }, 100)
  }

  const guess = () => {
    if (input === "") {
      setMessage("⚠️ Введи число!")
      setMessageType("warning")
      return
    }

    const guessNum = Number(input)
    
    if (isNaN(guessNum)) {
      setMessage("⚠️ Введи корректное число!")
      setMessageType("warning")
      return
    }

    if (guessNum < 0 || guessNum > level) {
      setMessage(`⚠️ Число должно быть от 0 до ${level}!`)
      setMessageType("warning")
      return
    }

    // Увеличиваем счетчик попыток
    setAttempts(prev => prev + 1)
    setLastNumber(guessNum)

    if (guessNum === target) {
      // Правильно
      const points = Math.max(1, Math.floor(10 / (attempts + 1)) + (level > 50 ? 5 : 0))
      setScore(prev => prev + points)
      
      setMessage(`✅ ПРАВИЛЬНО! +${points} очков! (попытка #${attempts + 1})`)
      setMessageType("success")
      
      // Генерируем новое число
      const newTarget = Math.floor(Math.random() * level)
      setTarget(newTarget)
      setInput("")
      setMessageType("win")
      setHiddenNumber(null)
      
      setTimeout(() => {
        setMessage(`🎯 Новое число загадано! Диапазон 0-${level}`)
        setMessageType("info")
      }, 1500)
    } else {
      // Неправильно
      const hint = guessNum < target ? "больше" : "меньше"
      setMessage(`❌ Неправильно! Загаданное число ${hint} (попытка #${attempts})`)
      setMessageType("error")
      
      // Сохраняем загаданное число для показа
      setHiddenNumber(target)
      setInput("")
      
      // Показываем правильное число и генерируем новое
      setTimeout(() => {
        setMessage(`💀 Не угадал! Было загадано: ${target}. Пробуй еще!`)
        setMessageType("gameover")
        setHiddenNumber(null)
        // Генерируем новое число для следующей попытки
        const newTarget = Math.floor(Math.random() * level)
        setTarget(newTarget)
      }, 1500)
    }
  }

  // Обработчик нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      guess()
    }
  }

  // Цвет сообщения
  const messageColor = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#eab308",
    info: "#3b82f6",
    win: "#8b5cf6",
    gameover: "#64748b"
  }[messageType] || "#64748b"

  // Фон сообщения
  const messageBg = {
    success: "#f0fdf4",
    error: "#fef2f2",
    warning: "#fefce8",
    info: "#eff6ff",
    win: "#faf5ff",
    gameover: "#f1f5f9"
  }[messageType] || "#f8fafc"

  // Получаем текущий уровень
  const currentLevel = Object.entries(levels).find(([_, l]) => l.max === level)?.[1] || levels.easy

  // Проверка на бесконечность
  const displayScore = isFinite(score) ? score : 0

  return (
    <div style={{
      padding: 30,
      fontFamily: 'Arial',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: 20 }}>🎲 Guess Number</h1>
      
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
            {displayScore}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            растет с каждым правильным ответом
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: '6px solid #8b5cf6'
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>🎯 Попыток</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: '#8b5cf6' }}>
            {attempts}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            всего в этой игре
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: `6px solid ${currentLevel.color}`
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>
            {currentLevel.icon} Уровень
          </div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: currentLevel.color }}>
            {currentLevel.name}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            {currentLevel.desc}
          </div>
        </div>
      </div>

      {/* Кнопки уровней */}
      <div style={{
        display: 'flex',
        gap: 15,
        marginBottom: 30,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.entries(levels).map(([key, level]) => (
          <button
            key={key}
            onClick={() => start(level.max, key)}
            style={{
              background: level.color,
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: `0 4px 6px ${level.color}80`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              minWidth: 150,
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
            }}
          >
            <span>{level.icon}</span>
            {level.name} ({level.desc})
          </button>
        ))}
      </div>

      {/* Сообщение */}
      {message && (
        <div style={{
          backgroundColor: messageBg,
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
          border: `2px solid ${messageColor}`,
          animation: 'slideIn 0.3s',
          textAlign: 'center'
        }}>
          <span style={{
            color: messageColor,
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            {message}
          </span>
        </div>
      )}

      {/* Основная игровая область */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 40,
        borderRadius: 24,
        marginBottom: 30,
        boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 30,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🔍 Угадай число от <span style={{ fontSize: 48 }}>0</span> до <span style={{ fontSize: 48 }}>{level}</span>
        </div>

        {/* Показываем загаданное число если проиграли (на 1.5 секунды) */}
        {hiddenNumber !== null && (
          <div style={{
            color: 'white',
            fontSize: 28,
            marginBottom: 30,
            padding: '20px',
            background: 'rgba(239, 68, 68, 0.3)',
            borderRadius: 16,
            border: '2px solid #ef4444',
            animation: 'pulse 1s'
          }}>
            🔍 Было загадано: <span style={{ fontSize: 48, fontWeight: 'bold' }}>{hiddenNumber}</span>
          </div>
        )}

        {/* Подсказка если было последнее число */}
        {lastNumber !== null && !hiddenNumber && (
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 18,
            marginBottom: 20,
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 8
          }}>
            Последняя попытка: {lastNumber} - {lastNumber < target ? 'нужно больше ↑' : lastNumber > target ? 'нужно меньше ↓' : ''}
          </div>
        )}

        {/* Поле ввода */}
        <div style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            type="number"
            placeholder="Введи число"
            style={{
              padding: '15px 20px',
              fontSize: 24,
              border: 'none',
              borderRadius: 12,
              width: 200,
              outline: 'none',
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'white',
              color: '#0f172a'
            }}
          />
          
          <button
            onClick={guess}
            style={{
              background: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 6px rgba(34,197,94,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)'
              e.target.style.background = '#16a34a'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = '#22c55e'
            }}
          >
            🎯 Угадать
          </button>
        </div>

        {/* Подсказка */}
        <div style={{
          marginTop: 20,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 14
        }}>
          Нажми Enter для быстрой отправки
        </div>
      </div>

      {/* Кнопка новой игры */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => start(level, Object.keys(levels).find(k => levels[k].max === level))}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
            boxShadow: '0 4px 6px rgba(59,130,246,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)'
            e.target.style.background = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.background = '#3b82f6'
          }}
        >
          <span>🔄</span>
          Новая игра (сброс счета и попыток)
        </button>
      </div>

      {/* Правила игры */}
      <div style={{
        marginTop: 30,
        padding: 20,
        background: '#f1f5f9',
        borderRadius: 12,
        color: '#475569',
        fontSize: 14
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>📋 Правила игры:</h4>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>🎯 Угадай загаданное число</li>
          <li>⭐ Счет растет с каждым правильным ответом</li>
          <li>📊 Попытки считают все твои догадки в текущей игре</li>
          <li>🔄 При смене уровня или новой игре - счет и попытки сбрасываются</li>
          <li>💡 После неверного ответа показывается правильное число на 1.5 секунды</li>
          <li>✨ Чем меньше попыток на угадывание, тем больше очков</li>
        </ul>
      </div>

      {/* Анимации */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
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
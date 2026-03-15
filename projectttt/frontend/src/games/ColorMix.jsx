import { useState } from "react"

const colors = [
  { name: "red", bg: "#ef4444", text: "white", emoji: "🔴" },
  { name: "blue", bg: "#3b82f6", text: "white", emoji: "🔵" },
  { name: "yellow", bg: "#eab308", text: "black", emoji: "🟡" },
  { name: "green", bg: "#22c55e", text: "white", emoji: "🟢" },
  { name: "orange", bg: "#f97316", text: "white", emoji: "🟠" },
  { name: "purple", bg: "#a855f7", text: "white", emoji: "🟣" },
  { name: "pink", bg: "#ec4899", text: "white", emoji: "🌸" },
  { name: "brown", bg: "#92400e", text: "white", emoji: "🟤" },
  { name: "black", bg: "#000000", text: "white", emoji: "⚫" },
  { name: "white", bg: "#ffffff", text: "black", emoji: "⚪" },
  { name: "gray", bg: "#6b7280", text: "white", emoji: "🌫️" },
  { name: "cyan", bg: "#06b6d4", text: "white", emoji: "🩵" },
  { name: "magenta", bg: "#d946ef", text: "white", emoji: "💜" },
  { name: "lime", bg: "#84cc16", text: "black", emoji: "💚" },
  { name: "navy", bg: "#1e3a8a", text: "white", emoji: "💙" },
  { name: "lightblue", bg: "#7dd3fc", text: "black", emoji: "🩵" },
  { name: "darkred", bg: "#7f1d1d", text: "white", emoji: "❤️" },
  { name: "darkblue", bg: "#1e3a8a", text: "white", emoji: "💙" },
  { name: "olive", bg: "#3f6212", text: "white", emoji: "🫒" }
]

const mixes = {
  "red+blue": "purple",
  "blue+red": "purple",
  "red+yellow": "orange",
  "yellow+red": "orange",
  "blue+yellow": "green",
  "yellow+blue": "green",
  "red+white": "pink",
  "white+red": "pink",
  "blue+white": "lightblue",
  "white+blue": "lightblue",
  "red+black": "darkred",
  "black+red": "darkred",
  "blue+black": "darkblue",
  "black+blue": "darkblue",
  "yellow+black": "olive",
  "black+yellow": "olive",
  "white+black": "gray",
  "black+white": "gray",
  "red+green": "brown",
  "green+red": "brown",
  "blue+green": "cyan",
  "green+blue": "cyan",
  "red+purple": "magenta",
  "purple+red": "magenta",
  "green+yellow": "lime",
  "yellow+green": "lime",
  "blue+purple": "navy",
  "purple+blue": "navy"
}

export default function ColorMix() {
  const [color1, setColor1] = useState("red")
  const [color2, setColor2] = useState("blue")
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Находим объекты цветов
  const color1Obj = colors.find(c => c.name === color1) || colors[0]
  const color2Obj = colors.find(c => c.name === color2) || colors[0]

  function check() {
    const result = mixes[color1 + "+" + color2]

    if (!result) {
      setMessage(`❌ Эти цвета не смешиваются! Попробуй другую комбинацию`)
      setMessageType("error")
      return
    }

    if (answer.toLowerCase().trim() === result) {
      setMessage(`✅ Правильно! ${color1} + ${color2} = ${result}`)
      setMessageType("success")
      setScore(score + 1) // Увеличиваем счет при правильном ответе
    } else {
      setMessage(`❌ Неправильно! Правильный цвет: ${result}`)
      setMessageType("error")
      setScore(0) // СБРАСЫВАЕМ СЧЕТ ПРИ НЕПРАВИЛЬНОМ ОТВЕТЕ
    }
  }

  function restart() {
    setAnswer("")
    setMessage("")
    setMessageType("")
    // Рандомные цвета при рестарте
    const randomColor1 = colors[Math.floor(Math.random() * 15)].name
    const randomColor2 = colors[Math.floor(Math.random() * 15)].name
    setColor1(randomColor1)
    setColor2(randomColor2)
  }

  function randomMix() {
    // Выбираем случайную комбинацию из mixes
    const keys = Object.keys(mixes)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const [c1, c2] = randomKey.split("+")
    setColor1(c1)
    setColor2(c2)
    setAnswer("")
    setMessage("")
    setMessageType("")
  }

  function swapColors() {
    setColor1(color2)
    setColor2(color1)
    setAnswer("")
    setMessage("")
    setMessageType("")
  }

  // Цвет сообщения
  const messageColor = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6"
  }[messageType] || "#64748b"

  return (
    <div style={{
      padding: 30,
      fontFamily: 'Arial',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: 20 }}>🎨 Color Mix</h1>
      
      {/* Карточки со статистикой */}
      <div style={{
        display: 'flex',
        gap: 30,
        marginBottom: 30,
        flexWrap: 'wrap'
      }}>
        {/* Карточка счета */}
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
          {score === 0 && (
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 5 }}>
              Ошибись и счет обнулится!
            </div>
          )}
        </div>

        {/* Карточка комбинации */}
        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 2,
          minWidth: 300,
          borderLeft: '6px solid #8b5cf6'
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>🎯 Текущая комбинация</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20
          }}>
            {/* Первый цвет */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: color1Obj.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color1Obj.text,
              fontSize: 14,
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              {color1}
            </div>

            <div style={{ fontSize: 32, color: '#94a3b8' }}>+</div>

            {/* Второй цвет */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: color2Obj.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color2Obj.text,
              fontSize: 14,
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              {color2}
            </div>

            <div style={{ fontSize: 32, color: '#94a3b8' }}>=</div>

            {/* ВОПРОС вместо ответа */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: 32,
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              ?
            </div>
          </div>
        </div>
      </div>

      {/* Выбор цветов */}
      <div style={{
        background: '#f8fafc',
        padding: 30,
        borderRadius: 16,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        marginBottom: 20
      }}>
        <div style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 20
        }}>
          {/* Селект первого цвета */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 10, color: '#64748b', fontWeight: 'bold' }}>Цвет 1</div>
            <select 
              value={color1} 
              onChange={e => {
                setColor1(e.target.value)
                setMessage("")
                setMessageType("")
              }}
              style={{
                padding: '12px 20px',
                fontSize: 16,
                borderRadius: 12,
                border: `2px solid ${color1Obj.bg}`,
                backgroundColor: color1Obj.bg,
                color: color1Obj.text,
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none',
                width: 150
              }}
            >
              {colors.slice(0, 15).map(c => (
                <option key={c.name} value={c.name} style={{
                  backgroundColor: c.bg,
                  color: c.text,
                  padding: '10px'
                }}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопка свапа */}
          <button
            onClick={swapColors}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              width: 50,
              height: 50,
              borderRadius: '50%',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(59,130,246,0.3)',
              marginTop: 25
            }}
          >
            🔄
          </button>

          {/* Селект второго цвета */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 10, color: '#64748b', fontWeight: 'bold' }}>Цвет 2</div>
            <select 
              value={color2} 
              onChange={e => {
                setColor2(e.target.value)
                setMessage("")
                setMessageType("")
              }}
              style={{
                padding: '12px 20px',
                fontSize: 16,
                borderRadius: 12,
                border: `2px solid ${color2Obj.bg}`,
                backgroundColor: color2Obj.bg,
                color: color2Obj.text,
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none',
                width: 150
              }}
            >
              {colors.slice(0, 15).map(c => (
                <option key={c.name} value={c.name} style={{
                  backgroundColor: c.bg,
                  color: c.text
                }}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Сообщение о результате */}
        {message && (
          <div style={{
            textAlign: 'center',
            marginBottom: 20,
            padding: '15px',
            borderRadius: 12,
            backgroundColor: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
            color: messageColor,
            fontSize: 18,
            fontWeight: 'bold',
            animation: 'slideIn 0.3s'
          }}>
            {message}
          </div>
        )}

        {/* Поле ввода ответа */}
        <div style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            placeholder="Введи цвет (англ)"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && check()}
            style={{
              padding: '15px 20px',
              fontSize: 18,
              border: `2px solid ${messageType === 'success' ? '#22c55e' : 
                                     messageType === 'error' ? '#ef4444' : 
                                     '#cbd5e1'}`,
              borderRadius: 12,
              width: 250,
              outline: 'none',
              fontWeight: 'bold'
            }}
          />

          <button
            onClick={check}
            style={{
              background: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 6px rgba(34,197,94,0.3)'
            }}
          >
            ✅ Проверить
          </button>
        </div>
      </div>

      {/* Кнопки управления */}
      <div style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20
      }}>
        <button
          onClick={restart}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          🔄 Случайные цвета
        </button>

        <button
          onClick={randomMix}
          style={{
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          🎲 Случайная комбинация
        </button>

        <button
          onClick={() => setShowHint(!showHint)}
          style={{
            background: '#f97316',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          {showHint ? '🙈 Скрыть подсказку' : '💡 Показать подсказку'}
        </button>
      </div>

      {/* Подсказка */}
      {showHint && (
        <div style={{
          background: '#f1f5f9',
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
          animation: 'slideIn 0.3s'
        }}>
          <h4 style={{ color: '#0f172a', marginBottom: 10 }}>📚 Правила смешивания:</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 10
          }}>
            <div style={{ color: '#475569' }}>🔴 + 🔵 = 🟣 (purple)</div>
            <div style={{ color: '#475569' }}>🔴 + 🟡 = 🟠 (orange)</div>
            <div style={{ color: '#475569' }}>🔵 + 🟡 = 🟢 (green)</div>
            <div style={{ color: '#475569' }}>🔴 + ⚪ = 🌸 (pink)</div>
            <div style={{ color: '#475569' }}>🔵 + ⚪ = 🩵 (lightblue)</div>
            <div style={{ color: '#475569' }}>⚫ + ⚪ = 🌫️ (gray)</div>
            <div style={{ color: '#475569' }}>🔴 + ⚫ = ❤️ (darkred)</div>
            <div style={{ color: '#475569' }}>🔵 + ⚫ = 💙 (darkblue)</div>
            <div style={{ color: '#475569' }}>🟡 + ⚫ = 🫒 (olive)</div>
          </div>
        </div>
      )}

      {/* Инструкция */}
      <div style={{
        padding: 20,
        background: '#f1f5f9',
        borderRadius: 12,
        color: '#475569',
        fontSize: 14,
        textAlign: 'center'
      }}>
        <p>🎨 Выбери два цвета и угадай, какой получится при их смешивании!</p>
        <p>⚡ Нажми Enter для быстрой проверки</p>
        <p>⚠️ Ошибка - счет обнуляется! Будь внимателен!</p>
      </div>

      {/* Анимации */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        select option {
          padding: 10px;
        }
      `}</style>
    </div>
  )
}
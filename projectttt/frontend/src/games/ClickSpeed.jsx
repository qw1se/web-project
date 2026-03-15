import { useState, useEffect, useRef } from "react"

export default function ClickSpeed() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(60)
  const [running, setRunning] = useState(false)
  
  // Используем useRef для хранения interval ID
  const intervalRef = useRef(null)

  // Запускаем и останавливаем интервал в зависимости от running
  useEffect(() => {
    if (running && time > 0) {
      // Создаем интервал, который обновляет время каждую секунду
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            // Время вышло
            setRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (!running && intervalRef.current) {
      // Очищаем интервал если игра остановлена
      clearInterval(intervalRef.current)
    }

    // Очистка при размонтировании
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [running])

  // Функция для форматирования времени
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Расчет кликов в секунду
  const clicksPerSecond = time < 60 && count > 0 ? (count / (60 - time)).toFixed(1) : 0

  // Функция старта игры
  const startGame = () => {
    // Очищаем предыдущий интервал если был
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCount(0)
    setTime(60)
    setRunning(true)
  }

  // Функция клика
  const handleClick = () => {
    if (running) {
      setCount(prev => prev + 1)
    }
  }

  return (
    <div style={{
      padding: 30,
      fontFamily: 'Arial',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: 20 }}>🖱️ Click Speed</h1>
      
      <div style={{
        display: 'flex',
        gap: 30,
        marginBottom: 30,
        flexWrap: 'wrap'
      }}>
        {/* Карточка времени */}
        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 200,
          borderLeft: '6px solid #3b82f6'
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>⏱️ Время</div>
          <div style={{ 
            fontSize: 48, 
            fontWeight: 'bold', 
            color: time < 10 ? '#ef4444' : '#3b82f6',
            fontFamily: 'monospace'
          }}>
            {formatTime(time)}
          </div>
          {!running && time === 60 && (
            <div style={{ color: '#94a3b8', marginTop: 10 }}>Нажми Start</div>
          )}
          {!running && time === 0 && (
            <div style={{ color: '#ef4444', marginTop: 10, fontWeight: 'bold' }}>Время вышло!</div>
          )}
        </div>

        {/* Карточка кликов */}
        <div style={{
          background: '#f8fafc',
          padding: 25,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 200,
          borderLeft: '6px solid #eab308'
        }}>
          <div style={{ fontSize: 18, color: '#64748b', marginBottom: 10 }}>🖱️ Клики</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: '#eab308' }}>
            {count}
          </div>
          {running && (
            <div style={{ color: '#94a3b8', marginTop: 10 }}>
              CPS: {clicksPerSecond}
            </div>
          )}
        </div>
      </div>

      {/* Кнопка CLICK - огромная и красивая */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <button 
          disabled={!running} 
          onClick={handleClick}
          style={{
            background: running ? '#3b82f6' : '#e2e8f0',
            color: running ? 'white' : '#94a3b8',
            border: 'none',
            width: 300,
            height: 300,
            borderRadius: '50%',
            fontSize: 48,
            fontWeight: 'bold',
            cursor: running ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: running 
              ? '0 20px 35px rgba(59,130,246,0.4), 0 0 0 8px rgba(59,130,246,0.1)' 
              : 'none',
            transform: running ? 'scale(1)' : 'scale(0.95)',
            animation: running ? 'pulse 2s infinite' : 'none'
          }}
          onMouseEnter={(e) => {
            if (running) {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.background = '#2563eb'
            }
          }}
          onMouseLeave={(e) => {
            if (running) {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = '#3b82f6'
            }
          }}
          onMouseDown={(e) => {
            if (running) {
              e.target.style.transform = 'scale(0.95)'
            }
          }}
          onMouseUp={(e) => {
            if (running) {
              e.target.style.transform = 'scale(1.05)'
            }
          }}
        >
          CLICK!
        </button>
      </div>

      {/* Кнопка Start и статистика */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20
      }}>
        <button 
          onClick={startGame}
          disabled={running}
          style={{
            background: running ? '#e2e8f0' : '#22c55e',
            color: running ? '#94a3b8' : 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 'bold',
            cursor: running ? 'not-allowed' : 'pointer',
            transition: '0.3s',
            boxShadow: running ? 'none' : '0 4px 6px rgba(34,197,94,0.3)'
          }}
        >
          🚀 Start New Game
        </button>

        {!running && time === 0 && (
          <div style={{
            background: '#f8fafc',
            padding: '15px 30px',
            borderRadius: 12,
            fontSize: 18,
            color: '#0f172a',
            fontWeight: 'bold'
          }}>
            Итог: {count} кликов за минуту
            {count > 0 && (
              <span style={{ color: '#64748b', marginLeft: 10, fontSize: 16 }}>
                ({Math.round(count / 0.6)}/мин)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Прогресс-бар времени */}
      {running && (
        <div style={{
          marginTop: 30,
          height: 8,
          background: '#e2e8f0',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(time / 60) * 100}%`,
            background: time < 10 ? '#ef4444' : '#3b82f6',
            transition: 'width 1s linear',
            borderRadius: 4
          }} />
        </div>
      )}

      {/* Анимация пульсации для кнопки */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 20px 35px rgba(59,130,246,0.4), 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 20px 35px rgba(59,130,246,0.6), 0 0 0 15px rgba(59,130,246,0); }
          100% { box-shadow: 0 20px 35px rgba(59,130,246,0.4), 0 0 0 0 rgba(59,130,246,0); }
        }
      `}</style>

      {/* Инструкция */}
      <div style={{
        marginTop: 40,
        padding: 20,
        background: '#f1f5f9',
        borderRadius: 12,
        color: '#475569',
        fontSize: 14,
        textAlign: 'center'
      }}>
        ⚡ Жми на большую кнопку как можно быстрее! У тебя 60 секунд.
      </div>
    </div>
  )
}

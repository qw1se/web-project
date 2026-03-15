import { useState, useEffect } from "react"
import { Line, Scatter } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function randomChoice(arr){return arr[Math.floor(Math.random()*arr.length)]}
function round(num,dec=2){return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)}

// Матрица с черным шрифтом
function MatrixVisual({matrix}){
  if (!matrix) return null

  return (
    <div style={{
      margin: "20px 0",
      padding: "20px",
      backgroundColor: "#f0f9ff",
      borderRadius: "12px",
      border: "2px solid #3b82f6"
    }}>
      <h3 style={{color: '#000000', marginBottom: '15px', fontWeight: 'bold'}}>📊 МАТРИЦА:</h3>
      
      <div style={{display: 'inline-block', backgroundColor: 'white', padding: '10px', borderRadius: '8px'}}>
        {matrix.map((row, i) => (
          <div key={i} style={{display: 'flex', margin: '5px 0'}}>
            {row.map((num, j) => (
              <div key={j} style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #2563eb',
                margin: '2px',
                fontSize: '24px',
                fontWeight: 'bold',
                backgroundColor: 'white',
                color: '#000000', // ЧЕРНЫЙ цвет для цифр
                borderRadius: '4px'
              }}>
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function CoordinateVisual({points}){
  if (!points) return null
  
  const scatterData = {
    datasets: [{
      label: 'Точки',
      data: points.map(p => ({ x: p[0], y: p[1] })),
      backgroundColor: 'red',
      pointRadius: 8,
      pointHoverRadius: 12,
    }]
  }

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: -60,
        max: 60,
        grid: { color: 'rgba(0,0,0,0.1)' },
        ticks: { color: '#000000' } // Черные цифры на осях
      },
      y: {
        min: -60,
        max: 60,
        grid: { color: 'rgba(0,0,0,0.1)' },
        ticks: { color: '#000000' } // Черные цифры на осях
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { 
        callbacks: { 
          label: (ctx) => `(${ctx.raw.x}, ${ctx.raw.y})` 
        },
        titleColor: '#000000',
        bodyColor: '#000000'
      }
    }
  }

  return <Scatter data={scatterData} options={options} />
}

// Генератор примеров
function generateExamples(count=100){
  const examples = {}

  // ============ 1-4 КЛАССЫ ============
  examples["1-4 класс"] = {}
  
  // Сложение
  examples["1-4 класс"]["➕ Сложение (до 20)"] = Array.from({length:count},()=>{
    const a=randomInt(1,20), b=randomInt(1,20);
    return {ex:`${a} + ${b} = ?`, ans: a+b}
  })
  
  examples["1-4 класс"]["➕ Сложение (до 100)"] = Array.from({length:count},()=>{
    const a=randomInt(20,80), b=randomInt(1,19);
    return {ex:`${a} + ${b} = ?`, ans: a+b}
  })
  
  // Вычитание
  examples["1-4 класс"]["➖ Вычитание (до 20)"] = Array.from({length:count},()=>{
    const a=randomInt(10,20), b=randomInt(1,10);
    return {ex:`${a} - ${b} = ?`, ans: a-b}
  })
  
  examples["1-4 класс"]["➖ Вычитание (до 100)"] = Array.from({length:count},()=>{
    const a=randomInt(50,100), b=randomInt(1,49);
    return {ex:`${a} - ${b} = ?`, ans: a-b}
  })
  
  // Умножение
  examples["1-4 класс"]["✖️ Таблица умножения"] = Array.from({length:count},()=>{
    const a=randomInt(2,9), b=randomInt(2,9);
    return {ex:`${a} × ${b} = ?`, ans: a*b}
  })
  
  // Деление
  examples["1-4 класс"]["➗ Деление"] = Array.from({length:count},()=>{
    const a=randomInt(2,9), b=randomInt(2,9);
    const c = a*b;
    return {ex:`${c} ÷ ${a} = ?`, ans: b}
  })
  
  // Скобки
  examples["1-4 класс"]["📦 Примеры со скобками"] = Array.from({length:count},()=>{
    const a=randomInt(2,9), b=randomInt(2,9), c=randomInt(2,9);
    return {ex:`(${a} + ${b}) × ${c} = ?`, ans: (a+b)*c}
  })

  // ============ 5-8 КЛАССЫ ============
  examples["5-8 класс"] = {}
  
  // Отрицательные числа
  examples["5-8 класс"]["➖ Отрицательные числа"] = Array.from({length:count},()=>{
    const a=randomInt(-20,20), b=randomInt(-20,20);
    return {ex:`${a} - ${b} = ?`, ans: a-b}
  })
  
  // Дроби
  examples["5-8 класс"]["🥈 Сложение дробей"] = Array.from({length:count},()=>{
    const a=randomInt(1,8), b=randomInt(2,9), c=randomInt(1,8), d=randomInt(2,9);
    return {ex:`${a}/${b} + ${c}/${d} = ? (до сотых)`, ans: round(a/b + c/d)}
  })
  
  // Проценты
  examples["5-8 класс"]["💯 Проценты"] = Array.from({length:count},()=>{
    const a=randomInt(10,200), p=randomInt(5,50);
    return {ex:`${p}% от ${a} = ?`, ans: round(a * p / 100)}
  })
  
  // Степени
  examples["5-8 класс"]["📐 Степени"] = Array.from({length:count},()=>{
    const a=randomInt(2,5), b=randomInt(2,4);
    return {ex:`${a}^${b} = ?`, ans: Math.pow(a,b)}
  })
  
  // Квадратный корень
  examples["5-8 класс"]["√ Квадратный корень"] = Array.from({length:count},()=>{
    const a=randomInt(2,5);
    return {ex:`√${a*a} = ?`, ans: a}
  })
  
  // Уравнения
  examples["5-8 класс"]["✏️ Простые уравнения"] = Array.from({length:count},()=>{
    const x=randomInt(1,10), a=randomInt(2,5);
    return {ex:`${a}x = ${a*x}`, ans: x}
  })

  // ============ 9-11 КЛАССЫ ============
  examples["9-11 класс"] = {}
  
  // Линейные уравнения
  examples["9-11 класс"]["📈 Линейные уравнения"] = Array.from({length:count},()=>{
    const x=randomInt(-10,10), a=randomInt(1,5), b=randomInt(-10,10);
    return {ex:`${a}x + ${b} = ${a*x + b}`, ans: x}
  })
  
  // Квадратные уравнения
  examples["9-11 класс"]["🔄 Квадратные уравнения"] = Array.from({length:count},()=>{
    const roots = [randomInt(-5,5), randomInt(-5,5)];
    const a=1, b=-(roots[0]+roots[1]), c=roots[0]*roots[1];
    return {ex:`x² ${b>=0?'+':''}${b}x ${c>=0?'+':''}${c} = 0 (больший корень)`, ans: Math.max(...roots)}
  })
  
  // Тригонометрия
  examples["9-11 класс"]["📐 Тригонометрия"] = Array.from({length:count},()=>{
    const angles = [0,30,45,60,90,180];
    const angle = randomChoice(angles);
    const func = randomChoice(['sin', 'cos', 'tan']);
    let val;
    if(func === 'sin') val = Math.sin(angle * Math.PI/180);
    else if(func === 'cos') val = Math.cos(angle * Math.PI/180);
    else val = Math.tan(angle * Math.PI/180);
    return {ex:`${func}(${angle}°) = ? (до сотых)`, ans: round(val)}
  })
  
  // Логарифмы
  examples["9-11 класс"]["📊 Логарифмы"] = Array.from({length:count},()=>{
    const base = randomChoice([2,3,4,5]);
    const power = randomInt(1,4);
    return {ex:`log_${base}(${Math.pow(base,power)}) = ?`, ans: power}
  })

  // ============ ВЫСШАЯ МАТЕМАТИКА ============
  examples["Высшая математика"] = {}
  
  // МАТРИЦЫ
  examples["Высшая математика"]["🔢 Матрицы 2x2"] = Array.from({length:count},()=>{
    const a = randomInt(1,9)
    const b = randomInt(1,9)
    const c = randomInt(1,9)
    const d = randomInt(1,9)
    
    const matrix = [
      [a, b],
      [c, d]
    ]
    
    return {
      ex: "Найдите определитель матрицы:",
      matrix: matrix,
      ans: a*d - b*c
    }
  })
  
  // Координаты
  examples["Высшая математика"]["📍 Координаты точек"] = Array.from({length:count},()=>{
    const p1 = [randomInt(-10,10), randomInt(-10,10)];
    const p2 = [randomInt(-10,10), randomInt(-10,10)];
    return {
      ex: `Расстояние между A(${p1[0]},${p1[1]}) и B(${p2[0]},${p2[1]})`,
      points: [p1, p2],
      ans: round(Math.sqrt((p2[0]-p1[0])**2 + (p2[1]-p1[1])**2))
    }
  })
  
  // Производные
  examples["Высшая математика"]["📈 Производные"] = Array.from({length:count},()=>{
    const a = randomInt(1,5), n = randomInt(2,4);
    return {ex:`f(x) = ${a}x^${n}, f'(2) = ?`, ans: a*n*Math.pow(2,n-1)}
  })
  
  // Интегралы
  examples["Высшая математика"]["∫ Интегралы"] = Array.from({length:count},()=>{
    const a = randomInt(1,5), b = randomInt(1,3);
    return {ex:`∫${a}x dx от 0 до ${b} = ?`, ans: round((a*b*b)/2)}
  })
  
  // Пределы
  examples["Высшая математика"]["🎯 Пределы"] = Array.from({length:count},()=>{
    return {ex:"lim(x→∞) 1/x = ?", ans: 0}
  })

  return examples
}

const allExamples = generateExamples(100)

export default function FastMathUltimate(){
  const [difficulty, setDifficulty] = useState("1-4 класс")
  const [theme, setTheme] = useState("")
  const [example, setExample] = useState(null)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)
  const [running, setRunning] = useState(false)
  const [matrix, setMatrix] = useState(null)
  const [points, setPoints] = useState(null)

  useEffect(() => {
    if(!running) return
    const t = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(t)
  }, [running])

  function generateExample(selectedDifficulty = difficulty) {
    const themes = Object.keys(allExamples[selectedDifficulty])
    const th = randomChoice(themes)
    setTheme(th)
    
    const exList = allExamples[selectedDifficulty][th]
    const ex = randomChoice(exList)
    
    setExample(ex)
    setAnswer("")
    setTimer(0)
    setRunning(true)
    
    setMatrix(ex.matrix || null)
    setPoints(ex.points || null)
  }

  function handleDifficultyChange(newDifficulty) {
    setDifficulty(newDifficulty)
    generateExample(newDifficulty)
  }

  function changeTheme() {
    if (!example) return
    const themes = Object.keys(allExamples[difficulty])
    const otherThemes = themes.filter(t => t !== theme)
    if (otherThemes.length > 0) {
      const newTheme = randomChoice(otherThemes)
      setTheme(newTheme)
      const exList = allExamples[difficulty][newTheme]
      const ex = randomChoice(exList)
      setExample(ex)
      setAnswer("")
      setTimer(0)
      setMatrix(ex.matrix || null)
      setPoints(ex.points || null)
    } else {
      generateExample(difficulty)
    }
  }

  function checkAnswer(){
    if(!example) return
    const correct = example.ans
    const userAnswer = answer.trim()
    
    if(typeof correct === "number"){
      if(Math.abs(Number(userAnswer) - correct) < 0.01){ 
        alert("✅ Правильно! 🎉"); 
        setScore(score + 1) 
      } else { 
        alert("❌ Неправильно! Ответ: " + correct)
      }
    } else {
      if(userAnswer === correct){ 
        alert("✅ Правильно! 🎉"); 
        setScore(score + 1) 
      } else { 
        alert("❌ Неправильно! Ответ: " + correct)
      }
    }
  }

  const difficultyLabels = {
    "1-4 класс": " 1-4 класс",
    "5-8 класс": " 5-8 класс",
    "9-11 класс": " 9-11 класс",
    "Высшая математика": " Высшая математика"
  }

  return (
    <div style={{padding: 30, fontFamily: 'Arial'}}>
      <h1 style={{color: '#2563eb'}}>🚀 Fast Math Ultimate</h1>
      
      <div style={{marginBottom: 30, display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        {Object.keys(allExamples).map(lvl => (
          <button 
            key={lvl} 
            style={{
              background: difficulty === lvl ? "#3b82f6" : "#e2e8f0",
              color: difficulty === lvl ? "white" : "#000000", // Черный текст на кнопках
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => handleDifficultyChange(lvl)}>
            {difficultyLabels[lvl]}
          </button>
        ))}
      </div>

      {example && (
        <div style={{
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 style={{color: '#000000'}}>📚 {theme}</h2> {/* Черный заголовок */}
            <button onClick={changeTheme} style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              🔄 Сменить тему
            </button>
          </div>
          
          {/* САМ ПРИМЕР - черный жирный шрифт */}
          <div style={{
            fontSize: '32px', 
            fontWeight: 'bold', 
            margin: '30px 0',
            color: '#000000', // ЧЕРНЫЙ цвет для примера
            textShadow: '1px 1px 0 rgba(0,0,0,0.1)'
          }}>
            {example?.ex}
          </div>
          
          {matrix && <MatrixVisual matrix={matrix} />}
          
          {points && (
            <div style={{height: '400px', margin: '20px 0'}}>
              <CoordinateVisual points={points}/>
            </div>
          )}

          <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
            <input 
              placeholder="Введи ответ" 
              value={answer} 
              onChange={e => setAnswer(e.target.value)}
              style={{
                flex: 1,
                padding: '15px',
                fontSize: '20px',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                color: '#000000', // Черный текст в инпуте
                fontWeight: 'bold'
              }}
              onKeyPress={e => e.key === 'Enter' && checkAnswer()}
            />
            <button onClick={checkAnswer} style={{
              background: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              ✅ Проверить
            </button>
            <button onClick={() => generateExample(difficulty)} style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              ⏭️ Следующий
            </button>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '30px', 
        display: 'flex', 
        gap: '30px', 
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#000000' // Черный текст для счета и времени
      }}>
        <div>⭐ Счет: <span style={{color: '#eab308'}}>{score}</span></div>
        <div>⏱️ Время: <span style={{color: '#3b82f6'}}>{timer}с</span></div>
      </div>

      {!example && (
        <button onClick={() => generateExample(difficulty)} style={{
          background: '#8b5cf6',
          color: 'white',
          padding: '20px 40px',
          fontSize: '24px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '50px',
          fontWeight: 'bold'
        }}>
          🎮 Начать игру
        </button>
      )}
    </div>
  )
}
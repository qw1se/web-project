import { useState, useEffect, useRef } from "react"

// Предложения по сложности (минимум 50 в каждой категории)
const sentencesByDifficulty = {
  easy: [
    // Легкие (короткие предложения, простые слова)
    { text: "The quick brown fox jumps over the lazy dog", words: 9, chars: 43 },
    { text: "A wizard's job is to vex chumps quickly in fog", words: 10, chars: 47 },
    { text: "Pack my box with five dozen liquor jugs", words: 8, chars: 41 },
    { text: "How vexingly quick daft zebras jump", words: 6, chars: 35 },
    { text: "Bright vixens jump; dozy fowl quack", words: 6, chars: 34 },
    { text: "The five boxing wizards jump quickly", words: 6, chars: 35 },
    { text: "Sphinx of black quartz, judge my vow", words: 7, chars: 34 },
    { text: "Waltz, bad nymph, for quick jigs vex", words: 7, chars: 33 },
    { text: "Glib jocks quiz nymph to vex dwarf", words: 7, chars: 33 },
    { text: "Quick zephyrs blow, vexing daft Jim", words: 6, chars: 33 },
    { text: "Two driven jocks help fax my big quiz", words: 8, chars: 36 },
    { text: "My ex pub quiz crowd gave joy", words: 7, chars: 30 },
    { text: "Fax back Jim's quick zephyr game", words: 6, chars: 31 },
    { text: "Big dwarfs quiz Jack's nymph", words: 5, chars: 27 },
    { text: "Vext coq qui a mauvais gout", words: 7, chars: 26 },
    { text: "The cat sits on the mat", words: 6, chars: 22 },
    { text: "I like to eat pizza every day", words: 7, chars: 27 },
    { text: "She sells sea shells by the sea shore", words: 9, chars: 39 },
    { text: "Peter Piper picked a peck of pickled peppers", words: 8, chars: 45 },
    { text: "How much wood would a woodchuck chuck", words: 8, chars: 38 },
    { text: "Betty bought some bitter butter", words: 5, chars: 31 },
    { text: "Fuzzy Wuzzy was a bear", words: 5, chars: 22 },
    { text: "Red lorry, yellow lorry", words: 4, chars: 22 },
    { text: "Unique New York", words: 3, chars: 13 },
    { text: "Irish wristwatch", words: 2, chars: 16 },
    { text: "Toy boat", words: 2, chars: 7 },
    { text: "Four fine fresh fish for you", words: 7, chars: 27 },
    { text: "Greek grapes", words: 2, chars: 11 },
    { text: "Crisp crusts crackle crunch", words: 3, chars: 25 },
    { text: "Black bug's blood", words: 3, chars: 16 },
    { text: "I saw Susie sitting in a shoeshine shop", words: 9, chars: 40 },
    { text: "Sheep should sleep in a shed", words: 7, chars: 26 },
    { text: "Six slippery snails slid slowly seaward", words: 6, chars: 38 },
    { text: "Nine nice night nurses nursing nicely", words: 6, chars: 37 },
    { text: "Three free throws", words: 3, chars: 16 },
    { text: "Fresh fried fish", words: 3, chars: 15 },
    { text: "Which witch is which", words: 4, chars: 19 },
    { text: "Six sick hicks nick six slick bricks", words: 8, chars: 36 },
    { text: "I slit the sheet", words: 4, chars: 16 },
    { text: "Eddie edited it", words: 3, chars: 14 },
    { text: "Willie's really weary", words: 3, chars: 20 },
    { text: "Plague-bearing prairie dogs", words: 3, chars: 26 },
    { text: "Ruby Rugby's brother bought", words: 4, chars: 25 },
    { text: "Bobby brings bright bells", words: 4, chars: 23 },
    { text: "Drew Dodd's dad's dog's dead", words: 6, chars: 25 },
    { text: "Frank's father fried five franks", words: 5, chars: 29 },
    { text: "Gail's girl giggle and growl", words: 5, chars: 27 },
    { text: "Helen has her hat on her head", words: 8, chars: 29 },
    { text: "Ike ships ice chips in ice chips ships", words: 8, chars: 37 },
    { text: "Jim Jones jumps joyfully", words: 3, chars: 23 },
    { text: "Ken's cat caught a cold", words: 5, chars: 22 },
    { text: "Larry's lizard likes leaping", words: 4, chars: 28 }
  ],
  
  medium: [
    // Средние (более длинные предложения)
    { text: "When zombies arrive, quickly fax Judge Pat about the mysterious creatures", words: 10, chars: 69 },
    { text: "We promptly judged antique ivory buckles for the next prize exhibition", words: 10, chars: 66 },
    { text: "Crazy Fredrick bought many very exquisite opal jewels from the shop", words: 11, chars: 64 },
    { text: "Jaded zombies acted quaintly but kept driving their oxen forward", words: 10, chars: 60 },
    { text: "A quick movement of the enemy will jeopardize six gunboats", words: 11, chars: 61 },
    { text: "All questions asked by five watched experts amaze the judge", words: 11, chars: 60 },
    { text: "The quick brown fox jumps over the lazy dog near the river", words: 12, chars: 58 },
    { text: "Pack my box with five dozen liquor jugs and send them now", words: 12, chars: 58 },
    { text: "How vexingly quick daft zebras jump over sleeping cats", words: 9, chars: 52 },
    { text: "The five boxing wizards jump quickly and punch very hard", words: 10, chars: 55 },
    { text: "While making deep excavations we found some rare bronze artifacts", words: 9, chars: 62 },
    { text: "The crumbling ruins of the ancient castle stood on the hill", words: 12, chars: 62 },
    { text: "A mysterious figure emerged from the shadows of the night", words: 11, chars: 57 },
    { text: "The scientist conducted experiments with various chemical compounds", words: 7, chars: 62 },
    { text: "Exploring the dense jungle required careful planning and preparation", words: 8, chars: 63 },
    { text: "The orchestra performed a magnificent symphony at the concert hall", words: 9, chars: 65 },
    { text: "Astronomers discovered a new galaxy using advanced telescopes", words: 7, chars: 55 },
    { text: "The detective carefully examined the crime scene for clues", words: 10, chars: 56 },
    { text: "Chefs from around the world gathered for the culinary competition", words: 9, chars: 64 },
    { text: "The mountaineers prepared for their challenging expedition to the summit", words: 8, chars: 68 },
    { text: "Renowned artists displayed their masterpieces at the prestigious gallery", words: 8, chars: 68 },
    { text: "The ancient manuscript contained secrets that puzzled historians", words: 8, chars: 60 },
    { text: "Marine biologists studied the behavior of dolphins in the wild", words: 9, chars: 62 },
    { text: "The architect designed an innovative building with sustainable materials", words: 8, chars: 67 },
    { text: "Philosophers debated the nature of consciousness for centuries", words: 7, chars: 58 },
    { text: "The pilot navigated through the storm with exceptional skill", words: 9, chars: 58 },
    { text: "Archaeologists unearthed a remarkable tomb filled with treasures", words: 7, chars: 62 },
    { text: "The mathematician solved a complex equation that baffled others", words: 8, chars: 62 },
    { text: "Volunteers worked tirelessly to help the community after the flood", words: 9, chars: 66 },
    { text: "The novelist spent years writing her epic fantasy trilogy", words: 9, chars: 55 },
    { text: "Engineers developed a revolutionary technology to clean the oceans", words: 8, chars: 64 },
    { text: "The garden was filled with colorful flowers and fragrant herbs", words: 10, chars: 60 },
    { text: "Musicians practiced diligently for their upcoming world tour", words: 7, chars: 54 },
    { text: "The photographer captured stunning images of the northern lights", words: 8, chars: 62 },
    { text: "Explorers ventured into the uncharted territory seeking adventure", words: 7, chars: 62 },
    { text: "The chef prepared an exquisite meal using fresh local ingredients", words: 9, chars: 64 },
    { text: "Athletes trained rigorously for the upcoming Olympic games", words: 7, chars: 52 },
    { text: "The historian wrote a comprehensive book about ancient civilizations", words: 8, chars: 65 },
    { text: "Scientists developed a vaccine that saved millions of lives", words: 9, chars: 56 },
    { text: "The artist painted a beautiful mural on the city wall", words: 10, chars: 53 },
    { text: "Teachers inspired their students to pursue their dreams", words: 7, chars: 49 },
    { text: "The entrepreneur built a successful company from scratch", words: 7, chars: 52 },
    { text: "Farmers worked from dawn to dusk harvesting their crops", words: 8, chars: 51 },
    { text: "The writer published her first novel at the age of sixty", words: 11, chars: 58 },
    { text: "Astronauts trained for years before their mission to space", words: 8, chars: 55 },
    { text: "The musician composed a beautiful melody that touched hearts", words: 8, chars: 60 },
    { text: "Researchers made a breakthrough in cancer treatment research", words: 7, chars: 59 },
    { text: "The explorer discovered ancient ruins deep in the jungle", words: 8, chars: 53 },
    { text: "Volcanologists studied the eruption patterns of the active volcano", words: 7, chars: 65 },
    { text: "The dancer performed with grace and elegance on the stage", words: 10, chars: 58 }
  ],
  
  hard: [
    // Сложные (длинные предложения, сложные слова)
    { text: "The mysterious disappearance of the ancient civilization puzzled archaeologists for decades", words: 10, chars: 92 },
    { text: "Extraordinary claims require extraordinary evidence, as the famous scientist often remarked", words: 11, chars: 92 },
    { text: "The intricate machinery of the vintage clockwork required meticulous restoration by experts", words: 10, chars: 90 },
    { text: "Philosophical discussions about the nature of consciousness have continued for millennia", words: 8, chars: 84 },
    { text: "The breathtaking panoramic view from the mountain summit left everyone speechless", words: 9, chars: 78 },
    { text: "Revolutionary technological advancements transformed communication across the entire planet", words: 8, chars: 80 },
    { text: "The complex mathematical theorem challenged even the brightest minds in academia", words: 10, chars: 78 },
    { text: "Environmental conservation efforts require global cooperation and immediate action", words: 7, chars: 75 },
    { text: "The extraordinarily talented musician performed with unprecedented virtuosity", words: 7, chars: 74 },
    { text: "Archaeological excavations revealed fascinating artifacts from prehistoric times", words: 7, chars: 74 },
    { text: "The philosophical implications of artificial intelligence raise profound questions", words: 8, chars: 75 },
    { text: "Quantum physics challenges our understanding of reality at the most fundamental level", words: 11, chars: 86 },
    { text: "The magnificent cathedral featured intricate Gothic architecture and stained glass", words: 9, chars: 80 },
    { text: "Understanding human consciousness remains one of science's greatest challenges", words: 8, chars: 71 },
    { text: "The diplomatic negotiations required careful consideration of multiple perspectives", words: 8, chars: 79 },
    { text: "Astronomical observations revealed previously unknown details about distant galaxies", words: 8, chars: 80 },
    { text: "The psychological impact of social media on young people requires study", words: 11, chars: 72 },
    { text: "Climate change represents an unprecedented challenge for future generations", words: 8, chars: 73 },
    { text: "The economic implications of global trade agreements affect everyone", words: 8, chars: 66 },
    { text: "Medical researchers discovered promising treatments for previously incurable diseases", words: 8, chars: 80 },
    { text: "The architectural masterpiece combined modern design with traditional elements", words: 8, chars: 74 },
    { text: "Understanding cultural differences is essential for international business success", words: 8, chars: 77 },
    { text: "The historical significance of ancient manuscripts cannot be overstated", words: 8, chars: 68 },
    { text: "Technological innovation continues to accelerate at an unprecedented pace", words: 8, chars: 68 },
    { text: "The philosophical debate between free will and determinism continues", words: 8, chars: 64 },
    { text: "Scientific progress depends on collaboration between researchers worldwide", words: 7, chars: 70 },
    { text: "The environmental impact of industrial activities requires immediate attention", words: 8, chars: 72 },
    { text: "Understanding quantum mechanics requires a fundamental shift in thinking", words: 9, chars: 70 },
    { text: "The artistic movement challenged conventional notions of beauty and meaning", words: 9, chars: 73 },
    { text: "Economic inequality remains one of society's most pressing challenges", words: 8, chars: 68 },
    { text: "The complexity of biological systems continues to amaze researchers", words: 8, chars: 63 },
    { text: "Exploring the depths of the ocean reveals extraordinary life forms", words: 10, chars: 67 },
    { text: "The human brain's capacity for learning and adaptation is remarkable", words: 9, chars: 70 },
    { text: "Understanding the origins of the universe drives scientific inquiry", words: 9, chars: 66 },
    { text: "The delicate balance of ecosystems requires careful preservation efforts", words: 8, chars: 69 },
    { text: "Revolutionary ideas often face resistance before gaining widespread acceptance", words: 8, chars: 73 },
    { text: "The pursuit of knowledge has driven human progress throughout history", words: 10, chars: 69 },
    { text: "Understanding historical context is crucial for interpreting ancient texts", words: 8, chars: 70 },
    { text: "The intricate dance of subatomic particles defies classical physics", words: 9, chars: 66 },
    { text: "Philosophical inquiry explores fundamental questions about existence", words: 7, chars: 63 },
    { text: "The evolution of human language remains a fascinating mystery", words: 9, chars: 60 },
    { text: "Consciousness studies bridge the gap between science and philosophy", words: 8, chars: 68 },
    { text: "The interpretation of dreams has fascinated psychologists for centuries", words: 8, chars: 70 },
    { text: "Understanding the nature of time challenges our perception of reality", words: 10, chars: 70 },
    { text: "The relationship between mind and body has puzzled thinkers forever", words: 9, chars: 64 },
    { text: "Exploring parallel universes remains purely theoretical at this point", words: 8, chars: 65 },
    { text: "The concept of infinity has fascinated mathematicians for millennia", words: 8, chars: 64 },
    { text: "Understanding dark matter is one of cosmology's greatest challenges", words: 8, chars: 67 },
    { text: "The mysteries of the deep ocean continue to surprise scientists", words: 9, chars: 62 },
    { text: "Artificial intelligence raises profound questions about consciousness", words: 7, chars: 65 },
    { text: "The future of human civilization depends on sustainable development", words: 8, chars: 65 },
    { text: "Understanding genetic code has revolutionized modern medicine", words: 7, chars: 58 },
    { text: "The search for extraterrestrial life continues to captivate humanity", words: 8, chars: 66 },
    { text: "Exploring virtual reality blurs the line between real and imagined", words: 10, chars: 69 }
  ]
}

export default function KeyPressSpeed() {
  const [difficulty, setDifficulty] = useState("easy")
  const [currentSentence, setCurrentSentence] = useState(null)
  const [input, setInput] = useState("")
  const [start, setStart] = useState(null)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [result, setResult] = useState(null)
  const [stats, setStats] = useState({
    totalChars: 0,
    correctChars: 0,
    errors: 0,
    accuracy: 0,
    wpm: 0,
    cps: 0
  })
  
  const textareaRef = useRef(null)

  // Цвета для сложности
  const difficultyColors = {
    easy: "#22c55e",
    medium: "#eab308",
    hard: "#ef4444"
  }

  // Иконки для сложности
  const difficultyIcons = {
    easy: "🌱",
    medium: "🌿",
    hard: "🔥"
  }

  // Названия сложности
  const difficultyNames = {
    easy: "Легкий",
    medium: "Средний",
    hard: "Сложный"
  }

  // Функция для получения случайного предложения по сложности
  const getRandomSentence = () => {
    const sentences = sentencesByDifficulty[difficulty]
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }

  // Инициализация первого предложения
  useEffect(() => {
    setCurrentSentence(getRandomSentence())
  }, [])

  const startGame = () => {
    setCurrentSentence(getRandomSentence()) // Новое предложение при старте
    setInput("")
    setStart(Date.now())
    setIsPlaying(true)
    setResult(null)
    setStats({
      totalChars: 0,
      correctChars: 0,
      errors: 0,
      accuracy: 0,
      wpm: 0,
      cps: 0
    })
    
    // Фокус на текстовое поле
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const finish = () => {
    if (!start || !isPlaying || !currentSentence) return
    
    const endTime = Date.now()
    const t = (endTime - start) / 1000
    setTime(t)
    
    // Подсчет ошибок
    let errors = 0
    let correct = 0
    const sentenceText = currentSentence.text
    const minLength = Math.min(sentenceText.length, input.length)
    
    for (let i = 0; i < sentenceText.length; i++) {
      if (i < input.length) {
        if (sentenceText[i] === input[i]) {
          correct++
        } else {
          errors++
        }
      } else {
        errors++ // Недостающие символы считаем ошибками
      }
    }
    
    // Если ввели больше символов чем нужно - тоже ошибки
    if (input.length > sentenceText.length) {
      errors += (input.length - sentenceText.length)
    }
    
    const totalChars = sentenceText.length
    const accuracy = totalChars > 0 ? Math.round((correct / totalChars) * 100) : 0
    
    // Расчет WPM (слов в минуту)
    const words = sentenceText.split(' ').length
    const minutes = t / 60
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0
    
    // Расчет символов в секунду
    const cps = t > 0 ? (input.length / t).toFixed(1) : 0
    
    setStats({
      totalChars,
      correctChars: correct,
      errors,
      accuracy,
      wpm,
      cps
    })
    
    setResult({
      time: t.toFixed(2),
      errors
    })
    
    setIsPlaying(false)
  }

  // Автоматический подсчет прогресса во время печати
  useEffect(() => {
    if (isPlaying && start && input.length > 0 && currentSentence) {
      const currentTime = (Date.now() - start) / 1000
      setTime(currentTime)
    }
  }, [input, isPlaying, start, currentSentence])

  // Смена сложности
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty)
    setCurrentSentence(sentencesByDifficulty[newDifficulty][0])
    setInput("")
    setIsPlaying(false)
    setResult(null)
  }

  if (!currentSentence) return null

  const sentence = currentSentence.text

  return (
    <div style={{
      padding: 30,
      fontFamily: 'Arial',
      maxWidth: 1000,
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: 20 }}>⌨️ KeyPress Speed</h1>
      
      {/* Кнопки выбора сложности - ИСПРАВЛЕНО: убрано количество фраз */}
      <div style={{
        display: 'flex',
        gap: 15,
        marginBottom: 30,
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {Object.entries(difficultyNames).map(([key, name]) => (
          <button
            key={key}
            onClick={() => changeDifficulty(key)}
            disabled={isPlaying}
            style={{
              background: difficulty === key ? difficultyColors[key] : '#e2e8f0',
              color: difficulty === key ? 'white' : '#000000',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              opacity: isPlaying ? 0.5 : 1,
              transition: '0.3s',
              boxShadow: difficulty === key ? `0 4px 6px ${difficultyColors[key]}80` : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            <span>{difficultyIcons[key]}</span>
            {name}
          </button>
        ))}
      </div>

      {/* Карточки со статистикой */}
      <div style={{
        display: 'flex',
        gap: 20,
        marginBottom: 30,
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#f8fafc',
          padding: 20,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: '6px solid #3b82f6'
        }}>
          <div style={{ fontSize: 16, color: '#64748b', marginBottom: 5 }}>⏱️ Время</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#3b82f6' }}>
            {time.toFixed(1)}с
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 20,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: '6px solid #8b5cf6'
        }}>
          <div style={{ fontSize: 16, color: '#64748b', marginBottom: 5 }}>📊 Точность</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#8b5cf6' }}>
            {stats.accuracy}%
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 20,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: '6px solid #22c55e'
        }}>
          <div style={{ fontSize: 16, color: '#64748b', marginBottom: 5 }}>⚡ WPM</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#22c55e' }}>
            {stats.wpm}
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: 20,
          borderRadius: 16,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          flex: 1,
          minWidth: 150,
          borderLeft: `6px solid ${difficultyColors[difficulty]}`
        }}>
          <div style={{ fontSize: 16, color: '#64748b', marginBottom: 5 }}>
            {difficultyIcons[difficulty]} Сложность
          </div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: difficultyColors[difficulty] }}>
            {difficultyNames[difficulty]}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            {currentSentence.words} слов · {currentSentence.chars} симв
          </div>
        </div>
      </div>

      {/* Предложение для печати */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 30,
        borderRadius: 24,
        marginBottom: 30,
        boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 10,
          right: 20,
          background: 'rgba(255,255,255,0.2)',
          padding: '5px 15px',
          borderRadius: 20,
          color: 'white',
          fontSize: 14
        }}>
          Фраза {sentencesByDifficulty[difficulty].findIndex(s => s.text === sentence) + 1} из {sentencesByDifficulty[difficulty].length}
        </div>
        
        <p style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          lineHeight: 1.6,
          margin: 0,
          fontFamily: 'monospace',
          wordBreak: 'break-word'
        }}>
          {sentence.split('').map((char, index) => {
            let color = 'white'
            if (index < input.length) {
              color = input[index] === char ? '#4ade80' : '#f87171'
            }
            return (
              <span key={index} style={{ color }}>
                {char}
              </span>
            )
          })}
        </p>

        {/* Прогресс-бар */}
        <div style={{
          marginTop: 20,
          height: 6,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 3,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(input.length / sentence.length) * 100}%`,
            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
            transition: 'width 0.1s',
            borderRadius: 3
          }} />
        </div>
      </div>

      {/* Кнопки управления */}
      <div style={{
        display: 'flex',
        gap: 20,
        marginBottom: 30,
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={startGame}
          disabled={isPlaying}
          style={{
            background: isPlaying ? '#e2e8f0' : '#22c55e',
            color: isPlaying ? '#94a3b8' : 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            transition: '0.3s',
            boxShadow: isPlaying ? 'none' : '0 4px 6px rgba(34,197,94,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span>🚀</span>
          {isPlaying ? 'Идет игра...' : 'Новая игра'}
        </button>

        <button
          onClick={finish}
          disabled={!isPlaying || input.length === 0}
          style={{
            background: (!isPlaying || input.length === 0) ? '#e2e8f0' : '#8b5cf6',
            color: (!isPlaying || input.length === 0) ? '#94a3b8' : 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: (!isPlaying || input.length === 0) ? 'not-allowed' : 'pointer',
            transition: '0.3s',
            boxShadow: (!isPlaying || input.length === 0) ? 'none' : '0 4px 6px rgba(139,92,246,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span>🏁</span>
          Завершить
        </button>

        <button
          onClick={() => {
            if (!isPlaying) {
              setCurrentSentence(getRandomSentence())
              setInput("")
              setResult(null)
            }
          }}
          disabled={isPlaying}
          style={{
            background: isPlaying ? '#e2e8f0' : '#3b82f6',
            color: isPlaying ? '#94a3b8' : 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            transition: '0.3s',
            boxShadow: isPlaying ? 'none' : '0 4px 6px rgba(59,130,246,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span>🔄</span>
          Другая фраза
        </button>
      </div>

      {/* Текстовое поле */}
      <div style={{
        background: '#f8fafc',
        padding: 30,
        borderRadius: 16,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        marginBottom: 20
      }}>
        <textarea
          ref={textareaRef}
          rows="4"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={isPlaying ? "Начинай печатать..." : "Нажми 'Новая игра' чтобы начать"}
          disabled={!isPlaying}
          style={{
            width: '100%',
            padding: 20,
            fontSize: 18,
            fontFamily: 'monospace',
            border: `3px solid ${isPlaying ? '#3b82f6' : '#e2e8f0'}`,
            borderRadius: 12,
            outline: 'none',
            resize: 'none',
            backgroundColor: isPlaying ? 'white' : '#f1f5f9',
            color: isPlaying ? '#0f172a' : '#94a3b8',
            transition: '0.3s',
            lineHeight: 1.6
          }}
        />

        {/* Статистика в реальном времени */}
        {isPlaying && input.length > 0 && (
          <div style={{
            marginTop: 15,
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: '#e2e8f0',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              color: '#475569'
            }}>
              ⏱️ {time.toFixed(1)}с
            </div>
            <div style={{
              background: '#e2e8f0',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              color: '#475569'
            }}>
              📝 {input.length}/{sentence.length} симв
            </div>
            <div style={{
              background: '#e2e8f0',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              color: '#475569'
            }}>
              ⌨️ {(input.length / time).toFixed(1)} симв/с
            </div>
            <div style={{
              background: '#e2e8f0',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              color: '#475569'
            }}>
              🎯 {Math.round((input.split('').filter((c, i) => c === sentence[i]).length / input.length) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Результаты */}
      {result && (
        <div style={{
          background: result.errors === 0 ? '#f0fdf4' : '#fef2f2',
          padding: 30,
          borderRadius: 16,
          border: `2px solid ${result.errors === 0 ? '#22c55e' : '#ef4444'}`,
          animation: 'fadeIn 0.5s',
          marginBottom: 20
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: 64 }}>
              {result.errors === 0 ? '🏆' : result.errors < 3 ? '👍' : '😅'}
            </div>
            
            <div>
              <h3 style={{ 
                color: result.errors === 0 ? '#22c55e' : '#ef4444',
                margin: '0 0 15px 0',
                fontSize: 28
              }}>
                {result.errors === 0 ? 'ИДЕАЛЬНО! Без ошибок!' : 
                 result.errors < 3 ? 'Хороший результат!' : 'Есть над чем работать'}
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
                minWidth: 400
              }}>
                <div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>Время</div>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a' }}>
                    {result.time}с
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>Ошибки</div>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ef4444' }}>
                    {result.errors}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>Точность</div>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#8b5cf6' }}>
                    {stats.accuracy}%
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>WPM</div>
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: '#22c55e' }}>
                    {stats.wpm}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Инструкция */}
      <div style={{
        marginTop: 20,
        padding: 20,
        background: '#f1f5f9',
        borderRadius: 12,
        color: '#475569',
        fontSize: 14,
        textAlign: 'center'
      }}>
        <p>⌨️ Выбери сложность и нажми "Новая игра" чтобы начать печатать</p>
        <p>🎯 Цвет букв меняется: <span style={{color: '#4ade80'}}>зеленый</span> - правильно, <span style={{color: '#f87171'}}>красный</span> - ошибка</p>
        <p>📊 WPM (Words Per Minute) - количество слов в минуту</p>
        <p>📚 В каждой сложности более 50 разных фраз - всегда новые!</p>
      </div>

      {/* Анимации */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea:focus {
          box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
        }
      `}</style>
    </div>
  )
}
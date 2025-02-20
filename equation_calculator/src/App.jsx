import './App.css'
import { useState } from 'react'

const App = () => {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [method, setMethod] = useState('discriminant')
  const [solution, setSolution] = useState('')
  const [equation, setEquation] = useState('')

  const solveEquation = () => {
    const aNum = parseFloat(a)
    const bNum = parseFloat(b)
    const cNum = parseFloat(c)

    // Проверка на некорректные данные
    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setSolution('Пожалуйста, введите корректные числа для коэффициентов a, b и c.')
      return
    }

    let solutionText = ''
    setEquation(`${aNum}x² + ${bNum}x + ${cNum} = ?`)

    if (method === 'discriminant') {
      const discriminant = bNum * bNum - 4 * aNum * cNum
      if (discriminant > 0) {
        const x1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum)
        const x2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum)
        solutionText = `Корни уравнения: x1 = ${x1}, x2 = ${x2}`
      } else if (discriminant === 0) {
        const x = -bNum / (2 * aNum)
        solutionText = `Уравнение имеет один корень: x = ${x}`
      } else {
        solutionText = 'Уравнение не имеет действительных корней'
      }
    } else if (method === 'vieta') {
      const sum = -bNum / aNum
      const product = cNum / aNum
      solutionText = `Сумма корней (по Виету): x1 + x2 = ${sum},<br> Произведение корней: x1 * x2 = ${product}`
    }

    setSolution(solutionText)
  }

  return (
    <div className="app">
      <header>
        <h2>Калькулятор квадратных уравнений</h2>
      </header>
      <form id="quadratic-form">
        <label>
          <input type="number" value={a} onChange={e => setA(e.target.value)}/>
        </label>
        <label>
          <input type="number" value={b} onChange={e => setB(e.target.value)}/>
        </label>
        <label>
          <input type="number" value={c} onChange={e => setC(e.target.value)}/>
        </label>
        <button className="btn" type="button" onClick={solveEquation}>Решить уравнение</button>
      </form>

      <div className="method">
        <p>Метод решения:</p>
        <select className="input-field " id="method" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="discriminant">Дискриминант</option>
          <option value="vieta">Теорема Виета</option>
        </select>

      </div>
      <div id="presentation_equation" dangerouslySetInnerHTML={{ __html: equation }}></div>
      <div id="solution" dangerouslySetInnerHTML={{ __html: solution }}></div>
    </div>
  )
}
export default App

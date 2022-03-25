import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("green")
  const [myStatus, setMystatus] = useState(true);

  const [products, setProducts] = useState([{id: 1, name: "A"}, {id: 2, name: "B"}])
  const changeStatus = () => {
    setMystatus(true)
  }
  return <div>
      Number: {count} <br />
      String: <div style={{background: color, width: 100, height: 100}}>Content</div> <br />
      Boolean: { myStatus && "Da ket hon"} <br />
      Arr: {products.map(item => item.name)}
      <div></div>
  </div>
}

export default App


import {Routes,Route,Link} from "react-router-dom"
import Dashboard from "./Dashboard.jsx"

import ClickSpeed from "../games/ClickSpeed.jsx"
import NumberMemory from "../games/NumberMemory.jsx"
import ColorMix from "../games/ColorMix.jsx"
import FastMath from "../games/FastMath.jsx"
import KeyPressSpeed from "../games/KeyPressSpeed.jsx"
import GuessNumber from "../games/GuessNumber.jsx"

export default function App(){
return(
<div>
<nav>
<Link to="/">Home</Link>
</nav>

<Routes>
<Route path="/" element={<Dashboard/>}/>
<Route path="/click" element={<ClickSpeed/>}/>
<Route path="/memory" element={<NumberMemory/>}/>
<Route path="/color" element={<ColorMix/>}/>
<Route path="/math" element={<FastMath/>}/>
<Route path="/typing" element={<KeyPressSpeed/>}/>
<Route path="/guess" element={<GuessNumber/>}/>
</Routes>

</div>
)
}

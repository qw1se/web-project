
import {Link} from "react-router-dom"

export default function Dashboard(){
return(
<div>
<h1 style={{padding:30}}>BrainBoost Games</h1>

<div className="grid">

<Link to="/click"><div className="card">Click Speed</div></Link>
<Link to="/memory"><div className="card">Number Memory</div></Link>
<Link to="/color"><div className="card">Color Mix</div></Link>
<Link to="/math"><div className="card">Fast Math</div></Link>
<Link to="/typing"><div className="card">Typing Speed</div></Link>
<Link to="/guess"><div className="card">Guess Number</div></Link>

</div>
</div>
)
}

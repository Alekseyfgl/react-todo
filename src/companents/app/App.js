import React from "react";
import Header from "../header/Header";
import Content from "../main/content/content";

import './App.css';


class App extends React.Component {


    render() {
        return (
            <div className="App">
                <Header/>
                <Content/>
            </div>
        )
    }
}


// function App() {
//     return (
//         <div className="App">
//             <Header/>
//             <Content/>
//         </div>
//     );
// }

export default App;

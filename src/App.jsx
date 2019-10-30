import React, { Component } from 'react'
import TodoList from './TodoList.jsx'
class App extends Component {
    constructor() {
        super()
        console.log("Instantiating App")
        this.state = {
            numLists: 1
        }
    }
    render() {
        let toDisplay = []
        for (let i = 0; i < this.state.numLists; i++) {
            toDisplay.push(<TodoList />)
        }
        return (<div>
            {toDisplay}
            <button onClick={() => {
                this.setState({ numLists: this.state.numLists + 1 })
            }} > Add list </button>
        </div>)

    }
}
export default App 
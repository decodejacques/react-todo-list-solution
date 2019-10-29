import React, { Component } from 'react'
class App extends Component {
    constructor() {
        super()
        console.log("Instantiating")
        this.state = {
            listName: undefined,
            allTodos: [],
            userInput: ""
        }
    }
    componentDidMount() {
        console.log("After the first render")
        let nameEntered = window.prompt("What is the name of the list?")
        console.log("This is what the user entered", nameEntered)
        this.setState({ listName: nameEntered })
    }
    onChangeHandler = event => {
        console.log("New string in input box ", event.target.value)
        this.setState({ userInput: event.target.value })
    }
    submitHandler = event => {
        console.log("Form submitted")
        event.preventDefault()
        this.setState({
            userInput: "",
            allTodos: this.state.allTodos.concat(this.state.userInput)
        })
    }
    deleteEverything = () => {
        console.log("deleting everything")
        this.setState({ allTodos: [] })
    }
    rename = () => {
        console.log("Renaming the list")
        let newName = window.prompt("What's the new name?")
        this.setState({ listName: newName })
    }
    deleteFirst = () => {
        console.log("Deleting the first element")
        this.setState({ allTodos: this.state.allTodos.slice(1) })
    }
    reverseItems = () => {
        console.log("Reverse the list")
        // First copy the current list
        let newTodos = this.state.allTodos.slice()
        // Then modify the copy (reverse modifies the array)
        newTodos.reverse()
        // Then set the todos propety of the state to the copy
        this.setState({ allTodos: newTodos })
    }
    render() {
        console.log("Rendering with state", this.state)
        if (!this.state.listName) {
            return (<div> loading ... </div>)
        }
        return (<div>
            <h1>{this.state.listName}</h1>
            <ul>
                {this.state.allTodos.map(x => (<li>{x}</li>))}
            </ul>
            <form onSubmit={this.submitHandler}>
                <input type="text"
                    onChange={this.onChangeHandler}
                    value={this.state.userInput} />
                <input type="submit"></input>
            </form>
            <button onClick={this.deleteEverything}>Delete all</button>
            <button onClick={this.rename}>Rename list</button>
            <button onClick={this.deleteFirst}>Delete first element</button>
            <button onClick={this.reverseItems}>Reverse the list</button>
        </div>)
    }
}
export default App 
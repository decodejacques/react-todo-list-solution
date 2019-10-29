import React, { Component } from 'react'
class App extends Component {
    constructor() {
        super()
        console.log("Instantiating")
        this.state = {
            listName: undefined,
            allTodos: [],
            userInput: "",
            dueDateInput: "",
            filterInput: ""
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
        let newItem = {
            description: this.state.userInput,
            dueDate: this.state.dueDateInput
        }
        console.log("adding an item", newItem)
        this.setState({
            userInput: "",
            dueDateInput: "",
            allTodos: this.state.allTodos.concat(newItem)
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
        // Then set the todos property of the state to the copy
        this.setState({ allTodos: newTodos })
    }
    deleteSpecific = () => {
        console.log("Deleting specific")
        let indexToDelete = window.prompt("Which index do you want to delete?")
        // The user sees index + 1, so we need to decrease the index by 1
        indexToDelete = indexToDelete - 1
        // Copy the current list
        let todosCopy = this.state.allTodos.slice()
        // Create a new array that doesn't include the element to delete
        let newTodos = todosCopy.filter((x, index) => {
            return index !== indexToDelete
        })
        // Then set the todos property of the state to the copy
        this.setState({ allTodos: newTodos })
    }
    filterChangeHandler = evt => {
        console.log("updating search filter")
        this.setState({ filterInput: evt.target.value })
    }
    render() {
        console.log("Rendering with state", this.state)
        if (!this.state.listName) {
            return (<div> loading ... </div>)
        }
        let numberTodo = (todo, ind) => {
            return {
                description: todo.description,
                dueDate: todo.dueDate,
                index: ind + 1
            }
        }
        let filterTodo = indexedTodo => {
            return indexedTodo.description.includes(this.state.filterInput)
        }
        let displayTodo = indexedTodo => {
            return (<li>{indexedTodo.index}.
                {indexedTodo.dueDate}:
                {indexedTodo.description}</li>)
        }

        let numberedTodos = this.state.allTodos.map(numberTodo)
        let filteredTodos = numberedTodos.filter(filterTodo)
        let displayedTodos = filteredTodos.map(displayTodo)

        return (<div>
            <h1>{this.state.listName}</h1>
            <ul>
                {displayedTodos}
            </ul>
            <form onSubmit={this.submitHandler}>
                <h3>Due date</h3>
                <input type="text"
                    onChange={evt => {
                        console.log("due date being updated")
                        this.setState({ dueDateInput: evt.target.value })
                    }}
                    value={this.state.dueDateInput} />
                <h3>Item description</h3>
                <input type="text"
                    onChange={this.onChangeHandler}
                    value={this.state.userInput} />
                <input type="submit" />
            </form>
            <h3>Search filter</h3>
            <input type="text"
                onChange={this.filterChangeHandler}
                value={this.state.filterInput} />

            <button onClick={this.deleteEverything}>Delete all</button>
            <button onClick={this.rename}>Rename list</button>
            <button onClick={this.deleteFirst}>Delete first element</button>
            <button onClick={this.reverseItems}>Reverse the list</button>
            <button onClick={this.deleteSpecific}>Delete todo</button>

        </div >)
    }
}
export default App 
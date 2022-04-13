import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class Todos extends React.Component {
    render() {
        return (
            <li> {this.props.value}
                <span>
                    <button className={"ml-5 editpen"}
                            onClick={this.props.editTodo}
                    >
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                </span>

                <span>
                    <button className={"ml-5 trashcan"}
                            onClick={this.props.deleteTodo}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </span>
            </li>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: Array(0).fill(null),
            newTodo: '',
            pageTitle: "pageTitle"
        }
    }




    handleInput() {
        let input = document.getElementById('input').value
        let newTodo = {todo: input}
        this.state.todos.push(newTodo)
        this.setState(this.state);
        document.getElementById('input').value = ""
    }

    deleteTodo(todo) {
        this.state.todos.filter((todoItem) => {
            if(todoItem.todo == todo) {
                let todoIndex = this.state.todos.indexOf(todoItem)
                this.state.todos.splice(todoIndex, 1)
                this.setState(this.state.todos)
            }
        })
    }

    editTodo(todo) {
            document.getElementById('submitTodo').classList.add("d-none")
            document.getElementById('editTodo').classList.remove("d-none")

            let input = document.getElementById('input').value  = todo.todo
            this.setState( {newTodo: input })
    }

    updateTodo() {
        let oldInput = this.state.newTodo
        let newInput = document.getElementById('input').value

        this.state.todos.filter((todoItem) => {
            if(todoItem.todo == oldInput) {
                todoItem.todo =  newInput
                this.setState(this.state)
            }
        })


        document.getElementById('submitTodo').classList.remove("d-none")
        document.getElementById('editTodo').classList.add("d-none")
        document.getElementById('input').value = ""
    }


    render() {
        let pageTitle =  "My Todos";

        return (
            <div>
                <section className={"py-5"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-12 text-center"}>
                                <h1>{pageTitle}</h1>
                                <input type="text" id="input" />
                                <button id="submitTodo" className={"btn btn-primary ml-3"}
                                        onClick={() => this.handleInput()}
                                >Submit</button>
                                <button id="editTodo" className={"btn btn-success d-none ml-3"}
                                        onClick={() => this.updateTodo()}
                                >Edit Todo</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ul>
                                    {this.state.todos.map((data, idx) => (
                                        <Todos value={data.todo}
                                               deleteTodo={() => this.deleteTodo(data.todo)}
                                               editTodo={() => this.editTodo(data)}
                                               key={idx}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

// ========================================

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);

import axios from 'axios';
import { Component } from 'react';

class App extends Component {
  state = {
    todos: [],
    newName: '',
    editName: '',
    editTaskId: null,
  };
  API = 'https://to-dos-api.softclub.tj/api/categories';

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const res = await axios.get(this.API);
      this.setState({ todos: res.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  addTodo = async () => {
    const { newName } = this.state;
    try {
      await axios.post(this.API, {
        name: newName,
      });
      this.getTodos();
      this.setState({
        newName: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  editTodo = async () => {
    const { editName, editTaskId } = this.state;
    try {
      await axios.put(this.API, {
        name: editName,
        id: editTaskId 
      });
      this.getTodos()
      this.setState({
        editName: '',
        editTaskId: null,
      });
    } catch (error) {
      console.error('Error during edit:', error);
    }
  };
  
  deleteTodo = async (id) => {
    try {
       await axios.delete(`${this.API}?id=${id}`);
      this.getTodos();  
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const { todos, newName, editName, editTaskId } = this.state;

    return (
      <div className='p-10'>
        <h1 className='font-bold text-center text-3xl my-5'>TodoList</h1>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Write '
            value={editTaskId ? editName : newName}
            onChange={(e) =>
              this.setState({
                [editTaskId ? 'editName' : 'newName']: e.target.value,
              })
            }
            className='border p-2 m-2'
          />
          <button
            onClick={editTaskId ? this.editTodo : this.addTodo}
            className='border-blue-500 border px-1 hover:bg-blue-700 hover:text-white'
          >
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>

        <div className='flex gap-20 flex-wrap'>
          {todos.map((todo) => (
            <div key={todo.id} className='mt-10 flex flex-col bg-white p-4 border-gray-200 border mb-4  w-[20%]'>
              <p className='text-lg'>{todo.name}</p>
              <div className='mt-5 flex gap-2'>
                <button
                  onClick={() =>
                    this.setState({ editTaskId: todo.id, editName: todo.name })
                  }
                  className='border-blue-500 border px-1 hover:bg-blue-700 hover:text-white'
                >
                  Edit
                </button>
                <button
                  onClick={() => this.deleteTodo(todo.id)}
                  className='bg-red-500 text-white px-1 hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

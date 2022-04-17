import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = 'http://localhost:5000/api/'

const initialState = {
    todos: [],
    addTodoStatus: "",
    addTodoError: "",
    getTodoStatus: "",
    getTodoError: "",
    updateTodoStatus: "",
    updateTodoError: "",
    deleteTodoStatus: "",
    deleteTodoError: "",
}

export const todosAdd = createAsyncThunk("todos/todosAdd", async (todo, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL + "todos", todo);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const getTodos = createAsyncThunk("todos/getTodos", async (id = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(baseURL + "todos");
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})


export const updateTodos = createAsyncThunk("todos/updateTodos", async (todo, { rejectWithValue }) => {
    try {
        const { _id, task, isComplete, date } = todo;
        const response = await axios.put(baseURL + "todos/" + _id, { task, isComplete, date });
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (_id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(baseURL + "todos/" + _id);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: {
        [todosAdd.pending]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "pending",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [todosAdd.fulfilled]: (state, action) => {
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                addTodoStatus: "fulfilled",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [todosAdd.rejected]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "rejected",
                addTodoError: action.payload,
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [getTodos.pending]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "pending",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [getTodos.fulfilled]: (state, action) => {
            return {
                ...state,
                todos: action.payload,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "fulfilled",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [getTodos.rejected]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "rejected",
                getTodoError: action.payload,
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [updateTodos.pending]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "pending",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [updateTodos.fulfilled]: (state, action) => {

            const changedTodos = state.todos.map((items) => items._id === action.payload_id ? action.payload : items)

            return {
                ...state,
                todos: changedTodos,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "fulfilled",
                updateTodoError: "",
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [updateTodos.rejected]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "rejected",
                updateTodoError: action.payload,
                deleteTodoStatus: "",
                deleteTodoError: "",
            };
        },
        [deleteTodo.pending]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "pending",
                deleteTodoError: "",
            };
        },
        [deleteTodo.fulfilled]: (state, action) => {

            const presentTodos = state.todos.filter((items) => items._id !== action.payload_id )

            return {
                ...state,
                todos: presentTodos,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "fulfilled",
                deleteTodoError: "",
            };
        },
        [deleteTodo.rejected]: (state, action) => {
            return {
                ...state,
                addTodoStatus: "",
                addTodoError: "",
                getTodoStatus: "",
                getTodoError: "",
                updateTodoStatus: "",
                updateTodoError: "",
                deleteTodoStatus: "rejected",
                deleteTodoError: action.payload,
            };
        },
    },
})

export default todoSlice.reducer
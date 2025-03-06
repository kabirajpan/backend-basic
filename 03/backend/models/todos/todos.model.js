import mongoose from 'mongoose'
import { SubTodo } from './sub_todo.model'

const todoSchema = new mangoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    SubTodo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubTodo'
        }
    ]
}, {timestaps: true})

export const Todo = mongoose.model("Todo", todoSchema)
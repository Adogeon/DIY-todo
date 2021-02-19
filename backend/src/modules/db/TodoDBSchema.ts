import { model, Schema, Document} from 'mongoose';

export interface iTodos extends Document {
  list: String[]
}

//Schema
const TodoSchema = new Schema<iTodos> ({
  text: {
    type: [String],
    require: true
  }
})

export const Todo = model('Todo', TodoSchema)
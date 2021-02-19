import { model, Schema, Document} from 'mongoose';

export interface iTodo extends Document {
  text: String
}

//Schema
const TodoSchema = new Schema<iTodo> ({
  text: {
    type: String,
    require: true
  }
})

export default model('Todo', TodoSchema)
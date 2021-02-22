import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {Todos, TodosModel} from "../entities/Todos";
import {TodosInput} from "./types/todo-input";

@Resolver()
export class TodosResolver {
  @Query(_returns => Todos, {nullable: false})
  async returnSingleTodos(@Arg("id") id: String) {
    return await TodosModel.findById({_id: id});
  }


  @Mutation(() => Todos)
  async createTodos(@Arg("data"){items}: TodosInput): Promise<Todos> {
    const todos = (await TodosModel.create({
      items
    })).save()
    return todos;
  };

  @Mutation(() => Boolean)
  async deleteTodos(@Arg("id") id: string) {
    await TodosModel.deleteOne({id});
    return true
  }
}
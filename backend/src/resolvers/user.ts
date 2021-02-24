import {Resolver, Mutation, Arg, Query, FieldResolver, Root} from "type-graphql";
import {User, UserModel} from "../entities/User";
import {Todos} from "../entities/Todos";
import {UserInput} from "./types/user-input";
import {Ref } from "../types"
import mongoose = require("mongoose")

@Resolver(of=>User)
export class UserResolver {
  @Query(_returns => User, {nullable: false})
  async returnUser(@Arg("id") id: String) {
    return await UserModel.findById({_id: id});
  }

  @Mutation(() => User)
  async createUser(@Arg("data"){username, todos}: UserInput): Promise<User> {

    const todoList = todos.map(todo => mongoose.Types.ObjectId(todo))

    const user = await(await UserModel.create({
      username,
      todos: todoList
    })).save()
    return user;
  };

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({id});
    return true
  }

  @FieldResolver(type => [Todos])
  async todos(@Root() user: any): Promise<Ref<Todos>[]> {
    const userDoc = await UserModel.findById(user.id).populate("todos")
    return userDoc.todos;
  }
}

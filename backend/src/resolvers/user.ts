import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {User, UserModel} from "../entities/User";
import {UserInput} from "./types/user-input";

@Resolver()
export class UserResolver {
  @Query(_returns => User, {nullable: false})
  async returnUser(@Arg("id") id: String) {
    return await UserModel.findById({_id: id});
  }


  @Mutation(() => User)
  async createTodos(@Arg("data"){username, todo_id}: UserInput): Promise<User> {
    const todos = (await UserModel.create({
      username,
      todo_id
    })).save()
    return todos;
  };

  @Mutation(() => Boolean)
  async deleteTodos(@Arg("id") id: string) {
    await UserModel.deleteOne({id});
    return true
  }
}
import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID} from "type-graphql";
import {User, UserModel} from "../entities/User";
import {List} from "../entities/List";
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
    const todoList = todos?.map(todo => mongoose.Types.ObjectId(todo)) ?? []
    const user = await(await UserModel.create({
      username,
      todos: todoList
    })).save()
    return user;
  };

  @Mutation(() => User)
  async updateUser(
    @Arg("id", type => ID) id: String, 
    @Arg("data")data: UserInput
  ): Promise<User> {
    const doc = await UserModel.findById(id);
    Object.keys(data).map(key => {
      if(data[key] !== null) doc[key] = data[key];
    });
    const user = await doc.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", type => ID) id: string) {
    await UserModel.deleteOne({id});
    return true
  }

  @FieldResolver(type => [List])
  async todos(@Root() user: any): Promise<Ref<List>[]> {
    const userDoc = await UserModel.findById(user.id).populate("todos")
    return userDoc.todos;
  }
}

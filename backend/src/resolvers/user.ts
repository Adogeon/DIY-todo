import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID, Field} from "type-graphql";
import {User, UserModel} from "../entities/User";
import {List, ListModel} from "../entities/List";
import {Tag} from "../entities/Tag";
import {UserInput} from "./types/user-input";
import {Ref } from "../types"

@Resolver(of=>User)
export class UserResolver {
  @Query(_returns => User, {nullable: false})
  async returnUser(@Arg("id") id: String) {
    return await UserModel.findById({_id: id});
  }

  @Mutation(() => User)
  async createUser(@Arg("username", type => String)username: string): Promise<User> {
    const user = await UserModel.create({ username})
    const inboxList = await ListModel.create({title:"Inbox"})
    user.todos = [inboxList.id];
    await user.save();
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

  @FieldResolver(type => [Tag])
  async haveTags(@Root() user: any): Promise<Ref<Tag>[]> {
    const userDoc = await UserModel.findById(user.id).populate("haveTags")
    return userDoc.haveTags;
  }
}

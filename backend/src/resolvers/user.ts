import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID, Ctx, Authorized} from "type-graphql";
import {User, UserModel} from "../entities/User";
import {List} from "../entities/List";
import {Tag} from "../entities/Tag";
import {UserInput} from "./types/user-input";
import {Ref } from "../types"
import { GraphQLError } from "graphql";

@Resolver(of=>User)
export class UserResolver {
  @Authorized()
  @Query(_returns => User, {nullable: false})
  async returnUser(
    @Ctx() ctx?: any
  ) {
    if(ctx.user.error) {
      throw new Error("Token expired")
    }
    return await UserModel.findById({_id: ctx.user.userId});
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("data")data: UserInput,
    @Ctx() ctx?: any
  ): Promise<User> {
    const doc = await UserModel.findById(ctx.user.userId);
    Object.keys(data).map(key => {
      if(data[key] !== null) doc[key] = data[key];
    });
    const user = await doc.save();
    return user;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteUser(
    @Ctx() ctx?: any
  ) {
    await UserModel.deleteOne({_id: ctx.user.userId});
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

import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID} from "type-graphql";
import {List, ListModel} from "../entities/List";
import { UserModel} from "../entities/User";

@Resolver(of => List)
export class ListResolver {
  @Query(_returns => List, {nullable: false})
  async returnSingleList(@Arg("id") id: string) {
    return await ListModel.findById({_id: id});
  }

  @Mutation(returns => List)
  async createList(
    @Arg("title", type => String) title: string,
    @Arg("userId", type => ID) userId: string,
    @Arg("colorCode", type => String) colorCode: string
  ): Promise<List> {
    const list = await(await ListModel.create({title, colorCode})).save();
    const userDoc = await UserModel.findById(userId);
    userDoc.todos.push(list.id);
    await userDoc.save(); 
    return list;
  }

  @Mutation(() => List)
  async updateList(
    @Arg("id", type=>ID) id: string,
    @Arg("title", type => String) title: string,
    @Arg("colorCode", type => String) colorCode: string
  ): Promise<List> {
    const doc = await ListModel.findById(id);
    doc.title = title;
    doc.colorCode = colorCode;
    const list = await doc.save();
    return list
  }

  @Mutation(() => Boolean)
  async deleteList(@Arg("id", type => ID) id: string) {
    try {
      await ListModel.deleteOne({id});
      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }
}
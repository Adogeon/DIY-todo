import { mongoose } from "@typegoose/typegoose";
import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID} from "type-graphql";
import { Item } from "../entities/Item";
import {List, ListModel} from "../entities/List";
import { UserModel} from "../entities/User";
import {Ref} from "../types";

@Resolver(of => List)
export class ListResolver {
  @Query(_returns => List, {nullable: false})
  async returnSingleList(@Arg("id") id: string) {
    return await ListModel.findById({_id: id});
  }

  @Mutation(returns => List)
  async createList(
    @Arg("title", type => String) title: string,
    @Arg("userId", type => ID) userId: string
  ): Promise<List> {
    const list = await(await ListModel.create({title})).save();
    const userDoc = await UserModel.findById(userId);
    userDoc.todos.push(list.id);
    await userDoc.save(); 
    return list;
  }

  @Mutation(() => List)
  async updateList(
    @Arg("id", type=>ID) id: string,
    @Arg("title", type => String) title: string,
    @Arg("items", type => [String]) items: string[] 
  ): Promise<List> {
    const doc = await ListModel.findById(id);
    const itemList = items?.map(item => mongoose.Types.ObjectId(item)) ?? doc.items;
    doc.items = itemList;
    doc.title = title ? title : doc.title
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

  @FieldResolver(type => [Item])
  async items(@Root() list: any): Promise<Ref<Item>[]> {
    const listDoc = await ListModel.findById(list.id).populate("items")
    return listDoc.items;
  }
}
import { mongoose } from "@typegoose/typegoose";
import {Resolver, Mutation, Arg, Query, FieldResolver, Root} from "type-graphql";
import { Item } from "../entities/Item";
import {List, ListModel} from "../entities/List";
import {ListInput} from "./types/list-input";
import {Ref} from "../types";

@Resolver(of => List)
export class ListResolver {
  @Query(_returns => List, {nullable: false})
  async returnSingleList(@Arg("id") id: String) {
    return await ListModel.findById({_id: id});
  }


  @Mutation(() => List)
  async createList(@Arg("items") items: string[]): Promise<List> {
    const itemList = items.map(item => mongoose.Types.ObjectId(item));
    const list = await (await ListModel.create({
      items: itemList
    })).save()
    return list;
  };

  @Mutation(() => List)
  async updateList(@Arg("data"){id, items}: ListInput): Promise<List> {
    const doc = await ListModel.findById(id);
    doc.items = items;
    const list = await doc.save();
    return list
  }

  @Mutation(() => Boolean)
  async deleteList(@Arg("id") id: string) {
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
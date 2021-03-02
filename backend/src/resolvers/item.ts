import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import {ItemInput} from "./types/item-input";

@Resolver(of => Item)
export class ItemResolver {
  @Query(_returns => Item, {nullable: false})
  async returnSingleItem(@Arg("id", type => ID) id: string) {
    return await ItemModel.findById(id)
  }

  @Mutation(() => Item)
  async createItem(@Arg("item") {text, isDone, tags, priority}: ItemInput) {
    const item = await (await ItemModel.create({
      text,
      isDone,
      tags,
      priority
    })).save();
    return item;
  }

  @Mutation(() => Item)
  async updateItem(
    @Arg("id", type => ID) id: string,
    @Arg("item") itemInput: ItemInput
  ) {
    const doc = await ItemModel.findById(id);
    Object.keys(itemInput).map(key => {
      if(itemInput[key] !== null) doc[key] = itemInput[key];
    });
    const item = await doc.save();
    return item;
  }

  @Mutation(() => Boolean)
  async deleteItem(@Arg("id", type => ID) id: string) {
    try {
      await ItemModel.deleteOne({id});
      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }

}
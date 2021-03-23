import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import {ItemInput, ItemFilter} from "./types/item-input";

@Resolver(of => Item)
export class ItemResolver {
  @Query(_returns => Item, {nullable: false})
  async returnSingleItem(@Arg("id", type => ID) id: string) {
    return await ItemModel.findById(id)
  }

  @Query(_returns => [Item], {nullable:false})
  async returnMultipleItem(@Arg("filter") filter: ItemFilter) {
    const items = await ItemModel.find(filter)
    return items
  }

  @Mutation(() => Item)
  async createItem(@Arg("item") {text, isDone, tags, priority, dueDate, belongTo}: ItemInput) {
    const item = await (await ItemModel.create({
      text,
      isDone,
      tags,
      priority,
      dueDate,
      belongTo
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
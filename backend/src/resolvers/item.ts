import { mongoose } from "@typegoose/typegoose";
import {Resolver, Mutation, Arg, Query, FieldResolver, Root} from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import {ItemInput} from "./types/item-input";
import {Ref} from "../types";

@Resolver(of => Item)
export class ItemResolver {
  @Query(_returns => Item, {nullable: false})
  async returnSingleItem(@Arg("id") id: String) {
    return await ItemModel.findById(id)
  }

  @Mutation(() => Item)
  async createItem(@Arg("item") {text, isDone, tags}: ItemInput) {
    const item = await (await ItemModel.create({
      text,
      isDone,
      tags
    })).save();
    return item;
  }

  @Mutation(() => Item)
  async updateItem(
    @Arg("id") id: string,
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
  async deleteList(@Arg("id") id: string) {
    try {
      await ItemModel.deleteOne({id});
      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }

}
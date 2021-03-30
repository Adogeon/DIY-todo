import {Resolver, Mutation, Arg, Query, ID, FieldResolver, Root} from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import { List} from "../entities/List";
import { User} from "../entities/User";
import { ItemInput, ItemFilter} from "./types/item-input";
import {Ref} from "../types";
@Resolver(of => Item)
export class ItemResolver {
  @Query(_returns => Item, {nullable: false})
  async returnSingleItem(@Arg("id", type => ID) id: string) {
    return await ItemModel.findById(id)
  }

  @Query(_returns => [Item], {nullable:false})
  async returnMultipleItem(@Arg("filter") filter: ItemFilter) {
    if(filter.today === true) {
      const {today, ...rest} = filter;
      const dNow = new Date();
      dNow.setHours(0);
      dNow.setMinutes(0);
      dNow.setSeconds(0);
      dNow.setMilliseconds(0);
      filter = {dueDate: dNow, ...rest }
    }
    const items = await ItemModel.find(filter)
    return items
  }

  @Mutation(() => Item)
  async createItem(
    @Arg("item") {text, isDone, tags, priority, dueDate, belongTo, project}: ItemInput,
  ) {
    const item = await (await ItemModel.create({
      text,
      isDone,
      tags,
      priority,
      dueDate,
      belongTo,
      project
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

  @FieldResolver(type => List)
  async project(@Root() item: any): Promise<Ref<List>> {
    const itemDoc = await ItemModel.findById(item.id).populate("project")
    return itemDoc.project;
  }

  @FieldResolver(type => User)
  async belongTo(@Root() item: any): Promise<Ref<User>> {
    const itemDoc = await ItemModel.findById(item.id).populate("belongTo")
    return itemDoc.belongTo;
  }

}
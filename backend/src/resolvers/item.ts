import {Resolver, Mutation, Arg, Query, ID, FieldResolver, Root} from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import { List} from "../entities/List";
import { User} from "../entities/User";
import { ItemInput, ItemUpdateInput, ItemFilter} from "./types/item-input";
import {Ref} from "../types";
import { Tag } from "../entities/Tag";
@Resolver(of => Item)
export class ItemResolver {
  @Query(_returns => Item, {nullable: false})
  async returnSingleItem(@Arg("id", type => ID) id: string) {
    return await ItemModel.findById(id)
  }

  @Query(_returns => [Item], {nullable:false})
  async returnMultipleItem(
    @Arg("filter") filter: ItemFilter,
    @Arg("after", {nullable: true}) after?: Date,
    @Arg("before", {nullable: true}) before? : Date
  ) {
    let dbFilter : any;
    dbFilter = {...filter};
    console.log(dbFilter);
    console.log('after',after);
    console.log('before',before);
    if(after) {
      dbFilter.dueDate = {};
      dbFilter.dueDate.$gte = after
    }
    if(before) {
      dbFilter.dueDate.$lte = before
    }
    console.log(dbFilter);
    const items = await ItemModel.find(dbFilter)
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
      dueDate: dueDate ?? null,
      belongTo,
      project: project ?? null
    })).save();
    return item;
  }

  @Mutation(() => Item)
  async updateItem(
    @Arg("id", type => ID) id: string,
    @Arg("item") itemInput: ItemUpdateInput
  ) {
    const doc = await ItemModel.findById(id);
    Object.keys(itemInput).map(key => {
      if(itemInput[key] !== undefined) doc[key] = itemInput[key];
    });
    const item = await doc.save();
    return item;
  }

  @Mutation(() => Boolean)
  async deleteItem(@Arg("id", type => ID) id: string) {
    try {
      const result = await ItemModel.deleteOne({_id: id});
      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }

  @FieldResolver(type => Tag)
  async tags(@Root() item: any): Promise<Ref<Tag>[]> {
    const itemDoc = await ItemModel.findById(item.id).populate("tags")
    return itemDoc.tags;
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

  @FieldResolver(type => Date)
  dueDate(@Root() item: any): Date {
    return item.dueDate ? new Date(item.dueDate) : null;
  }
}
import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass, getName} from "@typegoose/typegoose";
import {Ref} from "../types"
import {Item} from "./Item"

@ObjectType({ description: "The Todos List model"})
export class List {
  @Field(() => ID)
  id!: string;

  @Field(() => String, {nullable: true})
  @Property()
  title?: string;

  @Field(type => [Item], {nullable: true})
  @Property({ref: 'Item', default: []})
  items?: Ref<Item>[];
}

export const ListModel = getModelForClass(List);


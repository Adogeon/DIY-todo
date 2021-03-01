import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {Ref} from "../types"
import {Item} from "./Item"

@ObjectType({ description: "The Todos List model"})
export class List {
  @Field(() => ID)
  id!: string;

  @Field(_type => [Item], {nullable: true})
  @Property({ref: Item})
  items?: Ref<Item>[];
}

export const ListModel = getModelForClass(List);


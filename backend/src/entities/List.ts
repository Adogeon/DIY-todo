import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass, getName} from "@typegoose/typegoose";

@ObjectType({ description: "The Todos List model"})
export class List {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  @Property()
  title?: string;

  @Field(() => String)
  @Property()
  colorCode?: string;
}

export const ListModel = getModelForClass(List);


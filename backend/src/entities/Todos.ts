import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {Ref} from "../types";

@ObjectType({ description: "The Todos model"})
export class Todos {
  @Field(() => ID)
  id!: string;

  @Field(type => [String])
  items!: string[];
}

export const TodosModel = getModelForClass(Todos);


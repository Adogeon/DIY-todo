import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";

@ObjectType({ description: "The Todos model"})
export class Todos {
  @Field(() => ID)
  id!: string;

  @Field(type => [String])
  @Property({required: true, default:[]})
  items!: string[];
}

export const TodosModel = getModelForClass(Todos);


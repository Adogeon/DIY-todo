import {InputType, Field, ID} from "type-graphql";
import {List} from "../../entities/List";

@InputType()
export class ListInput implements Partial<List> {
  @Field(type => [String])
  items!: string[];

  @Field(type => ID, {nullable : false})
  id!: string
}
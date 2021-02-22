import {InputType, Field} from "type-graphql";
import {Todos} from "../../entities/Todos";

@InputType()
export class TodosInput implements Partial<Todos> {
  @Field()
  items!: string[];
}
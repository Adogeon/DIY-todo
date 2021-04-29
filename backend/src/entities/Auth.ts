import {ObjectType, Field} from "type-graphql";

@ObjectType()
export class AuthResult {
  @Field(type => String)
  token: string

  @Field(type => String)
  refresh: string
}
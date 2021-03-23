import {Resolver, Mutation, Arg, Query, ID, FieldResolver, Root} from "type-graphql";
import { Tag, TagModel } from "../entities/Tag";
import { User, UserModel} from "../entities/User";
import { Ref} from "../types";

@Resolver(of => Tag)
export class TagResolver {
  @Query(_return => [Tag], {nullable:false})
  async returnTagForUser(@Arg("userId", type=>ID) userId: string ) {
    return await TagModel.find({createdBy: userId})
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("text", type => String)text: string,
    @Arg("userId", type => ID)userId: string
  ) {
    const tag = await(await TagModel.create({text, createdBy:userId})).save();
    return tag;
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("text", type => String)text: string,
    @Arg("id", type => ID)id: string
  ) {
    const tag = await TagModel.findById(id);
    tag.text = text;
    return tag.save();
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg("id", type => ID) id: string) {
    try {
      await TagModel.deleteOne({id});
      return true;
    } catch(error) {
      console.error(error)
      return false
    }
  }

  @FieldResolver(type => User)
  async belongTo(@Root() tag: Tag): Promise<Ref<User>> {
    return await UserModel.findById(tag.createdBy)
  } 
}
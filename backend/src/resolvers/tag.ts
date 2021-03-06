import {Resolver, Mutation, Arg, Query, ID, FieldResolver, Root, Ctx, Authorized} from "type-graphql";
import { Tag, TagModel } from "../entities/Tag";
import { User, UserModel} from "../entities/User";
import { Ref} from "../types";

@Resolver(of => Tag)
export class TagResolver {
  @Query(_return => [Tag], {nullable:false})
  async returnTagForUser(@Arg("userId", type=>ID) userId: string ) {
    return await TagModel.find({createdBy: userId})
  }

  @Authorized()
  @Mutation(() => Tag)
  async createTag(
    @Arg("text", type => String)text: string,
    @Arg("colorCode", type => String)colorCode: string,
    @Ctx() ctx?: any
  ) {
    const tag = await(await TagModel.create({text, createdBy:ctx.user.userId, colorCode})).save();
    const userDoc = await UserModel.findById(ctx.user.userId);
    userDoc.haveTags.push(tag.id);
    await userDoc.save();
    return tag;
  }

  @Authorized()
  @Mutation(() => Tag)
  async updateTag(
    @Arg("text", type => String)text: string,
    @Arg("id", type => ID)id: string,
    @Arg("colorCode", type => String)colorCode: string
  ) {
    const tag = await TagModel.findById(id);
    tag.text = text;
    tag.colorCode = colorCode;
    return tag.save();
  }

  @Authorized()
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
  async createdBy(@Root() tag: Tag): Promise<Ref<User>> {
    return await UserModel.findById(tag.createdBy)
  } 
}
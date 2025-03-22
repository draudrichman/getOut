import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleSaved = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("saved")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("saved", {
        userId: currentUser._id,
        postId: args.postId,
      });
      return true;
    }
  },
});

export const getSavedPosts = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const savedPosts = await ctx.db
      .query("saved")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .order("desc")
      .collect();

    const savedPostsWithInfo = await Promise.all(
      savedPosts.map(async (savedPost) => {
        const post = await ctx.db.get(savedPost.postId);
        return post;
      })
    );
    return savedPostsWithInfo;
  },
});

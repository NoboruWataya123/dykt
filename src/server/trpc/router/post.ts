import { z } from "zod";

import { router, publicProcedure } from "../trpc";
export const postRouter = router({
    getAll: publicProcedure
        .input(z.object({ page: z.number().optional(), categoryId: z.string().optional() }))
        .query(({ input, ctx }) => {
            const { page = 1, categoryId } = input;
            const take = 20;
            const skip = (page - 1) * take;
            return ctx.prisma.post.findMany({
                where: {
                    // published: true,
                    categoryId: categoryId ? categoryId : undefined
                },
                skip,
                take,
                orderBy: { createdAt: "desc" },
                include: {
                    'category': true,
                    'author': true,
                    'tags': true,
                    'images': true,
                }
            });
        }),
    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.post.findFirstOrThrow({
                where: {
                    id: input.id,
                },
                include: {
                    'category': true,
                    'author': true,
                    'tags': true,
                    'images': true,
                }
            });
        }
        ),
    create: publicProcedure
        .input(z.object({ title: z.string(), content: z.string(), categoryId: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    authorId: ctx.session?.user?.id ?? "",
                    categoryId: input.categoryId,
                },
            });
        }
        ),
    update: publicProcedure
        .input(z.object({ id: z.string(), title: z.string(), content: z.string(), categoryId: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.post.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.title,
                    content: input.content,
                    categoryId: input.categoryId,
                },
            });
        }
        ),
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.post.delete({
                where: {
                    id: input.id,
                },
            });
        }
        ),
});

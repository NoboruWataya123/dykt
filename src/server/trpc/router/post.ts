import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const postRouter = router({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany();
    }),
    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.post.findFirstOrThrow({
                where: {
                    id: input.id,
                },
            });
        }
        ),
    // model Post {
    //   id         String     @id @default(cuid())
    //   createdAt  DateTime   @default(now())
    //   updatedAt  DateTime   @updatedAt
    //   published  Boolean    @default(false)
    //   title      String
    //   content    String?
    //   author     User       @relation(fields: [authorId], references: [id])
    //   authorId   String
    //   tags       Tag[]
    //   category   Category   @relation(fields: [categoryId], references: [id])
    //   categoryId String
    //   comments   Comment[]
    //   Like       Like[]
    //   Bookmark   Bookmark[]
    // }
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
});

import { z } from "zod";

import { router, publicProcedure } from "../trpc";
export const imageRouter = router({
    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.image.findFirstOrThrow({
                where: {
                    id: input.id,
                },
            });
        }
        ),
    create: publicProcedure
        .input(z.object({ url: z.string(), postId: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.image.create({
                data: {
                    url: input.url,
                    postId: input.postId,
                },
            });
        }
        ),
    createMultiple: publicProcedure
        .input(z.object({ urls: z.array(z.string()), postId: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.image.createMany({
                data: input.urls.map(url => {
                    return {
                        url,
                        postId: input.postId,
                    }
                })
            });
        }
        ),
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.image.delete({
                where: {
                    id: input.id,
                },
            });
        }
        ),
});

import { z } from "zod";

import { router, publicProcedure } from "../trpc";
export const categoryRouter = router({
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.category.findMany({
                include: {
                    'posts': true,
                }
            });
        }),
    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.category.findFirstOrThrow({
                where: {
                    id: input.id,
                },
            });
        }
        ),
    create: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.category.create({
                data: {
                    name: input.name,
                },
            });
        }
        ),
    update: publicProcedure
        .input(z.object({ id: z.string(), name: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.category.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                },
            });
        }
        ),
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.category.delete({
                where: {
                    id: input.id,
                },
            });
        }
        ),
});

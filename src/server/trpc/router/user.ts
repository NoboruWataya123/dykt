import { z } from "zod";

import { router, publicProcedure } from "../trpc";
export const userRouter = router({
    getOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.user.findFirstOrThrow({
                where: {
                    id: ctx.session?.user?.id ?? "",
                },
                include: {
                    'accounts': true,
                    'sessions': true,
                    'posts': true,
                    'comments': true,
                    'follow': true,
                    'Like': true,
                    'Bookmark': true,
                    'Notification': true,
                    'Message': true,
                    'Conversation': true,
                    'Report': true,
                }
            });
        }
        ),
    update: publicProcedure
        .input(z.object({ id: z.string(), name: z.string(), email: z.string(), image: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.user.update({
                where: {
                    id: ctx.session?.user?.id ?? "",
                },
                data: {
                    name: input.name,
                    email: input.email,
                    image: input.image,
                },
            });
        }
        ),
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.user.delete({
                where: {
                    id: ctx.session?.user?.id ?? "",
                },
            });
        }
        ),
});

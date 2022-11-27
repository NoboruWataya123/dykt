import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { imageRouter } from "./image";
import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = router({
    auth: authRouter,
    post: postRouter,
    profile: userRouter,
    category: categoryRouter,
    image: imageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

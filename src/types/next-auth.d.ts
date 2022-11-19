import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
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
  interface Post {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    content: string | null;
    author: User;
    authorId: string;
    tags: Tag[];
    category: Category;
    categoryId: string;
    comments: Comment[];
    Like: Like[];
    Bookmark: Bookmark[];
  }
  // model User {
  //   id             String         @id @default(cuid())
  //   name           String?
  //   email          String?        @unique
  //   emailVerified  DateTime?
  //   image          String?
  //   accounts       Account[]
  //   sessions       Session[]
  //   posts          Post[]
  //   comments       Comment[]
  //   follow         Follow[]
  //   Like           Like[]
  //   Bookmark       Bookmark[]
  //   Notification   Notification[]
  //   Message        Message[]
  //   Conversation   Conversation?  @relation(fields: [conversationId], references: [id])
  //   conversationId String?
  //   Report         Report[]
  // }
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    accounts: Account[];
    sessions: Session[];
    posts: Post[];
    comments: Comment[];
    follow: Follow[];
    Like: Like[];
    Bookmark: Bookmark[];
    Notification: Notification[];
    Message: Message[];
    Conversation: Conversation | null;
    conversationId: string | null;
    Report: Report[];
  }
}

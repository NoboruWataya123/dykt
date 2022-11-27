import { Button, Container } from "@mantine/core";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

const Category: NextPage = () => {
    const router = useRouter()
    const createPost = trpc.post.create.useMutation();
    const [newPost, setNewPost] = useState("");
    const [newPostContent, setNewPostContent] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: newPostContent,
    });

    useEffect(() => {
        if (createPost.isSuccess) {
            // redirect to the new post 
            router.push(`/articles/${createPost.data.id}`)
        }
    }, [createPost.isSuccess]);

    return (
        <>
            <Container size="md">
                <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                    <h1 className="text-4xl text-white font-bold">Create Post</h1>
                    <form
                        className="flex flex-col items-center justify-center w-full h-screen"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await createPost.mutateAsync({ title: newPost, categoryId: "clayw21xy0002ijgdrr74rki6", content: newPostContent }).catch((err) => console.log(err));
                            if (createPost.isError) {
                                alert("Error creating post");
                            }
                            setNewPost("");
                        }}>
                        <input
                            type="text"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Post title"
                            className="bg-white rounded-md p-2 mt-4"
                        />
                        <br />
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content />
                        </RichTextEditor>
                        <Button type="submit" color="blue" variant="outline" className="mt-4">
                            Create Post
                        </Button>
                    </form>
                </main>
            </Container>
        </>
    );
};

export default Category;


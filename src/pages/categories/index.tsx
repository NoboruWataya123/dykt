import { type NextPage } from "next";
import { useEffect, useState } from "react";

import { trpc } from "../../utils/trpc";

const Category: NextPage = () => {
    const categories = trpc.category.getAll.useQuery();
    const createCategory = trpc.category.create.useMutation();
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (createCategory.isSuccess) {
            categories.refetch();
        }
    }, [createCategory.isSuccess]);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <h1 className="text-4xl text-white font-bold">Categories</h1>
                <div className="flex flex-col items-center justify-center">
                    {categories.data?.map((category) => (
                        <div key={category.id} className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl text-white font-bold">{category.name}</h2>
                            {/* foreach category.posts */}
                            {category.posts.map((post) => (
                                <div key={post.id} className="flex flex-col items-center justify-center">
                                    <h3 className="text-xl text-white font-bold">{post.title}</h3>
                                    <p className="text-white">{post.content}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* create a form to add category */}
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await createCategory.mutateAsync({ name: newCategory }).catch((err) => console.log(err));
                    if (createCategory.isError) {
                        alert("Error creating category");
                    }
                    setNewCategory("");
                }}>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Category name"
                        className="bg-white rounded-md p-2"
                    />
                    <button type="submit" className="bg-white rounded-md p-2">Create</button>
                </form>
            </main>
        </>
    );
};

export default Category;


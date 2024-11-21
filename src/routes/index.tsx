import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../libs/queries";
import he from "he";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type PostType = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  comments: number;
};
function HomeComponent() {
  const [page, setPage] = useState(1);
  const postsQuery = useQuery({
    queryFn: async () => {
      const data = await getPosts(page);
      return data;
    },
    queryKey: ["posts", page],
  });
  return (
    <div className="p-2 text-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 pt-10">
        <h1 className="text-mobh1 lg:text-deskh1">Welcome To My Cool Blog!</h1>
        <p className="text-mobp text-zinc-700 lg:text-deskp">
          Choose an article and learn &amp; entertained.
        </p>
      </div>
      <div className="mx-auto mt-10 flex max-w-prose flex-col gap-8">
        {postsQuery.data &&
          postsQuery.data.posts != undefined &&
          postsQuery.data.posts.map((post: PostType) => (
            <Link>
              <article key={post.id} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-mobh3 lg:text-deskh3">
                    {he.decode(post.title)}
                  </h2>
                  <p className="text-mobp text-zinc-700 lg:text-deskp">
                    {he.decode(post.content)}
                  </p>
                </div>
                <p className="text-mobsmp text-zinc-500 lg:text-desksmp">
                  {post.comments} comments
                </p>
              </article>
            </Link>
          ))}
      </div>
      <div className="my-8 flex w-full justify-center gap-4">
        {postsQuery.data &&
          postsQuery.data.totalPages != undefined &&
          Array.from({ length: postsQuery.data.totalPages }).map((_, idx) => (
            <button
              type="button"
              className={`rounded-lg border border-zinc-300 bg-white p-2 shadow-md hover:bg-zinc-50 ${page === idx + 1 ? "font-bold" : ""}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

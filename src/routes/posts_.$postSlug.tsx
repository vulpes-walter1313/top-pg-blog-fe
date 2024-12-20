import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthCheck, getPost, getPostComments } from "../libs/queries";
import he from "he";
import { DateTime } from "luxon";
import CommentForm from "../components/CommentForm";
import { deleteComment } from "../libs/mutations";

export const Route = createFileRoute("/posts_/$postSlug")({
  component: PostPage,
});

type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
};
function PostPage() {
  const queryClient = useQueryClient();
  const params = Route.useParams();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getAuthCheck,
  });
  const [commentsPage, setCommentsPage] = useState(1);
  const postQuery = useQuery({
    queryKey: ["post", params.postSlug],
    queryFn: async () => {
      const data = await getPost(params.postSlug);
      return data;
    },
  });
  const commentsQuery = useQuery({
    queryKey: ["comments", params.postSlug, commentsPage],
    queryFn: async () => {
      const data = await getPostComments(params.postSlug, commentsPage);
      return data;
    },
  });

  const deleteCommentMuta = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", params.postSlug],
      });
    },
  });
  return (
    <div className="min-h-screen bg-zinc-50 py-14 text-zinc-950">
      <main className="mx-auto max-w-2xl">
        {postQuery.isSuccess && postQuery.data.post != undefined && (
          <div className="flex flex-col gap-4">
            <h1 className="text-mobh1 lg:text-deskh1">
              {he.decode(postQuery.data.post.title)}
            </h1>
            <p className="text-mobp text-zinc-700 lg:text-deskp">
              {he.decode(postQuery.data.post.content)}
            </p>
          </div>
        )}
        {postQuery.isError && (
          <p className="rounded-lg bg-red-100 px-3 text-red-800">
            {postQuery.error.message}
          </p>
        )}
        {postQuery.isLoading && <p className="animate-pulse">Loading...</p>}
      </main>
      <div>
        {commentsQuery.isSuccess &&
          commentsQuery.data.totalComments != undefined && (
            <h2 className="mx-auto mt-16 max-w-2xl text-mobh2 lg:text-deskh2">
              {commentsQuery.data.totalComments} Comments
            </h2>
          )}
        {userQuery.isSuccess && userQuery.data.success === true && (
          <CommentForm slug={params.postSlug} />
        )}
        <div className="mx-auto flex max-w-2xl flex-col gap-4 pt-8">
          {commentsQuery.isSuccess &&
            commentsQuery.data.success === true &&
            commentsQuery.data.comments.map((comment: CommentType) => {
              return (
                <div
                  key={comment.id}
                  className="border-l-2 border-emerald-400 px-2"
                >
                  <div>
                    <p className="text-mobsmp font-medium text-zinc-900 lg:text-deskp lg:font-medium">
                      {comment.author.firstName} {comment.author.lastName}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-mobxsp font-light text-zinc-600 lg:text-desksmp">
                        {DateTime.fromISO(comment.updatedAt).toLocaleString(
                          DateTime.DATETIME_MED,
                        )}
                      </p>
                      {((userQuery.data.user != undefined &&
                        userQuery.data.user.isAdmin === true) ||
                        (userQuery.data &&
                          userQuery.data.user &&
                          comment.author.id === userQuery.data.user.id)) && (
                        <button
                          type="button"
                          className="text-mobxsp text-red-700 underline lg:text-deskxsp"
                          onClick={() =>
                            deleteCommentMuta.mutate({
                              postSlug: params.postSlug,
                              commentId: comment.id,
                            })
                          }
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-mobp text-zinc-800 lg:text-deskp">
                    {he.decode(comment.content)}
                  </p>
                </div>
              );
            })}
        </div>
        {/* Pagination */}
        <div className="mx-auto my-8 flex max-w-2xl justify-center gap-4">
          {commentsQuery.isSuccess &&
            commentsQuery.data.totalPages != undefined &&
            Array.from({ length: commentsQuery.data.totalPages }).map(
              (_, idx) => {
                return (
                  <button
                    className={`h-8 w-8 place-content-center rounded-md border border-zinc-300 bg-white shadow-md ${commentsPage === idx + 1 ? "font-semibold" : ""}`}
                    onClick={() => setCommentsPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                );
              },
            )}
        </div>
      </div>
    </div>
  );
}

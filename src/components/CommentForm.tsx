import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { postComment } from "../libs/mutations";

type CommentFormInputs = {
  content: string;
};
type CommentFormProps = {
  slug: string;
};
export default function CommentForm({ slug }: CommentFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    resetField,
  } = useForm<CommentFormInputs>();
  const comment = watch("content");
  const commentLength = comment != undefined ? comment.length : 0;
  const postCommentMuta = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      resetField("content");
    },
  });

  const onSubmit: SubmitHandler<CommentFormInputs> = (data) => {
    console.log(`The following data will be sent to /posts/${slug}/comments`);
    console.log(data);
    postCommentMuta.mutate({ slug: slug, content: data.content });
  };
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <h3 className="text-mobh4 text-zinc-800 lg:text-deskh4">
        What&apos;s your take?
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="content"
            className="text-mobp font-medium text-zinc-800 lg:text-deskp lg:font-medium"
          >
            Comment
          </label>
          {errors.content && (
            <p className="rounded-lg bg-red-100 p-4 text-red-800">
              {errors.content.message}
            </p>
          )}
          <textarea
            id="content"
            className="h-36 rounded-lg border border-zinc-300 px-4 py-2 text-slate-700"
            {...register("content", {
              minLength: {
                value: 1,
                message: "Comment should not be empty",
              },
              maxLength: {
                value: 1024,
                message: "Your comment should be shorter than 1024 characters",
              },
            })}
          ></textarea>
          <p
            className={`self-end text-mobsmp lg:text-desksmp ${commentLength > 1024 ? "text-red-700" : "text-zinc-600"}`}
          >
            {commentLength}/1024
          </p>
        </div>
        <button className="self-start rounded-lg bg-emerald-600 px-6 py-2 text-mobp font-medium text-white lg:text-deskp lg:font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}

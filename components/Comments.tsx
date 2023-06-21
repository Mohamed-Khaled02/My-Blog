import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Post as PostType } from "../type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  post: PostType;
}

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

const Comments = ({ post }: Props) => {
  const [submmited, setSubmmited] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: session } = useSession();
  const router = useRouter();
  const handelUserError = () => {
    router.push("/api/auth/signin");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmmited(true);
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      .catch(() => {
        setSubmmited(false);
      });
  };

  return (
    <div className="px-4">
      <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">
        Enjoyed the article?
      </p>
      <h3 className="font-titleFont text-3xl font-bold">
        Leave a comment below!
      </h3>
      <hr className="py-3 mt-2" />
      {/*  The Form here */}
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 flex flex-col gap-6"
      >
        <input
          {...register("_id", { required: "this field required" })}
          type="hidden"
          value={post._id}
        />
        <label className="flex flex-col">
          <span className="font-fontTitle font-semibold text-base">Name</span>
          <input
            {...register("name", { required: "this field required" })}
            className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1
               px-4 outline-none focus-within:shadow-xl shadow-secondaryColor "
            type="text"
            placeholder="Enter your Name"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-fontTitle font-semibold text-base">Email</span>
          <input
            {...register("email", { required: "this field required" })}
            className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1
               px-4 outline-none focus-within:shadow-xl shadow-secondaryColor "
            type="email"
            placeholder="Enter your Email"
          />
        </label>
        <label className="flex flex-col">
          <textarea
            {...register("comment", { required: "this field required" })}
            className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1
               px-4 outline-none focus-within:shadow-xl shadow-secondaryColor "
            placeholder="Enter your Comments"
            rows={6}
          />
        </label>
        {session && (
          <button
            type="submit"
            className="w-full bg-bgColor text-white text-basse font-titleFont font-semibold 
              tracking-wider py-3 uppercase rounded-sm hover:bg-secondaryColor duration-300"
          >
            Submit
          </button>
        )}
      </form>
      {!session && (
        <button
          onClick={handelUserError}
          className="w-full bg-bgColor text-white text-basse font-titleFont font-semibold 
              tracking-wider py-3 uppercase rounded-sm hover:bg-secondaryColor duration-300"
        >
          Log in to submit!
        </button>
      )}
      {/* Comments */}
      <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
        <h3 className="text-3xl font-titleFont font-semibold">Comments:</h3>
        {post.comments.map((comment) => {
          return (
            // JSX code for rendering each comment
            <div key={comment._id} className="bg-gray-200 p-3 rounded-md">
              {/* Render comment content */}
              <p className="lowercase text-secondaryColor">
                <span className="font-semibold text- text-black">name:</span>{" "}
                {comment.name}
              </p>{" "}
              <p>
                <span className="font-semibold">comment:</span>{" "}
                {comment?.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiComment, BiHeart, BiSolidHeart, BiShare } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TextInput, CustomButton, Loading } from "../components";
import { useForm } from "react-hook-form";
import { postComments } from "../assets/data";

const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-12">
        <p className="text-ascent-2 ">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
            onClick={handleLike}
          >
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidHeart size={20} color="blue" />
            ) : (
              <BiHeart size={20} />
            )}
            {reply?.likes?.length} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-auto flex items-center jus gap-2 py-4">
        <div className="w-[50px]">
          {" "}
          <img
            src={user?.profileUrl ?? NoProfile}
            alt="User Image"
            className="w-[35px] h-[35px] rounded-full object-cover"
          />
        </div>

        <TextInput
          name="comment"
          styles="w-full rounded-lg py-3 "
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment"}
          register={register("comment", {
            required: "Comment can not be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />

        <span>
          {loading ? (
            <Loading />
          ) : (
            <CustomButton
              title="Post"
              type="submit"
              containerStyle="bg-[#258dee] text-white mt-1 py-2 px-3 rounded-lg font-semibold text-sm"
            />
          )}
        </span>
      </div>

      {errMsg?.message && (
        <span
          role="alert"
          className={`text-sm ${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}
    </form>
  );
};

export default function PostCard({ post, user, deletePost, likePost }) {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  };
  const handleLike = async (uri) => {
    await likePost(uri);
    await getComments(post?._id);
  };

  return (
    <div
      style={{ boxShadow: " 0px 70px 73px -33px rgba(0, 0, 0, 0.041)" }}
      className="mb-2 bg-primary l p-6 rounded-xl"
    >
      <div className="flex gap-3 items-center mb-2">
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt=""
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>

        <div>
          <div className="flex  justify-between items-center">
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.fullName}
              </p>
            </Link>

            {/* <BiDotsHorizontal size={25} className="items-end" /> */}
          </div>

          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 200)}

          {post?.description?.length > 200 &&
            (showAll === post?._id ? (
              <span
                className="text-[#258dee] ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-[#258dee] ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>

        {post?.image && (
          <img
            src={post?.image}
            alt=""
            className="w-full h-[450px] object-cover mt-2 rounded-lg"
          />
        )}
      </div>

      <div className="mt-2 flex justify-between items-center px-3 py-2 text-ascent-2 text-base">
        <div className="flex items-center gap-6">
          <p
            className="flex gap-1 items-center text-base cursor-pointer"
            onClick={() => handleLike(`/posts/like/${post?._id}`)}
          >
            {post?.likes?.includes(user?._id) ? (
              <BiSolidHeart size={20} color="red" />
            ) : (
              <BiHeart size={20} />
            )}
            <span>{post?.likes?.length}</span>
          </p>

          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              setShowComments(showComments === post._id ? null : post._id);
              getComments(post?._id);
            }}
          >
            <BiComment size={20} />
            {post?.comments?.length}
          </p>

          {user?._id === post?.userId?._id && (
            <div
              onClick={() => deletePost(post?._id)}
              className="flex gap-1 items-center text-base text-ascent-2 cursor-pointer "
            >
              <MdOutlineDeleteOutline size={20} className="hover:text-[red]" />
            </div>
          )}
        </div>

        <p className="flex gap-2 items-center text-base cursor-pointer">
          <BiShare size={20} />
        </p>
      </div>

      {/* COMMENTS */}
      {showComments === post?._id && (
        <div>
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />

          {loading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="w-full py-2" key={comment?._id}>
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={comment?.userId?.profileUrl ?? NoProfile}
                      alt={comment?.userId?.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId?.firstName} {comment?.userId?.lastName}
                      </p>
                    </Link>
                    <span className="text-ascent-2 text-sm">
                      {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
                    </span>
                  </div>
                </div>

                <div className="ml-14">
                  <p className="text-ascent-2">{comment?.comment}</p>

                  <div className="mt-2 flex gap-6">
                    <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
                      {comment?.likes?.includes(user?._id) ? (
                        <BiSolidHeart size={20} color="red" />
                      ) : (
                        <BiHeart size={20} />
                      )}
                      {comment?.likes?.length}
                    </p>
                    <span
                      className="text-blue cursor-pointer"
                      onClick={() => setReplyComments(comment?._id)}
                    >
                      Reply
                    </span>
                  </div>

                  {replyComments === comment?._id && (
                    <CommentForm
                      user={user}
                      id={comment?._id}
                      replyAt={comment?.from}
                      getComments={() => getComments(post?._id)}
                    />
                  )}
                </div>

                {/* REPLIES */}

                <div className="py-2 px-8 mt-6">
                  {comment?.replies?.length > 0 && (
                    <p
                      className="text-base text-ascent-1 cursor-pointer"
                      onClick={() =>
                        setShowReply(
                          showReply === comment?.replies?._id
                            ? 0
                            : comment?.replies?._id
                        )
                      }
                    >
                      Show Replies ({comment?.replies?.length})
                    </p>
                  )}

                  {showReply === comment?.replies?._id &&
                    comment?.replies?.map((reply) => (
                      <ReplyCard
                        reply={reply}
                        user={user}
                        key={reply?._id}
                        handleLike={() =>
                          handleLike(
                            `/posts/like-comments/${comment?._id}${"/"}${
                              reply?._id
                            }`
                          )
                        }
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No Comments, be first to comment
            </span>
          )}
        </div>
      )}
    </div>
  );
}

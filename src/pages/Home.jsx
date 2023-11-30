import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  FriendsCard,
  ProfileCard,
  TopBar,
  CreatePostModal,
  PostCard,
  Loading,
  EditProfile,
} from "../components";
import { BiCheck } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { NoProfile } from "../assets";
import { requests, suggest } from "../assets/data";
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { motion } from "framer-motion";
import { cardAnim, pageAnimation } from "../animations";
import { useEffect } from "react";
import { fetchPosts, likePost } from "../utils";

export default function Home() {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [modalOpen, setModalOpen] = useState(false);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editModalClose = () => {
    setModalOpen(false);
  };

  //Display Posts
  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch);
    setLoading(false);
  };
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });

    await fetchPost();
  };
  const handleDelete = async () => {};
  const fetchFriendRequests = async () => {};
  const fetchSuggestedFriends = async () => {};
  const acceptFriendRequest = async () => {};
  const getUser = async () => {};

  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);

  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="home w-full px-0  pb-20 2xl:px-40 lg:rounded-lg h-screen overflow-hidden"
    >
      <TopBar />

      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full px-4">
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user.friends} />
        </div>

        {/* CENTER */}
        <motion.div
          whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
          transition={{ duration: 0.5 }}
          className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg"
        >
          <form className="bg-primary px-4 rounded-lg">
            <div className="w-full flex flex-col justify-center items-center gap-4 py-8 px-10">
              <div className="flex flex-col items-center text-ascent-1 gap-3 text-lg">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 object-cover rounded-full"
                />
                <p>{user.firstName}</p>
              </div>
              <CustomButton
                onClick={openModal}
                title="Create a Post"
                containerStyle="bg-[#258dee] text-white py-2 px-6 rounded-lg font-semibold text-sm"
              />
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

          {loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts?.map((post) => (
              <PostCard
                key={post?._id}
                post={post}
                user={user}
                deletePost={handleDelete}
                likePost={handleLikePost}
              />
            ))
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-lg text-ascent-2 flex flex-col items-center">
                <span className="text-[500%]">😢</span>
                <span className="mt-12 text-2xl">No Post Available</span>
              </p>
            </div>
          )}
        </motion.div>

        {/* RIGHT */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          {/* FRIEND REQUEST */}
          <div
            style={{ boxShadow: " 0px 70px 73px -33px rgba(0, 0, 0, 0.041)" }}
            className="w-full bg-primary rounded-lg px-6 py-5"
          >
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-2">
              <span>Friend Request</span>
              <span>{friendRequest?.length}</span>
            </div>

            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map(({ _id, requestFrom: from }) => (
                <div key={_id} className="flex items-center justify-between">
                  <Link
                    to={`/profile/${from?._id}`}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={from?.profileUrl ?? NoProfile}
                      alt={from?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-3">
                    <BiCheck
                      size={25}
                      className="bg-[#258dee] text-white rounded-full"
                    />
                    <AiOutlineClose
                      size={25}
                      className="border border-[#959595] text-[#959595] rounded-full p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUGGESTED FRIENDS */}
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: " 0px 70px 73px -33px rgba(0, 0, 0, 0.041)" }}
            className="w-full bg-primary  rounded-lg px-5 py-5"
          >
            <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
              <span>Friend Suggestion</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends?.map((friend) => (
                <div
                  className="flex items-center justify-between"
                  key={friend._id}
                >
                  <Link
                    to={"/profile/" + friend?._id}
                    key={friend?._id}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt={friend?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1 ">
                      <p className="text-base font-medium text-ascent-1">
                        {friend?.firstName} {friend?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {friend?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <button
                      className="bg-[#258dee] text-sm text-white p-1 rounded"
                      onClick={() => {}}
                    >
                      <BsPersonFillAdd size={20} className="text-white p-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {modalOpen && (
        <CreatePostModal fetchPost={fetchPost()} onClose={closeModal} />
      )}
      {edit && <EditProfile onClose={editModalClose} />}
    </motion.div>
  );
}

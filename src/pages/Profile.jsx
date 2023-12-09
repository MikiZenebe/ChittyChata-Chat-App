import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const uri = "/posts/get-user-post/" + id;

  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  };

  const getPosts = async () => {
    await fetchPosts(user?.token, dispatch, uri);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await getPosts();
  };

  useEffect(() => {
    setLoading(false);
    getUser();
    getPosts();
  }, [id]);

  return (
    <>
      <div className="home w-full px-0  pb-20 2xl:px-40 lg:rounded-lg h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full px-4">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          {/* CENTER */}
          <div className=" flex-1 h-full bg-orimary px-4 flex flex-col gap-6 overflow-y-auto">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2 flex flex-col items-center">
                  <span className="text-[500%] animate-bounce">😢</span>
                  <span className="mt-12 text-2xl">No Post Available</span>
                </p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
}

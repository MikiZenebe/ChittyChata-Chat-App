import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { motion } from "framer-motion";

export default function FriendsCard({ friends }) {
  return (
    <div>
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        style={{ boxShadow: " 0px 70px 73px -33px rgba(0, 0, 0, 0.041)" }}
        className="w-full bg-primary rounded-lg px-6 py-5"
      >
        <div className="flex items-center justify-between text-ascent-1 pb-2 ">
          <span className="text-ascent-2 text-lg font-semibold">Friends</span>
          <span className="text-ascent-2 text-lg font-semibold">
            {friends?.length}
          </span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend) => (
            <Link
              to={`/profile/${friend._id}`}
              key={friend._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.fullName}
                className="w-10 h-10 object-cover rounded-full"
              />

              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {friend.fullName}
                </p>
                <span className="text-sm text-ascent-2">
                  @{friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

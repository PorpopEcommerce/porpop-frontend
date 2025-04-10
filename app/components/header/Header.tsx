import React from "react";
import { FaMessage, FaBell } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { activeUser } = useSelector((state: RootState) => state.user);
  const user = activeUser?.user;

  useEffect(() => {
      if (!user) {
        dispatch(fetchUserThunk()); // Fetch user details if not available
      }
    }, [dispatch, user]);

  return (
    <div className="sticky top-0 bg-[#1f2937] z-10 flex justify-end p-3 border-b">
      <div className="max-w-fit flex items-center text-white gap-3">
        <FaMessage className="text-[20px]" />
        <FaBell className="text-[20px]" />
        <div className="flex flex-col">
          <span className="text-white text-[12px]">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="text-white text-[12px]">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

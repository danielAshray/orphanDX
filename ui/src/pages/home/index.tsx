import React from "react";
import { localStorageUtil } from "@/lib/storage/localStorage";
import users from "@/data/users.json";
import { sessionStorageUtil } from "@/lib/storage/sessionStorage";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const Home: React.FC = () => {
  const userList: UserProps[] = users;

  localStorageUtil.set(STORAGE_KEYS.CURRENT_USER, userList[0]);
  sessionStorageUtil.set(STORAGE_KEYS.SETTINGS, userList[userList.length - 1]);

  return (
    <div className="bg-yellow-400/80 min-h-screen w-full flex flex-col items-center justify-center space-y-2">
      {(userList || []).map((item, index) => (
        <ul
          key={index}
          className="bg-green-400 w-full max-w-lg rounded-4xl p-4 space-y-0.5 drop-shadow-2xl"
        >
          <li>{item.id}</li>
          <li>{item.name}</li>
          <li>{item.email}</li>
          <li>{item.role}</li>
          <li>{item.createdAt}</li>
        </ul>
      ))}
    </div>
  );
};

export default Home;

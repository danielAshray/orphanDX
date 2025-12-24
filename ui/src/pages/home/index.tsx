import React from "react";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const Home: React.FC = () => {
  return (
    <div className="bg-yellow-400/80 min-h-screen w-full flex flex-col items-center justify-center space-y-2">
      home
    </div>
  );
};

export default Home;

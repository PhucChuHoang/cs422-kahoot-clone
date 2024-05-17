import Image from 'next/image';
import React from 'react';

interface UserDisplayProps {
  username: string;
  avatarUrl: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ username, avatarUrl }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">User Information</h1>
      <div className="flex flex-col items-center">
        <Image src={avatarUrl} alt="User Avatar" width={100} height={100} />
        <p className="font-bold">{username}</p>
      </div>
    </div>
  );
};

export default UserDisplay;

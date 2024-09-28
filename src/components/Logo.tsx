import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src="/assets/icons/logo-full.svg"
      height={1000}
      width={1000}
      alt="carepulse"
      className="mb-12  w-fit cursor-pointer"
    />
  );
};

export default Logo;

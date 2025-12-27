// import React from 'react'
// import { FaEnvelope } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";

// const linkData = [
//     {icon:<FaGithub/>, href: "https://github.com/Ak200102"},
//     {icon:<FaInstagram/>, href: "https://www.instagram.com/a.k.47_liftz?igsh=OWJmejB0eHE2cDhr"},
//     {icon:<FaLinkedin/>, href: "https://www.linkedin.com/in/aritra-karan-a460a11b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
//     {icon:<FaFacebook/>, href: "https://www.facebook.com/share/1A9brTjwHL/"},
//     {icon:<FaEnvelope/>, href: "https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsdHGVKVrzFzjLWcMTlbWwMDmQCzJZhXXHGxkgDDWPRxFxmVVBtgfqTcpqQVQhzFTlxvvSsb"},
// ]


// const SocialLinks = () => {
//   return (
//     <div className='text-xl text-white/50 flex items-center gap-x-2'>
//       {linkData?.map((item,index)=>(
//         <a key={index} href={item?.href} target='blank' className='border border-white/20 inline-flex p-2 rounded-full hover:text-white hover:border-white duration-300 cursor-pointer'>{item?.icon}</a>
//       ))}
//     </div>
//   )
// }

// export default SocialLinks
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { twMerge } from "tailwind-merge";

const linkData = [
    {icon:<FaGithub/>, href: "https://github.com/Ak200102"},
    {icon:<FaInstagram/>, href: "https://www.instagram.com/a.k.47_liftz?igsh=OWJmejB0eHE2cDhr"},
    {icon:<FaLinkedin/>, href: "https://www.linkedin.com/in/aritra-karan-a460a11b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    {icon:<FaFacebook/>, href: "https://www.facebook.com/share/1A9brTjwHL/"},
    {icon:<FaEnvelope/>, href: "https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsdHGVKVrzFzjLWcMTlbWwMDmQCzJZhXXHGxkgDDWPRxFxmVVBtgfqTcpqQVQhzFTlxvvSsb"},
]

const SocialLinks = ({ className, iconStyle }) => {
  return (
    <div
      className={twMerge(
        "text-xl pt-2 text-white/50 flex items-center gap-x-2",
        className
      )}
    >
      {linkData?.map((item, index) => (
        <a
          key={index}
          href={item?.href}
          className={twMerge(
            "border border-white/20 inline-flex p-2 rounded-full hover:text-white hover:border-white duration-300 cursor-pointer",
            iconStyle
          )}
        >
          {item?.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
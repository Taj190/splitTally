"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Footer = () => {
  const pathname = usePathname();
   const params = useParams();
   const groupName = params.groupName;  
  // Hide footer on specific dynamic routes
  const hideFooter = pathname.includes( groupName ) || pathname.includes("/transactiondetail");

  if (hideFooter) return null; // Do not render footer

  return (
    <footer className="bg-gray-900 text-white py-8 transition-opacity duration-500">
    <div className="container mx-auto px-4">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="flex items-center space-x-4">
          <PhoneIcon className="text-blue-400" />
          <span>+351931395409</span>
        </div>

        <div className="flex items-center space-x-4">
          <EmailIcon className="text-blue-400" />
          <span>support@splittally.com</span>
        </div>

        <div className="flex items-center space-x-4">
          <LocationOnIcon className="text-blue-400" />
          <span>Rua Caetano Feu, 8500-807, Portimao, Portugal</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
        <Link href="/" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <HomeIcon />
          <span>Home</span>
        </Link>

        <Link href="/login" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <LoginIcon />
          <span>Login</span>
        </Link>

        <Link href="/signup" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <HowToRegIcon />
          <span>Signup</span>
        </Link>
        
        <Link href="/privacypolicy" className="text-blue-400 hover:underline transition-colors">
          Privacy Policy
        </Link>
      </div>
    </div>

    <div className="text-center mt-8 text-sm text-gray-400">
      &copy; {new Date().getFullYear()} SplitTally. All rights reserved.
    </div>
  </footer>

  );
};

export default Footer;


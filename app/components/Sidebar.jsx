"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUserTie,
  FaBlog,
  FaSignInAlt,
  FaUserPlus,
  FaQuestion,
  FaLightbulb,
} from "react-icons/fa";
import { GoLaw } from "react-icons/go";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Icons-only Sidebar (visible when main sidebar is closed) */}
      <div className="fixed inset-y-0 right-0 bg-gray-800 w-16 hidden md:flex flex-col items-center py-4 space-y-4">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaHome size={20} />
        </Link>
        <Link
          href="/lawyers"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <GoLaw size={20} />
        </Link>
        <Link
          href="/clients"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaUserTie size={20} />
        </Link>
        <Link
          href="/blogs"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaBlog size={20} />
        </Link>
        <Link
          href="/questions"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaQuestion size={20} />
        </Link>
        <Link
          href="/opportunities"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaLightbulb size={20} />
        </Link>
        <Link
          href="/login"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaSignInAlt size={20} />
        </Link>
        <Link
          href="/register"
          onClick={handleLinkClick}
          className="text-white hover:text-gray-300 p-2"
        >
          <FaUserPlus size={20} />
        </Link>
      </div>

      {/* Full Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-64 lg:w-72 p-4 z-20`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 focus:outline-none focus:text-white absolute top-4 left-4"
        >
          ✖
        </button>

        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
          <nav className="space-y-4">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaHome />
              <span>الرئيسية</span>
            </Link>
            <Link
              href="/lawyers"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <GoLaw className="text-xl" />
              <span>المحامين</span>
            </Link>
            <Link
              href="/clients"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaUserTie />
              <span>العملاء</span>
            </Link>
            <Link
              href="/blogs"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaBlog />
              <span>المدونات</span>
            </Link>
            <Link
              href="/questions"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaQuestion />
              <span>الاسئله</span>
            </Link>
            <Link
              href="/opportunities"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaLightbulb />
              <span>الفرص</span>
            </Link>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaSignInAlt />
              <span>تسجيل الدخول</span>
            </Link>
            <Link
              href="/register"
              onClick={handleLinkClick}
              className="flex gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded"
            >
              <FaUserPlus />
              <span>تسجيل جديد</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Header content */}
      <div className="flex items-center p-4 gap-5 md:mr-16">
        <div className="">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-800 text-white rounded-md focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <div className="bg-blue-500 px-2 py-2 rounded-lg ">
          <p className="text-white text-lg font-bold">مرحباً بك أحمد 👋</p>
        </div>
      </div>
    </div>
  );
}

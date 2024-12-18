"use client";
import React from "react";
import { BsCashCoin, BsChatSquareText } from "react-icons/bs";
import { FaQuestionCircle, FaUserPlus } from "react-icons/fa";
import { format, endOfWeek, endOfMonth, subDays } from "date-fns";
import { ar } from "date-fns/locale";

export default function HomeCards() {
  const today = new Date();
  const weekEnd = endOfWeek(today, { weekStartsOn: 6 });
  const monthEnd = endOfMonth(today);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 md:px-20 font-['IBM_Plex_Sans_Arabic']">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800">الدخل</h3>
            <div className="space-y-2 mt-2">
              <p className="text-gray-600">
                يومياً:{" "}
               
                <span className="text-green-600 font-semibold pl-2">500 ر.س</span>
                <span className="text-xs text-gray-500 ">
                  {format(today, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
              <p className="text-gray-600">
                أسبوعياً:{" "}
                <span className="text-green-600 font-semibold">3,500 ر.س</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(weekEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
              <p className="text-gray-600">
                شهرياً:{" "}
                <span className="text-green-600 font-semibold">14,000 ر.س</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(monthEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
            </div>
          </div>
          <BsCashCoin className="text-4xl text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800">الأسئلة</h3>
            <div className="space-y-2 mt-2">
              <p className="text-gray-600">
                يومياً:{" "}
                <span className="text-xs text-gray-500 ml-8">
                  {format(today, "dd/MM/yyyy", { locale: ar })}
                </span>
                <span className="text-blue-600 font-semibold pl-2">15</span>
              </p>
              <p className="text-gray-600">
                أسبوعياً:{" "}
                <span className="text-blue-600 font-semibold">85</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(weekEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
              <p className="text-gray-600">
                شهرياً: <span className="text-blue-600 font-semibold">150</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(monthEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
            </div>
          </div>
          <FaQuestionCircle className="text-4xl text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800">الفرص</h3>
            <div className="space-y-2 mt-2">
              <p className="text-gray-600">
                يومياً:{" "}
                <span className="text-xs text-gray-500 ml-8">
                  {format(today, "dd/MM/yyyy", { locale: ar })}
                </span>
                <span className="text-orange-600 font-semibold pl-2">8</span>
              </p>
              <p className="text-gray-600">
                أسبوعياً:{" "}
                <span className="text-orange-600 font-semibold">45</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(weekEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
              <p className="text-gray-600">
                شهرياً:{" "}
                <span className="text-orange-600 font-semibold">85</span>
                <span className="text-xs text-gray-500 mr-2">
                  حتى {format(monthEnd, "dd/MM/yyyy", { locale: ar })}
                </span>
              </p>
            </div>
          </div>
          <BsChatSquareText className="text-4xl text-orange-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800">المحامين</h3>
            <div className="flex flex-col gap-3 mt-2">
              <div>
                <p className="text-3xl font-bold text-purple-600">75</p>
                <p className="text-sm text-gray-500">إجمالي المحامين</p>
              </div>
              <div className="border-t pt-3">
                <p className="text-3xl font-bold text-indigo-600">250</p>
                <p className="text-sm text-gray-500">إجمالي العملاء</p>
              </div>
            </div>
          </div>
          <FaUserPlus className="text-4xl text-purple-500" />
        </div>
      </div>
    </div>
  );
}

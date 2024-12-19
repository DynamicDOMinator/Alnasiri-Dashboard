"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Space,
  Card,
  Typography,
  Switch,
  Tooltip,
  Spin,
  Modal,
  Button,
} from "antd";
import { SearchOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";

function QuestionsData() {
  const sampleData = [
    {
      id: 1,
      askedBy: "أحمد محمد",
      question: "ما هي الإجراءات القانونية لتأسيس شركة ذات مسؤولية محدودة؟",
      questionDate: "2024-03-15",
      answeredBy: "محمد العبدالله",
      answer: "يتطلب تأسيس شركة ذات مسؤولية محدودة عدة خطوات...",
      answerDate: "2024-03-16",
      specialty: "القانون التجاري",
      status: "تمت الإجابة",
    },
    {
      id: 2,
      askedBy: "سارة أحمد",
      question: "ما هي حقوقي القانونية في حالة الفصل التعسفي؟",
      questionDate: "2024-03-14",
      answeredBy: null,
      answer: null,
      answerDate: null,
      specialty: "قانون العمل",
      status: "قيد الانتظار",
    },
  ];

  const [data, setData] = useState(sampleData);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (checked, recordId) => {
    setTimeout(() => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === recordId ? { ...item, status: checked } : item
        )
      );
    }, 0);
  };

  const showModal = (record) => {
    setSelectedLawyer(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedLawyer(null);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const getSearchableText = (record) => {
    return [
      record.askedBy,
      record.question,
      record.answeredBy,
      record.specialty,
      formatDate(record.questionDate),
      formatDate(record.answerDate),
    ]
      .join(" ")
      .toLowerCase();
  };

  const formatDate = (date) => {
    if (!date) return "لم تتم الإجابة بعد";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const columns = [
    {
      title: "رقم السؤال",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "السائل",
      dataIndex: "askedBy",
      key: "askedBy",
      sorter: (a, b) => a.askedBy.localeCompare(b.askedBy),
    },
    {
      title: "المجيب",
      dataIndex: "answeredBy",
      key: "answeredBy",
      render: (answeredBy) => answeredBy || "لم تتم الإجابة بعد",
      sorter: (a, b) => (a.answeredBy || "").localeCompare(b.answeredBy || ""),
    },
    {
      title: "تاريخ السؤال",
      dataIndex: "questionDate",
      key: "questionDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.questionDate) - new Date(b.questionDate),
    },
    {
      title: "تاريخ الإجابة",
      dataIndex: "answerDate",
      key: "answerDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.answerDate) - new Date(b.answerDate),
    },
    {
      title: "التخصص",
      dataIndex: "specialty",
      key: "specialty",
      render: (specialty) => (
        <div className="bg-blue-50 p-1 rounded text-sm">{specialty}</div>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div
          className={`px-2 py-1 rounded-full text-center text-sm ${
            status === "تمت الإجابة"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </div>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors border border-blue-500 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            عرض
          </button>

          <button
            onClick={() => handleEdit(record)}
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors border border-yellow-500 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            تعديل
          </button>

          <button
            onClick={() => handleDelete(record.id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors border border-red-500 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            حذف
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingQuestion(record);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (updatedQuestion) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedQuestion.id ? updatedQuestion : item
      )
    );
    setIsEditModalVisible(false);
    setEditingQuestion(null);
  };

  const handleDelete = (id) => {
    setQuestionToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.id !== questionToDelete));
    setIsDeleteModalVisible(false);
    setQuestionToDelete(null);
  };

  const filteredData = data.filter((item) =>
    getSearchableText(item).includes(searchText.toLowerCase())
  );

  return (
    <div className="rtl p-2 md:pr-24 md:pl-6 lg:pr-20 lg:pl-5">
      <Spin spinning={loading} tip="جاري التحميل...">
        <Card className="mb-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <UserOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <Typography.Text className="block text-gray-600">
                  إجمالي المحامين
                </Typography.Text>
                <Typography.Title level={4} className="!m-0">
                  {data.length}
                </Typography.Title>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-4">
          <Input
            placeholder="البحث في جميع الحقول"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            className="w-full md:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
            pagination={{
              pageSize: 10,
              responsive: true,
              size: "small",
            }}
            scroll={{ x: 800 }}
            size="small"
            className="whitespace-nowrap"
            loading={loading}
          />
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">تفاصيل السؤال</h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {selectedLawyer && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-blue-900">
                          السؤال
                        </h3>
                      </div>
                      <p className="text-blue-800">{selectedLawyer.question}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-green-900">
                          الإجابة
                        </h3>
                      </div>
                      <p className="text-green-800">
                        {selectedLawyer.answer || "لا يوجد إجابة حتى الآن"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">السائل</p>
                        <p className="font-semibold">
                          {selectedLawyer.askedBy}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">المجيب</p>
                        <p className="font-semibold">
                          {selectedLawyer.answeredBy || "لا يوجد"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600 mb-1">التخصص</p>
                      <div className="bg-white p-2 rounded shadow-sm">
                        {selectedLawyer.specialty}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">تاريخ السؤال</p>
                        <p className="font-semibold">
                          {formatDate(selectedLawyer?.questionDate)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">تاريخ الإجابة</p>
                        <p className="font-semibold">
                          {formatDate(selectedLawyer?.answerDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {isEditModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">تعديل السؤال</h2>
                  <button
                    onClick={() => setIsEditModalVisible(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {editingQuestion && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSubmit(editingQuestion);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-gray-700 mb-2">السؤال</label>
                      <textarea
                        value={editingQuestion.question}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            question: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        الإجابة
                      </label>
                      <textarea
                        value={editingQuestion.answer || ""}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            answer: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">التخصص</label>
                      <input
                        type="text"
                        value={editingQuestion.specialty}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            specialty: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditModalVisible(false)}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        حفظ التغييرات
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {isDeleteModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">حذف السؤال</h2>
                  <button
                    onClick={() => setIsDeleteModalVisible(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p>هل أنت متأكد من حذف هذا السؤال؟</p>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalVisible(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
}

export default QuestionsData;

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
  Select,
} from "antd";
import { SearchOutlined, UserOutlined, EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const lawSpecialties = [
  "القانون التجاري",
  "قانون العمل",
  "القانون الجنائي",
  "قانون الأسرة",
  "قانون الملكية الفكرية",
  "قانون الضرائب",
  "قانون العقوبات",
  "قانون البيئة",
];

function LeadsData() {
  const sampleData = [
    {
      id: 1,
      askedBy: "أحمد محمد",
      question: "ما هي الإجراءات القانونية لتأسيس شركة ذات مسؤولية محدودة؟",
      questionDate: "2024-03-15",
      answeredBy: "محمد العبدالله",
      answer: "يتطلب تأسيس شركة ذات مسؤولية محدودة عدة خطوات...",
      answerDate: "2024-03-16",
      specialty: ["القانون التجاري"],
      status: "تمت الإجابة",
      price: 1000,
      type: "عاجل",
      sold: 5,
    },
    {
      id: 2,
      askedBy: "سارة أحمد",
      question: "ما هي حقوقي القانونية في حالة الفصل التعسفي؟",
      questionDate: "2024-03-14",
      answeredBy: null,
      answer: null,
      answerDate: null,
      specialty: ["قانون العمل"],
      status: "قيد الانتظار",
      price: 500,
      type: "متوسط الأهمية",
      sold: 3,
    },
    {
      id: 3,
      askedBy: "علي حسن",
      question: "كيف يمكنني الطعن في قرار المحكمة؟",
      questionDate: "2024-03-12",
      answeredBy: "فاطمة الزهراء",
      answer: "يمكنك الطعن من خلال تقديم استئناف...",
      answerDate: "2024-03-13",
      specialty: ["القانون الجنائي"],
      status: "تمت الإجابة",
      price: 1500,
      type: "عاجل",
      sold: 0,
    },
    {
      id: 4,
      askedBy: "منى سعيد",
      question: "ما هي الإجراءات اللازمة لتسجيل علامة تجارية؟",
      questionDate: "2024-03-10",
      answeredBy: null,
      answer: null,
      answerDate: null,
      specialty: ["قانون الملكية الفكرية"],
      status: "قيد الانتظار",
      price: 800,
      type: "منخفض الأهمية",
      sold: 1,
    },
    {
      id: 5,
      askedBy: "يوسف علي",
      question: "ما هي حقوق المستأجر في حالة الإخلاء؟",
      questionDate: "2024-03-08",
      answeredBy: "علي العبدالله",
      answer: "للمستأجر حقوق معينة...",
      answerDate: "2024-03-09",
      specialty: ["قانون العمل"],
      status: "تمت الإجابة",
      price: 600,
      type: "متوسط الأهمية",
      sold: 2,
    },
    {
      id: 6,
      askedBy: "ليلى محمد",
      question: "كيف يمكنني الحصول على تعويض عن الأضرار؟",
      questionDate: "2024-03-05",
      answeredBy: null,
      answer: null,
      answerDate: null,
      specialty: ["قانون الضرائب"],
      status: "قيد الانتظار",
      price: 1200,
      type: "عاجل",
      sold: 0,
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
    if (!date) return "لم تتم الإجابة ب��د";
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
      title: "تاريخ الفرصة",
      dataIndex: "questionDate",
      key: "questionDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.questionDate) - new Date(b.questionDate),
    },
    {
      title: "تاريخ الإجابة",
      dataIndex: "answerDate",
      key: "answerDate",
      render: (date, record) => {
        return (
          <span>
            {record.sold > 0 ? "تاريخ الشراء" : "تاريخ الإجابة"}: {formatDate(date)}
          </span>
        );
      },
      sorter: (a, b) => new Date(a.answerDate) - new Date(b.answerDate),
    },
    {
      title: "التخصص",
      dataIndex: "specialty",
      key: "specialty",
      render: (specialty) => (
        <div className="bg-blue-50 p-1 rounded text-sm">
          {specialty.map((spec, index) => (
            <div key={index}>{spec}</div>
          ))}
        </div>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div
          className={`px-2 py-1 rounded-full text-center text-sm ${
            record.sold > 0
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {record.sold > 0 ? "تم البيع" : "لم يتم البيع بعد"}
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
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white  hover:bg-blue-600 transition-colors border border-blue-500 rounded-lg"
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
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white  hover:bg-yellow-600 transition-colors border border-yellow-500 rounded-lg"
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
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white  hover:bg-red-600 transition-colors border border-red-500 rounded-lg"
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
                <CheckCircleOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <Typography.Text className="block text-gray-600">
                  إجمالي الفرص
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
                        <h3 className="text-lg font-semibold text-blue-900">السؤال</h3>
                      </div>
                      <p className="text-blue-800">{selectedLawyer.question}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">السعر</h3>
                      </div>
                      <p className="text-gray-800">{selectedLawyer.price || "لم يتم تحديد السعر"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">نوع الفرصة</h3>
                      </div>
                      <p className="text-gray-800">{selectedLawyer.type || "لم يتم تحديد النوع"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">عدد المبيعات</h3>
                      </div>
                      <p className="text-gray-800">{selectedLawyer.sold || "لم يتم تحديد العدد"}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">السائل</p>
                        <p className="font-semibold">{selectedLawyer.askedBy}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">المجيب</p>
                        <p className="font-semibold">{selectedLawyer.answeredBy || "لا يوجد"}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600 mb-1">التخصص</p>
                      <div className="bg-white p-2 rounded shadow-sm">
                        {selectedLawyer.specialty.map((spec, index) => (
                          <div key={index}>{spec}</div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">تاريخ الفرصة</p>
                        <p className="font-semibold">{formatDate(selectedLawyer?.questionDate)}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 mb-1">تاريخ الإجابة</p>
                        <p className="font-semibold">{formatDate(selectedLawyer?.answerDate)}</p>
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
                      <label className="block text-gray-700 mb-2">السعر (SAR)</label>
                      <input
                        type="number"
                        value={editingQuestion.price || ""}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            price: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="أدخل السعر"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">نوع الفرصة</label>
                      <select
                        value={editingQuestion.type || ""}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            type: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">اختر نوع الفرصة</option>
                        <option value="عاجل">عاجل</option>
                        <option value="متوسط الأهمية">متوسط الأهمية</option>
                        <option value="منخفض الأهمية">منخفض الأهمية</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">عدد المبيعات</label>
                      <input
                        type="number"
                        value={editingQuestion.sold || ""}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            sold: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="أدخل عدد المبيعات"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">التخصصات</label>
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="اختر التخصصات"
                        value={editingQuestion.specialty}
                        onChange={(value) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            specialty: value,
                          })
                        }
                      >
                        {lawSpecialties.map((specialty) => (
                          <Option key={specialty} value={specialty}>
                            {specialty}
                          </Option>
                        ))}
                      </Select>
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

export default LeadsData;

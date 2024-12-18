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

function ClientData() {
  // Update sample data to use arrays for questions and opportunities
  const sampleData = [
    {
      id: 1,
      name: "أحمد محمد",
      phone: "0501234567",
      email: "ahmed@example.com",
      questions: ["كيف يمكنني تحسين أداء شركتي؟", "ما هي أفضل طرق التسويق؟"],
      opportunities: ["استشارات تسويقية", "تطوير استراتيجي"],
      status: true,
    },
    {
      id: 2,
      name: "سارة خالد",
      phone: "0559876543",
      email: "sara@example.com",
      questions: [
        "ما هي أفضل استراتيجيات التسويق الرقمي؟",
        "كيف أبدأ مشروعي الخاص؟",
      ],
      opportunities: ["تدريب موظفين", "استشارات مالية"],
      status: true,
    },
    {
      id: 3,
      name: "فاطمة العلي",
      phone: "0557891234",
      email: "fatima@example.com",
      questions: ["كيف أبدأ مشروعي الخاص؟", "ما هي متطلبات التصدير للخارج؟"],
      opportunities: ["استشارات مالية", "خدمات لوجستية"],
      status: true,
    },
    {
      id: 4,
      name: "عمر السعيد",
      phone: "0505557788",
      email: "omar@example.com",
      questions: ["كيف أبدأ مشروعي الخاص؟", "ما هي متطلبات التصدير للخارج؟"],
      opportunities: ["استشارات مالية", "خدمات لوجستية"],
      status: true,
    },
    {
      id: 5,
      name: "نورة القحطاني",
      phone: "0561234567",
      email: "noura@example.com",
      questions: ["كيف أطور مهارات فريق العمل؟", "ما هي أفضل طرق التسويق؟"],
      opportunities: ["برامج تدريبية", "استشارات تسويقية"],
      status: true,
    },
    {
      id: 6,
      name: "خالد المنصور",
      phone: "0509876543",
      email: "khalid@example.com",
      questions: [
        "ما هي أفضل حلول التجارة الإلكترونية؟",
        "كيف أزيد مبيعات المتجر الإلكتروني؟",
      ],
      opportunities: ["تطوير منصات", "تحسين المبيعات"],
      status: true,
    },
    {
      id: 7,
      name: "ريم الدوسري",
      phone: "0553334444",
      email: "reem@example.com",
      questions: ["كيف أحسن تجربة العملاء؟", "ما هي أفضل طرق إدارة المخزون؟"],
      opportunities: ["دراسات سوق", "إدارة سلسلة التوريد"],
      status: true,
    },
    {
      id: 8,
      name: "محمد العتيبي",
      phone: "0507778899",
      email: "mohammed@example.com",
      questions: [
        "ما هي استراتيجيات التوسع المناسبة؟",
        "كيف أبني علامة تجارية قوية؟",
      ],
      opportunities: ["خطط استراتيجية", "تسويق وعلامات تجارية"],
      status: true,
    },
    {
      id: 9,
      name: "منى الشمري",
      phone: "0562223333",
      email: "muna@example.com",
      questions: [
        "كيف أبني علامة تجارية قوية؟",
        "ما هي أفضل طرق إدارة المخزون؟",
      ],
      opportunities: ["تسويق وعلامات تجارية", "إدارة س��سلة التوريد"],
      status: true,
    },
    {
      id: 10,
      name: "يوسف الحربي",
      phone: "0508889999",
      email: "yousef@example.com",
      questions: [
        "ما هي أفضل طرق إدارة المخزون؟",
        "كيف أبني علامة تجارية قوية؟",
      ],
      opportunities: ["إدارة سلسلة التوريد", "تسويق وعلامات تجارية"],
      status: true,
    },
    {
      id: 11,
      name: "عبير السلمان",
      phone: "0554445555",
      email: "abeer@example.com",
      questions: [
        "كيف أزيد مبيعات المتجر الإلكتروني؟",
        "ما هي أفضل طرق إدارة المخزون؟",
      ],
      opportunities: ["تحسين المبيعات", "إدارة سلسلة التوريد"],
      status: true,
    },
    {
      id: 12,
      name: "طلال المطيري",
      phone: "0506667777",
      email: "talal@example.com",
      questions: [
        "ما هي متطلبات التوسع الدولي؟",
        "كيف أزيد مبيعات المتجر الإلكتروني؟",
      ],
      opportunities: ["استشارات دولية", "تحسين المبيعات"],
      status: true,
    },
  ];

  const [data, setData] = useState(sampleData);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (checked, recordId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === recordId ? { ...item, status: checked } : item
      )
    );
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "الرقم التعريفي",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return getSearchableText(record).includes(value.toLowerCase());
      },
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Tooltip title={email} placement="topLeft">
          <div className="truncate max-w-[200px]">{email}</div>
        </Tooltip>
      ),
    },
    {
      title: "الأسئلة",
      dataIndex: "questions",
      key: "questions",
      render: (questions) => (
        <div className="space-y-1">
          {Array.isArray(questions)
            ? questions.map((question, index) => (
                <Tooltip key={index} title={question} placement="topLeft">
                  <div className="bg-gray-50 p-1 rounded text-sm truncate max-w-[300px]">
                    {index + 1}. {question}
                  </div>
                </Tooltip>
              ))
            : questions}
        </div>
      ),
    },
    {
      title: "الفرص",
      dataIndex: "opportunities",
      key: "opportunities",
      render: (opportunities) => (
        <div className="space-y-1">
          {Array.isArray(opportunities)
            ? opportunities.map((opportunity, index) => (
                <Tooltip key={index} title={opportunity} placement="topLeft">
                  <div className="bg-blue-50 p-1 rounded text-sm truncate max-w-[300px]">
                    {index + 1}. {opportunity}
                  </div>
                </Tooltip>
              ))
            : opportunities}
        </div>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-4" key={`actions-${record.id}`}>
          <button
            onClick={() => handleStatusChange(!record.status, record.id)}
            className={`relative inline-flex items-center justify-center w-24 h-8 rounded-full transition-all duration-200 focus:outline-none ${
              record.status ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute z-10 text-xs font-medium transition-all duration-200 ${
                record.status 
                  ? 'text-white' 
                  : 'text-gray-700'
              }`}
            >
              {record.status ? 'نشط' : 'غير نشط'}
            </span>
            <span
              className={`absolute w-6 h-6 bg-white rounded-full shadow transition-all duration-200 ${
                record.status 
                  ? 'right-1' 
                  : 'left-1'
              }`}
            />
          </button>
          <button
            onClick={() => showModal(record)}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
          >
            <EyeOutlined /> عرض التفاصيل
          </button>
        </div>
      ),
    }
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const getSearchableText = (record) => {
    const questionsText = Array.isArray(record.questions)
      ? record.questions.join(" ")
      : record.questions;
    const opportunitiesText = Array.isArray(record.opportunities)
      ? record.opportunities.join(" ")
      : record.opportunities;

    return [
      record.name,
      record.email,
      record.phone,
      questionsText,
      opportunitiesText,
    ]
      .join(" ")
      .toLowerCase();
  };

  return (
    <div className="rtl p-2 md:pr-24 md:pl-6 lg:px-28">
      <Spin spinning={loading} tip="جاري التحميل...">
        <Card className="mb-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <UserOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <Typography.Text className="block text-gray-600">
                  إجمالي العملاء
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
            dataSource={data}
            rowKey="id"
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

        <Modal
          title={<div className="text-right">تفاصيل العميل</div>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={700}
          className="rtl"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الرقم التعريفي</p>
                  <p className="font-semibold">{selectedUser.id}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الاسم</p>
                  <p className="font-semibold">{selectedUser.name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">رقم الهاتف</p>
                  <p className="font-semibold">{selectedUser.phone}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">البريد الإلكتروني</p>
                  <p className="font-semibold">{selectedUser.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600 mb-2">الأسئلة</p>
                <div className="space-y-2">
                  {selectedUser.questions.map((question, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow-sm">
                      {index + 1}. {question}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600 mb-2">الفرص</p>
                <div className="space-y-2">
                  {selectedUser.opportunities.map((opportunity, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow-sm">
                      {index + 1}. {opportunity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600 mb-1">الحالة</p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                    selectedUser.status 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedUser.status ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>
          )}
        </Modal>
      </Spin>
    </div>
  );
}

export default ClientData;

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

function LawyersData() {
  const sampleData = [
    {
      id: 1,
      name: "محمد العبدالله",
      phone: "0501234567",
      email: "m.abdullah@example.com",
      specialties: ["القانون التجاري", "قانون الشركات"],
      answeredQuestions: "45 سؤال",
      joinDate: "2024-01-15",
      onlineStatus: true,
      amountSpent: 2500,
      boughtLeads: 23,
      status: true,
    },
    {
      id: 2,
      name: "سارة القحطاني",
      phone: "0502345678",
      email: "s.qahtani@example.com",
      specialties: ["قانون العمل", "القانون المدني"],
      answeredQuestions: "32 سؤال",
      joinDate: "2024-02-20",
      onlineStatus: false,
      amountSpent: 1800,
      boughtLeads: 15,
      status: true,
    },
    // Add more sample lawyers as needed
  ];

  const [data, setData] = useState(sampleData);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

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
      record.name,
      record.email,
      record.phone,
      record.specialties.join(" "),
    ]
      .join(" ")
      .toLowerCase();
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
      title: "التخصصات",
      dataIndex: "specialties",
      key: "specialties",
      render: (specialties) => (
        <div className="space-y-1">
          {specialties.map((specialty, index) => (
            <Tooltip key={index} title={specialty} placement="topLeft">
              <div className="bg-blue-50 p-1 rounded text-sm truncate max-w-[200px]">
                {specialty}
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      title: "تاريخ الانضمام",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date) => new Date(date).toLocaleDateString("en-US"),
    },
    {
      title: "الحالة",
      dataIndex: "onlineStatus",
      key: "onlineStatus",
      render: (online) => (
        <div
          className={`px-2 py-1 rounded-full text-center text-sm ${
            online ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {online ? "متصل" : "غير متصل"}
        </div>
      ),
    },
    {
      title: "الأسئلة المجاب عليها",
      dataIndex: "answeredQuestions",
      key: "answeredQuestions",
    },
    {
      title: "المبلغ المنفق",
      dataIndex: "amountSpent",
      key: "amountSpent",
      render: (amount) => `${amount.toLocaleString()} ريال`,
      sorter: (a, b) => a.amountSpent - b.amountSpent,
    },
    {
      title: "العملاء المشترى",
      dataIndex: "boughtLeads",
      key: "boughtLeads",
      sorter: (a, b) => a.boughtLeads - b.boughtLeads,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked, record.id)}
          checkedChildren="نشط"
          unCheckedChildren="غير نشط"
          className={status ? "bg-green-500" : "bg-gray-400"}
        />
      ),
    },
    {
      title: "عرض",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => showModal(record)}
          className="bg-blue-500"
          size="small"
        >
          عرض التفاصيل
        </Button>
      ),
    },
  ];

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
          title={<div className="text-right">تفاصيل المحامي</div>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={700}
          className="rtl"
        >
          {selectedLawyer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الرقم التعريفي</p>
                  <p className="font-semibold">{selectedLawyer.id}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الاسم</p>
                  <p className="font-semibold">{selectedLawyer.name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">رقم الهاتف</p>
                  <p className="font-semibold">{selectedLawyer.phone}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">البريد الإلكتروني</p>
                  <p className="font-semibold">{selectedLawyer.email}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">تاريخ الانضمام</p>
                  <p className="font-semibold">
                    {new Date(selectedLawyer.joinDate).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الحالة</p>
                  <div
                    className={`px-2 py-1 rounded-full text-center text-sm ${
                      selectedLawyer.onlineStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedLawyer.onlineStatus ? "متصل" : "غير متصل"}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600 mb-2">التخصصات</p>
                <div className="space-y-2">
                  {selectedLawyer.specialties.map((specialty, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow-sm">
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">الأسئلة المجاب عليها</p>
                  <p className="font-semibold">
                    {selectedLawyer.answeredQuestions}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">المبلغ المنفق</p>
                  <p className="font-semibold">
                    {selectedLawyer.amountSpent.toLocaleString()} ريال
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">العملاء المشترى</p>
                  <p className="font-semibold">{selectedLawyer.boughtLeads}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600 mb-1">الحالة</p>
                <Switch
                  checked={selectedLawyer.status}
                  onChange={(checked) =>
                    handleStatusChange(checked, selectedLawyer.id)
                  }
                  checkedChildren="نشط"
                  unCheckedChildren="غير نشط"
                  className={
                    selectedLawyer.status ? "bg-green-500" : "bg-gray-400"
                  }
                />
              </div>
            </div>
          )}
        </Modal>
      </Spin>
    </div>
  );
}

export default LawyersData;

"use client";
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Table,
  Input,
  Card,
  Typography,
  Switch,
  Modal,
  Button,
  ConfigProvider,
  theme,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  EditOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#ffffff",
    "#ff0000",
    "#ff4d00",
    "#ff9900",
    "#ffcc00",
    "#ffff00",
    "#b8ff00",
    "#80ff00",
    "#33ff00",
    "#00ff00",
    "#00ff40",
    "#00ff80",
    "#00ffbf",
    "#00ffff",
    "#00bfff",
    "#0080ff",
    "#0040ff",
    "#0000ff",
    "#4000ff",
    "#8000ff",
    "#bf00ff",
    "#ff00ff",
    "#ff00bf",
    "#ff0080",
    "#ff0040",
  ];

  const fontSizes = [
    "8pt",
    "10pt",
    "12pt",
    "14pt",
    "16pt",
    "18pt",
    "20pt",
    "24pt",
    "30pt",
    "36pt",
    "48pt",
    "60pt",
    "72pt",
    "96pt",
  ];

  return (
    <div className="border-b border-gray-200 p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        <Button
          type={editor.isActive("bold") ? "primary" : "default"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={<BoldOutlined />}
        />
        <Button
          type={editor.isActive("italic") ? "primary" : "default"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<ItalicOutlined />}
        />
        <Button
          type={editor.isActive("underline") ? "primary" : "default"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={<UnderlineOutlined />}
        />

        <select
          className="border rounded px-2 py-1"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(value) })
                .run();
            }
          }}
          value={
            editor.isActive("paragraph")
              ? "paragraph"
              : [1, 2, 3, 4, 5, 6].find((level) =>
                  editor.isActive("heading", { level })
                ) || ""
          }
        >
          <option value="paragraph">Normal Text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <select
          className="border rounded px-2 py-1"
          onChange={(e) => {
            editor.chain().focus().setStyle({ fontSize: e.target.value }).run();
          }}
        >
          <option value="">Font Size</option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1"
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          <option value="">Font Family</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <Button
          type={editor.isActive({ textAlign: "left" }) ? "primary" : "default"}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          icon={<AlignLeftOutlined />}
        />
        <Button
          type={
            editor.isActive({ textAlign: "center" }) ? "primary" : "default"
          }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          icon={<AlignCenterOutlined />}
        />
        <Button
          type={editor.isActive({ textAlign: "right" }) ? "primary" : "default"}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          icon={<AlignRightOutlined />}
        />

        <div className="relative inline-block">
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-8 h-8 p-1 border rounded"
          />
        </div>

        <div className="flex flex-wrap gap-1 items-center">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
              onClick={() => editor.chain().focus().setColor(color).run()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tiptap = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle.configure({
        types: ["textStyle"],
      }),
      Color,
      Underline,
      Link,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-4 min-h-[300px]" />
    </div>
  );
};

export default function TextEditor() {
  const [isMounted, setIsMounted] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "مقال قانوني عن حقوق العمال",
      author: "محمد العبدالله",
      publishDate: "2024-03-15",
      category: "قانون العمل",
      views: 245,
      status: true,
      content: "محتوى المقال...",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const getSearchableText = (record) => {
    return [record.title, record.author, record.category, record.content]
      .join(" ")
      .toLowerCase();
  };

  const filteredData = searchText
    ? blogs.filter((record) => getSearchableText(record).includes(searchText))
    : blogs;

  const { defaultAlgorithm } = theme;
  const customTheme = {
    algorithm: [defaultAlgorithm],
    components: {
      Button: {
        animation: false,
      },
      Modal: {
        animation: false,
      },
      Switch: {
        animation: false,
      },
    },
    token: {
      motion: false,
    },
  };

  const handlePublishBlog = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newBlog.title || !newBlog.author || !newBlog.category) {
      return;
    }

    const newBlogPost = {
      id: blogs.length + 1,
      title: newBlog.title,
      author: newBlog.author,
      publishDate: new Date().toISOString(),
      category: newBlog.category,
      views: 0,
      status: true,
      content: newBlog.content,
    };

    setBlogs((prev) => [...prev, newBlogPost]);
    setNewBlog({ title: "", author: "", category: "", content: "" });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
    setIsEditing(false);
  };

  const handleEditBlog = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedBlog) return;

    const updatedContent = selectedBlog.content;

    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === selectedBlog.id
          ? { ...selectedBlog, content: updatedContent }
          : blog
      )
    );

    handleModalClose();
  };

  const handleEditClick = (record) => {
    setSelectedBlog({ ...record });
    setIsModalVisible(true);
    setIsEditing(true);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
        <Card className="bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <FileTextOutlined className="text-blue-600 text-xl" />
            </div>
            <div>
              <Typography.Text className="block text-gray-600">
                إجمالي المقالات
              </Typography.Text>
              <Typography.Title level={4} className="!m-0">
                {blogs.length}
              </Typography.Title>
            </div>
          </div>
        </Card>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">إنشاء مقال جديد</h2>

          <div className="space-y-4 mb-4">
            <Input
              placeholder="عنوان المقال"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mb-4"
            />

            <Input
              placeholder="اسم الكاتب"
              value={newBlog.author}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, author: e.target.value }))
              }
              className="mb-4"
            />

            <Input
              placeholder="التصنيف"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, category: e.target.value }))
              }
              className="mb-4"
            />

            <Tiptap
              content={newBlog.content}
              onUpdate={(content) =>
                setNewBlog((prev) => ({ ...prev, content }))
              }
            />
          </div>

          <Button
            type="primary"
            onClick={handlePublishBlog}
            onMouseDown={(e) => e.preventDefault()}
            className="bg-blue-500 mt-10 hover:bg-blue-600"
            disabled={!newBlog.title || !newBlog.author || !newBlog.category}
          >
            نشر المقال
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">المقالات المنشورة</h2>

          <div className="mb-4">
            <Input
              placeholder="البحث في جميع الحقول"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              className="w-full md:w-64"
            />
          </div>

          <Table
            columns={[
              {
                title: "العنوان",
                dataIndex: "title",
                key: "title",
                sorter: (a, b) => a.title.localeCompare(b.title),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "الكاتب",
                dataIndex: "author",
                key: "author",
                sorter: (a, b) => a.author.localeCompare(b.author),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "المحتوى",
                dataIndex: "content",
                key: "content",
                render: (content, record) => (
                  <div>
                    <div
                      className="truncate max-w-[300px] cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog({ ...record });
                        setIsModalVisible(true);
                        setIsEditing(true);
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          content.length > 150
                            ? content.substring(0, 150) + "..."
                            : content,
                      }}
                    />
                  </div>
                ),
              },
              {
                title: "تاريخ النشر",
                dataIndex: "publishDate",
                key: "publishDate",
                sorter: (a, b) =>
                  new Date(a.publishDate) - new Date(b.publishDate),
                sortDirections: ["ascend", "descend"],
                render: (date) => new Date(date).toLocaleDateString("en-US"),
              },
              {
                title: "التصنيف",
                dataIndex: "category",
                key: "category",
                sorter: (a, b) => a.category.localeCompare(b.category),
                sortDirections: ["ascend", "descend"],
                filters: [...new Set(blogs.map((blog) => blog.category))].map(
                  (category) => ({
                    text: category,
                    value: category,
                  })
                ),
                onFilter: (value, record) => record.category === value,
              },
              {
                title: "الحالة",
                dataIndex: "status",
                key: "status",
                filters: [
                  { text: "منشور", value: true },
                  { text: "مسودة", value: false },
                ],
                onFilter: (value, record) => record.status === value,
                render: (status, record) => (
                  <Switch
                    checked={status}
                    onChange={(checked) => {
                      setBlogs((prev) =>
                        prev.map((blog) =>
                          blog.id === record.id
                            ? { ...blog, status: checked }
                            : blog
                        )
                      );
                    }}
                    checkedChildren="منشور"
                    unCheckedChildren="مسودة"
                    className={status ? "bg-green-500" : "bg-gray-400"}
                  />
                ),
              },
              {
                title: "الاجراءات",
                key: "actions",
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(record);
                    }}
                    className="bg-blue-500"
                    icon={<EditOutlined />}
                  >
                    تعديل
                  </Button>
                ),
              },
            ]}
            dataSource={filteredData}
            rowKey="id"
            pagination={false}
            onChange={(_, filters, sorter) => {
              console.log("Table parameters:", { filters, sorter });
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title="تعديل المقال"
          open={isModalVisible}
          onCancel={(e) => {
            e.stopPropagation();
            handleModalClose();
          }}
          footer={[
            <div
              key="footer-buttons"
              className="mt-24 flex items-center flex-row-reverse gap-5"
            >
              <Button
                key="cancel"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalClose();
                }}
              >
                إلغاء
              </Button>
              <Button
                key="submit"
                type="primary"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleEditBlog}
                className="bg-blue-500 hover:bg-blue-600"
              >
                حفظ التغييرات
              </Button>
            </div>,
          ]}
          width={800}
        >
          {selectedBlog && (
            <div className="space-y-4">
              <Input
                placeholder="عنوان المقال"
                value={selectedBlog.title}
                onChange={(e) =>
                  setSelectedBlog((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="mb-4"
              />

              <Input
                placeholder="اسم الكاتب"
                value={selectedBlog.author}
                onChange={(e) =>
                  setSelectedBlog((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="mb-4"
              />

              <Input
                placeholder="التصنيف"
                value={selectedBlog.category}
                onChange={(e) =>
                  setSelectedBlog((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="mb-4"
              />

              <Tiptap
                content={selectedBlog.content}
                onUpdate={(content) =>
                  setSelectedBlog((prev) => ({ ...prev, content }))
                }
              />
            </div>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}

"use client";

import { useState, useRef } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import Icon from '@/components/ui/AppIcon';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Getting Started with VMR', author: 'Admin', status: 'published', date: '2024-01-15', views: 1250 },
    { id: 2, title: 'Product Care Tips', author: 'Admin', status: 'draft', date: '2024-01-20', views: 890 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: 'General', status: 'draft', image: '' });
  const [imagePreview, setImagePreview] = useState('');
  const editorRef = useRef<any>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(b => b.id !== id));
      toast.success('Blog deleted successfully');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({...formData, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: blogs.length + 1,
      title: formData.title,
      author: 'Admin',
      status: formData.status,
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setBlogs([...blogs, newBlog]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', excerpt: '', category: 'General', status: 'draft', image: '' });
    setImagePreview('');
    toast.success('Blog created successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 min-w-0 h-[calc(100vh-64px)] overflow-y-auto">
          <Breadcrumb />
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-espresso">Blog Posts ({blogs.length})</h1>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                <Icon name="PlusIcon" size={20} />
                Add New Post
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{blog.id}</td>
                      <td className="px-4 py-3 font-medium">{blog.title}</td>
                      <td className="px-4 py-3 text-xs">{blog.author}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">{new Date(blog.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-xs">{blog.views}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="View">
                            <Icon name="EyeIcon" size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Edit">
                            <Icon name="PencilSquareIcon" size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" title="Delete" onClick={() => handleDelete(blog.id)}>
                            <Icon name="TrashIcon" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-espresso">Create New Blog Post</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Icon name="PhotoIcon" size={20} />
                    <span className="text-sm">Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="General">General</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="News">News</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt <span className="text-red-500">*</span> <span className="text-xs text-gray-500">(50-250 characters)</span></label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  minLength={50}
                  maxLength={250}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a brief excerpt (50-250 characters)"
                />
                {/* <div className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/250 characters</div> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <Editor
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  licenseKey="gpl"
                  onInit={(evt, editor) => editorRef.current = editor}
                  value={formData.content}
                  onEditorChange={(content) => setFormData({...formData, content})}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | code fullscreen | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Create Post
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

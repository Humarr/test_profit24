"use client";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/toast/useToast";
import { Plus, Trash2, Edit, X } from "lucide-react";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import CustomSelect from "@/components/admin/CustomSelect";
// import { ENDPOINT_URL } from '../../../../endpoint'

interface Resource {
  id: string;
  title: string;
  fileUrl: string;
  thumbnailUrl: string;
  category: "LEARN_WITH_US" | "FOREX_SIGNAL";
}

export default function AdminResourcesPage() {
  const toast = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "LEARN_WITH_US",
    fileUrl: "",
    thumbnailUrl: "",
  });

  const categoryOptions = [
    { value: "LEARN_WITH_US", label: "Learn With Us" },
    { value: "FOREX_SIGNAL", label: "Forex Signal" },
  ];

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/resources`, {
        method: 'GET',
        // cache: 'no-store', // ensure it's always fresh
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResources(data.resources);
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Failed");
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  function openAdd() {
    setEditing(null);
    setForm({ title: "", category: "LEARN_WITH_US", fileUrl: "", thumbnailUrl: "" });
    setShowForm(true);
  }

  function openEdit(r: Resource) {
    setEditing(r);
    setForm({ title: r.title, category: r.category, fileUrl: r.fileUrl, thumbnailUrl: r.thumbnailUrl });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete resource?")) return;
    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast("Deleted", "success");
      setResources((rs) => rs.filter((r) => r.id !== id));
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Failed");
      toast(err.message, "error");
    }
  }

  async function handleSubmit() {
    const url = editing
      ? `/api/admin/resources/${editing.id}`
      : `/api/admin/resources`;
    const method = editing ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast(editing ? "Updated" : "Added", "success");
      setShowForm(false);
      fetchResources();
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Failed");
      toast(err.message, "error");
    }
  }

  // async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const fd = new FormData();
  //   fd.append("file", file);
  //   fd.append(
  //     "upload_preset",
  //     process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  //   );
  //   fd.append("folder", "resources");

  //   setUploading(true);
  //   setUploadProgress(0);
  //   try {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(
  //       "POST",
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  //     );
  //     xhr.upload.onprogress = (e) =>
  //       setUploadProgress(Math.round((e.loaded * 100) / (e.total || 1)));
  //     xhr.onload = () => {
  //       const res = JSON.parse(xhr.responseText);
  //       if (xhr.status !== 200) throw new Error("Upload failed");
  //       setForm((prev) => ({ ...prev, fileUrl: res.secure_url }));
  //       toast("File uploaded", "success");
  //       setUploading(false);
  //     };
  //     xhr.onerror = () => {
  //       setUploading(false);
  //       toast("Upload error", "error");
  //     };
  //     xhr.send(fd);
  //   } catch (e) {
  //     const err = e instanceof Error ? e : new Error("Upload failed");
  //     setUploading(false);
  //     toast(err.message, "error");
  //   }
  // }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setUploading(true);
    setUploadProgress(0);
  
    try {
      // Common FormData values
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  
      // ---------- 1. Upload for Thumbnail (image)
      const imageFd = new FormData();
      imageFd.append("file", file);
      imageFd.append("upload_preset", uploadPreset);
      imageFd.append("folder", "resources/previews");
  
      const imageUpload = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: imageFd,
        }
      ).then((res) => res.json());
  
      // ---------- 2. Upload for Download (raw)
      const rawFd = new FormData();
      rawFd.append("file", file);
      rawFd.append("upload_preset", uploadPreset);
      rawFd.append("folder", "resources/files");
  
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
      );
      xhr.upload.onprogress = (e) =>
        setUploadProgress(Math.round((e.loaded * 100) / (e.total || 1)));
  
      xhr.onload = () => {
        const rawUpload = JSON.parse(xhr.responseText);
        if (xhr.status !== 200) throw new Error("Upload failed");
  
        // ✅ Set both thumbnail and raw file URL
        setForm((prev) => ({
          ...prev,
          fileUrl: rawUpload.secure_url,
          thumbnailUrl: imageUpload.secure_url,
        }));
  
        toast("File uploaded", "success");
        setUploading(false);
      };
  
      xhr.onerror = () => {
        setUploading(false);
        toast("Upload error", "error");
      };
  
      xhr.send(rawFd);
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Upload failed");
      setUploading(false);
      toast(err.message, "error");
    }
  }
  

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-brand-purple-700">
          Manage Resources
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-brand-purple-700 text-white px-3 py-1 rounded hover:bg-brand-purple-800"
        >
          <Plus size={16} />
          <span>Add Resource</span>
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        ["LEARN_WITH_US", "FOREX_SIGNAL"].map((cat) => (
          <div key={cat} className="mb-6">
            <h2 className="font-semibold text-brand-purple-600 mb-2">
              {cat.replace("_", " ")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter((r) => r.category === cat).length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Image
                    src="https://www.svgrepo.com/show/327408/document-search.svg"
                    alt="No resources"
                    width={100}
                    height={100}
                    className="mx-auto w-24 h-24 opacity-50 mb-4"
                  />
                  <p className="text-sm text-gray-500">
                    No resources in this category yet.
                  </p>
                </div>
              ) : (
                resources
                  .filter((r) => r.category === cat)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded shadow p-4 flex flex-col"
                    >
                      <div className="flex-1">
                        <p className="font-semibold font-sans text-brand-slate-700">{r.title}</p>
                        <a
                          href={r.fileUrl}
                          target="_blank"
                          className="text-sm text-brand-purple-600 underline"
                        >
                          Download
                        </a>
                      </div>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => openEdit(r)}
                          className="text-brand-purple-700 hover:text-brand-purple-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-brand-purple-600">
              {editing ? "Edit" : "Add"} Resource
            </h2>
            <input
              className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <CustomSelect
              options={categoryOptions}
              value={form.category}
              onChange={(val) => setForm({ ...form, category: val })}
              placeholder="Select Category"
            />

            {/* Upload Box */}
            <div className="space-y-1">
              <label className="block text-sm text-brand-slate-400">
                Upload PDF
              </label>
              {uploading ? (
                <div className="w-full h-16 flex items-center justify-center border-2 border-dashed border-brand-purple-200 rounded-lg">
                  <svg
                    className="animate-spin h-6 w-6 text-brand-purple-600 mr-2 stroke-2 stroke-brand-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <circle
                      className="opacity-25 "
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                  <span className="text-brand-purple-600">{uploadProgress}%</span>
                </div>
              ) : form.fileUrl ? (
                <div className="flex items-center justify-between border rounded px-3 py-2 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-500">
                  <span className="truncate">
                    {form.fileUrl.split("/").pop()}
                  </span>
                  <button
                    onClick={() => setForm({ ...form, fileUrl: "" })}
                    className="text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-16 flex items-center justify-center text-brand-purple-600 border-2 border-dashed rounded-lg cursor-pointer hover:bg-brand-purple-50 ">
                  Click to upload PDF
                  <input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="w-full py-3 border rounded border-brand-purple-300 hover:bg-brand-purple-100 font-sans bg-brand-purple-50/50 text-brand-slate-700"
              >
                Cancel
              </button>
              <button
                disabled={uploading || !form.fileUrl}
                onClick={handleSubmit}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 transition font-sans cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

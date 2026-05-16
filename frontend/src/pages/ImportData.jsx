import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

function ImportData() {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleImport =
    async () => {
      if (!file) {
        toast.error(
          "Please select a file"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const toastId =
        toast.loading(
          "Importing inventory..."
        );

      try {
        setLoading(true);

        await axios.post(
          "https://exquisite-gems-erp.onrender.com/api/import",
          formData
        );

        toast.success(
          "Inventory imported successfully",
          {
            id: toastId,
          }
        );

        setTimeout(() => {
          window.location.href =
            "/inventory";
        }, 1200);
      } catch (error) {
        console.log(error);

        toast.error(
          "Import failed",
          {
            id: toastId,
          }
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <MainLayout>
      <div className="bg-white border border-[#dfe5ea] rounded-[28px] p-10 max-w-4xl mx-auto shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="mb-10">
          <h1 className="text-5xl font-black text-[#1f2933] mb-4">
            Import Jewellery Data
          </h1>

          <p className="text-[#7b8794] text-lg leading-relaxed">
            Upload Excel or CSV
            files to bulk import
            jewellery inventory.
          </p>
        </div>

        <div className="border-2 border-dashed border-[#cbd5df] rounded-[24px] p-14 text-center bg-[#f8fafb]">
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
          />

          {file && (
            <div className="mt-6">
              <p className="text-[#31475a] font-semibold">
                {file.name}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-10 bg-[#31475a] hover:bg-[#3d556b] disabled:opacity-60 text-white px-10 py-4 rounded-[18px] font-bold transition-all duration-300 shadow-md"
        >
          {loading
            ? "Importing..."
            : "Import Data"}
        </button>
      </div>
    </MainLayout>
  );
}

export default ImportData;
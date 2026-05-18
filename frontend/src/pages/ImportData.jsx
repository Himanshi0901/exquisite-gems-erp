import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

function ImportData() {
  const [
    excelFile,
    setExcelFile,
  ] = useState(null);

  const [zipFile, setZipFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleImport =
    async () => {
      if (
        !excelFile ||
        !zipFile
      ) {
        toast.error(
          "Please select Excel and ZIP files"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "excel",
        excelFile
      );

      formData.append(
        "zip",
        zipFile
      );

      const toastId =
        toast.loading(
          "Importing inventory..."
        );

      try {
        setLoading(true);

        await axios.post(
          "https://exquisite-gems-erp.onrender.com/api/import",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
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
        }, 1500);
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response
            ?.data?.error ||
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
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-5xl font-black text-[#1f2933] mb-4">
            Import Jewellery Data
          </h1>

          <p className="text-[#7b8794] text-lg leading-relaxed">
            Upload Excel file
            along with ZIP
            containing jewellery
            images.
          </p>
        </div>

        {/* EXCEL */}

        <div className="border-2 border-dashed border-[#cbd5df] rounded-[24px] p-8 bg-[#f8fafb] mb-6">
          <h2 className="text-xl font-bold text-[#31475a] mb-4">
            Upload Excel File
          </h2>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) =>
              setExcelFile(
                e.target.files[0]
              )
            }
            className="w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
          />

          {excelFile && (
            <div className="mt-4">
              <p className="text-[#31475a] font-semibold">
                {
                  excelFile.name
                }
              </p>
            </div>
          )}
        </div>

        {/* ZIP */}

        <div className="border-2 border-dashed border-[#cbd5df] rounded-[24px] p-8 bg-[#f8fafb]">
          <h2 className="text-xl font-bold text-[#31475a] mb-4">
            Upload Images ZIP
          </h2>

          <input
            type="file"
            accept=".zip"
            onChange={(e) =>
              setZipFile(
                e.target.files[0]
              )
            }
            className="w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
          />

          {zipFile && (
            <div className="mt-4">
              <p className="text-[#31475a] font-semibold">
                {zipFile.name}
              </p>
            </div>
          )}
        </div>

        {/* BUTTON */}

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-10 bg-[#31475a] hover:bg-[#3d556b] disabled:opacity-60 text-white px-10 py-4 rounded-[18px] font-bold transition-all duration-300 shadow-md"
        >
          {loading
            ? "Importing..."
            : "Import Data"}
        </button>

        {/* NOTE */}

        <div className="mt-8 bg-[#f8fafb] border border-[#dfe5ea] rounded-[20px] p-6">
          <h3 className="font-bold text-[#31475a] mb-2">
            Important Notes
          </h3>

          <ul className="text-[#52606d] text-sm leading-7 list-disc pl-5">
            <li>
              Image names must
              exactly match SKU
              numbers.
            </li>

            <li>
              Example:
              SKU123.jpg
            </li>

            <li>
              Upload all images
              inside ONE ZIP file.
            </li>

            <li>
              Supported image
              formats: JPG, PNG,
              WEBP
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default ImportData;
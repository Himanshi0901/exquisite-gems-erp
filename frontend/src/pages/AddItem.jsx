import {
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

function AddItem() {
  const [loading, setLoading] =
    useState(false);

  const [file, setFile] =
    useState(null);

  const handleImport =
    async () => {
      if (!file) {
        alert(
          "Please select a file"
        );

        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        await axios.post(
          "https://exquisite-gems-erp.onrender.com/api/import",
          formData
        );

        alert(
          "Inventory imported successfully"
        );

        setFile(null);
      } catch (error) {
        console.log(error);

        alert(
          "Import failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#1f2933]">
          </h1>

          <p className="text-[#6b7280] mt-2">
            Upload inventory
            Excel or CSV files
            to import jewellery
            items automatically
          </p>
        </div>

        {/* IMPORT BOX */}

        <div className="bg-white border border-[#dfe5ea] rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="border-2 border-dashed border-[#cbd5df] rounded-[28px] p-8 md:p-14 text-center bg-[#f8fafb]">
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-black text-[#31475a]">
                Upload Inventory Sheet
              </h2>

              <p className="text-[#7b8794] mt-3 text-sm leading-relaxed">
                Supported formats:
                .xlsx and .csv
              </p>

              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={(e) =>
                  setFile(
                    e.target
                      .files[0]
                  )
                }
                className="mt-8 w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
              />

              {file && (
                <div className="mt-6 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                  <p className="text-[#31475a] font-bold truncate">
                    {
                      file.name
                    }
                  </p>
                </div>
              )}

              <button
                onClick={
                  handleImport
                }
                disabled={
                  loading
                }
                className="mt-8 w-full md:w-auto bg-[#31475a] hover:bg-[#3d556b] text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
              >
                {loading
                  ? "Importing Inventory..."
                  : "Import Inventory"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddItem;
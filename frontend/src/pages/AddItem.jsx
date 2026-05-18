import {
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

function AddItem() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    excelFile,
    setExcelFile,
  ] = useState(null);

  const [zipFile, setZipFile] =
    useState(null);

  const handleImport =
    async () => {
      if (
        !excelFile ||
        !zipFile
      ) {
        alert(
          "Please select Excel and ZIP files"
        );

        return;
      }

      try {
        setLoading(true);

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

        alert(
          "Inventory imported successfully"
        );

        setExcelFile(
          null
        );

        setZipFile(
          null
        );
      } catch (error) {
        console.log(error);

        alert(
          error?.response
            ?.data?.error ||
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
          <p className="text-[#6b7280] mt-2">
            Upload inventory
            Excel file along
            with ZIP file
            containing images.
          </p>
        </div>

        {/* IMPORT BOX */}

        <div className="bg-white border border-[#dfe5ea] rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="border-2 border-dashed border-[#cbd5df] rounded-[28px] p-8 md:p-14 text-center bg-[#f8fafb]">
            <div className="max-w-xl mx-auto">
              {/* EXCEL */}

              <h2 className="text-2xl font-black text-[#31475a]">
                Upload Excel File
              </h2>

              <p className="text-[#7b8794] mt-3 text-sm leading-relaxed">
                Supported formats:
                .xlsx and .csv
              </p>

              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={(e) =>
                  setExcelFile(
                    e.target
                      .files[0]
                  )
                }
                className="mt-8 w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
              />

              {excelFile && (
                <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                  <p className="text-[#31475a] font-bold truncate">
                    {
                      excelFile.name
                    }
                  </p>
                </div>
              )}

              {/* ZIP */}

              <div className="mt-10">
                <h2 className="text-2xl font-black text-[#31475a]">
                  Upload Images ZIP
                </h2>

                <p className="text-[#7b8794] mt-3 text-sm leading-relaxed">
                  ZIP should
                  contain images
                  named exactly as
                  SKU numbers.
                </p>

                <input
                  type="file"
                  accept=".zip,application/zip"
                  onChange={(
                    e
                  ) =>
                    setZipFile(
                      e.target
                        .files[0]
                    )
                  }
                  className="mt-8 w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
                />

                {zipFile && (
                  <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                    <p className="text-[#31475a] font-bold truncate">
                      {
                        zipFile.name
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* BUTTON */}

              <button
                onClick={
                  handleImport
                }
                disabled={
                  loading
                }
                className="mt-10 w-full md:w-auto bg-[#31475a] hover:bg-[#3d556b] text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
              >
                {loading
                  ? "Importing Inventory..."
                  : "Import Inventory"}
              </button>

              {/* NOTES */}

              <div className="mt-10 bg-white border border-[#dfe5ea] rounded-[20px] p-5 text-left">
                <h3 className="font-bold text-[#31475a] mb-3">
                  Important Notes
                </h3>

                <ul className="text-sm text-[#52606d] space-y-2 list-disc pl-5">
                  <li>
                    Image names
                    must exactly
                    match SKU
                    numbers
                  </li>

                  <li>
                    Example:
                    SKU123.jpg
                  </li>

                  <li>
                    Upload all
                    images inside
                    ONE ZIP file
                  </li>

                  <li>
                    Supported image
                    formats: JPG,
                    PNG, WEBP
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddItem;
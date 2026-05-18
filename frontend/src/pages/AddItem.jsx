import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function AddItem() {
  const navigate =
    useNavigate();

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

  const [
    imageFiles,
    setImageFiles,
  ] = useState([]);

  const handleImport =
    async () => {
      if (!excelFile) {
        alert(
          "Please select Excel file"
        );

        return;
      }

      if (
        !zipFile &&
        imageFiles.length === 0
      ) {
        alert(
          "Please upload ZIP or images"
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

        if (zipFile) {
          formData.append(
            "zip",
            zipFile
          );
        }

        imageFiles.forEach(
          (image) => {
            formData.append(
              "images",
              image
            );
          }
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

        setImageFiles([]);

        navigate(
          "/inventory"
        );

        window.location.reload();
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
          <p className="text-[#6b7280] mt-2 text-sm md:text-base">
            Upload inventory
            Excel file with ZIP
            or image files.
          </p>
        </div>

        {/* IMPORT BOX */}

        <div className="bg-white border border-[#dfe5ea] rounded-[32px] p-4 md:p-8 shadow-sm">
          <div className="border-2 border-dashed border-[#cbd5df] rounded-[28px] p-5 md:p-12 bg-[#f8fafb]">
            <div className="max-w-2xl mx-auto">
              {/* EXCEL */}

              <h2 className="text-xl md:text-2xl font-black text-[#31475a]">
                Upload Excel File
              </h2>

              <p className="text-[#7b8794] mt-2 text-sm leading-relaxed">
                Supported formats:
                .xlsx and .csv
              </p>

              <label className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-[#dfe5ea] rounded-[20px] p-8 bg-white cursor-pointer hover:border-[#31475a] transition-all">
                <span className="text-[#31475a] font-semibold">
                  Click or Drag Excel File
                </span>

                <input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={(e) =>
                    setExcelFile(
                      e.target
                        .files[0]
                    )
                  }
                  className="hidden"
                />
              </label>

              {excelFile && (
                <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                  <p className="text-[#31475a] font-bold break-all">
                    {
                      excelFile.name
                    }
                  </p>
                </div>
              )}

              {/* ZIP */}

              <div className="mt-10">
                <h2 className="text-xl md:text-2xl font-black text-[#31475a]">
                  Upload Images ZIP
                </h2>

                <p className="text-[#7b8794] mt-2 text-sm leading-relaxed">
                  Upload ZIP
                  containing all
                  jewellery images.
                </p>

                <label className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-[#dfe5ea] rounded-[20px] p-8 bg-white cursor-pointer hover:border-[#31475a] transition-all">
                  <span className="text-[#31475a] font-semibold">
                    Click or Drag ZIP File
                  </span>

                  <input
                    type="file"
                    accept=".zip"
                    onChange={(
                      e
                    ) =>
                      setZipFile(
                        e.target
                          .files[0]
                      )
                    }
                    className="hidden"
                  />
                </label>

                {zipFile && (
                  <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                    <p className="text-[#31475a] font-bold break-all">
                      {
                        zipFile.name
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* MULTIPLE IMAGES */}

              <div className="mt-10">
                <h2 className="text-xl md:text-2xl font-black text-[#31475a]">
                  Or Upload Images
                </h2>

                <p className="text-[#7b8794] mt-2 text-sm leading-relaxed">
                  Select multiple
                  images directly.
                </p>

                <label className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-[#dfe5ea] rounded-[20px] p-8 bg-white cursor-pointer hover:border-[#31475a] transition-all">
                  <span className="text-[#31475a] font-semibold">
                    Click or Drag Images
                  </span>

                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) =>
                      setImageFiles(
                        Array.from(
                          e.target
                            .files
                        )
                      )
                    }
                    className="hidden"
                  />
                </label>

                {imageFiles.length >
                  0 && (
                  <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                    <p className="text-[#31475a] font-bold">
                      {
                        imageFiles.length
                      }{" "}
                      image(s)
                      selected
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
                className="mt-10 w-full bg-[#31475a] hover:bg-[#3d556b] disabled:opacity-60 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
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
                    ZIP upload is
                    recommended for
                    bulk imports
                  </li>

                  <li>
                    Supported image
                    formats: JPG,
                    JPEG, PNG
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
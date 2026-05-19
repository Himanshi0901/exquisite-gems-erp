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
    dialogOpen,
    setDialogOpen,
  ] = useState(false);

  const [
    dialogMessage,
    setDialogMessage,
  ] = useState("");

  const [
    dialogType,
    setDialogType,
  ] = useState("error");

  const [
    clientName,
    setClientName,
  ] = useState("");

  const [
    dlcNo,
    setDlcNo,
  ] = useState("");

  const [
    dlcDate,
    setDlcDate,
  ] = useState("");

  const [
    excelFile,
    setExcelFile,
  ] = useState(null);

  const [
    imageFiles,
    setImageFiles,
  ] = useState([]);

  /* IMAGE SELECT */

  const handleImageSelect =
    (files) => {
      const validFiles =
        Array.from(
          files
        );

      setImageFiles(
        validFiles
      );
    };

  /* IMAGE DROP */

  const handleImageDrop =
    (e) => {
      e.preventDefault();

      if (
        e.dataTransfer.files
      ) {
        handleImageSelect(
          e.dataTransfer
            .files
        );
      }
    };

  /* EXCEL DROP */

  const handleExcelDrop =
    (e) => {
      e.preventDefault();

      if (
        e.dataTransfer.files &&
        e.dataTransfer.files[0]
      ) {
        setExcelFile(
          e.dataTransfer
            .files[0]
        );
      }
    };

  /* IMPORT */

  const handleImport =
    async () => {
      setDialogOpen(false);

      if (
        !clientName ||
        !dlcNo ||
        !dlcDate ||
        !excelFile ||
        imageFiles.length ===
          0
      ) {
        setDialogType(
          "error"
        );

        setDialogMessage(
          "Please fill all required fields and upload both Excel and Images."
        );

        setDialogOpen(
          true
        );

        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "clientName",
          clientName
        );

        formData.append(
          "dlcNo",
          dlcNo
        );

        formData.append(
          "dlcDate",
          dlcDate
        );

        formData.append(
          "excel",
          excelFile
        );

        /* IMAGES */

        imageFiles.forEach(
          (file) => {
            formData.append(
              "images",
              file
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

        setDialogType(
          "success"
        );

        setDialogMessage(
          "Inventory imported successfully."
        );

        setDialogOpen(
          true
        );

        setClientName(
          ""
        );

        setDlcNo("");

        setDlcDate("");

        setExcelFile(
          null
        );

        setImageFiles(
          []
        );

        setTimeout(() => {
          navigate(
            "/inventory"
          );

          window.location.reload();
        }, 1200);
      } catch (error) {
        console.log(error);

        setDialogType(
          "error"
        );

        setDialogMessage(
          error?.response
            ?.data?.error ||
            "Import failed"
        );

        setDialogOpen(
          true
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
          <h1 className="text-4xl font-black text-[#102a43]">
            Import Inventory
          </h1>

          <p className="text-[#6b7280] mt-2">
            Upload inventory
            Excel file with
            jewellery images.
          </p>
        </div>

        {/* BOX */}

        <div className="bg-white border border-[#dfe5ea] rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="border-2 border-dashed border-[#cbd5df] rounded-[28px] p-8 md:p-14 bg-[#f8fafb]">
            {/* DIALOG */}

            {dialogOpen && (
              <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl font-black
                      
                      ${
                        dialogType ===
                        "success"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    {dialogType ===
                    "success"
                      ? "✓"
                      : "!"}
                  </div>

                  <h2 className="mt-5 text-2xl font-black text-[#102a43]">
                    {dialogType ===
                    "success"
                      ? "Success"
                      : "Error"}
                  </h2>

                  <p className="mt-4 text-[#52606d] leading-relaxed">
                    {
                      dialogMessage
                    }
                  </p>

                  <button
                    onClick={() =>
                      setDialogOpen(
                        false
                      )
                    }
                    className={`mt-8 w-full py-4 rounded-2xl font-black text-white transition
                      
                      ${
                        dialogType ===
                        "success"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }
                    `}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            {/* FORM */}

            <div className="grid md:grid-cols-3 gap-5">
              {/* CLIENT */}

              <div>
                <label className="block text-sm font-bold text-[#31475a] mb-2">
                  Client Name
                </label>

                <input
                  type="text"
                  value={
                    clientName
                  }
                  onChange={(
                    e
                  ) =>
                    setClientName(
                      e.target
                        .value
                    )
                  }
                  placeholder="Enter client name"
                  className="w-full bg-white border border-[#dfe5ea] px-5 py-4 rounded-[18px] text-[#31475a] outline-none"
                />
              </div>

              {/* DLC */}

              <div>
                <label className="block text-sm font-bold text-[#31475a] mb-2">
                  DLC No
                </label>

                <input
                  type="text"
                  value={dlcNo}
                  onChange={(
                    e
                  ) =>
                    setDlcNo(
                      e.target
                        .value
                    )
                  }
                  placeholder="Enter DLC number"
                  className="w-full bg-white border border-[#dfe5ea] px-5 py-4 rounded-[18px] text-[#31475a] outline-none"
                />
              </div>

              {/* DATE */}

              <div>
                <label className="block text-sm font-bold text-[#31475a] mb-2">
                  DLC Date
                </label>

                <input
                  type="date"
                  value={
                    dlcDate
                  }
                  onChange={(
                    e
                  ) =>
                    setDlcDate(
                      e.target
                        .value
                    )
                  }
                  className="w-full bg-white border border-[#dfe5ea] px-5 py-4 rounded-[18px] text-[#31475a] outline-none"
                />
              </div>
            </div>

            {/* EXCEL */}

            <div className="mt-10">
              <h2 className="text-2xl font-black text-[#31475a]">
                Upload Excel File
              </h2>

              <div
                onDragOver={(
                  e
                ) =>
                  e.preventDefault()
                }
                onDrop={
                  handleExcelDrop
                }
                className="mt-6 border-2 border-dashed border-[#cbd5df] bg-white rounded-[24px] p-8 text-center"
              >
                <p className="text-[#52606d] font-semibold">
                  Drag & Drop
                  Excel Here
                </p>

                <p className="text-sm text-[#7b8794] mt-2">
                  XLSX & CSV
                  supported
                </p>

                <input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={(
                    e
                  ) =>
                    setExcelFile(
                      e.target
                        .files[0]
                    )
                  }
                  className="mt-6 w-full bg-[#f8fafb] border border-[#dfe5ea] p-4 rounded-[18px]"
                />
              </div>

              {excelFile && (
                <div className="mt-4 bg-white border border-[#dfe5ea] rounded-[18px] px-5 py-4">
                  <p className="font-bold text-[#31475a] truncate">
                    {
                      excelFile.name
                    }
                  </p>
                </div>
              )}

              {/* DOWNLOAD FORMAT */}

              <a
                href="/sample_inventory_format.xlsx"
                download
                className="inline-block mt-5 bg-[#eef2f6] hover:bg-[#e3e8ee] text-[#31475a] px-6 py-3 rounded-2xl font-bold transition"
              >
                Download Sample
                Format
              </a>

              {/* NOTE */}

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
                <p className="text-sm font-semibold text-amber-700 leading-relaxed">
                  Important:
                  <span className="font-black">
                    {" "}
                    Image column in
                    Excel must
                    remain blank.
                  </span>
                </p>
              </div>
            </div>

            {/* IMAGES */}

            <div className="mt-12">
              <h2 className="text-2xl font-black text-[#31475a]">
                Upload Images
              </h2>

              <div
                onDragOver={(
                  e
                ) =>
                  e.preventDefault()
                }
                onDrop={
                  handleImageDrop
                }
                className="mt-6 border-2 border-dashed border-[#cbd5df] bg-white rounded-[24px] p-8 text-center"
              >
                <p className="text-[#52606d] font-semibold">
                  Drag & Drop
                  Images Here
                </p>

                <p className="text-sm text-[#7b8794] mt-2">
                  JPG, JPEG &
                  PNG supported
                </p>

                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  onChange={(
                    e
                  ) =>
                    handleImageSelect(
                      e.target
                        .files
                    )
                  }
                  className="mt-6 w-full bg-[#f8fafb] border border-[#dfe5ea] p-4 rounded-[18px]"
                />
              </div>

              {/* IMAGE LIST */}

              {imageFiles.length >
                0 && (
                <div className="mt-5 bg-white border border-[#dfe5ea] rounded-[18px] p-4 text-left max-h-[220px] overflow-y-auto">
                  <p className="font-black text-[#31475a] mb-3">
                    Selected
                    Images (
                    {
                      imageFiles.length
                    }
                    )
                  </p>

                  <div className="space-y-2">
                    {imageFiles.map(
                      (
                        file,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="text-sm text-[#52606d] truncate"
                        >
                          •{" "}
                          {
                            file.name
                          }
                        </div>
                      )
                    )}
                  </div>
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
                  SKU-123.jpg
                </li>

                <li>
                  Multiple image
                  upload supported
                </li>

                <li>
                  Excel format
                  must match
                  provided sample
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
    </MainLayout>
  );
}

export default AddItem;
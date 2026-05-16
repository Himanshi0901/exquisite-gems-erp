import {
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

function AddItem() {
  const [tab, setTab] =
    useState("manual");

  const [loading, setLoading] =
    useState(false);

  const [importLoading, setImportLoading] =
    useState(false);

  const [file, setFile] =
    useState(null);

  const [form, setForm] =
    useState({
      skuStNo: "",
      item: "",
      metal: "",
      hsn: "",
      pcs: "",
      description: "",
      grossWeight: "",
      netWeight: "",
      metalValue: "",
      diamondWeight: "",
      diamondValue: "",
      csWeight: "",
      csValue: "",
      otherWeight: "",
      otherValue: "",
      labourValue: "",
      amount: "",
    });

  const [image, setImage] =
    useState(null);

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const formData =
          new FormData();

        Object.keys(form).forEach(
          (key) => {
            formData.append(
              key,
              form[key]
            );
          }
        );

        if (image) {
          formData.append(
            "image",
            image
          );
        }

        await axios.post(
          "http://localhost:5000/api/jewellery",
          formData
        );

        alert(
          "Jewellery item added successfully"
        );

        setForm({
          skuStNo: "",
          item: "",
          metal: "",
          hsn: "",
          pcs: "",
          description: "",
          grossWeight: "",
          netWeight: "",
          metalValue: "",
          diamondWeight: "",
          diamondValue: "",
          csWeight: "",
          csValue: "",
          otherWeight: "",
          otherValue: "",
          labourValue: "",
          amount: "",
        });

        setImage(null);
      } catch (error) {
        console.log(error);

        alert(
          "Failed to add jewellery item"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleImport =
    async () => {
      if (!file) {
        alert(
          "Please select a file"
        );

        return;
      }

      try {
        setImportLoading(
          true
        );

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        await axios.post(
          "http://localhost:5000/api/import",
          formData
        );

        alert(
          "Import successful"
        );

        setFile(null);
      } catch (error) {
        console.log(error);

        alert(
          "Import failed"
        );
      } finally {
        setImportLoading(
          false
        );
      }
    };

  const fields = [
    "skuStNo",
    "item",
    "metal",
    "hsn",
    "pcs",
    "description",
    "grossWeight",
    "netWeight",
    "metalValue",
    "diamondWeight",
    "diamondValue",
    "csWeight",
    "csValue",
    "otherWeight",
    "otherValue",
    "labourValue",
    "amount",
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        
        {/* TABS */}

        <div className="flex gap-3 mb-8">
          <button
            onClick={() =>
              setTab(
                "manual"
              )
            }
            className={`px-6 py-3 rounded-[16px] font-bold transition-all
            
            ${
              tab ===
              "manual"
                ? "bg-[#31475a] text-white shadow-lg"

                : "bg-white border border-[#dfe5ea] text-[#52606d]"
            }
            `}
          >
            Manual Entry
          </button>

          <button
            onClick={() =>
              setTab(
                "import"
              )
            }
            className={`px-6 py-3 rounded-[16px] font-bold transition-all
            
            ${
              tab ===
              "import"
                ? "bg-[#31475a] text-white shadow-lg"

                : "bg-white border border-[#dfe5ea] text-[#52606d]"
            }
            `}
          >
            Bulk Import
          </button>
        </div>

        {/* MANUAL FORM */}

        {tab ===
        "manual" ? (
          <form
            onSubmit={
              handleSubmit
            }
            className="bg-white border border-[#dfe5ea] rounded-[32px] p-8 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-5">
              {fields.map(
                (
                  field
                ) => (
                  <input
                    key={
                      field
                    }
                    type="text"
                    name={
                      field
                    }
                    placeholder={
                      field
                    }
                    value={
                      form[
                        field
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    className="bg-[#f8fafb] border border-[#dfe5ea] rounded-2xl px-5 py-4 outline-none focus:border-[#31475a] text-[#1f2933] placeholder:text-[#94a3b8] transition"
                  />
                )
              )}
            </div>

            <div className="mt-6">
              <input
                type="file"
                onChange={(
                  e
                ) =>
                  setImage(
                    e.target
                      .files[0]
                  )
                }
                className="bg-[#f8fafb] border border-[#dfe5ea] rounded-2xl px-5 py-4 w-full text-[#52606d]"
              />
            </div>

            <button
              type="submit"
              disabled={
                loading
              }
              className="mt-8 bg-[#31475a] hover:bg-[#3d556b] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
            >
              {loading
                ? "Adding..."
                : "Add Jewellery"}
            </button>
          </form>
        ) : (
          /* IMPORT SECTION */

          <div className="bg-white border border-[#dfe5ea] rounded-[32px] p-8 shadow-sm">
            <div className="border-2 border-dashed border-[#cbd5df] rounded-[28px] p-14 text-center bg-[#f8fafb]">
              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={(
                  e
                ) =>
                  setFile(
                    e.target
                      .files[0]
                  )
                }
                className="w-full bg-white border border-[#dfe5ea] p-5 rounded-[18px] text-[#52606d]"
              />

              {file && (
                <div className="mt-6">
                  <p className="text-[#31475a] font-semibold">
                    {
                      file.name
                    }
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={
                handleImport
              }
              disabled={
                importLoading
              }
              className="mt-8 bg-[#31475a] hover:bg-[#3d556b] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
            >
              {importLoading
                ? "Importing..."
                : "Import Inventory"}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default AddItem;
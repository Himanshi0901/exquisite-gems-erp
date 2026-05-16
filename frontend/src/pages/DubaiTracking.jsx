import MainLayout from "../layouts/MainLayout";

function DubaiTracking() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dubai Tracking
      </h1>

      <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-yellow-700">
        <p className="text-gray-300">
          Track jewellery items sent to Dubai.
        </p>
      </div>
    </MainLayout>
  );
}

export default DubaiTracking;
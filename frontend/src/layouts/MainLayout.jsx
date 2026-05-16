import Topbar from "../components/Topbar";

function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-[#edf1f4] text-[#1f2933]">
      <Topbar />

      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
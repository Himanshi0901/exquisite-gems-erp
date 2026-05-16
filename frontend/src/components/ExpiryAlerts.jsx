function ExpiryAlerts({
  items,
}) {
  const alerts =
    items.filter((item) => {
      if (
        item.status !==
          "IN_DUBAI" ||
        !item.returnDeadline
      )
        return false;

      const today =
        new Date();

      const deadline =
        new Date(
          item.returnDeadline
        );

      const diff =
        Math.ceil(
          (deadline - today) /
            (1000 *
              60 *
              60 *
              24)
        );

      return diff <= 5 && diff > 0;
    });

  if (alerts.length === 0)
    return null;

  return (
    <div className="bg-white border border-[#dfe5ea] rounded-[24px] p-6 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1f2933]">
            Expiry Alerts
          </h2>

          <p className="text-[#7b8794] text-sm mt-1">
            Jewellery nearing
            return deadline
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-red-100 text-red-700 text-sm font-semibold">
          {alerts.length} Alerts
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((item) => {
          const today =
            new Date();

          const deadline =
            new Date(
              item.returnDeadline
            );

          const diff =
            Math.ceil(
              (deadline - today) /
                (1000 *
                  60 *
                  60 *
                  24)
            );

          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#f8fafb] border border-[#dfe5ea] rounded-2xl p-4 hover:border-[#b8c6d2] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.name
                  }
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-[#dfe5ea]"
                />

                <div>
                  <h3 className="font-semibold text-[#1f2933]">
                    {
                      item.name
                    }
                  </h3>

                  <p className="text-sm text-[#7b8794]">
                    {
                      item.itemCode
                    }
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold text-sm">
                {diff} days left
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpiryAlerts;
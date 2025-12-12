function FirstSection({ name, email, phone, city, sector, logo_path }) {
  const getLogoUrl = () => {
    if (!logo_path) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzNzNkYyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q09NUEFOWTwvdGV4dD4KPC9zdmc+";
    }

    if (logo_path.startsWith("http")) {
      return logo_path;
    }

    return `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/${logo_path}`;
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#efecff] p-5">
      <div className="grid grid-cols-1 place-items-center gap-4 rounded-[24px] p-6 md:grid-cols-[auto_1fr] md:justify-items-start md:gap-x-3 md:p-6">
        <div className="flex-shrink-0">
          <img
            className="h-28 w-28 rounded-lg bg-white object-contain p-2 shadow md:h-32 md:w-32"
            src={getLogoUrl()}
            alt={`${name} logo`}
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzNzNkYyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q09NUEFOWTwvdGV4dD4KPC9zdmc+";
            }}
          />
        </div>

        <div className="max-w-md rounded-xl bg-white px-6 py-3 text-center md:max-w-2xl md:text-left">
          <h3 className="text-2xl font-bold text-gray-800 md:text-[28px]">
            {name || "Company Name"}
          </h3>
          <p className="mt-1 font-semibold text-blue-600">
            {sector || "Technology"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:-mt-8 md:flex-row md:flex-wrap md:items-center md:gap-6 md:pl-[180px]">
        {email && (
          <div className="flex items-center gap-3">
            <span className="text-blue-600">📧</span>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {email}
            </span>
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-3">
            <span className="text-blue-600">📞</span>
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {phone}
            </span>
          </div>
        )}

        {city && (
          <div className="flex items-center gap-3">
            <span className="text-blue-600">📍</span>
            <span className="font-semibold text-gray-700">City:</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {city}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstSection;

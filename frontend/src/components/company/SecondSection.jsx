function SecondSection({ description }) {
  return (
    <div className="mt-16 overflow-hidden rounded-xl bg-[#efecff] p-6 sm:p-8">
      <div className="space-y-6">
        <div className="grid items-start gap-4 md:grid-cols-[200px_1fr]">
          <h3 className="rounded-full bg-white px-4 py-2 text-center text-xl font-bold md:text-2xl">
            About Us
          </h3>
          <div className="break-words rounded-xl bg-white p-4 leading-relaxed">
            {description ? (
              <p className="text-gray-700">{description}</p>
            ) : (
              <p className="italic text-gray-500">
                No description available for this company.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondSection;

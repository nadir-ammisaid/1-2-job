import workerCharacter from "../../assets/worker-character.png";

function EditFirstSection({ formData = {}, onChange = () => {} }) {
  const { first_name, last_name, profession, email, phone, city } = formData;

  return (
    <>
      <div className="flex flex-col gap-4 overflow-hidden rounded-[20px] bg-[#efecff] p-5">
        <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-6">
          <img
            className="h-32 w-32 rounded-full bg-white object-cover shadow md:h-36 md:w-36"
            src={workerCharacter}
            alt="Worker"
          />

          <div className="mx-auto w-full max-w-md rounded-2xl bg-white px-5 py-3 text-center md:mx-0 md:max-w-lg md:text-left">
            <div className="flex items-center gap-3">
              <label>First Name:</label>
              <input
                className="border-black-200 rounded-2xl border-2 text-2xl font-bold"
                name="first_name"
                value={first_name ?? ""}
                onChange={onChange}
              />
            </div>

            <div className="mt-2 flex items-center gap-3">
              <label>Last Name:</label>
              <input
                className="border-black-200 rounded-2xl border-2 text-2xl font-bold"
                name="last_name"
                value={last_name ?? ""}
                onChange={onChange}
              />
            </div>

            <div className="mt-2 flex items-center gap-3">
              <label>Profession:</label>
              <input
                className="border-black-200 rounded-2xl border-2"
                name="profession"
                value={profession ?? ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:col-span-1 md:col-start-2 md:mt-0 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-2">
            <img
              className="h-7 w-7"
              src="https://img.icons8.com/material-rounded/24/mail.png"
              alt="Email Icon"
            />
            <label>Email:</label>
            <input
              className="border-black-200 w-full rounded-full border-2 bg-white px-4 py-2 text-center text-sm shadow md:w-auto"
              type="email"
              name="email"
              value={email ?? ""}
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <img
              className="h-7 w-7"
              src="https://img.icons8.com/ios-glyphs/30/phone--v1.png"
              alt="Phone Icon"
            />
            <label>Phone:</label>
            <input
              className="border-black-200 w-full rounded-full border-2 bg-white px-4 py-2 text-center text-sm shadow md:w-auto"
              type="tel"
              name="phone"
              value={phone ?? ""}
              onChange={onChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <img
              className="h-7 w-7"
              src="https://img.icons8.com/ios-filled/50/marker.png"
              alt="Location Icon"
            />
            <label>City:</label>
            <input
              className="border-black-200 w-full rounded-full border-2 bg-white px-4 py-2 text-center text-sm shadow md:w-auto"
              type="text"
              name="city"
              value={city ?? ""}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditFirstSection;

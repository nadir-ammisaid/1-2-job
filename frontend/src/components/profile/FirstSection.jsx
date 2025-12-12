import { NavLink } from "react-router-dom";
import workerCharacter from "../../assets/worker-character.png";

function FirstSection({
  first_name,
  last_name,
  profession,
  email,
  phone,
  city,
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#efecff] p-5">
      <div className="absolute right-6 top-6 z-10 md:right-10 md:top-12 md:-translate-y-1/2">
        <NavLink
          to="/profile/edit"
          className="mx-auto block w-fit rounded-full bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Edit profile
        </NavLink>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-4 rounded-[24px] p-4 md:grid-cols-[auto_1fr] md:place-items-start md:gap-x-2 md:gap-y-4 md:p-6">
        <img
          className="h-28 w-28 rounded-full bg-white object-cover shadow md:h-32 md:w-32"
          src={workerCharacter}
          alt="profile"
        />

        <div className="w-full max-w-md rounded-xl bg-white px-5 py-4 text-center md:max-w-2xl md:text-left">
          <p className="text-2xl font-bold">
            {first_name} {last_name}
          </p>
          <p className="mt-1 font-bold">Profession :</p>
          <p className="mt-2 text-[#3d3d3d]">{profession}</p>
        </div>

        <div className="flex w-full flex-col gap-3 md:col-start-2 md:flex-row md:flex-wrap md:items-center md:gap-6">
          <div className="flex items-center gap-3">
            <img
              className="h-5 w-5"
              src="https://img.icons8.com/material-rounded/24/mail.png"
              alt="email"
            />
            <p>Email:</p>
            <p className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              className="h-5 w-5"
              src="https://img.icons8.com/ios-glyphs/30/phone--v1.png"
              alt="phone"
            />
            <p>Phone:</p>
            <p className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {phone}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              className="h-5 w-5"
              src="https://img.icons8.com/ios-filled/50/marker.png"
              alt="city"
            />
            <p>City:</p>
            <p className="rounded-full bg-white px-4 py-2 text-sm shadow">
              {city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSection;

import workerCharacter from "../../assets/worker-character.png";
import logo from "../../assets/12jobLogoEntire.png";

function HeroSection() {
  return (
    <section className="px-4 pb-6 pt-20 md:px-6 md:pb-12 md:pt-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center md:hidden">
          <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 px-6 py-8">
            <div className="mx-auto mb-6 flex h-20 w-56 items-center justify-center rounded-full bg-white shadow-xl">
              <img
                src={logo}
                alt="1,2,Job Logo"
                className="h-28 w-auto object-contain"
              />
            </div>

            <div className="flex justify-center">
              <img
                src={workerCharacter}
                alt="Construction worker"
                className="h-48 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 px-12 py-16 lg:px-20 lg:py-10">
            <div className="flex items-center justify-between gap-12 lg:gap-20">
              <div className="flex h-44 w-80 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-2xl lg:h-48 lg:w-96">
                <img
                  src={logo}
                  alt="1,2,Job Logo"
                  className="h-48 w-auto object-contain lg:h-48"
                />
              </div>

              <div className="flex h-56 w-56 flex-shrink-0 items-end justify-center lg:h-64 lg:w-64">
                <img
                  src={workerCharacter}
                  alt="Construction worker"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

import { Apple } from 'lucide-react';


export function MobileSection() {
    const phoneMockup = '/images/app-img.jpg';
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <div className="flex justify-center">
            <img 
              src={phoneMockup} 
              alt="Pool & Chill App" 
              className="w-full max-w-sm drop-shadow-2xl"
            />
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <h2 className="text-gray-900">
              Haz más fácil la renta de tu espacio con Pool & Chill.
            </h2>
            <p className="text-gray-600">
              Administra, publica y gestiona tus espacios desde la app oficial.
            </p>

            {/* App Store buttons */}
            <div className="flex gap-4 pt-4">
              {/* App Store */}
              <button className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Descarga en</div>
                  <div className="text-sm">App Store</div>
                </div>
              </button>

              {/* Google Play */}
              <button className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Disponible en</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Home, Sparkles, Droplet, Tent } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [propertyType, setPropertyType] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Obtener valores del formulario
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      // Construir el payload según el rol
      const payload = {
        nombre: fullName,
        correo: email,
        telefono: phone,
        rol: role === 'guest' ? 'huésped' : 'anfitrión'
      };

      if (role === 'host') {
        payload.tipoEspacio = propertyType;
        payload.nombreLugar = document.getElementById('placeName').value;
        payload.direccion = document.getElementById('address').value;
        payload.descripcion = document.getElementById('hostDescription').value;
      } else if (role === 'guest') {
        payload.mensaje = document.getElementById('guestIdeas').value;
      }

      // Enviar al backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/web/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      // Éxito
      setSubmitStatus('success');

      // Limpiar formulario
      document.getElementById('fullName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      setRole('');
      setPropertyType([]);

      if (role === 'host') {
        document.getElementById('placeName').value = '';
        document.getElementById('address').value = '';
        document.getElementById('hostDescription').value = '';
      } else if (role === 'guest') {
        document.getElementById('guestIdeas').value = '';
      }

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');

      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white mb-1">
      {/* Animated water wave background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '7s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-4 pb-2 bg-gradient-to-r from-gray-900 via-[#3CA2A2] to-gray-900 bg-clip-text text-transparent leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glassmorphic background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />
          
          <div className="relative p-8 md:p-12 space-y-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <label htmlFor="fullName" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <User className="w-4 h-4 text-primary" />
                {t('contact.fullName')}
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Phone className="w-4 h-4 text-primary" />
                {t('contact.phone')}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+52 123 456 7890"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Mail className="w-4 h-4 text-primary" />
                {t('contact.email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              />
            </motion.div>

            {/* Role Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <label htmlFor="role" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('contact.role')}
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233CA2A2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="">{t('contact.selectRole')}</option>
                <option value="guest">{t('contact.guest')}</option>
                <option value="host">{t('contact.host')}</option>
              </select>
            </motion.div>

            {/* Guest Section */}
            {role === 'guest' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 pt-4"
              >
                <div className="space-y-2">
                    <label htmlFor="guestIdeas" className="text-gray-700 font-medium text-sm">
                    {t('contact.guestIdeasLabel')}
                  </label>
                  <textarea
                    id="guestIdeas"
                    placeholder={t('contact.guestIdeasPlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('contact.guestNote')}
                </p>
              </motion.div>
            )}

            {/* Host Section */}
            {role === 'host' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 pt-4"
              >
                {/* Property Type Radio Buttons */}
                <div className="space-y-3">
                  <label className="text-gray-700 font-medium text-sm">{t('contact.propertyType')}</label>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { value: 'cabin', label: t('contact.types.cabin'), icon: Home },
                      { value: 'pool', label: t('contact.types.pool'), icon: Droplet },
                      { value: 'camping', label: t('contact.types.camping'), icon: Tent }
                    ].map((option) => {
                      const selected = propertyType.includes(option.value);
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => setPropertyType(prev => selected ? prev.filter(v => v !== option.value) : [...prev, option.value])}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-pressed={selected}
                          className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm
                            ${selected 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
                            }
                          `}
                        >
                          <option.icon className="w-4 h-4" />
                          <span className="font-medium">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Place Name */}
                <div className="space-y-2">
                    <label htmlFor="placeName" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <Home className="w-4 h-4 text-primary" />
                    {t('contact.placeName')}
                  </label>
                  <input
                    id="placeName"
                    type="text"
                    placeholder={t('contact.placeNamePlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label htmlFor="address" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t('contact.address')}
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder={t('contact.addressPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="hostDescription" className="text-gray-700 font-medium text-sm">
                    {t('contact.hostDescriptionLabel')}
                  </label>
                  <textarea
                    id="hostDescription"
                    placeholder={t('contact.hostDescriptionPlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('contact.hostNote')}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            {role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-6"
              >
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 30px rgba(60, 162, 162, 0.4)' } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : t('contact.send')}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-green-50 border-2 border-green-200 text-green-700 text-center font-medium"
                  >
                    ✅ Enviado correctamente
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-700 text-center font-medium"
                  >
                    ❌ Error al enviar el formulario
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          {t('contact.bottomNote')}
        </motion.p>
      </div>
    </section>
  );
}
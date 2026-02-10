import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Home,
  Sparkles,
  UserCheck,
  Users,
  MessageCircle,
} from "lucide-react";
import SuccessModal from "../components/ui/SuccessModal";
import { encryptData } from "../utils/encryption";

export default function Contact() {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Prevenir entrada de caracteres no permitidos en nombre
  const handleNameInput = (e) => {
    const value = e.target.value;
    // Solo permitir letras, espacios y acentos
    const filtered = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
    setFormValues((prev) => ({ ...prev, fullName: filtered }));
    e.target.value = filtered;

    // Validar
    if (!filtered.trim()) {
      setErrors((prev) => ({
        ...prev,
        fullName: t("contact.validation.nameRequired"),
      }));
    } else {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  // Prevenir entrada de letras en teléfono
  const handlePhoneInput = (e) => {
    const value = e.target.value;
    // Solo permitir números, +, espacios, paréntesis y guiones
    const filtered = value.replace(/[^\d+\s()-]/g, "");
    setFormValues((prev) => ({ ...prev, phone: filtered }));
    e.target.value = filtered;

    // Validar
    if (!filtered.trim()) {
      setErrors((prev) => ({
        ...prev,
        phone: t("contact.validation.phoneRequired"),
      }));
    } else if (filtered.replace(/[\s()-]/g, "").length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone: t("contact.validation.phoneMinLength"),
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Validar email
  const handleEmailInput = (e) => {
    const value = e.target.value;
    setFormValues((prev) => ({ ...prev, email: value }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: t("contact.validation.emailRequired"),
      }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: t("contact.validation.emailInvalid"),
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    return (
      formValues.fullName.trim() !== "" &&
      formValues.email.trim() !== "" &&
      formValues.phone.trim() !== "" &&
      !errors.fullName &&
      !errors.email &&
      !errors.phone &&
      role !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que el formulario sea válido antes de enviar
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Construir el payload según el rol
      const payload = {
        nombre: formValues.fullName,
        correo: formValues.email,
        telefono: formValues.phone,
        rol: role === "guest" ? "huésped" : "anfitrión",
      };

      if (role === "host") {
        payload.nombreLugar = document.getElementById("placeName").value;
        payload.descripcion = document.getElementById("hostDescription").value;
      } else if (role === "guest") {
        payload.mensaje = document.getElementById("guestIdeas").value;
      }

      // Cifrar el payload
      const encryptedPayload = await encryptData(payload);

      // Enviar al backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/web/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: encryptedPayload }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Error en la respuesta del servidor",
        );
      }

      // Éxito - Mostrar modal
      setShowSuccessModal(true);

      // Limpiar formulario
      setFormValues({ fullName: "", email: "", phone: "" });
      setRole("");

      if (role === "host") {
        document.getElementById("placeName").value = "";
        document.getElementById("hostDescription").value = "";
      } else if (role === "guest") {
        document.getElementById("guestIdeas").value = "";
      }
    } catch (error) {
      setSubmitStatus("error");

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
        <div
          className="absolute top-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "2s" }}
        />
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
            {t("contact.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
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
              <label
                htmlFor="fullName"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <User className="w-4 h-4 text-primary" />
                {t("contact.fullName")}
              </label>
              <input
                id="fullName"
                type="text"
                value={formValues.fullName}
                placeholder="Tu nombre"
                onInput={handleNameInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.fullName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-primary" />
                {t("contact.phone")}
              </label>
              <input
                id="phone"
                type="tel"
                value={formValues.phone}
                placeholder="+52 123 456 7890"
                onInput={handlePhoneInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
              >
                <Mail className="w-4 h-4 text-primary" />
                {t("contact.email")}
              </label>
              <input
                id="email"
                type="email"
                value={formValues.email}
                placeholder="tu@email.com"
                onInput={handleEmailInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Role Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("contact.role")}
              </label>

              <div className="flex gap-4 flex-wrap">
                {/* Huésped Button */}
                <motion.button
                  type="button"
                  onClick={() => setRole("guest")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-1 min-w-[140px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 shadow-sm
                    ${
                      role === "guest"
                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:shadow-md"
                    }
                  `}
                >
                  <UserCheck className="w-5 h-5" />
                  <span className="font-semibold">{t("contact.guest")}</span>
                </motion.button>

                {/* Anfitrión Button */}
                <motion.button
                  type="button"
                  onClick={() => setRole("host")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-1 min-w-[140px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 shadow-sm
                    ${
                      role === "host"
                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:shadow-md"
                    }
                  `}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{t("contact.host")}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Guest Section */}
            {role === "guest" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 pt-4"
              >
                {/* Description / Motivos */}
                <div className="space-y-2">
                  <label
                    htmlFor="hostDescription"
                    className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                    {t("contact.hostDescriptionLabel")}
                  </label>
                  <textarea
                    id="hostDescription"
                    placeholder={t("contact.hostDescriptionPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t("contact.guestNote")}
                </p>
              </motion.div>
            )}

            {/* Host Section */}
            {role === "host" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 pt-4"
              >
                {/* Description / Motivos */}
                <div className="space-y-2">
                  <label
                    htmlFor="hostDescription"
                    className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                    {t("contact.hostDescriptionLabel")}
                  </label>
                  <textarea
                    id="hostDescription"
                    placeholder={t("contact.hostDescriptionPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t("contact.hostNote")}
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
                  disabled={isSubmitting || !isFormValid()}
                  whileHover={
                    !isSubmitting && isFormValid()
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 30px rgba(60, 162, 162, 0.4)",
                        }
                      : {}
                  }
                  whileTap={
                    !isSubmitting && isFormValid() ? { scale: 0.98 } : {}
                  }
                  className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                    isSubmitting || !isFormValid()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? "Enviando..." : t("contact.send")}
                </motion.button>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-700 text-center font-medium"
                  >
                    Error al enviar el formulario
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
          {t("contact.bottomNote")}
        </motion.p>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("contact.successModal.title")}
        message={t("contact.successModal.message")}
        buttonText={t("contact.successModal.button")}
      />
    </section>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function PrivacyModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    'responsible',
    'purpose',
    'dataCollected',
    'collectionMethods',
    'dataRecipients',
    'aroRights',
    'securityMeasures',
    'consentRevocation',
    'updates',
    'childrenPrivacy',
    'cookies',
    'userRights'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col"
            >
              {/* Header fijo */}
              <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6 md:p-8 z-10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#3CA2A2]/10 rounded-2xl">
                    <Shield className="w-7 h-7 text-[#3CA2A2]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {t('privacy.title')}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('privacy.lastUpdated')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenido scrolleable */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Introducción */}
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {t('privacy.intro')}
                  </p>
                </div>

                {/* Secciones expandibles */}
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section}
                      initial={false}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3CA2A2]/10 text-[#3CA2A2] font-semibold text-sm">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-900 text-left">
                            {t(`privacy.sections.${section}.title`)}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedSection === section ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedSection === section && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-white space-y-3">
                              {(() => {
                                const content = t(`privacy.sections.${section}.content`, { returnObjects: true });

                                if (Array.isArray(content)) {
                                  return content.map((paragraph, idx) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                      {paragraph}
                                    </p>
                                  ));
                                } else {
                                  return (
                                    <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                      {content}
                                    </p>
                                  );
                                }
                              })()}

                              {/* Subsecciones si existen */}
                              {(() => {
                                try {
                                  const subsections = t(`privacy.sections.${section}.subsections`, { returnObjects: true, defaultValue: null });
                                  if (subsections && typeof subsections === 'object' && !Array.isArray(subsections)) {
                                    return (
                                      <ul className="list-none space-y-3 mt-4">
                                        {Object.entries(subsections).map(([key, value]) => (
                                          <li key={key} className="text-gray-700 text-sm md:text-base pl-0">
                                            <strong className="text-[#3CA2A2]">{value.title}:</strong>{' '}
                                            <span className="text-gray-700">{value.content}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    );
                                  }
                                } catch (e) {
                                  return null;
                                }
                                return null;
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Contacto final */}
                <div className="mt-8 p-6 bg-[#3CA2A2]/5 rounded-2xl border border-[#3CA2A2]/20">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('privacy.contact.title')}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t('privacy.contact.content')}
                  </p>
                  <p className="text-[#3CA2A2] font-medium mt-2">
                    {t('privacy.contact.email')}
                  </p>
                </div>
              </div>

              {/* Footer fijo con botón */}
              <div className="sticky bottom-0 bg-white rounded-b-3xl border-t border-gray-200 p-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3CA2A2] to-[#3CA2A2]/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('privacy.closeButton')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    'responsible',
    'dataCollected',
    'sensitiveData',
    'primaryPurposes',
    'secondaryPurposes',
    'identityVerification',
    'collectionMethods',
    'dataTransfers',
    'aroRights',
    'dataRetention',
    'consentRevocation',
    'useLimitation',
    'cookies',
    'childrenPrivacy',
    'securityMeasures',
    'updates',
    'consentClause',
    'complaints'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#3CA2A2]/10 rounded-2xl">
              <Shield className="w-7 h-7 text-[#3CA2A2]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('privacy.title')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t('privacy.lastUpdated')}
              </p>
            </div>
          </div>
        </div>

        {/* Introducción */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">
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
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
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
          {t('privacy.contact.address') && (
            <p className="text-gray-600 text-sm mt-2">
              {t('privacy.contact.address')}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-4">
            {t('privacy.contact.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}

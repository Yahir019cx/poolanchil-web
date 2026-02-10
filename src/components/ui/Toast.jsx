import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export const Toast = ({ message, type = "success", isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-primary",
          icon: CheckCircle2,
          iconColor: "text-white"
        };
      case "error":
        return {
          bgColor: "bg-red-600",
          icon: XCircle,
          iconColor: "text-white"
        };
      case "warning":
        return {
          bgColor: "bg-amber-600",
          icon: AlertCircle,
          iconColor: "text-white"
        };
      default:
        return {
          bgColor: "bg-secondary",
          icon: AlertCircle,
          iconColor: "text-white"
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed top-6 left-4 right-4 mx-auto z-[9999] max-w-md w-auto"
        >
          <div className={`${config.bgColor} rounded-xl shadow-2xl p-4 flex items-center gap-3 backdrop-blur-lg`}>
            <div className="flex-shrink-0">
              <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </div>

            <p className="flex-1 text-white font-medium text-sm md:text-base">
              {message}
            </p>

            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

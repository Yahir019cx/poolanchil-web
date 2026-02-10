import React from "react";
import { Clock, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const TimePicker = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pickerRef = React.useRef(null);

  // Parse initial time
  const [hour, setHour] = React.useState(
    value ? parseInt(value.split(":")[0]) : ""
  );
  const [minute, setMinute] = React.useState(
    value ? parseInt(value.split(":")[1]) : ""
  );
  const [period, setPeriod] = React.useState(
    value && parseInt(value.split(":")[0]) >= 12 ? "PM" : "AM"
  );

  // Cerrar el picker al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Generar horas (1-12 para formato 12h)
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generar minutos (0, 15, 30, 45)
  const minutes = [0, 15, 30, 45];

  // Actualizar la hora y cerrar cuando ambos valores están listos
  React.useEffect(() => {
    if (hour !== "" && minute !== "") {
      let hour24 = hour;
      if (period === "PM" && hour !== 12) {
        hour24 = hour + 12;
      } else if (period === "AM" && hour === 12) {
        hour24 = 0;
      }

      const formattedTime = `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      onChange(formattedTime);
    }
  }, [hour, minute, period]);

  const handleClear = (e) => {
    e.stopPropagation();
    setHour("");
    setMinute("");
    setPeriod("AM");
    onChange("");
  };

  // Auto-cerrar cuando se selecciona minuto (hora ya seleccionada)
  const handleMinuteChange = (m) => {
    setMinute(m);
    if (hour !== "") {
      setTimeout(() => setIsOpen(false), 150);
    }
  };

  // Formatear hora para mostrar
  const displayTime = React.useMemo(() => {
    if (hour !== "" && minute !== "") {
      return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
    }
    return label || "Selecciona una hora";
  }, [hour, minute, period, label]);

  const hasValue = hour !== "" && minute !== "";

  return (
    <div className="relative" ref={pickerRef}>
      {/* Input personalizado */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white text-left flex items-center justify-between ${
          isOpen
            ? "border-primary ring-4 ring-primary/10"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span
          className={`flex items-center gap-2 ${
            hasValue ? "text-gray-900 font-medium" : "text-gray-400"
          }`}
        >
          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="truncate">{displayTime}</span>
        </span>
        {hasValue ? (
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-500" />
          </motion.button>
        ) : (
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </motion.button>

      {/* Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-3 w-full min-w-[250px]"
          >
            <div className="space-y-2">
              {/* Título */}
              <div className="text-center pb-1.5 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900">
                  {label || "Selecciona la hora"}
                </h3>
              </div>

              {/* Reloj visual */}
              <div className="flex items-center justify-center gap-1.5 py-2">
                {/* Selector de Hora */}
                <select
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                  className="w-16 px-2 py-2.5 text-center text-xl font-bold rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 bg-white appearance-none cursor-pointer"
                >
                  <option value="">--</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <span className="text-2xl font-bold text-gray-400">:</span>

                {/* Selector de Minutos */}
                <select
                  value={minute}
                  onChange={(e) => handleMinuteChange(Number(e.target.value))}
                  className="w-16 px-2 py-2.5 text-center text-xl font-bold rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 bg-white appearance-none cursor-pointer"
                  disabled={hour === ""}
                >
                  <option value="">--</option>
                  {minutes.map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector AM/PM */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setPeriod("AM")}
                  className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                    period === "AM"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("PM")}
                  className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                    period === "PM"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  PM
                </button>
              </div>

              {/* Horas comunes */}
              <div className="pt-1.5 border-t border-gray-200">
                <p className="text-[10px] text-gray-500 mb-1.5 font-semibold">
                  Horas comunes:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { h: 10, m: 0, p: "AM", label: "10:00 AM" },
                    { h: 12, m: 0, p: "PM", label: "12:00 PM" },
                    { h: 2, m: 0, p: "PM", label: "2:00 PM" },
                    { h: 3, m: 0, p: "PM", label: "3:00 PM" },
                    { h: 4, m: 0, p: "PM", label: "4:00 PM" },
                    { h: 6, m: 0, p: "PM", label: "6:00 PM" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setHour(preset.h);
                        setMinute(preset.m);
                        setPeriod(preset.p);
                        setTimeout(() => setIsOpen(false), 150);
                      }}
                      className="px-1.5 py-1 text-[11px] bg-gray-50 hover:bg-primary/10 hover:text-primary rounded-md transition-colors border border-gray-200 hover:border-primary font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

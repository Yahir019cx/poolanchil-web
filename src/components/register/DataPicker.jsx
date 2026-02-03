import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const DataPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pickerRef = React.useRef(null);

  // Parse initial date
  const initialDate = value ? new Date(value) : null;
  const [selectedYear, setSelectedYear] = React.useState(
    initialDate?.getFullYear() || ""
  );
  const [selectedMonth, setSelectedMonth] = React.useState(
    initialDate ? initialDate.getMonth() : ""
  );
  const [selectedDay, setSelectedDay] = React.useState(
    initialDate?.getDate() || ""
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

  // Generar años (desde hace 100 años hasta hoy)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Meses en español
  const months = [
    { value: 0, label: "Enero" },
    { value: 1, label: "Febrero" },
    { value: 2, label: "Marzo" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Mayo" },
    { value: 5, label: "Junio" },
    { value: 6, label: "Julio" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Septiembre" },
    { value: 9, label: "Octubre" },
    { value: 10, label: "Noviembre" },
    { value: 11, label: "Diciembre" },
  ];

  // Calcular días en el mes seleccionado
  const getDaysInMonth = (year, month) => {
    if (year === "" || month === "") return 31;
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Actualizar la fecha cuando cambian los selectores
  React.useEffect(() => {
    if (selectedYear !== "" && selectedMonth !== "" && selectedDay !== "") {
      const newDate = new Date(selectedYear, selectedMonth, selectedDay);
      const formattedDate = format(newDate, "yyyy-MM-dd");
      onChange(formattedDate);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  // Ajustar el día si es mayor que los días del mes
  React.useEffect(() => {
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [daysInMonth, selectedDay]);

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    onChange("");
  };

  // Formatear fecha para mostrar
  const displayDate = React.useMemo(() => {
    if (selectedYear !== "" && selectedMonth !== "" && selectedDay !== "") {
      const date = new Date(selectedYear, selectedMonth, selectedDay);
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    }
    return "Selecciona tu fecha de nacimiento";
  }, [selectedYear, selectedMonth, selectedDay]);

  const hasValue = selectedYear !== "" && selectedMonth !== "" && selectedDay !== "";

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
          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="truncate">{displayDate}</span>
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
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
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
            className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-4 w-full min-w-[320px] max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-3">
              {/* Título */}
              <div className="text-center pb-2 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">
                  Selecciona tu fecha de nacimiento
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Elige el año, mes y día
                </p>
              </div>

              {/* Selector de Año */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Año
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full px-3 py-2 pr-9 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 bg-white appearance-none text-sm font-medium cursor-pointer"
                  >
                    <option value="">Selecciona un año</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Selector de Mes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Mes
                </label>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="w-full px-3 py-2 pr-9 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 bg-white appearance-none text-sm font-medium cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
                    disabled={selectedYear === ""}
                  >
                    <option value="">Selecciona un mes</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Selector de Día */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Día
                </label>
                <div className="relative">
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full px-3 py-2 pr-9 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 bg-white appearance-none text-sm font-medium cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
                    disabled={selectedMonth === ""}
                  >
                    <option value="">Selecciona un día</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Fecha seleccionada */}
              {hasValue && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200"
                >
                  <div className="bg-primary/10 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-gray-600 mb-0.5">
                      Fecha seleccionada:
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {displayDate}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Botón de confirmar */}
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={!hasValue}
                whileHover={{ scale: hasValue ? 1.02 : 1 }}
                whileTap={{ scale: hasValue ? 0.98 : 1 }}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  hasValue
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {hasValue ? "Confirmar fecha" : "Selecciona año, mes y día"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

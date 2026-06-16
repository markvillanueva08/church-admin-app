import { useEffect } from 'react';
import 'flatpickr/dist/flatpickr.css';
import Label from './Label';
import { CalenderIcon } from '../../icons';
// when flatpickr types are not available we'll accept any
type Hook = any;
type DateOption = any;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    let fpInstance: any = null;

    let mounted = true;
    (async () => {
      try {
        const mod = await import('flatpickr');
        const fp = (mod && (mod as any).default) || mod;
        if (!mounted || !fp) return;
        fpInstance = fp(`#${id}`, {
          mode: mode || "single",
          static: true,
          monthSelectorType: "static",
          dateFormat: "Y-m-d",
          defaultDate,
          onChange,
        });
      } catch (err) {
        // flatpickr is optional; if it's not installed, just skip initializing
        // This avoids build-time or runtime crashes when the package isn't present.
        // You can install flatpickr to enable this component: npm install flatpickr
      }
    })();

    return () => {
      mounted = false;
      try {
        if (fpInstance && typeof fpInstance.destroy === 'function') fpInstance.destroy();
      } catch (e) {
        /* ignore */
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}

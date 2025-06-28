export const PhoneInput = ({ value, onChange, placeholder }) => (
  <div className="flex gap-5 items-center">
    <span className="text-lg font-semibold text-[#541229]">+234</span>
    <input
    type="tel"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-3 bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#541229] focus:border-transparent outline-none transition-all"
  />
  </div>
);
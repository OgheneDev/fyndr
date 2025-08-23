export const OTPInput = ({ value, onChange }) => {
  const handleChange = (index, digit) => {
    // Only allow numbers
    if (!/^\d*$/.test(digit)) return;
    
    const newValue = value.split('');
    newValue[index] = digit;
    onChange(newValue.join(''));
    
    // Auto-focus next input
    if (digit && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="number"
          inputMode="numeric"
          min="0"
          max="9"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-14 h-14 text-center text-xl font-semibold bg-[#F5F2F2] rounded-lg focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      ))}
    </div>
  );
};
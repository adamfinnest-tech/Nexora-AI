import React from 'react';

const InputField = ({ icon: Icon, type = "text", value, onChange, placeholder, required = false, minLength }) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-white/40 border border-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3c2a63]/40 placeholder-gray-500 text-gray-800 font-medium transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]`}
      />
    </div>
  );
};

export default InputField;

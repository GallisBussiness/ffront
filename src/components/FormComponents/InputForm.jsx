import React from 'react'

function InputForm({value,placeholder,onChange,onBlur,onFocus}) {
    return (
        <>
          <input
           className="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border focus:border-grey-500 focus:bg-white focus:outline-none"
           value={value}
           placeholder={placeholder}
           onChange={onChange}
           onBlur={onBlur}
           onFocus={onFocus}
           />   
        </>
    )
}

export default InputForm

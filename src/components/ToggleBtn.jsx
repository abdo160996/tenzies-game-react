import React from 'react'
function ToggleBtn (props)  {
  return (
    <>
    <label htmlFor={props.btnText.replace(" ","")} className="mt-6 flex self-center">
      <span className='font-bold text-gray-500'>{props.btnText}</span>
      <input type="checkbox" id={props.btnText.replace(" ","")} className='peer opacity-0' onChange={props.handleChange} />
      <span className="block transition-[background-color] duration-300 w-16 h-6 bg-gray-400 rounded-full relative after:block after:rounded-full after:top-[4px] after:w-4 after:h-4 after:bg-white after:absolute after:left-[3px] peer-checked:after:translate-x-10 after:transition-transform peer-checked:bg-gradient-to-r from-green-400 to-blue-500"></span>
    </label>

      </>
  )
}

export default ToggleBtn
import React from 'react'
import PropTypes from 'prop-types'

function InputBox(props) {
  return (
    <>
        <label for="first_name" class="block mb-2 text-left pt-2 pb-0 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeholder} required />
    </>
  )
}

InputBox.propTypes = {}

export default InputBox

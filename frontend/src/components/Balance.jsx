import React from 'react'
import PropTypes from 'prop-types'

function Balance(props) {
  return (
    <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {props.value}
        </div>
    </div>
  )
}

Balance.propTypes = {}

export default Balance

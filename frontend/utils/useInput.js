import { useState } from "react"

const useInput = ({ initialState = "" , type="text" , placeholder="" }) =>
{
  const [ value , setValue ] = useState(initialState)

  const onChange = e =>
  {
    setValue(e.target.value)
  }

  return {
    value,
    type,
    placeholder,
    onChange
  }
}

export default useInput
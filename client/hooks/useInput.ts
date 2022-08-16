import React, { useState } from 'react'

export const useInput = (initialvalue) => {
  const [value, setValue] = useState(initialvalue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return { value, onChange }
}

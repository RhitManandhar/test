import React from 'react'

export const TextAreaWithLabel = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return (
    <div className="textarea-container">
      <label className="textarea-label">{label}</label>
      <textarea
        className="styled-textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

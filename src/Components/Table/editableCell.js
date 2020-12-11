import React, { useState } from 'react';

function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  booleanModifier,
}) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  const finalValue =
    typeof value === 'boolean' ? booleanModifier(value) : value;
  return <input value={finalValue} onChange={onChange} onBlur={onBlur} />;
}

export default EditableCell;

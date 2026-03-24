interface Option {
  id: number;
  name: string;
}

interface Props {
  options?: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function SelectDropdown({ 
      options = [],
      value, onChange, 
      placeholder 
      }: Props) {
  
    const safeOptions = Array.isArray(options) ? options : [];

  return (
    <select
      className="select-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>

      {safeOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}

export default SelectDropdown;

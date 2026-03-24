import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="search-wrapper">
      <Search className="search-icon" size={18} />

      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;

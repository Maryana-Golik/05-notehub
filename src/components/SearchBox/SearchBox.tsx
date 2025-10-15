import css from './SearchBox.module.css';

export interface SearchBoxProps {         
  search: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ search, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}




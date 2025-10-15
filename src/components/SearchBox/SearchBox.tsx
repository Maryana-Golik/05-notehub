import css from './SearchBox.module.css';

type Props = {
  search: string;
  onSearch: (value: string) => void;
};

export default function SearchBox({ search, onSearch }: Props) {
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



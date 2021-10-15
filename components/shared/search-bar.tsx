interface SearchBarProps {
  widthStyling: string;
  placeholder: string;
  setSearchValue: any;
}

const SearchBar = ({
  widthStyling,
  placeholder,
  setSearchValue,
}: SearchBarProps) => {
  const handleOnChange = (event: any) => {
    setSearchValue(event);
  };

  return (
    <input
      className={`form-control mr-sm-2 ${widthStyling}`}
      type="search"
      placeholder={placeholder}
      aria-label="Search"
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
};

export default SearchBar;

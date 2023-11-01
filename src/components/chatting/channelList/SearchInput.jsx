const SearchInput = ({ onChange, value, onSubmit }) => {
  return (
    <form
      className="flex items-center gap-2 px-4 py-3 w-full h-fit min-h-[3rem] bg-white border-solid border-b-2"
      onSubmit={onSubmit}
    >
      <span className="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className="w-full h-full outline-none"
      />
    </form>
  );
};

export default SearchInput;

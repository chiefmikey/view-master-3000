import { h } from 'dom-chef';

let placeholder = '[ User or Sub ]';

const submit = (event) => {
  if (event.key === 'Enter') {
    event.target.blur();
    event.target.value = '';
  }
  const history = 'push';
};
const Search = () => (
  <div className="home">
    <div className="title">View-Master 3000</div>
    <input
      tabIndex={0}
      className="search"
      type="text"
      placeholder={placeholder}
      onFocus={() => {
        placeholder = '';
      }}
      onBlur={() => {
        placeholder = '';
      }}
      onKeyDown={submit}
      autoCorrect="off"
      autoCapitalize="none"
    />
  </div>
);

export default Search;

window.addEventListener('load', async () => {
  await getData();
  hideSpinner();
  mergeUsersAndCountries();
  render();
  enableFilter();
});

function enableFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  buttonFilter.addEventListener('click', handleFilter);

  const inputFilter = document.querySelector('#inputFilter');
  inputFilter.addEventListener('keyup', handleKeyUp);
}

function handleFilter() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.trim().toLowerCase();

  filteredUserCountries = userCountries.filter((item) => {
    return item.userName.toLowerCase().includes(filterValue);
  });

  render();
}

function handleKeyUp(event) {
  const { key } = event;

  handleFilter();
}

let globalUsers = [];
let globalCountries = [];
let userCountries = [];
let filteredUserCountries = [];

async function getData() {
  const URLs = [
    'http://localhost:3001/countries',
    'http://localhost:3002/users',
  ];

  const responses = [];
  for (let url of URLs) {
    const res = await fetch(url);
    const json = await res.json();
    responses.push(json);
  }

  globalCountries = responses[0].map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryFlag: flag,
    };
  });

  globalUsers = responses[1].map(({ name, picture, login, nat }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.thumbnail,
    };
  });
}

function hideSpinner() {
  document.querySelector('.preloader').classList.add('hide');
}

function mergeUsersAndCountries() {
  userCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId === user.userCountry
    );

    const { countryName, countryFlag } = country;

    userCountries.push({
      ...user,
      countryName: country.countryName,
      countryFlag: country.countryFlag,
    });
  });

  userCountries.sort((a, b) => a.userName.localeCompare(b.userName));
  filteredUserCountries = [...userCountries];
}

function render() {
  const divUsers = document.querySelector('.divUsers');

  divUsers.innerHTML = `
    <div class="row">
      ${filteredUserCountries
        .map(({ countryFlag, userPicture, userName, countryName }) => {
          return `
          <div class='col s6 m4 l3'>
            <div class='flex-row bordered'>
              <img class='avatar' src="${userPicture}" alt="${userName}" />
              <div class='flex-column'>
                <span>${userName}</span>
                <img class='flag' src="${countryFlag}" alt="${countryName}" />
              </div>
            </div>  
          </div>  
          `;
        })
        .join('')}
    </div>
      `;
}

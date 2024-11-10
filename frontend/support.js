document.addEventListener("DOMContentLoaded", async function () {
  const primaryMobileNav = document.querySelector(".primary-hamburger");
  const primaryNavbar = document.querySelector(".primary-menubar");
  const secondaryMobileNav = document.querySelector(".secondary-hamburger");
  const secondaryNavbar = document.querySelector(".secondary-menubar");
  const searchIcon = document.getElementById("toggleSearchIcon");
  const searchBarCont = document.querySelector(".search-bar-cont");

  const toggleNav = (navbar, mobileNav) => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
  };

  const toggleSearchBar = () => {
    searchBarCont.style.display =
      searchBarCont.style.display === "none" ||
        searchBarCont.style.display === ""
        ? "block"
        : "none";
  };

  if (primaryMobileNav && primaryNavbar) {
    primaryMobileNav.addEventListener("click", () =>
      toggleNav(primaryNavbar, primaryMobileNav),
    );
  }

  if (secondaryMobileNav && secondaryNavbar) {
    secondaryMobileNav.addEventListener("click", () =>
      toggleNav(secondaryNavbar, secondaryMobileNav),
    );
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", toggleSearchBar);
  }

  await loadTableData()
});

const search = debounce(async () => {
  const searchbox = document.getElementById("find").value.toUpperCase();
  await loadTableData(searchbox)
}, 500)

document.addEventListener('DOMContentLoaded', function () {
  const editBtn = document.getElementById('editBtn');
  const cells = document.querySelectorAll('#contactsTable td');

  let isEditing = false;

  editBtn.addEventListener('click', function () {
    if (isEditing) {
      // Save changes
      cells.forEach(cell => {
        cell.contentEditable = 'false';
      });
      editBtn.textContent = 'Edit';
      isEditing = false;
    } else {
      // Enable editing
      cells.forEach(cell => {
        cell.contentEditable = 'true';
      });
      editBtn.textContent = 'Save';
      isEditing = true;
    }
  });
});


async function loadTableData(searchTerm = '') {
  const tableBody = document.querySelector("#contactsTable tbody")
  tableBody.innerHTML = ``
  let supports = await fetch('http://localhost:4000/api/v1/supports?searchTerm=' + searchTerm)
  supports = await supports.json()

  for (const support of supports.data) {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
          <td contenteditable="false">${support.TeamName}</td>
          <td contenteditable="false">${support.TeamDept}</td>
          <td contenteditable="false">${support.TeamPhoneNumber}</td>
          <td contenteditable="false">${support.EmailAddress}</td>
  `
    tableBody.appendChild(newRow)
  }

}
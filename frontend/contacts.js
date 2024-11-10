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

const search = debounce(() => {
  const searchbox = document.getElementById("find").value
  loadTableData(searchbox)
}, 300)

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
  let contacts = await fetch('http://localhost:4000/api/v1/contacts?searchTerm=' + searchTerm)
  contacts = await contacts.json()

  for (const emp of contacts.data) {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
    <td contenteditable="false">${emp.EmployeeName}</td>
    <td contenteditable="false">${emp.Department}</td>
    <td contenteditable="false">${emp.PhoneNumber}</td>
    <td contenteditable="false">${emp.EmailAddress}</td>
`
    tableBody.appendChild(newRow)
  }

}
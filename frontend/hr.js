document.addEventListener("DOMContentLoaded", async function () {
  const primaryMobileNav = document.querySelector(".primary-hamburger");
  const primaryNavbar = document.querySelector(".primary-menubar");
  const secondaryMobileNav = document.querySelector(".secondary-hamburger");
  const secondaryNavbar = document.querySelector(".secondary-menubar");

  const toggleNav = (navbar, mobileNav) => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
  };

  primaryMobileNav.addEventListener("click", function () {
    toggleNav(primaryNavbar, primaryMobileNav);
  });

  secondaryMobileNav?.addEventListener("click", function () {
    toggleNav(secondaryNavbar, secondaryMobileNav);
  });
  await loadHrUpdates()
});


async function loadHrUpdates() {
  const UpdatesContainer = document.getElementById('UpdatesContainer')
  if (!UpdatesContainer) {
    console.error("UpdatesContainer not found")
    return
  }

  let updates = await fetch("http://localhost:4000/api/v1/hr-updates")
  updates = await updates.json()

  if (Array.isArray(updates.data)) {
    for (let i = 0; i < updates.data.length; i++) {
      /** @type {{UpdateID: number;HRUpdate: string;
    TimeOfUpdate: string;Category: string;
    UpdateStatus: "Active";Title: string;}} */
      const hrUpdate = updates.data[i];
      const hrUpdateNode = document.createElement("div")

      hrUpdateNode.innerHTML = `
      <div class="head">
        <h4>${hrUpdate.Title}</h4>
        <p>${hrUpdate.HRUpdate}</p>
      </div>
      <div class="body">
        <p class="status">${hrUpdate.UpdateStatus}</p>
        <p>${formatDate(hrUpdate.TimeOfUpdate)}</p>
      </div>
`

      hrUpdateNode.classList.add("hrUpdate")
      UpdatesContainer.appendChild(hrUpdateNode)
    }
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // Reformatting to match the exact "MMM DD, YYYY" format
  const [month, day, year] = formattedDate.split(' ');
  return `${month} ${day.replace(',', '')}, ${year}`;
}
const sidebar = document.getElementById("sidebar");
const menuIcon = document.getElementById("menuIcon");
const menuItem = document.querySelectorAll("menuItem");

function toggleSidebar() {
  sidebar.classList.toggle("active");
  menuIcon.classList.toggle("change");
  menuItem.forEach((item) => {
    item.classList.toggle("hidden");
    console.log("Hi");
  });
}

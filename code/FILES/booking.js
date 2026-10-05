
const departureInput = document.getElementById("departure_date");
const today = new Date();


const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate() +1 ).padStart(2, '0');

const formattedToday = `${year}-${month}-${day}`;

departureInput.min = formattedToday;



const travelerSelect = document.getElementById("traveler_select");
const groupCheckbox = document.getElementById("group_checkbox");

if (groupCheckbox && travelerSelect) {
  
  
  groupCheckbox.onchange = function() {
    const travelerCount = parseInt(travelerSelect.value, 10);

    if (this.checked && travelerCount <= 10) {
      alert("Group booking option can only be selected if travelers are more than 10.");
      this.checked = false;
    }
  };

  
  travelerSelect.onchange = function() {
    const travelerCount = parseInt(this.value, 10);

    if (groupCheckbox.checked && travelerCount <= 10) {
      alert("Travelers are less than 10. Group booking option removed.");
      groupCheckbox.checked = false;
    }
  };
}
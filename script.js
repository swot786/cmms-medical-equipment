const dialog = document.querySelector(`#dialog`);
const toggleBtn = document.querySelector(`#add`);
const listContainer = document.querySelector(`.content-container`);
const form = document.querySelector(`#form`);
const tableHeadings = document.querySelector(`#headings`);
const tableBody = document.getElementById(`t-body`);
const equipmentDataCells =
  document.getElementsByClassName(`equipment-data-cell`);
let isShowing = false;
const equipmentTable = document.getElementById(`equipment-table`);
const dateInput = document.getElementById(`date`);
const locationInput = document.getElementById(`location`);
const equipmentName = document.getElementById(`equipment-name`);
const serviceType = document.getElementById(`service-type`);
const statusInput = document.getElementById(`status`);
const submitBtn = document.getElementById(`submit`);
const updateBtn2 = document.getElementById(`update`);
const closeDialogBtn = document.querySelector(`#close-dialog-btn`);
const exportToExcelBtn = document.getElementById(`export-to-excel`);
const modal = document.querySelector(`.modal`);
const okayBtn = document.getElementById(`okay-btn`);
const cancelBtn = document.getElementById(`cancel-btn`);
const searchInputElement = document.getElementById(`search`);
const searchBtn = document.getElementById(`search-btn`);
const homeBtn = document.getElementById(`home`);
const equipmentNameCheckBox = document.getElementById(`filter-equipment-name`);
const equipmentLocationCheckBox = document.getElementById(`filter-location`);
const equipmentServiceTypeCheckBox =
  document.getElementById(`filter-service-type`);
const equipmentStatusCheckBox = document.getElementById(`filter-status`);

let arrAyFromLocalStorage = [];
let equipmentID = 0;
let htmlElementsInTableBody = ``;
let tr = ``;

const generateEquipmentID = () => {
  let randomEquipmentID = ``;
  let str = ``;
  for (let i = 1; i <= 1001; i++) {
    str += i;
  }
  for (let j = 1; j < 5; j++) {
    const randomNum = Math.floor(Math.random() * 1001);
    randomEquipmentID += str[randomNum];
  }
  return Number(randomEquipmentID);
};

const generateEquipmentObject = () => {
  const equipmentObject = {};

  equipmentObject.id = generateEquipmentID();
  equipmentObject.date = dateInput.value;
  equipmentObject.status = statusInput.value;
  equipmentObject.location = locationInput.value;
  equipmentObject.equipment = equipmentName.value;
  equipmentObject.servicetype = serviceType.value;
  return equipmentObject;
};

const generateHTMLfromObject = (arr) => {
  arr.forEach((obj) => {
    const { id, date, equipment, servicetype, status, location } = obj;
    tr += `<tr id="${id}">
              </td>
              <td class="equipment-data-cell">${date}</td>
              <td class="equipment-data-cell">${equipment}</td>
              <td class="equipment-data-cell">${location}</td>
              <td class="equipment-data-cell">${servicetype}</td>
              <td class="equipment-data-cell">${status}</td>
              <td class="equipment-data-cell action-cell">
                <button class="action-btn" onclick="showEquipmentToUpdate(this)">Update</button
                ><button class="action-btn" onclick="deleteEquipment(this)">Remove</button>
              </td>
          </tr>`;
  });

  tableBody.innerHTML = tr;

  //Refactor the code below!!!

  tableHeadings.children[0].width =
    tableBody.children[0].children[0].clientWidth;
  tableHeadings.children[1].width =
    tableBody.children[0].children[1].clientWidth;
  tableHeadings.children[2].width =
    tableBody.children[0].children[2].clientWidth;
  tableHeadings.children[3].width =
    tableBody.children[0].children[3].clientWidth;
  tableHeadings.children[4].width =
    tableBody.children[0].children[4].clientWidth;
  tableHeadings.children[5].width =
    tableBody.children[0].children[5].clientWidth;
  tr = ``;
  return tableBody.children;
};

const addEquipmentObjectToArray = () => {
  const object = generateEquipmentObject();

  for (const key in localStorage) {
    if (key === `equipmentArray`) {
      const LocalStorageArr = JSON.parse(localStorage.getItem(key));
      LocalStorageArr.unshift(object);
      localStorage.setItem(key, JSON.stringify(LocalStorageArr));
      const LocalStorageArr2 = JSON.parse(localStorage.getItem(key));
      generateHTMLfromObject(LocalStorageArr2);
      return;
    }
  }

  localStorage.setItem(`equipmentArray`, JSON.stringify([object]));
  const LocalStorageArr = JSON.parse(localStorage.getItem(`equipmentArray`));
  generateHTMLfromObject(LocalStorageArr);
};

const showEquipmentToUpdate = (updateBtn) => {
  const LocalStorageArr = JSON.parse(localStorage.getItem(`equipmentArray`));

  const id = Number(updateBtn.parentElement.parentElement.id);
  LocalStorageArr.forEach((equipmentObj) => {
    if (Number(equipmentObj.id) === id) {
      dateInput.value = equipmentObj.date;
      statusInput.value = equipmentObj.status;
      equipmentName.value = equipmentObj.equipment;
      serviceType.value = equipmentObj.servicetype;
      locationInput.value = equipmentObj.location;
      dialog.show();
      submitBtn.style.display = `none`;
      updateBtn2.style.display = `block`;
      equipmentID = id;
    }
  });
};

const updateEquipmentObject = () => {
  if (searchInputElement.value !== "") {
    const LocalStorageArr = JSON.parse(localStorage.getItem(`equipmentArray`));

    LocalStorageArr.forEach((equipmentObj) => {
      if (Number(equipmentObj.id) === equipmentID) {
        equipmentObj.date = dateInput.value;
        equipmentObj.status = statusInput.value;
        equipmentObj.equipment = equipmentName.value;
        equipmentObj.servicetype = serviceType.value;
        equipmentObj.location = locationInput.value;
        localStorage.setItem(`equipmentArray`, JSON.stringify(LocalStorageArr));
        const updatedArr = JSON.parse(localStorage.getItem(`equipmentArray`));
        generateHTMLfromObject(updatedArr);
        // find out more on this one below in the context of delete
        searchFunction();
        submitBtn.style.display = `block`;
        updateBtn2.style.display = `none`;
      }
    });
  } else {
    const LocalStorageArr = JSON.parse(localStorage.getItem(`equipmentArray`));

    LocalStorageArr.forEach((equipmentObj) => {
      if (Number(equipmentObj.id) === equipmentID) {
        equipmentObj.date = dateInput.value;
        equipmentObj.status = statusInput.value;
        equipmentObj.equipment = equipmentName.value;
        equipmentObj.servicetype = serviceType.value;
        equipmentObj.location = locationInput.value;
        localStorage.setItem(`equipmentArray`, JSON.stringify(LocalStorageArr));
        const updatedArr = JSON.parse(localStorage.getItem(`equipmentArray`));
        generateHTMLfromObject(updatedArr);
        submitBtn.style.display = `block`;
        updateBtn2.style.display = `none`;
      }
    });
  }
};

const deleteEquipment = (deleteBtn) => {
  if (searchInputElement.value !== "") {
    const deleteConfirmation = confirm(
      `Are you sure you want to DELETE this Equipment Entry?`
    );

    if (deleteConfirmation) {
      const LocalStorageArr = JSON.parse(
        localStorage.getItem(`equipmentArray`)
      );
      // Investigate why localStorage is remaining with Empty array???!!!!
      const id = Number(deleteBtn.parentElement.parentElement.id);
      LocalStorageArr.forEach((equipmentObj, index) => {
        if (Number(equipmentObj.id) === id) {
          LocalStorageArr.splice(index, 1);
          localStorage.setItem(
            `equipmentArray`,
            JSON.stringify(LocalStorageArr)
          );
          const newArr = JSON.parse(localStorage.getItem(`equipmentArray`));
          generateHTMLfromObject(newArr);
          searchFunction();
        }
      });
    } else {
      return;
    }
  } else {
    const deleteConfirmation = confirm(
      `Are you sure you want to DELETE this Equipment Entry?`
    );

    if (deleteConfirmation) {
      const LocalStorageArr = JSON.parse(
        localStorage.getItem(`equipmentArray`)
      );
      // Investigate why localStorage is remaining with Empty array???!!!!
      const id = Number(deleteBtn.parentElement.parentElement.id);
      LocalStorageArr.forEach((equipmentObj, index) => {
        if (Number(equipmentObj.id) === id) {
          LocalStorageArr.splice(index, 1);
          localStorage.setItem(
            `equipmentArray`,
            JSON.stringify(LocalStorageArr)
          );
          const newArr = JSON.parse(localStorage.getItem(`equipmentArray`));
          generateHTMLfromObject(newArr);
        }
      });
    } else {
      return;
    }
  }
};

const searchFunction = () => {
  const LocalStorageArr = JSON.parse(localStorage.getItem(`equipmentArray`));
  const serachValue = searchInputElement.value;

  if (serachValue === "") {
    alert(`Please enter search data!`);
    return;
  } else {
    const searchArr = LocalStorageArr.filter(
      (equipmentObj) =>
        equipmentObj.location
          .toLowerCase()
          .includes(serachValue.toLowerCase()) ||
        equipmentObj.status.toLowerCase().includes(serachValue.toLowerCase()) ||
        equipmentObj.equipment
          .toLowerCase()
          .includes(serachValue.toLowerCase()) ||
        equipmentObj.servicetype
          .toLowerCase()
          .includes(serachValue.toLowerCase())
    );
    console.log(searchArr);
    generateHTMLfromObject(searchArr);
  }
};

const showSummaryPage = () => {
  addEventListenersToCheckBox();
  document.getElementById("home-land").style.display = "flex";
};

const addEventListenersToCheckBox = () => {
  const checkBoxArr = [
    equipmentNameCheckBox,
    equipmentLocationCheckBox,
    equipmentStatusCheckBox,
    equipmentServiceTypeCheckBox,
  ];
  checkBoxArr.forEach((checkbox) => {
    checkbox.addEventListener(`change`, (e) => {
      if (e.type === `change` && checkbox.checked === true) {
        if (
          e.target.id.includes(`name`) ||
          e.target.id.includes(`location`) ||
          e.target.id.includes(`status`) ||
          e.target.id.includes(`service`)
        ) {
          //finish up this function!!!
          console.log(e.target.name);
        }
      }
    });
  });
};

homeBtn.addEventListener("click", showSummaryPage);

searchBtn.addEventListener(`click`, searchFunction);

toggleBtn.addEventListener(`click`, () => {
  // if (isShowing) {
  //   listContainer.style.display = `none`;
  //   isShowing = false;
  //   dialog.close();
  // } else {
  //   listContainer.style.display = `block`;
  //   isShowing = true;
  //   dialog.show();
  // }
  document.getElementById("home-land").style.display = "none";
  dialog.show();
});

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  addEquipmentObjectToArray();
});

updateBtn2.addEventListener(`click`, updateEquipmentObject);

closeDialogBtn.addEventListener(`click`, () => {
  dialog.close();
});

const exportToExcel = () => {
  const table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table#equipment-table"));
};

exportToExcelBtn.addEventListener(`click`, exportToExcel);

function displayEquipmentsFromLocalStorage() {
  const getArrFromLocalStorage = JSON.parse(
    localStorage.getItem(`equipmentArray`)
  );

  generateHTMLfromObject(getArrFromLocalStorage);
}

searchInputElement.addEventListener(`input`, () => {
  if (searchInputElement.value === "") {
    displayEquipmentsFromLocalStorage();
  }
});

window.onload = displayEquipmentsFromLocalStorage;

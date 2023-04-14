'use strict';
const tableBodyEl = document.getElementById("tbody");
const formEdit = document.getElementById('container-form')
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");



const petArr = JSON.parse(getFromStorage("petArray")) ?? [];
const breedArr = JSON.parse(getFromStorage("breed")) ?? []
const dogBreedArr = breedArr.filter((breed) => breed.type === "Dog")
const catBreedArr = breedArr.filter((breed) => breed.type === "Cat")
let validate = false;

const renderTableData = (petArr) => {
  tableBodyEl.innerHTML = '';
  // xoá toàn bộ các dữ liệu đang có trong table
  petArr.map((pet, index) => {
    // sử dụng map để lấy từng thông tin pet để xử lý cùng lúc
    const tableRow = document.createElement('tr');

    const idCell = document.createElement('th');
    idCell.setAttribute('scope', 'row');
    idCell.textContent = pet.id;
    tableRow.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = pet.name;
    tableRow.appendChild(nameCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = pet.age;
    tableRow.appendChild(ageCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = pet.type;
    tableRow.appendChild(typeCell);

    const weightCell = document.createElement('td');
    weightCell.textContent = pet.weight + ' kg';
    tableRow.appendChild(weightCell);

    const lengthCell = document.createElement('td');
    lengthCell.textContent = pet.length + ' cm';
    tableRow.appendChild(lengthCell);

    const tabbyCell = document.createElement('td');
    tabbyCell.textContent = pet.breed;
    tableRow.appendChild(tabbyCell);

    const colorCell = document.createElement('td');
    const colorICon = document.createElement('i');
    colorICon.setAttribute('class', 'bi bi-square-fill');
    colorICon.style.color = `${pet.color}`;
    colorCell.appendChild(colorICon);
    tableRow.appendChild(colorCell);

    const checkCell1 = document.createElement('td');
    const checkIcon1 = document.createElement('i');
    if (pet.vaccinated === true) {
      checkIcon1.setAttribute('class', 'bi bi-check-circle-fill');

    } else {
      checkIcon1.setAttribute('class', 'bi bi-x-circle-fill');
    }

    checkCell1.appendChild(checkIcon1);
    tableRow.appendChild(checkCell1);

    const checkCell2 = document.createElement('td');
    const checkIcon2 = document.createElement('i');
    if (pet.dewormed === true) {
      checkIcon2.setAttribute('class', 'bi bi-check-circle-fill');
    } else {
      checkIcon2.setAttribute('class', 'bi bi-x-circle-fill');
    }
    checkCell2.appendChild(checkIcon2);
    tableRow.appendChild(checkCell2);

    const checkCell3 = document.createElement('td');
    const checkIcon3 = document.createElement('i');
    if (pet.sterilized === true) {
      checkIcon3.setAttribute('class', 'bi bi-check-circle-fill');
    } else {
      checkIcon3.setAttribute('class', 'bi bi-x-circle-fill');
    }
    checkCell3.appendChild(checkIcon3);
    tableRow.appendChild(checkCell3);

    const dateCell = document.createElement('td');
    dateCell.textContent = '01/03/2022';
    tableRow.appendChild(dateCell);

    const buttonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'btn btn-warning');
    deleteButton.setAttribute('onclick', `editPEt(${pet.id})`);
    deleteButton.textContent = 'Edit';
    buttonCell.appendChild(deleteButton);
    tableRow.appendChild(buttonCell);

    tableBodyEl.appendChild(tableRow);
  });
}

const renderBreed = (breeds, breedDefault) => {
  breedInput.innerHTML = ""
  const breedsEdit = breeds.filter(breed => breed.breedType != breedDefault)
  const defaultOption = document.createElement("option");
  defaultOption.text = breedDefault;
  breedInput.appendChild(defaultOption);
  breedsEdit.map((breed, index) => {


    const option = document.createElement('option')
    option.innerHTML = ""
    // option.setAttribute("id", index)
    option.innerHTML = breed.breedType
    breedInput.appendChild(option)
  })
}
renderTableData(petArr)

const editPEt = (id) => {
  const petEdit = petArr.find(pet => pet.id == id)
  console.log(petEdit)
  formEdit.classList.remove('hide')



  idInput.value = petEdit.id
  nameInput.value = petEdit.name
  ageInput.value = petEdit.age
  typeInput.value = petEdit.type
  weightInput.value = petEdit.weight
  lengthInput.value = petEdit.length
  colorInput.value = petEdit.color
  vaccinatedInput.checked = petEdit.vaccinated
  dewormedInput.checked = petEdit.dewormed
  sterilizedInput.checked = petEdit.sterilized
  if (petEdit.type === "Dog") {
    renderBreed(dogBreedArr, petEdit.breed)
  } else {
    renderBreed(catBreedArr, petEdit.breed)
  }

}

typeInput.addEventListener("change", () => {
  const value = typeInput.value;
  renderBreed([])
  if (value === "Dog") {
    renderBreed(dogBreedArr, "Select Breed")
  } else if (value === "Cat") {
    renderBreed(catBreedArr, "Select Breed")

  } else if (value === "Select Type") {
    renderBreed([])
  }
  console.log(value)
})
const validateInput = (data) => {
  if (ageInput.value === "" || data.age > 15 || data.age < 1) {
    // validate = false
    return alert("Age must be between 1 and 15!")
  } else if (nameInput.value === "") {
    // validate = false
    return alert("Vui lòng nhập tên pet!")
  } else if (weightInput.value === "" || data.weight > 15 || data.weight < 1) {
    // validate = false
    return alert("Weight must be between 1 and 15!")
  } else if (lengthInput.value === "" || data.length > 15 || data.length < 1) {
    // validate = false
    return alert("Length must be between 1 and 15!")
  } else if (data.type === "Select Type") {
    // validate = false
    return alert("Please select Type!")
  } else if (data.breed === "Select Breed") {
    // validate = false
    return alert("Please select Breed!")
  } else {
    validate = true
  }
}
submitBtn.addEventListener('click', function (e) {
  const id = parseInt(idInput.value);
  console.log(id)
  const petIndex = petArr.findIndex(pet => pet.id == id);

  console.log(petIndex)
  if (petIndex === -1) {
    return;
  }

  const updatedPet = {
    id: parseInt(idInput.value),
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked
  };
  validateInput(updatedPet)
  if (validate === true) {
    petArr[petIndex] = updatedPet;
    saveToStorage("petArray", JSON.stringify(petArr));
    formEdit.classList.add('hide');
    renderTableData(petArr);
  }

});
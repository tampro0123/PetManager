'use strict';

const nav = document.getElementById('sidebar')
const sideBar = document.getElementById('sidebar-title')

sideBar.addEventListener('click', () => {
  nav.classList.toggle('active')
})

// lấy các DOM
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
const tableBodyEl = document.getElementById("tbody");
const showHealthyBtn = document.getElementById("healthy-btn");
const calculateBMI = document.getElementById("calcbmi-btn");

const petArr = JSON.parse(getFromStorage("petArray")) ?? [];
const breedArr = JSON.parse(getFromStorage("breed")) ?? []
const dogBreedArr = breedArr.filter((breed) => breed.type === "Dog")
const catBreedArr = breedArr.filter((breed) => breed.type === "Cat")

let isCalcbmi = false;
typeInput.addEventListener("change", () => {
  const value = typeInput.value;
  renderBreed([])
  if (value === "Dog") {
    renderBreed(dogBreedArr)
  } else if (value === "Cat") {
    renderBreed(catBreedArr)

  } else if (value === "Select Type") {
    renderBreed([])
  }
  console.log(value)
})

const renderBreed = (breeds) => {
  console.log(breeds)
  breedInput.innerHTML = ""
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select Breed";
  breedInput.appendChild(defaultOption);
  breeds.map((breed, index) => {


    const option = document.createElement('option')
    option.innerHTML = ""
    // option.setAttribute("id", index)
    option.innerHTML = breed.breedType
    breedInput.appendChild(option)
  })
}

const renderTableData = (petArr) => {
  tableBodyEl.innerHTML = '';
  console.log(petArr)
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
    // các trạng thái của pet sử dụng boolean để hiển thị đã check hoặc chưa check
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

    const bmiCell = document.createElement('td');
    if (isCalcbmi == false) {
      bmiCell.textContent = "?";
    } else if (isCalcbmi) {
      bmiCell.textContent = pet.bmi;
    };
    // nếu bmi chưa đc tính hiển thị ? nếu đã tính hiển thị số liệu BMI

    tableRow.appendChild(bmiCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = '01/03/2022';
    tableRow.appendChild(dateCell);

    const buttonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.setAttribute('onclick', `deletePet(${pet.id})`);
    // hàm deletePet lấy id pet để làm tham số. dựa theo tham số này để tham chiếu đến pet cần đc xoá
    deleteButton.textContent = 'Delete';
    buttonCell.appendChild(deleteButton);
    tableRow.appendChild(buttonCell);

    tableBodyEl.appendChild(tableRow);
  });
}
calculateBMI.addEventListener('click', function () {
  // hàm tính BMI khi click vào nút tính BMI
  isCalcbmi = !isCalcbmi
  // khi click thay đổi trạng thái đã tính, chưa tính
  if (theHealthyCheck == true) {
    // getHelthyPet(petArr)
    healthyPetArr = []
    const helthyPetArr = getHelthyPet(petArr)

    renderTableData(helthyPetArr)
    // hiển thị các pet đảm bảo sức khoẻ và  tính BMi
  } else {
    healthyPetArr = []
    renderTableData(petArr)
    // hiển thị tất cả pet và  tính BMi
  }
})
renderTableData(petArr)
// tạo mảng chứa pet
let validate = false
// check validate để thực hiện các chức năng
isCalcbmi = false
// check đã được tính BMI hay chưa
let theHealthyCheck = false
// check trạng thái healthypet để thực hiện chức năng hiển thị pet healthy
const validateInput = (data) => {
  if (petArr.some((pet) => parseInt(idInput.value) === pet.id)) {
    return alert("Id này đã tồn tại!!")
  } else if (ageInput.value === "" || data.age > 15 || data.age < 1) {
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
// validate các dự liệu đc nhập trên form , nếu tất cả dữ liệu đều đúng, đổi trạng thái validate thành true để thực hiện chức năng update mảng chứa các pet
const clearInput = () => {
  idInput.value = ''
  typeInput.value = "Select Type"
  nameInput.value = ""
  ageInput.value = ""
  weightInput.value = ""
  lengthInput.value = ""
  colorInput.value = "#000000"
  breedInput.value = "Select Breed"
  vaccinatedInput.checked = false
  dewormedInput.checked = false
  sterilizedInput.checked = false

}
// xoá toàn bộ dữ liệu trong các ô input đang có


const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm('Are you sure?')) {
    const petIndex = petArr.findIndex((pet) => pet.id == petId);
    // nếu người dùng xác nhận xoá pet lấy petIndex ra thực hiện delete pet
    if (petIndex !== -1) {
      petArr.splice(petIndex, 1);
      // nếu có pet chứa id trùng với petID thực hiện xoá
    }
  }
  saveToStorage("petArray", JSON.stringify(petArr))
  renderTableData(petArr)
  //trả lại mảng tất cả các pet  sau khi xoá 
}



submitBtn.addEventListener('click', function (e) {
  const data = {
    id: parseInt(idInput.value),
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmiCalc: function () {
      if (this.type === "Cat") {
        this.bmi = ((this.weight * 886) / this.length ** 2).toFixed(2)
      } else if (this.type === "Dog") {
        this.bmi = ((this.weight * 703) / this.length ** 2).toFixed(2)
      }
      // tính toán BMI dựa theo kiểu pet và làm tròn đến số thập phân thứ 2
    },
    date: new Date(),

  }
  data.bmiCalc()
  // chạy hàm để dữ liệu có thêm trường dữ liệu bmi
  validateInput(data)

  // chạy hàm validate để kiểm tra dữ liệu đã đầy đủ chưa
  if (validate === true) {
    // nếu đủ ta có validate là true sau đó thực hiện các hành động sau
    validate = false
    // trả về false
    petArr.push(data)
    // thêm dữ liệu đã nhập vào mảng pet
    clearInput()
    renderBreed([])
    // xoá các dữ liệu đã nhập trên ô input
    saveToStorage("petArray", JSON.stringify(petArr))
    renderTableData(petArr)
    // hiển thị bảng chứa các pet ra giao diện dựa trên mảng petArr
  }
});
let healthyPetArr = []
// tạo mảng pet sức khoẻ tốt
function getHelthyPet(petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      healthyPetArr.push(petArr[i])
    }
  }
  // lặp qua các pet trong mảng petArr . lọc ra các pet đầy đủ 3 tiêu chí để đánh giá sức khoẻ và lấy các pet đủ tiêu chí thêm vào mảng các pet sức khoẻ tốt
  return healthyPetArr
}

showHealthyBtn.addEventListener('click', function (e) {
  theHealthyCheck = !theHealthyCheck
  // check xem trạng thái hiển thị pet
  if (theHealthyCheck == true) {
    showHealthyBtn.innerText = "Show All Pet"
    // getHelthyPet(petArr)
    const helthyPetArr = getHelthyPet(petArr)
    /// tạo biến này để tránh việc mỗi lần click showHealthyBtn hàm getHealthypet chạy lại khiến cho mảng helthyPetArr thêm phần tử cũ

    renderTableData(helthyPetArr)
    // nếu theHealthyCheck == true thì hiển thị pet sức khoẻ tốt
  } else {
    showHealthyBtn.innerText = "Show Healthy Pet"
    healthyPetArr = []
    // trả về healthyPetArr mảng rỗng để tránh việc click lại btn này vào lần sau sẽ xảy ra hành động thêm pet cũ vào mảng này
    renderTableData(petArr)
    // đưa ra giao diện tất cả các pet
  }


})


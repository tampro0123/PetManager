'use strict';
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn")
const tableBodyEl = document.getElementById("tbody");

const petArr = JSON.parse(getFromStorage("petArray")) ?? [];
const breedArr = JSON.parse(getFromStorage("breed")) ?? []
console.log(petArr)
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
renderBreed(breedArr, "Select Breed")
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



    tableBodyEl.appendChild(tableRow);
  });
}
renderTableData(petArr)


const filterPets = () => {
  const idValue = idInput.value;
  const nameValue = nameInput.value;
  const typeValue = typeInput.value;
  const breedValue = breedInput.value;
  const vaccinatedValue = vaccinatedInput.checked;
  const dewormedValue = dewormedInput.checked;
  const sterilizedValue = sterilizedInput.checked;
  // lấy các value của các input ra để xử lý
  const filter = {};
  if (idValue !== '') {
    filter.id = idValue;
  }
  if (nameValue !== '') {
    filter.name = nameValue;
  }
  if (typeValue !== '') {
    filter.type = typeValue;
  }
  if (breedValue !== '') {
    filter.breed = breedValue;
  }
  if (vaccinatedValue !== '') {
    filter.vaccinated = vaccinatedValue;
  }
  if (dewormedValue !== '') {
    filter.dewormed = dewormedValue;
  }
  if (sterilizedValue !== '') {
    filter.sterilized = sterilizedValue;
  }
  // nếu các input đc điền thì sẽ lưu các dữ liệu đó vào object filter

  const filteredPets = petArr.filter(pet => {
    // tìm phần tử phù hợp trong mảng petArr
    return Object.keys(filter).every(key => {
      // lấy các key trong object filter và tìm các phần tử phù hợp 
      const filterValue = filter[key];
      // tạo biến lưu phần tử từ objectfilter và gán key. 
      const petValue = pet[key];
      // lấy phần tử của petArr và gán key từ object filter 
      console.log(filterValue)
      if (key === "breed") {
        return filterValue === "Select Breed" || petValue === filterValue;
      }
      // nếu ta ko chọn kiểu breed thì breed lúc này là Select Breed , nên ta so sánh filterValue vs chuỗi này để lấy giá trị true để tiếp tục filter
      if (key === "vaccinated" || key === "dewormed" || key === "sterilized") {
        return filterValue === false || petValue === filterValue;
      }
      // trong trường hợp cả 3 ko được thì filterValue sẽ bằng false, và petValue cũng bằng false, vì pet[key] của 3 key trên đều false.
      // và false so sánh vs false =  true nên hàm filter vẫn nhận là true và tiếp tục 

      if (key === "type") {
        return filterValue === "Select Type" || petValue === filterValue;
      }
      // giống với breed
      //nếu 
      if (key === "id") {
        return petValue && petValue.toString().includes(filterValue);
      }
      // nếu nhập đúng pet. (id này phải tồn tại ) lấy các id chuyển sang chuỗi để thực hiện includes, kiểm tra trong id có filterValue hay không
      // nếu có thì trả về true
      if (key === "name") {
        return petValue && petValue.toString().toLowerCase().includes(filterValue.toLowerCase());
      }
      // giống với id, nhưng ở đây ta chuyển tất cả từ chuỗi của name trong data và cả chuỗi nhập từ input để tìm kiếm dễ dàng hơn

      return true
    });
  });

  renderTableData(filteredPets);
};

findBtn.addEventListener("click", filterPets);
'use strict';

const breedInput = document.getElementById('input-breed')
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

const breedArr = JSON.parse(getFromStorage("breed")) ?? []
let validate = false


const validateInput = (data) => {
  const breedIsDefine = breedArr.some(b => b.breedType == data.breedType)
  if (data.breedType === "" || breedIsDefine === true) {
    return alert("Bạn chưa nhập breed hoặc breed này đã tồn tại!!")
  } else if (data.type === 'Select Type') {
    return alert("Vui lòng chọn kiểu của pet")
  } else {
    return validate = true
  }
}


submitBtn.addEventListener('click', () => {
  const dataBreed = {
    breedType: breedInput.value,
    type: typeInput.value,
  }
  validateInput(dataBreed)
  if (validate === true) {
    console.log(dataBreed)
    breedArr.push(dataBreed)
    saveToStorage("breed", JSON.stringify(breedArr))
    renderBreedTable(breedArr)
    clearInput()
  }
})
const clearInput = () => {
  breedInput.value = ""
  typeInput.value = 'Select Type'
  validate = false
}
const renderBreedTable = () => {
  tableBodyEl.innerHTML = '';
  breedArr.map((breed, index) => {
    const tableRow = document.createElement('tr');

    const idCell = document.createElement('th');
    idCell.setAttribute('scope', 'row');
    idCell.textContent = index + 1;
    tableRow.appendChild(idCell);

    const typeCell = document.createElement('th');
    typeCell.setAttribute('scope', 'row');
    typeCell.textContent = breed.breedType;
    tableRow.appendChild(typeCell);

    const typePetCell = document.createElement('th');
    typePetCell.setAttribute('scope', 'row');
    typePetCell.textContent = breed.type;
    tableRow.appendChild(typePetCell);

    const buttonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.setAttribute('onclick', `deleteBreed(${index})`);
    // hàm deletePet lấy id pet để làm tham số. dựa theo tham số này để tham chiếu đến pet cần đc xoá
    deleteButton.textContent = 'Delete';
    buttonCell.appendChild(deleteButton);
    tableRow.appendChild(buttonCell);

    tableBodyEl.appendChild(tableRow);
  })

}
renderBreedTable(breedArr)
const deleteBreed = (index) => {
  const deleteConfirm = confirm("Are you sure")
  if (deleteConfirm) {
    breedArr.splice(index, 1);
    saveToStorage("breed", JSON.stringify(breedArr))
    renderBreedTable(breedArr)
  }
}
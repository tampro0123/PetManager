'use strict';
const importButton = document.getElementById('import-btn');
const exportButton = document.getElementById('export-btn');
const fileInput = document.getElementById('input-file');
importButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  if (!file) {
    alert("vui lòng chọn file")
  }
  reader.onload = (event) => {
    const data = JSON.parse(event.target.result);
    let petArray = JSON.parse(localStorage.getItem('petArray')) || [];

    data.forEach(newPet => {
      const index = petArray.findIndex(pet => pet.id === newPet.id);
      if (index === -1) {
        petArray.push(newPet);
      } else {
        petArray[index] = newPet;
      }
    });

    localStorage.setItem('petArray', JSON.stringify(petArray));
    alert('Nhập dữ liệu thành công!');
  };

  reader.readAsText(file);
  fileInput.value = ""
});
// Xuất dữ liệu
exportButton.addEventListener('click', () => {
  const data = getFromStorage('petArray');
  console.log(data);
  const blob = new Blob([data], { type: 'application/json' });
  //Tạo một đối tượng Blob với nội dung được đưa vào là data, định dạng của file là application/json.
  if (data) {
    saveAs(blob, 'danh sách thú cưng', 'application/json');
    alert('Xuất dữ liệu thành công!');
  } else {
    alert('Không có dữ liệu để xuất!');
  }
});

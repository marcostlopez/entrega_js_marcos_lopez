// array de objetos
const fields = [
  { id: 1, nombre: 'Cancha F5 SINTETICO', precio: 30000 },
  { id: 2, nombre: 'Cancha F7 SINTETICO', precio: 45000 },
  { id: 3, nombre: 'Cancha FUTSAL CEMENTO', precio: 20000 }
];

// canchas en el DOM
function displayFields() {
  const fieldList = document.getElementById('field-list');
  fieldList.innerHTML = '';

  fields.forEach(field => {
      const fieldDiv = document.createElement('div');
      fieldDiv.classList.add('field');
      fieldDiv.innerText = `${field.nombre} - Precio: $${field.precio}`;
      fieldDiv.onclick = () => selectField(field);
      fieldList.appendChild(fieldDiv);
  });

  displayReservedFields(); // canchasalquiladas
}

// seleccionar una cancha
function selectField(field) {
  Swal.fire({
      title: '¿Quieres alquilar esta cancha?',
      text: `Has seleccionado ${field.nombre} por $${field.precio}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Alquilar',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
          reserveField(field);
          Swal.fire('¡Alquilada!', `Has alquilado ${field.nombre}`, 'success');
      }
  });
}

// reservar una cancha
function reserveField(field) {
  let reservedFields = JSON.parse(localStorage.getItem('reservedFields')) || [];
  reservedFields.push(field);
  localStorage.setItem('reservedFields', JSON.stringify(reservedFields));
  displayReservedFields();
}

// canchas alquiladas
function displayReservedFields() {
  const reservedList = document.getElementById('reserved-list');
  reservedList.innerHTML = '';
  
  const reservedFields = JSON.parse(localStorage.getItem('reservedFields')) || [];

  if (reservedFields.length === 0) {
      reservedList.innerHTML = '<p>No hay canchas alquiladas.</p>';
      return;
  }

  reservedFields.forEach(field => {
      const reservedDiv = document.createElement('div');
      reservedDiv.classList.add('reserved-field');
      reservedDiv.innerText = `${field.nombre} - Precio: $${field.precio}`;
      
      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancelar';
      cancelButton.onclick = () => cancelReservation(field);
      
      reservedDiv.appendChild(cancelButton);
      reservedList.appendChild(reservedDiv);
  });
}

// cancelar una reserva
function cancelReservation(field) {
  let reservedFields = JSON.parse(localStorage.getItem('reservedFields')) || [];
  reservedFields = reservedFields.filter(reservedField => reservedField.id !== field.id);
  localStorage.setItem('reservedFields', JSON.stringify(reservedFields));
  displayReservedFields(); // Actualizar la lista de canchas alquiladas
}

//  btn de alquilar
document.getElementById('rent-button').addEventListener('click', () => {
  Swal.fire('Selecciona una cancha para alquilar');
});

displayFields();

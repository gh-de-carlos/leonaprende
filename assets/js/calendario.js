const rowTempl = document.querySelector('#row-template');
const colTempl = document.querySelector('#col-template');
const cardTempl = document.querySelector('#card-template');

const cal = document.querySelector('#calendar');
const h1 = document.querySelector('#month-title h1');

// OBTENER DÍA DE LA SEMANA: 
const c = new Date();
const y = c.getFullYear();
const m = c.getMonth() + 1;     // corrects zero-based month
const d = c.getDate();

function calendarInit(year = y, month = m, day = d) {
  const WEEKDAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0).getDate();
  const config = { weekday: 'long', month: 'long' };
  const arr = new Intl.DateTimeFormat('es-ES', config).format(first).split(' ');
  const offset = WEEKDAYS.indexOf(arr[1]);
  const weeksInMonth = Math.ceil((last + offset) / 7);

  return {
    month: arr[0].toUpperCase(),
    days: last,
    weeks: weeksInMonth,
    first: arr[1],
    offset: offset,
    day: day,
  };
}

const init = calendarInit();
let count = 0;
for (let i = 0; i < init.weeks; i++) {
  const row = rowTempl.content.cloneNode(true).firstElementChild;
  for (let j = 0; j < 7; j++) {
    count++;
    const col = colTempl.content.cloneNode(true).firstElementChild;
    const card = cardTempl.content.cloneNode(true).firstElementChild;
    if ((j < init.offset && i === 0) || count > init.days + init.offset) {
      row.appendChild(col);
      continue;
    }

    card.textContent = count - init.offset;
    if ((count - init.offset) === init.day) card.classList.add('border', 'border-4', 'border-danger'); 
    
    col.appendChild(card)
    row.appendChild(col);
  }
  cal.appendChild(row);
}

h1.textContent = init.month;
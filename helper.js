console.log('hello');

const bookings = [
  {
    _id: '5e3e76f49570e424c0880333',
    shiftType: '8 hours',
    date: '2020-02-11T08:52:04.000Z',
    fullname: 'Abdulla Bashir',
    username: 'Bashiroglu',
    shift: '14:00-22:00',
    __v: 0
  },
  {
    _id: '5e3e77159570e424c0880334',
    shiftType: '8 hours',
    date: '2020-02-13T08:52:04.000Z',
    fullname: 'Abdulla Bashir',
    username: 'Bashiroglu',
    shift: '14:00-22:00',
    __v: 0
  }
];
console.log(
  bookings.map(booking => {
    Object.keys(booking).filter(key => {
      return (
        booking[key] === '__v' ||
        booking[key] === '_id' ||
        booking[key] === 'date'
      );
    });
  })
);
// console.log(bookings.map(booking => console.log(booking)));

console.log(
  bookings
    .map(booking => {
      return `
    <div class="row">
    ${Object.keys(booking)
      .map(
        key => `
    <div class="cell" data-title="Age">
              ${booking[key]}
            </div>
    `
      )
      .join('')}
    </div>
    `;
    })
    .join('')
);

const employees = [
  {
    id: '1',
    fullname: 'Hasan aslan',
    shiftType: '12 hours',
    shift: '18:00-6:00',
    username: 'hasanaslan'
  },
  {
    id: '2',
    fullname: 'hasan murad',
    shiftType: '8 hours',
    shift: '22:00-6:00',
    username: 'hasanmurad'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: employees });
};

exports.getUsers = getUsers;

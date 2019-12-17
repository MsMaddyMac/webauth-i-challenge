
exports.seed = function(knex) {
  // 001-cleanup.js deletes the data from all tables, we only need to insert seed data. No need for truncate() or del() here.
  // Inserts seed entries
  return knex('users').insert([
    {username: 'Chantell', password: 'pass', role_id: 1},
    {username: 'Benny', password: 'pass', role_id: 2},
    {username: 'Thaddeus', password: 'pass', role_id: 3}
  ]);
};

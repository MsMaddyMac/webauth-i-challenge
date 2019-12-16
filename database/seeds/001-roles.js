
exports.seed = function(knex) {
  // 001-cleanup.js deletes the data from all the tables, so we don't need to truncate() or del() in this function anymore. We only need to insert seed data.
  // Inserts seed entries
  return knex('roles').insert([
    {name: 'Admin'},
    {name: "TL's"},
    {name: 'Student'}
  ]);
};

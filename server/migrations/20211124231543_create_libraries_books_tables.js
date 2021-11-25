exports.up = function (knex) {
  return knex.schema
    .createTable("libraries", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.string("region").notNullable();
      table.integer("lat").notNullable().unsigned();
      table.integer("lng").notNullable().unsigned();
      table.string("description").notNullable();
    })
    .createTable("books", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("author").notNullable();
      table.string("comments").notNullable();
      table
        .integer("library_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("libraries")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("books").dropTable('libraries');
};

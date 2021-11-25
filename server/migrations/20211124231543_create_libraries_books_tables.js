exports.up = function (knex) {
  return knex.schema
    .createTable("libraries", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.string("region").notNullable();
      table.decimal("lat",10,7).notNullable();
      table.decimal("lng",10,7).notNullable();
      table.string("description").notNullable();
    })
    .createTable("books", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("author").notNullable();
      table.string("comment").notNullable();
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

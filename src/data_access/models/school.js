module.exports = class School {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.link = data.link;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
};

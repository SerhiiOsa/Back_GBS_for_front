module.exports = class Video {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.link = data.link;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
};

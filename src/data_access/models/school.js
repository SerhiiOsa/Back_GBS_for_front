module.exports = class School {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.link = data.link;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.image = this.formatImageString(data.image);
  }

  formatImageString(string) {
    if (!string) {
      return null;
    }

    return process.env.API_URL + string.slice(7); //remove 'public/'
  }
};

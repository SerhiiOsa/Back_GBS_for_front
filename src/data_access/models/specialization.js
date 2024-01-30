module.exports = class Specialization {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.extendedDescription = data.extended_description;
    this.parentId = data.parent_id;
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

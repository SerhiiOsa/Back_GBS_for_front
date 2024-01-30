module.exports = class Vacancy {
  constructor(data) {
    this.title = data.title;
    this.location = data.location;
    this.company = data.company;
    this.type = data.type;
    this.description = data.snippet;
    this.salary = data.salary;
    this.link = data.link;
  }
};

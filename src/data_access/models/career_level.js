module.exports = class CareerLevel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.trainingTerm = data.training_term;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
};

export class Task {
    constructor(title, notes, date, priority, labels) {
      this.title = title;
      this.notes = notes;
      this.date = new Date(date);
      this.priority = priority;
      this.labels = labels;
    }
}  
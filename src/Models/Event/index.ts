export class Event {
    id: string;
    title: string;
    description: string;
    date: string | Date;
  
    constructor(title: string, date: string | Date, description: string) {
      this.id = this.generateId();
      this.title = title;
      this.date = date;
      this.description = description;
    }
  
    // Generate a unique ID for each event
    private generateId(): string {
      return Date.now().toString()
    }
  }
  
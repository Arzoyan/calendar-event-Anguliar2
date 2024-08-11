import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Event } from '../../Models/Event';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isToday as isTodayFn } from 'date-fns';

export interface IMonthOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})



export class CalendarComponent implements OnInit {

  selectedDate: Date = new Date();
  newEvent: { title: string; date: Date | null; description: string } = { title: '', date: null, description: '' };
  days: Date[] = []; // Initialize with actual dates for your calendar
  selectedView: IMonthOption = { value: 'month', viewValue: 'Month' }; // Default view
  showForm: boolean = false;
  views: IMonthOption[] = [{ value: 'year', viewValue: 'Year' },
  { value: 'month', viewValue: 'Month' }];
  displayedMonth: Date = new Date();
  events: Event[] = [];
  listViewEvents: Event[] | [] = [];

  selectedMonth: IMonthOption = { value: `${this.displayedMonth.getMonth()}`, viewValue: format(this.displayedMonth, "MMMM") };
  months = [
    { value: '0', viewValue: 'January' },
    { value: '1', viewValue: 'February' },
    { value: '2', viewValue: 'March' },
    { value: '3', viewValue: 'April' },
    { value: '4', viewValue: 'May' },
    { value: '5', viewValue: 'June' },
    { value: '6', viewValue: 'July' },
    { value: '7', viewValue: 'August' },
    { value: '8', viewValue: 'September' },
    { value: '9', viewValue: 'October' },
    { value: '10', viewValue: 'November' },
    { value: '11', viewValue: 'December' }
  ];




  // Method to handle saving an event
  saveEvent(): void {
    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      const event = new Event(this.newEvent.title, this.newEvent.date, this.newEvent.description)
      this.events.push(event);
      this.resetForm();
      this.showForm = false; 
      this.getFilteredEvents(this.selectedDate)
    } else {
      // Handle the case where fields are not filled in
      alert('Please fill in all fields');
    }
  }
  // Method to reset the form
  resetForm(): void {
    this.newEvent = { title: '', date: null, description: '' };
  }



  // Utility functions
  format(date: Date, formatString: string): string {
    return format(date, formatString);
  }
  isToday(date: Date): boolean {
    return isTodayFn(date);
  }



  getFilteredEvents(selectedDay: Date ): Event[] {

    return this.listViewEvents= this.events.filter(event => new Date(event.date).toDateString() === new Date(selectedDay).toDateString()
    )
  }

  getAllEvents(): Event[] {
    return this.events; // Return all events for list view
  }
  changeMonth(offset: number | string): void {
    console.log(this.displayedMonth.getMonth() + 2, this.displayedMonth.getMonth());
    if (typeof offset === "number") {
      this.displayedMonth = new Date(this.displayedMonth.getFullYear(), this.displayedMonth.getMonth() + offset, 1);

    } else {
      console.log(offset, "offset");
      console.log(new Date(this.displayedMonth.getFullYear(), Number(offset), 1), "??????????");
      this.displayedMonth = new Date(this.displayedMonth.getFullYear(), Number(offset), 1);
    }
    this.loadDays();
  }

  hasEvents(day: Date): boolean {
    return this.events.some(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
  }
  ngOnInit(): void {
    this.loadDays();
  }

  handleDelete(index: number): void {
    const eventToDelete = this.listViewEvents[index];
    // Remove the event from listViewEvents
    this.listViewEvents.splice(index, 1);

    // Optionally, remove the event from the main events array
    this.events = this.events.filter(event => event !== eventToDelete);
  }


  loadDays(): void {
    const start = startOfMonth(this.displayedMonth);
    const end = endOfMonth(this.displayedMonth);
    this.days = eachDayOfInterval({ start, end });
  }
}


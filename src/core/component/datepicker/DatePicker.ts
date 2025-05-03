export default class DatePicker {
  static dateToLocalizedString(date: any): string {
    if (typeof date === 'string') return date;
    return new Date(date).toISOString().slice(0, 10);
  }
}
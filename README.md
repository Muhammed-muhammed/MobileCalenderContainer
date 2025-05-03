# 📅 Mobile-Compatible Calendar Component (React + TypeScript)

This project is a mobile-optimized, fully functional calendar and time selection component built with **React**, **TypeScript**, and **jalaali-js**. It simulates a calendar UI where users can pick a date and see available time slots. Useful for reservation systems, especially in Persian calendar-based applications.

---

## 🚀 Features

- 📆 Supports Jalaali (Persian) to Gregorian date conversion
- 🧠 Selectable calendar days with smart availability
- 🕓 Mocked time slots (`TimeBoxView`) per day
- 💬 Built-in messages and status indicators
- ✅ Fully working Create React App + TypeScript setup

---

## 🔧 How to Run

```bash
git clone <your-repo-url>
cd calender-mobile-compatible
npm install
npm start
```

---

## 📂 Folder Structure

```
calender-mobile-compatible/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx                         # Demo usage
│   ├── index.tsx
│   ├── component/
│   │   ├── CalenderContainerMobileCompatible.tsx
│   │   └── TimeBox/TimeBoxView.tsx
│   ├── core/
│   │   └── component/
│   │       ├── datepicker/DatePicker.ts
│   │       └── icon/
│   │           ├── Icon.tsx
│   │           └── IconType.ts
│   │   └── i18n/ClientMessagesUtil.ts
│   └── reserverequest/ReserveRequestModel.ts
├── tsconfig.json
└── package.json
```

---

## 📅 Persian Calendar Integration

We use [`jalaali-js`](https://github.com/jalaali/jalaali-js) to convert between Gregorian and Jalaali calendars, allowing localization for Iranian users.

---

## 📦 Mock Data

Sample time slots and reservation data are mocked to allow testing without a backend.

---

## 🧪 Future Enhancements

- Integration with real API
- Date range picker support
- Better mobile responsiveness and animations

---

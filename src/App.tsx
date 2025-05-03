import React from 'react';
import CalenderContainerMobileCompatible from './component/CalenderContainerMobileCompatible';

const mockTimeBoxList = [
  {
    dayDate: '2025-05-05T00:00:00.000',
    freeTimeBoxesListOfDay: [{ start: '10:00', end: '11:00' }],
    centerHasCapacityForSpecificVehicleType: true
  },
  {
    dayDate: '2025-05-06T00:00:00.000',
    freeTimeBoxesListOfDay: [],
    centerHasCapacityForSpecificVehicleType: false
  }
];

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <CalenderContainerMobileCompatible
        timeBoxlist={mockTimeBoxList}
        titleTimeBox="زمان‌های آزاد"
        name="رزرو"
        waitListReserveMessage="در صورت پر بودن، در لیست انتظار قرار می‌گیرید."
        titleTimeBoxWaitListFirst="اولویت انتظار"
        titleTimeBoxWaitListSecond="رزرو خودکار پس از خالی شدن"
      />
    </div>
  );
}
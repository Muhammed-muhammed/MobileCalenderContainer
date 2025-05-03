import {useEffect, useRef, useState} from 'react';
import DatePicker from '@core/component/datepicker/DatePicker';
import {TimeBoxView} from '../TimeBox/TimeBoxView';
import {Day} from './typeDefenition';
import jalaali from 'jalaali-js';
import IconType from '@core/component/icon/IconType';
import Icon from '@core/component/icon/Icon';
import {Typography} from '@mui/material';
import ClientMessagesUtil from '@core/i18n/ClientMessagesUtil';
import ReserveRequestModel from '../../reserverequest/ReserveRequestModel';

function pad(num: number) {
	return num < 10 ? '0' + num : num.toString();
}

const convertDate = (date: any) => {
	return date.gy + '-' + pad(date.gm) + '-' + pad(date.gd) + 'T00:00:00.000';
};
export const getDayOfWeek = (jYear: number, jMonth: number, jDay: number) => {
	const gregorianDate = jalaali.toGregorian(jYear, jMonth, jDay);
	const date = new Date(
		gregorianDate.gy,
		gregorianDate.gm - 1,
		gregorianDate.gd
	);
	const daysOfWeek = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];
	return daysOfWeek[date.getDay()];
};

type DayWithClassName = Day & {
	className?: string;
};

const CalenderContainerMobileCompatible = ({
											   timeBoxlist,
											   titleTimeBox,
											   name,
											   waitListReserveMessage,
											   titleTimeBoxWaitListFirst,
											   titleTimeBoxWaitListSecond,
										   }) => {
	const [selectedDay, setSelectedDay] = useState<Day | undefined>();
	const [timeBox, setTimeBox] = useState<any>();
	const [minimumDate, setMinimumDate] = useState<Day | undefined>();
	const [enableDays, setEnableDays] = useState<DayWithClassName[]>([]);
	const [dayIndex, setDayIndex] = useState<number | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [centerHasCapacity, setCenterHasCapacity] = useState<boolean>(true);
	const timer = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		const date = timeBoxlist && timeBoxlist?.length ? DatePicker.dateToLocalizedString(timeBoxlist?.[0]?.dayDate) : DatePicker.dateToLocalizedString(new Date()?.toDateString());
		setMinimumDate({
			year: Number(date?.slice(0, 4)),
			month: Number(date?.slice(5, 7)),
			day: Number(date?.slice(8, 10))
		});

		const enableDay: DayWithClassName[] = [];
		timeBoxlist?.forEach((x) => {
			const date = DatePicker.dateToLocalizedString(x.dayDate);
			if (x.freeTimeBoxesListOfDay?.length && x.centerHasCapacityForSpecificVehicleType) {
				enableDay.push({
					year: Number(date?.slice(0, 4)),
					month: Number(date?.slice(5, 7)),
					day: Number(date?.slice(8, 10)),
					className: '-enableDay'
				});
			}
		});
		setEnableDays(enableDay);
	}, [timeBoxlist]);

	return (
		<>
			<div className={'mobileCalender'}>
				<div className={'mobileCalenderButtonContainer'}>
					{enableDays?.length ? enableDays?.map((day, index) => (
						<>
							<button
								key={index}
								className={`date-button ${
									selectedDay?.year === day.year &&
									selectedDay?.month === day.month &&
									selectedDay?.day === day.day
										? 'selected'
										: ''
								}`}

								onClick={() => {
									let newValue = convertDate(jalaali.toGregorian(day.year, day.month, day.day));
									if (newValue) {
										const selectDay = timeBoxlist?.find(x => x.dayDate?.slice(0, 10) == newValue?.slice(0, 10));
										if (selectDay?.freeTimeBoxesListOfDay?.length || selectDay?.centerHasCapacityForSpecificVehicleType) {
											setTimeBox(selectDay?.freeTimeBoxesListOfDay);
											setSelectedDay(day);
											setDayIndex(index);
											setCenterHasCapacity(selectDay?.centerHasCapacityForSpecificVehicleType);
											if (!loading) {
												setSuccess(false);
												setLoading(true);
												timer.current = setTimeout(() => {
													setSuccess(true);
													setLoading(false);
												}, 700);
											}
										}
									}
								}}
							>
								<Icon style={{fontSize: '1.1rem', margin: '0.2rem auto'}} type={IconType.FREE_CANCELLATION}/>
								<div style={{fontSize: '0.7rem'}}>{getDayOfWeek(day.year, day.month, day.day)}</div>
								<span style={{fontWeight: 'bolder', fontSize: '1rem'}} className={'platefontInput'}>{pad(day.day)}</span>
								<span className="indicator"></span>
							</button>

						</>
					)) : (
						<>
							<div style={{

								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<Typography className={'header'} m={1}>
									{ClientMessagesUtil.getMessage(ReserveRequestModel, 'full')}
								</Typography>
								<Icon style={{fontSize: '2rem', color: 'red', marginTop: '1rem'}} type={IconType.EVENT_BUSY}/>
							</div>
						</>
					)}
				</div>

			</div>
			{success ? (
				<TimeBoxView
					timeBox={timeBox}
					isShow={success}
					waitListReserveMessage={waitListReserveMessage}
					setSuccess={setSuccess}
					name={name}
					date={{index: dayIndex, name: getDayOfWeek(selectedDay.year, selectedDay.month, selectedDay.day), ...selectedDay}}
					waitDateValue={convertDate(
						jalaali.toGregorian(
							selectedDay?.year,
							selectedDay?.month,
							selectedDay?.day
						)
					)}
					titleTimeBox={titleTimeBox}
					centerHasCapacity={centerHasCapacity}
					titleTimeBoxWaitListFirst={titleTimeBoxWaitListFirst}
					titleTimeBoxWaitListSecond={titleTimeBoxWaitListSecond}
				/>
			) : <></>}
		</>

	);
};

export default CalenderContainerMobileCompatible;

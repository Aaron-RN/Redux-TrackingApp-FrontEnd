const getSelectedWeek = (selectWeek = 0, currentWeek) => {
  const startingDay = new Date();
  const endingDay = new Date();
  let selectedWeek;
  let dates = [];
  let months = [];
  let years = [];
  const fillDates = (endDate, startDate) => {
    const o = endDate;
    const newDates = [];
    for (let i = startDate; i !== o + 1; i += 1) {
      if (i > 31) i = 1;
      newDates.push(i);
    }
    dates = newDates;
  };
  const fillMonths = (endMonth, startMonth) => {
    const newMonths = [];
    newMonths.push(endMonth);
    newMonths.push(startMonth);
    months = newMonths;
  };
  const fillYears = (endYear, startYear) => {
    const newYears = [];
    newYears.push(endYear);
    newYears.push(startYear);
    years = newYears;
  };
  if (selectWeek === 0) {
    const todaysDate = new Date();
    startingDay.setFullYear(todaysDate.getFullYear());
    startingDay.setMonth(todaysDate.getMonth());
    startingDay.setDate(todaysDate.getDate() - todaysDate.getDay());
    endingDay.setFullYear(startingDay.getFullYear());
    endingDay.setMonth(startingDay.getMonth());
    endingDay.setDate(startingDay.getDate() + 6);
    selectedWeek = `${startingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    fillDates(endingDay.getDate(), startingDay.getDate());
    fillMonths(endingDay.getMonth(), startingDay.getMonth());
    fillYears(endingDay.getFullYear(), startingDay.getFullYear());
  }
  if (selectWeek === -1) {
    startingDay.setFullYear(currentWeek.startDate.getFullYear());
    startingDay.setMonth(currentWeek.startDate.getMonth());
    startingDay.setDate(currentWeek.startDate.getDate() - 7);
    endingDay.setFullYear(currentWeek.startDate.getFullYear());
    endingDay.setMonth(currentWeek.startDate.getMonth());
    endingDay.setDate(currentWeek.startDate.getDate() - 1);
    selectedWeek = `${startingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    fillDates(endingDay.getDate(), startingDay.getDate());
    fillMonths(endingDay.getMonth(), startingDay.getMonth());
    fillYears(endingDay.getFullYear(), startingDay.getFullYear());
  }
  if (selectWeek === 1) {
    startingDay.setFullYear(currentWeek.endDate.getFullYear());
    startingDay.setMonth(currentWeek.endDate.getMonth());
    startingDay.setDate(currentWeek.endDate.getDate() + 1);
    endingDay.setFullYear(currentWeek.endDate.getFullYear());
    endingDay.setMonth(currentWeek.endDate.getMonth());
    endingDay.setDate(currentWeek.endDate.getDate() + 7);
    selectedWeek = `${startingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    fillDates(endingDay.getDate(), startingDay.getDate());
    fillMonths(endingDay.getMonth(), startingDay.getMonth());
    fillYears(endingDay.getFullYear(), startingDay.getFullYear());
  }

  return {
    text: selectedWeek,
    startDate: startingDay,
    endDate: endingDay,
    allDates: dates,
    allMonths: months,
    allYears: years,
  };
};

export default getSelectedWeek;

// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const createArray = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
};

const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(6);
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            days: []
        });

        for (let dayIndex = 0; dayIndex < 8; dayIndex++) {
            const day = (dayIndex - startDay) + (weekIndex * 7) + 1;
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days.push({
                value: isValid ? day : '',
            });
        }
    }

    return result;
};

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

    return result;
};

const createHtml = (data) => {
    let result = '';

    result += `<tr><th class="table__cell table__cell_heading">Week</th>`;

    for (let i = 0; i < 7; i++) {
        result += `<th class="table__cell table__cell_heading">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</th>`;
    }

    result += `</tr>`;

    for (let weekIndex = 0; weekIndex < data.length; weekIndex++) {
        const { days } = data[weekIndex];
        let inner = '';
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${weekIndex + 1}`);

        for (const { value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = [0, 6].includes(new Date().getDay());
            const isAlternate = (weekIndex + 1) % 2 === 0;

            let classString = 'table__cell';

            if (isToday) classString += ' table__cell_today';
            if (isWeekend) classString += ' table__cell_weekend';
            if (isAlternate) classString += ' table__cell_alternate';

            inner = addCell(inner, classString, value);
        }

        result += `<tr>${inner}</tr>`;
    }

    return result;
};

// Only edit above

const current = new Date();
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

const data = createData();
document.querySelector('[data-content]').innerHTML = createHtml(data);

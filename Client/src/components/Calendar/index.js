import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  Card,
  Modal,
  Paper,
  Typography
} from '@material-ui/core';

import * as utils from '../../utils/calendar';
import calendarStyles from '../../style/calendar';

function Cell({
  lunarDate,
  solarDate,
  solarMonth,
  solarYear,
  setContent,
  setDetail
}) {
  const classes = calendarStyles();

  var cellClass = classes.ngaythang,
    solarClass = classes.t2t6,
    lunarClass = classes.am,
    title = '',
    tmp = '',
    dow = (lunarDate.jd + 1) % 7;
  if (dow === 0) {
    solarClass = classes.cn;
  } else if (dow === 6) {
    solarClass = classes.t7;
  }
  var today = new Date();
  if (
    solarDate === today.getDate() &&
    solarMonth === today.getMonth() + 1 &&
    solarYear === today.getFullYear()
  ) {
    cellClass = classes.today;
  }
  tmp = utils.checkHolidayLunar(lunarDate.day, lunarDate.month);
  if (tmp !== '') {
    cellClass = classes.leam;
    title = tmp;
  }
  tmp = utils.checkHolidaySolar(solarDate, solarMonth);
  if (tmp !== '') {
    cellClass = classes.leduong;
    title = title === '' ? tmp : title + ', ' + tmp;
  }
  title = title === '' ? utils.getDayName(lunarDate) : title;
  if (lunarDate.day === 1 && lunarDate.month === 1) {
    cellClass = classes.tet;
  }
  if (lunarDate.leap === 1) {
    lunarClass = classes.am2;
  }
  var lunar = lunarDate.day;
  if (solarDate === 1 || lunar === 1) {
    lunar =
      lunarDate.day +
      '/' +
      lunarDate.month +
      (lunarDate.leap === 1 ? '<sup>N</sup>' : '');
  }
  var args =
    lunarDate.day +
    ',' +
    lunarDate.month +
    ',' +
    lunarDate.year +
    ',' +
    lunarDate.leap;
  args +=
    ',' + lunarDate.jd + ',' + solarDate + ',' + solarMonth + ',' + solarYear;

  const handleClick = () => {
    setDetail(true);
    setContent(args);
  };

  return (
    <td className={cellClass} title={lunarDate && title} onClick={handleClick}>
      <div className={solarClass}>{solarDate}</div>
      <div className={lunarClass}>{lunar}</div>
    </td>
  );
}

function PrevMonthLink({ month, year, setMonth, setYear }) {
  var mm = month > 1 ? month - 1 : 12;
  var yy = month > 1 ? year : year - 1;
  const classes = calendarStyles();

  const handleClick = () => {
    setMonth(mm);
    setYear(yy);
  };

  return (
    <span className={classes.buttonControl} onClick={handleClick}>
      &nbsp;&lsaquo;&nbsp;
    </span>
  );
}

function PrevYearLink({ year, setYear }) {
  const handleClick = () => {
    setYear(year - 1);
  };
  const classes = calendarStyles();

  return (
    <span className={classes.buttonControl} onClick={handleClick}>
      &lsaquo;&lsaquo;
    </span>
  );
}

function NextMonthLink({ month, year, setMonth, setYear }) {
  var mm = month < 12 ? month + 1 : 1;
  var yy = month < 12 ? year : year + 1;

  const handleClick = () => {
    setMonth(mm);
    setYear(yy);
  };

  const classes = calendarStyles();

  return (
    <span className={classes.buttonControl} onClick={handleClick}>
      &nbsp;&rsaquo;&nbsp;
    </span>
  );
}

function NextYearLink({ year, setYear }) {
  const handleClick = () => {
    setYear(year + 1);
  };

  const classes = calendarStyles();

  return (
    <span className={classes.buttonControl} onClick={handleClick}>
      &rsaquo;&rsaquo;
    </span>
  );
}

function Head({ month, year, setMonth, setYear }) {
  const classes = calendarStyles();

  return (
    <>
      <tr className={classes.header}>
        <td colSpan="2" className={classes.navi}>
          <PrevYearLink year={year} setYear={setYear} />
          <PrevMonthLink
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
          />
        </td>
        <td colSpan="3" className={classes.tenthang}>
          {'Tháng ' + month + ' ' + year}
        </td>
        <td colSpan="2" className={classes.navi}>
          <NextMonthLink
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
          />
          <NextYearLink year={year} setYear={setYear} />
        </td>
      </tr>
      <tr>
        <td style={{ height: '20px' }}></td>
      </tr>
      {/* {utils.LOOP7.map((i) => <col width="50px" key={i} />)} */}
      <tr>
        {utils.LOOP7.map(i => (
          <td className={classes.ngaytuan} key={i}>
            {utils.DAYNAMES[i]}
          </td>
        ))}
      </tr>
      <tr>
        <td style={{ height: '5px' }}></td>
      </tr>
    </>
  );
}

function ShowDetail({ content, setDetail, setContent }) {
  const classes = calendarStyles();

  const [state, setState] = useState(null);

  useEffect(() => {
    let res = utils.cellClick(content);
    setState(res);
  }, [setState, content]);

  const handleClick = () => {
    setDetail(false);
    setContent('');
  };

  return (
    <Paper className={classes.paperModal}>
      {state && (
        <div style={{ margin: 'auto' }}>
          <Typography>{state.lunarDate}</Typography>
          <Typography>{state.solarDate}</Typography>
          <Typography>{state.startHour}</Typography>
          <Typography>{state.tietKhi}</Typography>
          <Typography>{state.hoangDao}</Typography>
          <Typography>{state.holiday}</Typography>
        </div>
      )}
      <div className={classes.buttonContainer}>
        <Button onClick={handleClick} className={classes.button}>
          Đóng
        </Button>
      </div>
    </Paper>
  );
}

function Table({ setContent, setDetail }) {
  const classes = calendarStyles();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const [currentMonth, setCurrentMonth] = useState([]);
  const [emptyCells, setEmptyCells] = useState(null);

  var k, solar, ld1;

  useEffect(() => {
    var currentMonth, ld1, emptyCells;
    currentMonth = utils.getMonth(month, year);
    setCurrentMonth(currentMonth);
    if (currentMonth.length !== 0) {
      ld1 = currentMonth[0];
      emptyCells = (ld1.jd + 1) % 7;
      setEmptyCells(emptyCells);
    }
  }, [setCurrentMonth, setEmptyCells, month, year]);

  return (
    <Card className={classes.tableCard}>
      {currentMonth && currentMonth.length !== 0 && (
        <table
          className={classes.amlich}
          border="0"
          cellPadding="0"
          cellSpacing="0"
          width="100px"
        >
          <colgroup>
            {utils.LOOP7.map(i => (
              <col className={classes.colWidth} key={i} />
            ))}
          </colgroup>
          <tbody>
            <Head
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
            />
            {utils.LOOP6.map(i => (
              <tr key={i}>
                {utils.LOOP7.map(j => {
                  k = 7 * i + j;
                  if (k < emptyCells || k >= emptyCells + currentMonth.length) {
                    return (
                      <td className={classes.ngaythang} key={i + '' + j}>
                        <div className={classes.cn}>&nbsp;</div>
                        <div className={classes.am}>&nbsp;</div>
                      </td>
                    );
                  } else {
                    solar = k - emptyCells + 1;
                    ld1 = currentMonth[k - emptyCells];
                    return (
                      <Cell
                        key={i + '' + j}
                        lunarDate={ld1}
                        solarDate={solar}
                        solarMonth={month}
                        solarYear={year}
                        setContent={setContent}
                        setDetail={setDetail}
                      />
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default function Calendar() {
  const [detail, setDetail] = useState(false);
  const [content, setContent] = useState('');

  const handleClose = () => {
    setDetail(false);
  };

  const classes = calendarStyles();

  const DetailContent = React.forwardRef((props, ref) => (
    <ShowDetail {...props} innerRef={ref} />
  ));

  const ref = React.createRef();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Table setContent={setContent} setDetail={setDetail} />
      </div>
      <Modal
        open={detail}
        onClose={handleClose}
        aria-labelledby="calendar-detail"
        aria-describedby="calendar-detail-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <DetailContent
          ref={ref}
          content={content}
          setDetail={setDetail}
          setContent={setContent}
        />
      </Modal>
    </div>
  );
}

import 'date-fns';
import React, { useEffect } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { CALENDAR_ICON, TIME_ICON } from 'app/constants/s3-images.constants';

interface DateTimePickerPropsNew {
  page: string;
  type: string;
  onSelect: any;
  value: any;
  minValue: any;
  enableTimePicker?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  dateFormat?: string;
  datePlaceholder?: string;
  timePlaceholder?: string;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CalenderselectDate: {
      padding: 0,
      '&>:first-child': {
        '&>:first-child': {
          '&>:first-child div': {
            '& button': {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
          '&::before': {
            borderBottom: '0px',
          },
          '& input': {
            fontSize: '14px',
            height: 36,
            padding: 0,
          },
        },
      },
      '& svg': {
        display: 'none',
      },
    },

    CalenderselectDateTime: {
      padding: 0,
      '&>:first-child': {
        '&>:first-child': {
          '& div': {
            '& button': {
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
          '&::before': {
            borderBottom: '0px',
          },
          '& input': {
            fontSize: '14px',
            height: 36,
            padding: 0,
          },
        },
      },
      '& svg': {
        display: 'none',
      },
    },
    icons: {
      marginRight: '10px',
    },
    CalenderSvgIcon: {
      '& p': {
        marginTop: 0,
      },
      '&>:first-child': {
        '&::after': {
          borderBottomColor: 'transparent',
        },
        '& div': {
          '& button': {
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  }),
);
export default function DateTimePickers(props: DateTimePickerPropsNew) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const classes = useStyles();
  const SelectDate = styled.div`
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    height: 36px;
    padding-left: 14px;
    &:nth-child(2) {
      &::before {
        border-bottom: 0px;
      }
    }
  `;
  const handleDateChange = (date: Date | null, picker: string) => {
    setSelectedDate(date);
    props.onSelect({ date: date, type: props.type, picker });
  };

  useEffect(() => {
    setSelectedDate(props.value);
  }, [props.value]);

  const {
    enableTimePicker = false,
    disablePast = false,
    disableFuture = true,
    dateFormat = 'dd/MM/yyyy',
    datePlaceholder = 'DD/MM/YYYY',
    timePlaceholder = 'HH/MM',
    disabled,
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SelectDate className={classes.CalenderselectDate}>
        <KeyboardDatePicker
          variant="inline"
          format={dateFormat}
          margin="none"
          placeholder={datePlaceholder}
          label={false}
          value={selectedDate}
          onChange={(date: Date | null) => handleDateChange(date, 'date')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          keyboardIcon={
            <MemoizedImage src={CALENDAR_ICON} alt="calendar-icon" />
          }
          disableFuture={disableFuture}
          disablePast={disablePast}
          minDate={props.minValue}
          className={classes.CalenderSvgIcon}
          disabled={disabled}
        />
      </SelectDate>

      {enableTimePicker && (
        <SelectDate
          style={{ marginLeft: '10px' }}
          className={classes.CalenderselectDateTime}
        >
          <KeyboardTimePicker
            // variant="inline"
            margin="none"
            // id="time-picker-inline"
            label={false}
            value={selectedDate}
            placeholder={timePlaceholder}
            onChange={(date: Date | null) => handleDateChange(date, 'time')}
            keyboardIcon={<MemoizedImage src={TIME_ICON} alt="time-icon" />}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            disabled={disabled}
          />
        </SelectDate>
      )}
    </MuiPickersUtilsProvider>
  );
}

const MemoizedImage = React.memo(function Image({ src, alt }: any) {
  return (
    <img
      style={{ marginRight: '8px', marginTop: '-2px' }}
      src={src}
      alt={alt}
    />
  );
});

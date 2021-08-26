import React, { useMemo, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
const CustomInputLabel = styled.label`
  font-size: 16px;
  line-height: 20px;
  margin-right: 30px;
  color: #666;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    Multiselect: {
      '&>:first-child': {
        background: '#FFFFFF',
        border: '1px solid #E9E9E9',
        borderRadius: '4px',
        maxWidth: '361px',
        minWidth: '361px',
        minHeight: '36px',
        '&>:first-child': {
          padding: '0px 0 7px ',
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
        '&::before': {
          borderBottom: '0px',
        },
        '&:hover': {
          '&::before': {
            borderBottom: '0px',
          },
        },
        '&:active': {
          '&::before': {
            borderBottom: '0px',
          },
        },
        '& svg': {
          fill: '#999',
        },
      },
    },
    SelectRoot: {
      display: 'flex',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
      backgroundColor: '#1d7dea',
      fontSize: '12px',
      lineHeight: '16px',
      color: '#fff',
      borderRadius: '4px',
      height: '23px',
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface MultiSelectProps {
  dataPassed: any;
  onSelect: any;
  placeHolderText: string;
}
const MultiSelectComponent = function(props: MultiSelectProps) {
  const classes = useStyles();
  const [selectedData, setValue] = React.useState<string[]>([]);
  const [selectedItemsString, setSelectedItemsString] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setValue(event.target.value as string[]);
  };

  useEffect(() => {
    setSelectedItemsString(selectedData.join(''));

    let allSelectedValues: any = [];
    propsRecieved.map((data: any) => {
      selectedData.map((sData: any) => {
        if (data.name === sData) {
          allSelectedValues.push(data);
        }
      });
    });
    props.onSelect(allSelectedValues);
  }, [selectedData]);

  let propsRecieved: any = JSON.parse(props.dataPassed);

  return (
    <div className={classes.SelectRoot}>
      <Grid className={classes.Multiselect}>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          IconComponent={() => <KeyboardArrowDown />}
          value={selectedData}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          placeholder={props.placeHolderText}
        >
          {propsRecieved.map((dataPassedOp: any) => (
            <MenuItem key={dataPassedOp.name} value={dataPassedOp.name}>
              <Checkbox
                checked={selectedItemsString.includes(dataPassedOp.name)}
              />
              <ListItemText primary={dataPassedOp.name} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </div>
  );
};

export default MultiSelectComponent;

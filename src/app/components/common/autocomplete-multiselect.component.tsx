import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useStyles } from '../../../app/screens/ReportScreens/GenarateReportScreen/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface MultiSelectProps {
  dataPassed: any;
  onSelect: any;
  placeHolderText: string;
  disabled: boolean;
  onScrollForLoad: any;
  resetValue: any;
}

export default function CheckboxesTags(props: MultiSelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [allSelectedValues, setAllSelectedValues] = useState([]);
  const [toReset, setToReset] = useState({ set: false, value: '' });
  let arrayInput = [];
  if (
    props.dataPassed &&
    props.dataPassed.list &&
    props.dataPassed.list.length > 0
  ) {
    arrayInput = props.dataPassed;
  } else {
    arrayInput = [];
  }
  let dataToIterate: any = arrayInput && arrayInput.list;
  if (dataToIterate && dataToIterate.length > 0) {
    dataToIterate = dataToIterate.filter((thing: any, index: any) => {
      const _thing = JSON.stringify(thing);
      return (
        index ===
        dataToIterate.findIndex((obj: any) => {
          return JSON.stringify(obj) === _thing;
        })
      );
    });
  }

  useEffect(() => {
    if (props.resetValue !== null || props.resetValue !== undefined) {
      if (toReset.value !== '' && props.resetValue !== toReset.value) {
        setAllSelectedValues([]);
        setToReset({ set: true, value: props.resetValue });
      } else {
        setToReset({ set: false, value: props.resetValue });
      }
    }
  }, [props.resetValue]);

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(false);
  }, [dataToIterate]);

  useEffect(() => {
    if (isLoading) {
      props.onScrollForLoad();
    }
  }, [isLoading]);

  const modifySelectedValues = (value: any) => {
    if (value.length < 26) {
      setToReset({ set: false, value: props.resetValue });
      setAllSelectedValues(value);
      props.onSelect(value);
    }
  };

  const changingText = () => {};

  // used for infinite scrolling of list inside MUipopper
  const checkMouseMove = (e: any) => {
    const div = document.getElementsByClassName('MuiAutocomplete-listbox')[0];
    if (div) {
      div.addEventListener('scroll', (e: any) => {
        // hit api when reached end
        if (div.scrollHeight - div.scrollTop - div.clientHeight <= 0) {
          if (!isLoading) {
            setIsLoading(true);
          }
        }
      });
    }
  };

  return (
    <Autocomplete
      classes={{
        inputRoot: classes.inputRoot,
        popupIndicator: classes.svgIcon,
        option: classes.listingElement,
      }}
      multiple
      id="checkboxes-tags-demo"
      options={dataToIterate ? dataToIterate : []}
      value={toReset.set ? [] : allSelectedValues}
      disableCloseOnSelect
      getOptionLabel={(option: any) => option.name}
      onMouseMove={(e: any) => {
        checkMouseMove(e);
      }}
      onChange={(event: any, value: any) => modifySelectedValues(value)}
      disabled={props.disabled}
      renderOption={(option: any, { selected }) => (
        <React.Fragment>
          <Checkbox
            disableRipple
            icon={icon}
            checkedIcon={checkedIcon}
            classes={{ root: classes.customCheckbox }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      renderInput={(params: any) => (
        <TextField
          InputProps={{
            className: classes.inputColor,
          }}
          {...params}
          variant="outlined"
          onChange={changingText}
          placeholder={
            allSelectedValues.length === 0 ? props.placeHolderText : ''
          }
        />
      )}
    />
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, IconButton, Link } from '@material-ui/core';

interface Props {
  searchText: string;
  onChange: any;
  placeholder?: string;
  callback?: any;
}

function ExpandableSearch(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const { searchText, onChange, placeholder, callback } = props;

  useEffect(() => {
    if (callback) {
      callback(expanded);
    }
  }, [expanded, callback]);

  return (
    <SearchContainer>
      {expanded && (
        <CancelLink onClick={() => setExpanded(false)}>Cancel</CancelLink>
      )}
      <Inputstyle
        className={expanded ? 'expanded' : ''}
        id="searchright"
        type="search"
        value={searchText}
        onChange={onChange}
        placeholder={placeholder}
      />
      <LabelButton
        className="searchbutton"
        htmlFor="searchright"
        onClick={() => setExpanded(true)}
      >
        <GlassIcon>&#9906;</GlassIcon>
      </LabelButton>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  text-align: right;
`;

const CancelLink = styled.span`
  color: #fff;
  position: absolute;
  right: -5px;
  top: 0;
  font-size: 18px;
  z-index: 1;
  background-color: #1d7dea;
  height: 36px;
  width: 100%;
  line-height: 36px;
  min-width: 100px;
`;

const Inputstyle = styled.input`
  position: absolute;
  background-color: white;
  right: 20px;
  outline: none;
  border: none;
  padding: 0;
  width: 0;
  height: 100%;
  z-index: 10;
  transition-duration: 0.4s;
  transform-origin: right;

  &.expanded {
    max-width: 363px;
    width: calc(100vw - 140px);
    padding: 0 16px 0;
    background-color: #fff;
    transform: translate(-45px, 0);
    border-radius: 4px;
    @media (max-width: 360px) {
      width: calc(100vw - 130px);
    }
  }
`;
const LabelButton = styled.label`
  display: inline-block;
  margin: 1px 2px;
  background-color: #fff;
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #444;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  @media (max-width: 768px) {
    height: 34px;
    line-height: 37px;
  }

  &:hover {
    transition-duration: 0.4s;
    color: black;
  }
`;

const GlassIcon = styled.span`
  display: inline-block;
  pointer-events: none;
  transform: rotate(-45deg) scale(1.8);
  color: #1d7dea;
  @media (max-width: 768px) {
    transform: rotate(-45deg) scale(2);
  }
`;

export default ExpandableSearch;

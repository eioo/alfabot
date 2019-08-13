import '../../assets/geosuggest.css';
import styled from '@emotion/styled';
import React from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';

const SearchBox = styled(Geosuggest)`
  margin-left: 0;
`;

interface ICitySearchProps {
  onSuggestSelect: (suggest: Suggest) => void;
}

export default function CitySearch({ onSuggestSelect }: ICitySearchProps) {
  return (
    <SearchBox>
      <Geosuggest
        placeholder="Select city"
        types={['(cities)']}
        onSuggestSelect={onSuggestSelect}
      />
    </SearchBox>
  );
}

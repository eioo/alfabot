import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const CityList = styled(Grid)`
  &&& {
    padding-top: 0.5em;
  }
`;

const CityRow = styled(Grid.Row)`
  &&& {
    padding: 0.3em 0em;
  }
`;

const RemoveButton = styled(Grid.Column)`
  width: 6em !important;
`;

const CityName = styled(Grid.Column)`
  margin-top: 0.2em !important;
`;

interface ISettingsState {
  cities: string[];
}

class WeatherSettings extends React.Component<{}, ISettingsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      cities: ['Lahti', 'Tampere'],
    };
  }
  onSubmit(values) {
    window.alert(JSON.stringify(values, null, 2));
  }

  handleRemoveCity(city: string) {
    console.log('removing ' + city);
  }

  getCityList() {
    const { cities } = this.state;

    return (
      <div>
        <p>
          <strong>Current Cities</strong>
        </p>
        <CityList columns={2} relaxed>
          {cities.map((city, i) => {
            return (
              <CityRow key={i}>
                <RemoveButton>
                  <Button
                    basic
                    size='mini'
                    color='red'
                    onClick={() => {
                      this.handleRemoveCity(city);
                    }}
                    content='Remove'
                  />
                </RemoveButton>
                <CityName>{city}</CityName>
              </CityRow>
            );
          })}
        </CityList>
      </div>
    );
  }

  createForm() {
    return (
      <FinalForm
        onSubmit={this.onSubmit}
        render={({ handleSubmit, submitting, pristine, form, values }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Add new city</label>
              <Field name='cityName' component='input' />
            </Form.Field>

            <Button
              type='submit'
              disabled={submitting}
              color='green'
              content='Save'
            />

            <Button
              onClick={form.reset}
              disabled={submitting || pristine}
              color='yellow'
              content='Reset'
            />
          </Form>
        )}
      />
    );
  }

  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column width={6}>{this.createForm()}</Grid.Column>
          <Grid.Column width={5} floated='right'>
            {this.getCityList()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default WeatherSettings;

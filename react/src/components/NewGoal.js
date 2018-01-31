import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Form, FormControl, Button } from 'react-bootstrap'


class  NewGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      name: '',
      description: '',
      dueDateTime: moment()
    }
    this.handleNameCreation = this.handleNameCreation.bind(this);
    this.handleDescriptionCreation = this.handleDescriptionCreation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.hanleDueDateTime = this.hanleDueDateTime.bind(this);

  }

  handleNameCreation(event) {
    this.setState({ name: event.target.value })
  }

  handleDescriptionCreation(event) {
    this.setState({ description: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      url:`/api/v1/goals`,
      type: 'POST',
      dataType:'json',
      contentType: 'application/json',
      data: JSON.stringify({ name: this.state.name, description: this.state.description, due_time: this.state.dueDateTime })
    })
    .done((data) => {
      console.log("goal created")
      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.setState({ name: '', description: '' });
      }
    });
  }

  hanleDueDateTime(date) {
    this.setState({ dueDateTime: date });
  }

  render() {
    let nameError = <div className="error"><span className="error-star">*</span>{this.state.errors.name}</div>
    let descriptionError = <div className="error"><span className="error-star">*</span>{this.state.errors.decription}</div>

    return (
      <Form inline className="callout" onSubmit={this.handleFormSubmit}>
        {nameError}
        <label>Name</label>
        <FormControl
          type="text"
          value={this.state.name}
          name = 'name'
          onChange={this.handleNameCreation}
        />
        {descriptionError}
        <label>Description</label>
        <FormControl
          type="text"
          value={this.state.description}
          name = 'name'
          name = 'description'
          onChange={this.handleDescriptionCreation}
        />
      <label><h2>Select date and time</h2></label>
          <DatePicker
            selected={this.state.dueDateTime}
            onChange={this.hanleDueDateTime}
            showTimeSelect
            dateFormat="LLL"
        />
        <div className="button-group">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    );
  }
}

export default NewGoal;
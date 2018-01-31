import React, { Component } from 'react';
import Goal from './Goal';
import EditGoal from './EditGoal';
import Grid from 'react-bootstrap/lib/Grid';

import moment from 'moment';

class Goals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      editingGoalId: 0
    };
    this.getGoals = this.getGoals.bind(this);
    this.populateGoals = this.populateGoals.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoal = this.editGoal.bind(this);
  }

  componentDidMount(){
    this.getGoals();
  }

  getGoals() {
    $.ajax({
      url: `/api/v1/goals.json`,
      method: 'GET',
      success: this.populateGoals
    });
  }

  populateGoals(data) {
    this.setState({ goals: data.goals });
  }

  deleteGoal(goal) {
    $.ajax({
      url: `/api/v1/goals/${goal.id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.getGoals();
      console.log('Goal deleted!');

    })
    .fail((response) => {
      console.log.error('There was a problem deleting that goal.');
    });
  }

  editGoal(goal) {
    this.setState({ editingGoalId: goal.id })
  }

  render() {

    let goals = this.state.goals.map(goal => {
      if(this.state.editingGoalId === goal.id) {
      return(
        <EditGoal key={goal.id}
                  name={goal.name}
                  description={goal.description}
                  dueTime={moment(goal.due_time).format("MMMM Do YYYY, h:mm a")}
                  goal={goal}
                  onSave={this.updateGoal}
                  onCancel={this.cancelUpdate}
                   />
        );
       } else {
         return(
        <Goal
          key={goal.id}
          name={goal.name}
          description={goal.description}
          startDate={moment(goal.created_at).format("MMMM Do YYYY, h:mm a")}
          dueTime={moment(goal.due_time).format("MMMM Do YYYY, h:mm a")}
          deadline={goal.due_time}
          goal={goal}
          onDelete={this.deleteGoal}
          onEdit={this.editGoal}
        />
    );
    }
    });
    return(
      <div>
        <h1>Goals</h1>
        <div>
          {goals}
        </div>

      </div>
    );
  }
}

export default Goals;
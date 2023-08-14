
import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Write a number 0 - 10',
      userNumber: '',
      randomNumber: this.generateRandomNumber(),
      count: 0,
      isGameOver: false,
    };
  }

  generateRandomNumber = () =>
    Math.floor(Math.random() * (this.props.max - this.props.min)) +
    this.props.min;

  resetGame = () => {
    this.setState({
      result: 'Write a number',
      userNumber: '',
      randomNumber: this.generateRandomNumber(),
      count: 0,
      isGameOver: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isGameOver) {
      return;
    }

    const userNumber = parseInt(this.state.userNumber);

    if (isNaN(userNumber) || userNumber < this.props.min ||
    userNumber > this.props.max) {
      return;
    }

    this.setState((state) => ({
      count: state.count + 1,
    }));

    if (userNumber > this.state.randomNumber) {
      this.setState({
        result: `${userNumber} is greater than the guessed number`,
        userNumber: '',
      });
    } else if (userNumber < this.state.randomNumber) {
      this.setState({
        result: `${userNumber} is smaller than the guessed number`,
        userNumber: '',
      });
    } else {
      this.setState({
        result: `Congratulations! You guessed ${userNumber} in
        ${this.state.count + 1} attempts`,
        isGameOver: true,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.isGameOver}
          />
          <button className={style.btn} disabled={this.state.isGameOver}>
            Угадать
          </button>
        </form>
        {this.state.isGameOver && (
          <button className={style.btn} onClick={this.resetGame}>
           Сыграть ещё
          </button>
        )}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};

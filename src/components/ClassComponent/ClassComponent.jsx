
import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Write a number',
      userNumber: '',
      randomNumber: this.generateRandomNumber(),
      count: 0,
      playAgain: false,
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
      playAgain: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Write a number`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} is greater than the guessed number`,
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} is smaller than the guessed number`,
          userNumber: '',
        };
      }

      return {
        result: `Congratulations! 
        You guessed ${state.userNumber} in ${state.count} attempts`,
        userNumber: '',
      };
    });
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
          />
          <button className={style.btn}>Угадать</button>
        </form>
        {this.state.result.includes('Congratulations') && (
          <button className={style.btn} onClick={this.resetGame}>
            Play again
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

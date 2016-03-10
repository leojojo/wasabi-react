import React from 'react';
import { hashHistory, Link } from 'react-router';
import AltContainer from 'alt-container';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import SlideActions from '../actions/SlideActions';
import SlideStore from '../stores/SlideStore';
import SlideShow from './SlideShow.jsx';

//import Quiz from './Quiz.jsx';
import ChatBox from './Chat.jsx';

export default class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quizRetries: 0,
      lastAnswer: null,
      lastCorrect: false,

      chatlog: [{
        user: '',
        timestamp: '',
        message: ''
      }]
    }
  }
  componentDidMount() {
    var loggedInUser = UserStore.getState().loggedInUser;
    this.setState({user: loggedInUser});

    this.setState(SlideStore.getState());
    SlideStore.listen(this.changeSlideStore);

    SlideActions.subSlide({slideDeckId:this.props.params.deckId, user: loggedInUser});
    console.log('componentDidMount', this.state, SlideStore.getState());

    this.setState({
      quizRetries: 0,
      lastAnswer: null,
      lastCorrect: false,

      chatlog: [{}]
    });
  }
  componentWillUnmount() {
    SlideActions.unsubSlide(this.props.params.deckId);
    SlideStore.unlisten(this.changeSlideStore);
  }
  changeSlideStore = (state) => {
    this.setState(state);
  }
  render() {
/*    var QuizResult;

    if (this.state.quizRetries > 0) {
      if (this.state.lastCorrect === true) {
        QuizResult = <div>CORRECT ANSWER!</div>
      } else {
        QuizResult = <div>WRONG ANSWER, try again</div>
      }
    }
        <Quiz quizText={'What is the result of 1 + 2?'} quizChoices={['1', '2', '3', '4']}
          quizHandleAnswer={this.handleAnswer}
        />
        {QuizResult}
    */
    return (  
      <div className="row">
        <AltContainer
          stores={{slides: SlideStore}}
        >
          <SlideShow
            onFirst={this.handleFirst}
            onPrev={this.handlePrev}
            onNext={this.handleNext}
            onLast={this.handleLast} />
        </AltContainer>
        <ChatBox 
        Chat = {['Sam','bla bla','7:30:3'], ['Leo', 'whateve', '12:38:344'
        ]}
        onSend = {this.handleMessage}
        />
      </div>
    );
  }

  handleMessage = (message) => {
    //SlideStore.send('chat', {user:this.state.user, message:message});
    console.log(message);
  }

  handleAnswer = (choice, index) => {
    var answerCorrect = false;
    if (index === 2) {
      answerCorrect = true;
    }
    // console.log('answer', choice, answerCorrect);
    this.setState({
      quizRetries: ++this.state.quizRetries,
      lastAnswer: choice,
      lastCorrect: answerCorrect
    });
  }

  handleFirst = (event) => {
    if (this.state.slideNoLocal > 0 ) {
      SlideActions.changeSlideLocal({slideNoLocal: 0});
      // console.log('handleFirst', this.state);
    }
  }
  handlePrev = (event) => {
    if (this.state.slideNoLocal > 0) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideNoLocal -1});
      // console.log('handlePrev', this.state);
    }
  }
  handleNext = (event) => {
    if (this.state.slideNoLocal < this.state.slideDeckLength - 1) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideNoLocal + 1});
      // console.log('handleNext', this.state);
    }
  }
  handleLast = (event) => {
     if (this.state.slideNoLocal < this.state.slideDeckLength - 1 ) {
      SlideActions.changeSlideLocal({slideNoLocal: this.state.slideDeckLength - 1});
      // console.log('handleLast', this.state);
    }
  }
}

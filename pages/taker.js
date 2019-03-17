import {Component} from "react";

class WaitForQuestion extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.answerQuestion();
        }, 3000);
    }

    render() {
        return (
            <div>
                Waiting for question...
            </div>
        );
    }

}

class AnswerQuestion extends Component {
    render() {
        const {q = "Who was the first president", a1 = "Barack Obama", a2 = "Al Gore", a3 = "George Washington", a4 = "George W Bush"} = this.props;
        return (
            <div>
                <h1>
                    Trivia Taker
                </h1>
                <div>
                    <label htmlFor="question">Question:</label>
                    <input type="text"
                           value={q}
                           className="question"
                           id="question"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="answer1">Answer A:</label>
                        <input type="text"
                               value={a1}
                               className="answer answer1"
                               onClick={this.answer(1)}
                               id="answer1"/>
                    </div>
                    <div>
                        <label htmlFor="answer2">Answer B:</label>
                        <input type="text"
                               value={a2}
                               onClick={this.answer(2)}
                               className="answer answer2"
                               id="answer2"/>
                    </div>
                    <div>
                        <label htmlFor="answer3">Answer C:</label>
                        <input type="text"
                               value={a3}
                               onClick={this.answer(3)}
                               className="answer answer3"
                               id="answer3"/>
                    </div>
                    <div>
                        <label htmlFor="answer4">Answer D:</label>
                        <input type="text"
                               value={a4}
                               onClick={this.answer(4)}
                               className="answer answer4"
                               id="answer4"/>
                    </div>
                </div>
            </div>
        );
    }

    sendData = (number) => {
        alert("Sending answer " + number);
        this.props.waitForQuestion();
    };

    answer = (number) => {
        return (e) => {
            this.sendData(number);
        };
    };
}

export default class TriviaTaker extends Component {
    state = {
        isAnswering: false,
    };

    waitForQuestion = () => {
        this.setState({isAnswering: false});
    };

    answerQuestion = () => {
        this.setState({isAnswering: true});
    };

    render() {
        if (this.state.isAnswering) {
            return <AnswerQuestion waitForQuestion={this.waitForQuestion}/>;
        } else {
            return <WaitForQuestion answerQuestion={this.answerQuestion}/>;
        }
    }
}

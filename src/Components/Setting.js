import React from 'react';
import '../scss/Setting.scss';
import { Link } from 'react-router-dom';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNum: 3,
            timer: 120,
            spyMode: false,
            theme: "",
            themeKr: ""
        }
    }

    setPlayerNum = (event) => {
        this.setState({playerNum: Number(event.target.value)});
    }
    setTimer = (event) => {
        this.setState({timer: Number(event.target.value)});
    }
    spyModeSelect = (event) => {
        // console.log(this.state.spyMode);
        console.log(event.target.type);
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        this.setState({
            spyMode: value
        });
    }
    setTheme = (event) => {
        // console.log(event.target.textContent);
        this.setState({
            theme: event.target.value,
            themeKr: event.target.textContent
        });
    }

    updateGlobalState = () => {
        this.props.parentCallbackState(this.state);
    }

    render() {
        
        // Display 게임 시작! button when the user chooses the theme.
        let startGameButton = this.state.theme !== "" ? (<Link to='/game' onClick={this.updateGlobalState}>게임시작!</Link>) : ``;

        return (
            <section className="setting-container">
                <h1>설정 창</h1>

                <form className="setting-form">
                    <label className="player-num">
                        <h2>참여인원:</h2>
                        <select value={this.state.value} onChange={this.setPlayerNum}>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <label className="set-timer">
                        <h2>참여인원:</h2>
                        <select value={this.state.value} onChange={this.setTimer}>
                            <option value="60">60 초</option>
                            <option value="90">90 초</option>
                            <option value="120">120 초 (2분)</option>
                            <option value="150">150 초 (2분 30초)</option>
                            <option value="180">180 초 (3분)</option>
                            <option value="240">240 초 (4분)</option>
                            <option value="300">300 초 (5분)</option>
                        </select>
                    </label>
                    <label className="spy-mode">
                        <span className="caption" style={{fontSize:1+'rem'}}>**스파이 모드는 준비 중입니다!**</span>
                        {/* {`스파이 모드: ${this.state.spyMode}`}
                        <input 
                            name="spyMode"
                            type="checkbox"
                            checked={this.state.spyMode}
                            onChange={this.spyModeSelect}
                        /> */}
                    </label>
                </form>

                <div className="theme-select">
                    <h2>주제: {`${this.state.themeKr}`}</h2>
                    <button value="food" onClick={this.setTheme}>음식</button>
                    <button value="place" onClick={this.setTheme}>장소</button>
                    <button value="occupation" onClick={this.setTheme}>직업</button>
                    <button value="biblecharacter" onClick={this.setTheme}>성경인물</button>
                </div>
                
                <div>
                    {startGameButton}
                </div>
                
            </section>
            );
    }
}

export default Setting;
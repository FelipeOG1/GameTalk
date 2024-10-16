import React,{useState} from 'react';


const RatingBar = ({onScoreChange}) => {
    const [score, setScore] = useState(0);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;
        const index = Math.floor((x / width) * 10);
        const newScore = (index + 1) * 10;
        setScore(newScore);
        onScoreChange(newScore);
    };

    const getColor = (score) => {
        if (score >= 70) return 'cyan';
        if (score >= 40) return 'deepskyblue';
        return 'darkcyan';
    };

    return (
        <div
            className="metacritic-bar"
            onMouseMove={handleMouseMove}
            onClick={()=>{
                setScore(score)
                
            }}
        >
            <div
                className="score"
                style={{ width: `${score}%`, backgroundColor: getColor(score) }}
            />
            <span className="score-text">{score}</span>
        </div>
    );
};

export default RatingBar;

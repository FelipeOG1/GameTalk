import { useState } from 'react';

const RatingBar = ({ onScoreChange }) => {
    const [score, setScore] = useState(0);
    const [isEditing, setIsEditing] = useState(true); 

    const handleMouseMove = (event) => {
        if (!isEditing) return; 

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;
        const index = Math.floor((x / width) * 10);
        const newScore = (index + 1) * 10;
        setScore(newScore);
    };

    const handleClick = () => {
        if (isEditing) {
            setIsEditing(false); 
            onScoreChange(score); 
        } else {
            setIsEditing(true);
        }
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
            onClick={handleClick}
        >
            <div
                className="score"
                style={{
                    width: `${score}%`,
                    backgroundColor: getColor(score),
                }}
            />
            <span className="score-text">{score}</span>
        </div>
    );
};

export default RatingBar;
import React from "react";
import "../css/customerFeedback.css";


export const FeedbackCard = ({ feedback }) => {
    return (
        <>
            <div className="feedback-container">
                <p>{feedback.name}</p>
                <p>{feedback.text}</p>
            </div>
        </>
    )
}
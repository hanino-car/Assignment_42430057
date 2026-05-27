import React, { useState } from "react"
import "../css/stylesheet.css";
import "../css/customerFeedback.css";
import { FeedbackCard } from "../components/Feedback";
import "../css/productDetailsStyle.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export const CustomerFeedback = ({ onAddButtonClick, feedbackList }) => {

    const navigate = useNavigate();

    const [feedbackData, setFeedbackData] = useState({
        name: "",
        text: ""
    });

    return (
        <>
            <div className="outer-div">

                <div className="back_btn_div">
                    <button
                        className="back-btn"
                        onClick={() => navigate("/")}>
                        <ArrowLeft size={15} />
                        <p className="back-btn-text">Back</p>
                    </button>
                </div>

                <h1>Feedbacks</h1>
                <div className="inner-div">
                    {
                        feedbackList.map((feedback, index) => (
                            <FeedbackCard
                                key={index}
                                feedback={feedback}
                            />
                        ))
                    }
                </div>

                <div className="feedback-name-container">
                    <div className="name-container">
                        <p>Leave a feedback</p>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="feedback-input"
                            value={feedbackData.name}
                            onChange={(event) => setFeedbackData({
                                name: event.target.value,
                                text: feedbackData.text
                            })}
                        />
                    </div>
                    <div className="feedback-container">
                        <p>Your feedback</p>
                        <input
                            type="text"
                            placeholder="be nice!"
                            className="feedback-input"
                            value={feedbackData.text}
                            onChange={(event) => setFeedbackData({
                                text: event.target.value,
                                name: feedbackData.name
                            })}
                        />
                    </div>
                    <button
                        onClick={(event) => {
                            onAddButtonClick(feedbackData);
                            setFeedbackData({
                                name: "",
                                text: ""
                            })
                        }}
                        className="feedback-submit-btn">Submit</button>
                </div>
            </div>
        </>
    )
}
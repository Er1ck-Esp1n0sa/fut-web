import React, { useState } from 'react';
import KafkaService from "../services/kafka.service";

function Reactions() {
    const [likes, setLikes] = useState(0);
    const [loves, setLoves] = useState(0);
    const [hahas, setHahas] = useState(0);
    const [hates, setHates] = useState(0);
    const [sads, setSads] = useState(0);

    function handleLikeClick() {
        setLikes(likes + 1);
    }

    function handleLoveClick() {
        setLoves(loves + 1);
    }

    function handleHahaClick() {
        setHahas(hahas + 1);
    }

    function handleHateClick() {
        setHates(hates + 1);
    }

    function handleSadClick() {
        setSads(sads + 1);
    }

    function saveLike(e, status) {
        let data = {
            id: 0,
            status: status
        };
        console.log(JSON.stringify(data));
        KafkaService.reaction("i-love-adsoftsito");
        e.preventDefault();
    }

    return (
        <div>
            <button className="reaction-button like" onClick={handleLikeClick}>
                <span className="icon">👍</span>
            </button>
            <span>{likes}</span>

            <button onClick={(e) => {
                e.preventDefault();
                saveLike(e, 1)
            }
            }>Love</button>
            <span>{loves}</span>

            <button className="reaction-button haha" onClick={handleHahaClick}>
                <span className="icon">😂</span>
            </button>
            <span>{hahas}</span>

            <button className="reaction-button hate" onClick={handleHateClick}>
                <span className="icon">😡</span>
            </button>
            <span>{hates}</span>

            <button className="reaction-button sad" onClick={handleSadClick}>
                <span className="icon">😢</span>
            </button>
            <span>{sads}</span>

        </div>
    );
}

export default Reactions;

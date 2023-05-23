import React, { useState } from 'react';
import KafkaService from "../services/kafka.service";

function saveLike(e, status) {

    let data = {
        id: 0,
        status: status
    };

    console.log(JSON.stringify(data));
    KafkaService.reaction("i-love-erick");
    e.preventDefault();
}

// eslint-disable-next-line
function Reactions() {
    return (
        <div>
            <button className="reaction-button like" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)     
                    }
                } >
                    <span className="icon">👍</span>
                    </button>


            <button className="reaction-button love" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)     
                    }
                } >
                    <span className="icon">❤️</span>
                    </button>

            <button className="reaction-button haha" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)     
                    }
                } >
                    <span className="icon">😂</span>
                    </button>

            <button className="reaction-button hate" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)     
                    }
                } >
                    <span className="icon">😡</span>
                    </button>

            <button className="reaction-button sad" onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)     
                    }
                } >
                    <span className="icon">😢</span>
                    </button>
        </div>
    );
}

export default Reactions;
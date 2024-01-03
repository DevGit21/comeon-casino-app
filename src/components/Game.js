import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import PlayVideo from './PlayVideo';
/* global comeon */

const Game = ({ user, onLogout }) => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [inGameVisible, setInGameVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const getAllGames = () => {
        fetch('http://localhost:3001/games', { method: 'get' })
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('Error fetching games:', error));
    }

    const getAllCategories= () => {
        fetch('http://localhost:3001/categories', { method: 'get' })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching games:', error));
    }

    const launchGame = (gameCode) => {
        setLoading(true); // Show spinner
        setInGameVisible(true);
        //comeon.game.launch API call
        const timer = setTimeout(() => {
            comeon.game.launch(gameCode);
            setLoading(false); // Hide spinner
          }, 200);
        return () => clearTimeout(timer);        
    };

    const handleBack = () => {
        setInGameVisible(false); // Hide the Play game area
      };

    useEffect(() => {
        getAllGames();
        getAllCategories();    
    }, []);

    const filteredGames = games
        .filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(game =>
        selectedCategory ? game.categoryIds.includes(selectedCategory.id) : true
    );

    return (
        <div className="main container">
            {!inGameVisible && (
                <div className="casino">
                    <div className="ui grid centered">
                        <div className="twelve wide column">
                            <div className="ui list">

                                {/* player item template */}
                                <div className="player item">
                                    <img className="ui avatar image" src={user.avatar} alt="avatar" />

                                    <div className="content">
                                        <div className="header"><b className="name">{user.name}</b></div>
                                        <div className="description event">{user.event}</div>
                                    </div>
                                </div>
                                {/* end player item template */}

                            </div>
                            <div className="logout ui left floated secondary button inverted" onClick={onLogout}>
                                <i className="left chevron icon"></i>Log Out
                            </div>
                        </div>
                        <div className="four wide column">
                            <div className="search ui small icon input ">
                                <input type="text" placeholder="Search Game"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                                <i className="search icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="ui grid">
                        <div className="twelve wide column">
                            <h3 className="ui dividing header">Games</h3>

                            <div className="ui relaxed divided game items links">
                                {/* game item template */}
                                {filteredGames.length === 0 ? (
                                    <div className="no-result">No Result</div>
                                ) : (                        
                                filteredGames.map(game => (
                                    <div className="game item" key={game.code}>
                                    <div className="ui small image">
                                        <img src={game.icon} alt="game-icon" />
                                    </div>
                                    <div className="content">
                                        <div className="header"><b className="name">{game.name}</b></div>
                                        <div className="description">{game.description}</div>
                                        <div className="extra">
                                        <div className="play ui right floated secondary button inverted"
                                        onClick={() => launchGame(game.code)}>
                                            Play
                                            <i className="right chevron icon"></i>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                ))
                                )}
                                {/* end game item template */}

                            </div>
                        </div>
                        <div className="four wide column">
                            <h3 className="ui dividing header">Categories</h3>

                            <div className="ui selection animated list category items">

                                {/* category item template */} 
                                {categories.map(category =>(
                                    <div
                                    className={`category item ${
                                    selectedCategory === category ? 'active' : ''
                                    }`}
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <div className="content">
                                    <div className="header">{category.name}</div>
                                    </div>
                                </div>
                                ))}
                                
                                {/* end category item template */} 

                            </div>
                        </div>
                    </div>

                </div>
            )}
            {/* Game play screen  */} 
            {inGameVisible && <PlayVideo onBack={handleBack} />}
             {/* End Game play screen  */}   

             {/* Spinner */}                     
            {loading && (
                <div className="spinner-overlay">
                <ClipLoader color="#ffffff" loading={loading} size={50} />
                </div>
            )}
            {/* End Spinner */} 

        </div>
    );
};

export default Game;

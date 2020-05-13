import React from 'react';
import TeamCard from './components/TeamCard';
import BoardCard from './components/BoardCard';


const App = () => {
    return (
        <div>
            <div>Boards</div>
            <BoardCard></BoardCard>
            <div>Teams</div>
            <TeamCard></TeamCard>
        </div>
    );
};

export default App;

import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface BoardViewProps {}

const BoardView = (props: BoardViewProps) => {
    const match = useRouteMatch<{ board_id: string }>();
    return <div>Board ID: {match.params.board_id}</div>;
};

export default BoardView;

import React, {useContext} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import pen from '../../icons/pen-01-white.svg';
import trash from '../../icons/trash-can-white.svg';
import teamPic from '../../icons/ray.jpg';
import background from '../../icons/teamBackground.jpg';
import { Board } from '../../types.js';
import { DELETE_BOARD } from 'graphql/mutations';
import { DialogContext, ModalTypes } from '../../contexts/DialogContext';

interface BoardCardProps {
    data: Board;
    dataRefetch: any;
}

const BoardCard = (props: BoardCardProps) => {
    const { data, dataRefetch } = props;
    const history = useHistory();
    const context = useContext(DialogContext);
    const [deleteBoard] = useMutation(DELETE_BOARD);
    
    const openBoard = () => {
        history.push('/board/' + data._id);
    };
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,refetch: any) => {
        event.preventDefault();
        event.stopPropagation()
        deleteBoard({variables: { id: data._id}});
        refetch();
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation()
        context.openModalByType!(ModalTypes.UpdateBoard, data)
    }
    
    return (
        <CardContainer onClick={openBoard}>
            <CardHeader>
                <ProjectName>{data.title}</ProjectName>
                <DeleteButton onClick={(e) => handleDelete(e, dataRefetch)}/>
                <EditButton onClick={handleEdit}/>
            </CardHeader>
            <CardFooter>
                <TeamPic src={teamPic} />
                {data.team && data.team.length === 1 &&<TeamName>{data.team[0].name}</TeamName>}
                <TimeCreated>{moment(data._changed).fromNow()}</TimeCreated>
            </CardFooter>
        </CardContainer>
    );
};

export default BoardCard;

const CardContainer = styled.div`
    width: 280px;
    height: 150px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    margin: 16px 16px 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    &::after {
        content: '';
        background-color: #0e9594;
        background: url(${background});
        background-size: 100% 100%;
        opacity: 0.85;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
`;

const CardHeader = styled.div`
    margin: 12px;
    display: flex;
    justify-content: space-between;
    z-index: 1;
`;

const CardFooter = styled.div`
    margin-left: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const ProjectName = styled.div`
    width: 200px;
    max-height: 6vh;
    overflow: hidden;
    font-size: 17px;
    font-family: 'ProximaNovaSemiBold', sans-serif;
    line-height: 1.36;
    color: #ffffff;
`;

const EditButton = styled.button`
    width: 15px;
    height: 15px;
    border: 0;
    background: url(${pen}) no-repeat;
    background-size: 15px;
    &:hover {
        cursor: pointer;
    }
    /* &:focus {
        outline: 0;
    } */
`;
const DeleteButton = styled.button`
    width: 15px;
    height: 15px;
    border: 0;
    margin-right: 12px;
    background: url(${trash}) no-repeat;
    background-size: 15px;
    &:hover {
        cursor: pointer;
    }
    /* &:focus {
        outline: 0;
    } */
`;
const TeamPic = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
`;

const TeamName = styled.div`
    font-family: 'ProximaNovaSemiBold', sans-serif;
    font-size: 14px;
    color: #ffffff;
`;
const TimeCreated = styled.div`
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 13px;
    color: #ffffff;
    margin-left: auto;
    margin-right: 12px;
`;

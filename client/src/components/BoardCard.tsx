import React from 'react';
import styled from 'styled-components';
import pen from '../icons/pen-01-white.svg';
import trash from '../icons/trash-can-white.svg';
import teamPic from '../icons/ray.jpg';
import background from '../icons/teamBackground.jpg';

const BoardCard = () => {
    return (
        <CardContainer>
            <CardHeader>
                <ProjectName>Food Delivery Tracking Application</ProjectName>
                <DeleteButton />
                <EditButton />
            </CardHeader>
            <CardFooter>
                <TeamPic src={teamPic} />
                <TeamName>Piccial Media</TeamName>
                <TimeCreated>12 hours ago</TimeCreated>
            </CardFooter>
        </CardContainer>
    );
};

export default BoardCard;

const CardContainer = styled.div`
    width: 163px;
    height: 85px;
    border-radius: 7.5px;
    position: relative;
    overflow: hidden;
    &::after {
        content: '';
        background-color: #0e9594;
        background: url(${background});
        background-size: 100% 100%;
        opacity: 0.9;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }
`;

const CardHeader = styled.div`
    margin-top: 12.5px;
    margin-left: 12.5px;
    display: flex;
`;

const CardFooter = styled.div`
    margin-top: 15px;
    margin-left: 12.5px;
    margin-bottom: 11.5px;
    display: flex;
`;

const ProjectName = styled.div`
    width: 111px;
    max-height:28.5px;
    overflow: hidden;
    font-size: 11px;
    line-height: 1.36;
    color: #ffffff;
`;

const EditButton = styled.button`
    width: 10.4px;
    height: 10.4px;
    border: 0;
    margin-left: 9.9px;
    margin-right: 12.6px;
    background: url(${pen}) no-repeat;
    background-size: 10.4px;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: 0;
    }
`;
const DeleteButton = styled.button`
    width: 10.4px;
    height: 10.4px;
    border: 0;
    background: url(${trash}) no-repeat;
    background-size: 10.4px;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: 0;
    }
`;
const TeamPic = styled.img`
    width: 17.5px;
    height: 17.5px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
`;

const TeamName = styled.div`
    height: 10px;
    margin: auto;
    margin-left: 5px;
    margin-right: 0;
    font-size: 8px;

    margin-left: 5px;
    color: #ffffff;
`;
const TimeCreated = styled.div`
    height: 8.5px;
    margin: auto;
    margin-left: 30px;
    font-family: ProximaNova;
    font-size: 7px;
    color: #ffffff;
`;

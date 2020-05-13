import React from 'react';
import styled from 'styled-components';
import pen from '../icons/pen-36.svg';
import trash from '../icons/trash-can.svg';

import background from '../icons/background.jpg';
import avatar from '../icons/avatar.jpg';

const TeamCard = () => {
    return (
        <CardContainer>
            <CardHeader>
                <TeamName>Piccial Media</TeamName>
                <DeleteButton />
                <EditButton />
            </CardHeader>
            <CardBody>
                <CardItem>Member: 25</CardItem>
                <CardItem>Project(s): 12</CardItem>
                <CardItem>In progress: Food Delivery Tracking Application</CardItem>
            </CardBody>
            <CardFooter>
                <TeamMember src={avatar} />
                <TeamMember src={avatar} />
                <TeamMember src={avatar} />
                <TimeCreated>12 hours ago</TimeCreated>
            </CardFooter>
        </CardContainer>
    );
};

export default TeamCard;

const CardContainer = styled.div`
    max-width: 163px;
    height: 135.5px;
    border-radius: 7.5px;
    position: relative;
    overflow: hidden;
    display: block;
    &::after {
        content: "";
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
    };
`;

const CardHeader = styled.div`
    margin-top: 11.5px;
    margin-left: 12.5px;
    display: flex;
`;

const CardFooter = styled.div`
    margin-top: 7.5px;
    margin-left: 12.5px;
    display: flex;
`;

const TeamName = styled.div`
    width: 111px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.36;
    color: #ffffff;
`;

const EditButton = styled.button`
    width: 10.4px;
    height: 10.4px;
    border: 0;
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
const CardBody = styled.div`
    margin-top: 14.5px;
`;
const CardItem = styled.div`
    font-size: 8px;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.25;
    margin-left: 12.5px;
    margin-bottom: 7.5px;
`;

const TeamMember = styled.img`
    width: 17.5px;
    height: 17.5px;
    margin-right: 2.5px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
`;

const TimeCreated = styled.div`
    height: 8.5px;
    margin: auto;
    margin-left: 25%;
    font-family: ProximaNova;
    font-size: 7px;
    font-weight: 500;
    color: #ffffff;
`;

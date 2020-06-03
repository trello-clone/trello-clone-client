import React from 'react';
import styled from 'styled-components';
import pen from '../icons/pen-01-white.svg';
import trash from '../icons/trash-can-white.svg';
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
    min-width: 280px;
    height: 220px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    margin: 16px 16px 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
    margin: 12px 12px 16px;
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

const TeamName = styled.div`
    width: 75%;
    overflow: hidden;
    font-size: 17px;
    font-family: 'ProximaNovaSemiBold', sans-serif;
    line-height: 1.36;
    color: #ffffff;
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
    &:focus {
        outline: 0;
    }
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
    &:focus {
        outline: 0;
    }
`;
const CardBody = styled.div`
    z-index: 1;
`;
const CardItem = styled.div`
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 14px;
    color: #ffffff;
    line-height: 1.25;
    margin-left: 12px;
    margin-bottom: 8px;
`;

const TeamMember = styled.img`
    width: 22px;
    height: 22px;
    margin-right: 5px;
    border: solid 0px #ffffff;
    border-radius: 50%;
`;

const TimeCreated = styled.div`
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 13px;
    color: #ffffff;
    margin-left: auto;
    margin-right: 12px;
`;

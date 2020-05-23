import React from 'react';
import styled from 'styled-components';
import pen from '../icons/pen-01-white.svg';
import trash from '../icons/trash-can-white.svg';
import background from '../icons/background.jpg';
import avatar from '../icons/avatar.jpg';



const TeamCard = () => {
    return (
        <CardContainer>
            <CardWrapper>
                <CardHeader>
                    <TeamName>Piccial Media</TeamName>
                    <DeleteButton />
                    <EditButton/>
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
            </CardWrapper>
        </CardContainer>
    );
};

export default TeamCard;

const CardContainer = styled.div`
    width: 280px;
    height: 230px;
    border-radius: 8px;
    margin-bottom: 25px;
    margin-right: 16px;
    position: relative;
    overflow: hidden;
    display: block;
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
const CardWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const CardHeader = styled.div`
    margin-top: 12px;
    margin-bottom: 14px;
    margin-left: 12px;
    display: flex;

`;

const CardFooter = styled.div`
    margin-top: 18%;
    margin-left: 12px;
    display: flex;
    align-items: center;
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
    margin-top: 14.5px;
`;
const CardItem = styled.div`
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 14px;
    color: #ffffff;
    line-height: 1.25;
    margin-left: 12.5px;
    margin-bottom: 8px;
`;

const TeamMember = styled.img`
    width: 22.5px;
    height: 22.5px;
    margin-right: 5px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
    
`;

const TimeCreated = styled.div`
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 13px;
    color: #ffffff;
    margin-left: auto;
    margin-right: 12px;
    
`;

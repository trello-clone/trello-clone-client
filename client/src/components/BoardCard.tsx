import React from 'react';
import styled from 'styled-components';
import pen from '../icons/pen-01-white.svg';
import trash from '../icons/trash-can-white.svg';
import teamPic from '../icons/ray.jpg';
import background from '../icons/teamBackground.jpg';

const BoardCard = () => {
    return (
        <CardContainer>
            <CardWrapper>
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
            </CardWrapper>
        </CardContainer>
    );
};

export default BoardCard;

const CardContainer = styled.div`
    width: 280px;
    height: 170px;
    border-radius: 7.5px;
    position: relative;
    overflow: hidden;
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
    margin-top: 12.5px;
    margin-left: 12.5px;
    display: flex;

`;

const CardFooter = styled.div`
    margin-top: 25%;
    margin-left: 12.5px;
    display: flex;
`;

const ProjectName = styled.div`
    width: 75%;
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
    &:focus {
        outline: 0;
    }
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
const TeamPic = styled.img`
    width: 22.5px;
    height: 22.5px;
    border: solid 0.5px #ffffff;
    border-radius: 50%;
`;

const TeamName = styled.div`
    height: 10px;
    margin: auto;
    margin-left: 5px;
    margin-right: 0;
    font-family: 'ProximaNovaSemiBold', sans-serif;
    font-size: 14px;
    color: #ffffff;
`;
const TimeCreated = styled.div`
    margin: auto;
    margin-left: 30px;
    font-family: 'ProximaNovaMedium', sans-serif;
    font-size: 13px;
    color: #ffffff;
`;

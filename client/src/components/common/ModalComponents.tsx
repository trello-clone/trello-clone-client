import styled from 'styled-components';
import { rgba } from 'polished';

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${(props) => rgba(props.theme.colors.black, 0.3)};
`;

export const Input = styled.input<{cardType?: string}>`
box-sizing: border-box;
height: 23px;
width: 100%;
outline: 0;
border: 0;
padding-bottom: 5px;
padding-right: 0;
padding-left: 12px;
margin-bottom: ${props => props.cardType==='team' ? '36px' : '20px' };
border-bottom: 1px solid ${(props) => rgba(props.theme.colors.black, 0.25)};
font-size: 14px;
&::placeholder {
    font-size: 14px;
    color: ${(props) => rgba(props.theme.colors.black, 0.25)};
}
`;


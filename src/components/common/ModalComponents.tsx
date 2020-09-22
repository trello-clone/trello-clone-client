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
// Input field to enter team's name or board's title
export const Input = styled.input<{ cardType?: string }>`
    box-sizing: border-box;
    height: 23px;
    width: 100%;
    outline: 0;
    border: 0;
    padding-bottom: 5px;
    padding-right: 0;
    padding-left: 12px;
    margin-bottom: ${(props) => (props.cardType === 'team' ? '36px' : '20px')};
    border-bottom: 1px solid ${(props) => rgba(props.theme.colors.black, 0.25)};
    font-size: 14px;
    &::placeholder {
        font-size: 14px;
        color: ${(props) => rgba(props.theme.colors.black, 0.25)};
    }
`;

export const UtilButton = styled.a`
    padding: 14px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    background-color: ${(props) => rgba(props.theme.colors.blue, 0.1)};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:nth-child(6) {
        margin-bottom: 10px;
    }
    &:hover {
        cursor: pointer;
    }
    &:active {
        background-color: ${(props) => rgba(props.theme.colors.blue, 0.2)};
    }
`;
export const BtnDescription = styled.span`
    font-size: 14px;
`;
export const Icon = styled.img<{ addMember?: any }>`
    position: absolute;
    left: 16px;
    height: ${(props) => (props.addMember ? '18px' : '16px')};
`;

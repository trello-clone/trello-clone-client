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

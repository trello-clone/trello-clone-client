import { createGlobalStyle } from 'styled-components';
import ProximaNovaBold from './FontsFree-Net-Proxima-Nova-Bold.otf';
import ProximaNovaSemiBold from './Proxima-Nova-Sbold.otf';
import ProximaNovaMedium from './Proxima-nova-medium.ttf';


export default createGlobalStyle`
    @font-face {
        font-family: 'ProximaNovaBold';
        src: url(${ProximaNovaBold});
        font-weight: 500;
    }
    @font-face {
        font-family: 'ProximaNovaSemiBold';
        src: url(${ProximaNovaSemiBold});
        font-weight: 600;
    }
    @font-face {
        font-family: 'ProximaNovaMedium';
        src: url(${ProximaNovaMedium});
        font-weight: 500;
    }
    body {
        font-family: 'ProximaNovaBold', sans-serif;
        font-size: 20px;
        box-sizing: border-box;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

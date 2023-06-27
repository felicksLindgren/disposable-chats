import styled from "styled-components";

const backgrounds = [
    '#0863B9',
    '#FFA101',
    '#FE4728',
    '#064A44',
    '#C21396',
    '#F80093',
]

export const Avatar = styled.div<{ index: number }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: ${props => backgrounds[props.index % backgrounds.length]};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    overflow: hidden;
`;
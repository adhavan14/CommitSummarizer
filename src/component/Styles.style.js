import styled from "styled-components";


export const SummaryContainer = styled.div`
    
`;

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    width: 500px;
    justify-content: space-around;
`;

export const RepoSelectContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundColor};
    justify-content: space-around;
    border-radius: 5px;
    width: 220px;
    height: 70px;
`

export const BranchSelectContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundColor};
    justify-content: space-around;
    border-radius: 5px;
    width: 220px;
    height: 70px;
`
export const BoxContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    width: 550px;
    height: 700px;
    padding: 10px;
    margin-top: 40px;
    border-radius: 5px;
    overflow-y: scroll;
    max-height: 700px;
`;

export const BoxWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 80%;
    margin: auto;
`;

export const TitleAndSelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
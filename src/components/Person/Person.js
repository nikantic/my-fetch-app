import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledCard = styled.div`
    display: inline-block;
    width: 300px;
    margin: 50px;
    background-color: #3F51B5;
    border: 1px solid #673AB7;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;

    &:hover {
        background-color: red;
    }

    h5, span {
        margin: 0;
    }
`;

const StyledButton = styled.button`
    margin-top: 10px;
    margin-right: 5px;
    background-color: #000;
    color: #fff;
    cursor: pointer;

    a {
        color: #fff;
        text-decoration: none;
    }
`;

const Person = (props) => {
    return (
        <StyledCard>
            <h5>{props.name}</h5>
            <span>{props.craft}</span>
            <div>
                {props.id !== undefined && <StyledButton><Link to={"/person/" + props.id}>View More</Link></StyledButton>}
                <StyledButton onClick={props.remove}>Remove</StyledButton>
            </div>
        </StyledCard>
    )
}

export default Person;
import styled from 'styled-components';
import { Form, InputContainer } from 'app/components/atoms/form-inputs';
import { ErrorMsg } from 'app/components/atoms/error-messages';
import { Right } from '../atoms/positioning';

export const LoginContainer = styled.div`
  background-color: #f4f8f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  background-color: #fff;
  padding: 20px 0 10px 40px;
  box-shadow: 0px 2px 8px rgba(174, 174, 174, 0.25);
  max-width: 1170px;
  width: 100%;
  margin: 10px;
  @media (max-width: 768px) {
    padding: 30px;
  }
`;
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  @media (max-width: 768px) {
    display: block;
  }
`;
export const FormEdit = styled(Form as any)`
  max-width: 450px;
  margin: 0 20px auto;
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
    margin-top: -3em;
  }
  & h1 {
    font-size: 36px;
    color: #333333;
    font-weight: normal;
  }

  & p {
    font-size: 16px;
    color: #333333;
    margin-top: 10px;
  }
`;

export const InputContainerEdit = styled(InputContainer as any)`
  a {
    text-decoration: none;
    font-size: 14px;
    text-align: right;
    display: inline;
    width: fit-content;
    margin-left: auto;
  }
`;

export const ShowPassword = styled.img`
  cursor: pointer;
`;

export const ErrorMsgEdit = styled(ErrorMsg as any)`
  font-size: 12px;
  margin-left: 5px;
`;

export const RightEdit = styled(Right as any)`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

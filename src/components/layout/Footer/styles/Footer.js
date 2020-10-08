import styled from 'styled-components';
import Background from './footer-background.png'

export const Container = styled.div`
  // background-image: url(${Background});
  // opacity: 0.5;
  background: rgba(43,40,41,1);
  @media (max-width: 100%) {
    padding: 10px 10px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    // max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 15px;
  font-size: 14px;
  text-decoration: none;
  &:hover {
      color: #ff9c00;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const Copyright = styled.p`
  font-size: 12px;
  color: #fff;
  text-align: right;
  padding-right: 20px;
`;
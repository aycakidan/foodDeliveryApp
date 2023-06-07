import styled from "styled-components";
import {AiFillFacebook} from "react-icons/ai"
import {FaTiktok} from "react-icons/fa"
import {BsInstagram} from "react-icons/bs"
//footer
const Footer = () => {
  return (
    <FooterContainer>
      <div className="info">
        <div className="content">
          <h3>Contact Us!</h3>
          <h3>Email: blabla@gmail.com</h3>
        </div>
        <div className="social">
           <a href="#"> <AiFillFacebook className="social-icon"/></a>
           <a href="#"> <FaTiktok className="social-icon"/></a>
           <a href="#"> <BsInstagram className="social-icon"/></a>
        </div>
        <div className="sitemap">
            <h3>Sitemap</h3>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
      </div>
      <h4>&copy; 2023 FoodDeliveryApp. All rights Reserved.</h4>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
    background-color: lightcyan;
  display:flex;
  flex-direction: column;
  margin-top:2rem;
  .info{
    margin-top:1rem;
    display:flex;
    justify-content: space-between;
    width:100%;
  }
  .info div:nth-child(2){
    padding: 10px;
  }
  .info div:nth-child(1){
    padding: 10px;
  }
  .info div:nth-child(3){
    padding: 10px;
  }
  .social-icon{
    font-size:32px;
    color:white;
    margin-left:1rem;
  }
  .sitemap{
    display:flex;
    flex-direction: column;
    color:white;
  }
  .sitemap a{
    color:white;
    font-size:16px;
  }
  h3{
    font-size:24px;
    color:white;
  }
  .social{
    display:flex;
    justify-content: space-between;
  }
  h4{
    color:white;
  }
  .content , .social , .sitemap {
    width:auto !important;
    height: auto !important;
  }
  @media (max-width:992px){
    .info{
        flex-direction: column;
       row-gap: 1rem;
    }
    .social{
        justify-content: flex-start;
    }
    h4{
        margin-top:1rem;
    }
  }
`;

export default Footer;

import React from 'react';
import { Container } from 'app/components';
import { Footer, FooterItemContainer, FooterItem } from '../styles';

function FooterBar() {
  return (
    <Footer>
      <Container>
        <FooterItemContainer>
          <FooterItem>
            <span>
              <img
                src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/check.svg"
                alt=""
              />
            </span>
            <span>Right</span>
          </FooterItem>

          <FooterItem>
            <span>
              <img
                src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cancel.svg"
                alt=""
              />
            </span>
            <span>Wrong</span>
          </FooterItem>

          <FooterItem>
            <span>
              <img
                src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/partially-right.svg"
                alt=""
              />
            </span>
            <span> Partially Right</span>
          </FooterItem>

          <FooterItem>
            <span>
              <img
                src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/not-attempted.svg"
                alt=""
              />
            </span>
            <span>Not Attempted</span>
          </FooterItem>

          <FooterItem>
            <span>
              <img
                src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/not-checked.svg"
                alt=""
              />
            </span>
            <span>Not Checked</span>
          </FooterItem>
        </FooterItemContainer>
      </Container>
    </Footer>
  );
}

export default FooterBar;

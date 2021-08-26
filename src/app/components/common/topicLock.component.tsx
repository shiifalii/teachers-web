import React from 'react';
import Modal from 'app/components/common/modal.component';
import { Button, Center } from '../atoms';
import styled from 'styled-components';

const ModalTitle = styled.div`
  font-size: 24px;
  text-align: center;
  color: #333333;
  margin-bottom: 15px;
`;

const ButtonOutlined = styled(Button)`
  background: #ffffff;
  border: 1px solid #1d7dea;
  border-radius: 4px;
  color: #1d7dea;
`;

const ModalText = styled.p`
  font-weight: normal;
  margin: 5px 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CenterEdit = styled(Center)`
  display: flex;
  justify-content: center;
`;

interface TopicLockModalProps {
  onClose: () => void;
  handleLock: () => void;
  isOpen: boolean;
  newLockValue: boolean;
  data: { totalCount: number; attempted: number };
}

function TopicLockModal({
  isOpen,
  onClose,
  handleLock,
  newLockValue,
  data: { totalCount, attempted },
}: TopicLockModalProps) {
  const handleClick = () => {
    handleLock();
    onClose();
  };
  if (isOpen && !newLockValue) {
    handleClick();
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>Lock Topic</ModalTitle>
      <ModalText> Are you sure you want to lock this topic? </ModalText>
      {attempted < totalCount && (
        <ModalText>
          <strong>
            {attempted}/{totalCount}
          </strong>{' '}
          students have attempted yet
        </ModalText>
      )}
      <CenterEdit>
        <ButtonOutlined style={{ margin: '15px 15px' }} onClick={onClose}>
          No
        </ButtonOutlined>

        <Button style={{ margin: '15px 0' }} onClick={handleClick}>
          Yes
        </Button>
      </CenterEdit>
    </Modal>
  );
}

export default TopicLockModal;

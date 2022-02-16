import React, { useState } from 'react';
import { List, Button, Typography, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import InfoWeather from '../infoWeather/InfoWeather';

import './cityList.scss';

const CityList = ({ data }) => {
  const { Text } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const showModal = ({ title, woeid }) => {
    setIsModalVisible(true);
    setModalTitle(title);
    setModalContent(<InfoWeather woeid={woeid} />);
  };

  return (
    <>
      <List
        className='city-list'
        itemLayout='horizontal'
        pagination
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type='link'
                key='list-loadmore-edit'
                onClick={() => showModal(item)}
              >
                <Text className='text-btn' strong>
                  See Details...
                </Text>
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />
      <Modal
        title={<Text className='title-modal'>{modalTitle}</Text>}
        visible={isModalVisible}
        footer={null}
        forceRender
        onCancel={() => setIsModalVisible(false)}
        closeIcon={
          <CloseCircleOutlined
            style={{
              fontSize: 26,
              justifyItems: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          />
        }
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default CityList;

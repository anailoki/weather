import React from 'react';
import { Card, Typography, Spin, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import Header from '../../components/header/Header';
import CityList from '../../components/cityList/CityList';

import './Weather.scss';

const { Title, Paragraph } = Typography;

const Weather = () => {
  const { cities, isLoading } = useSelector((state) => state.weather);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: '#000' }} spin />
  );

  return (
    <div className='weather'>
      <Header />

      <div className='weather__result'>
        <Spin spinning={isLoading} indicator={antIcon} tip={<Loading />}>
          <Card
            className={`card-container ${
              !isLoading && cities.length > 0 ? 'padding-top' : ''
            }`}
          >
            {!isLoading && cities.length === 0 && (
              <div>
                <Title
                  level={4}
                  type='secondary'
                  style={{ textAlign: 'center' }}
                >
                  No results yet!
                </Title>
                <Title
                  level={4}
                  type='secondary'
                  style={{ textAlign: 'center' }}
                >
                  Please use the search box above
                </Title>
              </div>
            )}
            {!isLoading && cities.length > 0 && <CityList data={cities} />}
          </Card>
        </Spin>
      </div>
      <Row justify='end'>
        <Col span={3}>
          <Paragraph type='secondary'>By Ana Iloki Lewis</Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default Weather;

function Loading() {
  return (
    <Title style={{ marginTop: 15 }} level={4}>
      Loading
    </Title>
  );
}

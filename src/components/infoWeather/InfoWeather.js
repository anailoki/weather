/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Divider, Skeleton, Result } from 'antd';

import './infoWeather.scss';
import { fetchApi } from '../../utils/fetch';
import { METHOD_GET } from '../../utils/constants';
import useWindowDimensions from '../../hook/useWindowdimensions';

const InfoWeather = ({ woeid }) => {
  const { Title, Text } = Typography;
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      const config = {
        method: METHOD_GET,
        url: `location/${woeid}/${currentYear}/${currentMonth}/${currentDay}/`,
        data: null,
        showNotificationError: true,
      };
      const response = await fetchApi(config);
      if (response) {
        setLocation(response[0]);
      }
      setIsLoading(false);
    };

    getLocation();
  }, [currentDay, currentMonth, currentYear, woeid]);

  return (
    <div className='info-weather'>
      <Row>
        <Col span={24}>
          <Title className='text-center title' level={3}>
            Today
          </Title>
          <Divider className='border-top' />
        </Col>
      </Row>
      {isLoading && <Skeleton active />}
      {!isLoading && !location && (
        <Result
          status='warning'
          title='There are some problems with your operation.'
        />
      )}
      {!isLoading && location && (
        <>
          <Row
            justify='center'
            align='middle'
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <Col
              xs={24}
              sm={12}
              className={` ${
                width > 580 ? 'container-left' : 'container-center'
              }`}
            >
              <Text className='celcius'>{location.the_temp.toFixed(1)} C</Text>
            </Col>
            <Col
              xs={24}
              sm={12}
              className={` ${
                width > 580 ? 'container-right' : 'container-center'
              }`}
            >
              <Row>
                <Col
                  span={24}
                  className={` ${
                    width > 580 ? 'container-right' : 'container-center'
                  }`}
                >
                  <ShowIconWeather type={location.weather_state_abbr} />
                </Col>
                <Col
                  span={24}
                  className={` ${
                    width > 580 ? 'container-right' : 'container-center'
                  }`}
                >
                  <Text
                    className='text-center'
                    type='secondary'
                    style={{ fontSize: 18 }}
                    strong
                  >
                    {location.weather_state_name}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={[0, 20]} style={{ marginTop: 40 }}>
            <Col span={24} className='container-center'>
              <Text className='text-center description'>{`Min: ${location.min_temp.toFixed(
                0
              )} C`}</Text>
              <Text
                className='text-center description'
                style={{ marginLeft: 20, marginRight: 20 }}
              >{`|`}</Text>
              <Text className='text-center description'>{`Max: ${location.max_temp.toFixed(
                0
              )} C`}</Text>
            </Col>
            <Col span={24} className='container-center'>
              <Text className='description'>
                {location.wind_speed.toFixed(2)} mph
              </Text>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default InfoWeather;

function ShowIconWeather({ type }) {
  return (
    <>
      {type === 'lc' && (
        <img src='https://img.icons8.com/color/96/000000/partly-cloudy-day--v1.png' />
      )}
      {type === 'c' && (
        <img src='https://img.icons8.com/color/96/000000/summer--v1.png' />
      )}
      {type === 'hc' && (
        // <img src='https://img.icons8.com/dusk/96/000000/clouds.png' />
        <img src='https://img.icons8.com/color/96/000000/cloud.png' />
      )}
      {type === 'lr' && (
        <img src='https://img.icons8.com/color/96/000000/light-rain--v2.png' />
      )}
      {type === 's' && (
        <img src='https://img.icons8.com/color/96/000000/partly-cloudy-rain--v1.png' />
      )}
      {type === 'hr' && (
        <img src='https://img.icons8.com/color/96/000000/downpour--v1.png' />
      )}
      {type === 'sn' && (
        <img src='https://img.icons8.com/color/96/000000/snow--v1.png' />
      )}
      {type === 'sl' && (
        <img src='https://img.icons8.com/color/96/000000/sleet.png' />
      )}
      {type === 'h' && (
        <img src='https://img.icons8.com/color/96/000000/hail.png' />
      )}
      {type === 't' && (
        <img src='https://img.icons8.com/color/96/000000/storm--v1.png' />
      )}
    </>
  );
}

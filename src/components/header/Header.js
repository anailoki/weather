import React, { useState } from 'react';
import { Row, Col, Input, Typography, notification } from 'antd';
import { useDispatch } from 'react-redux';

import './header.scss';
import { fetchApi } from '../../utils/fetch';
import { METHOD_GET } from '../../utils/constants';
import { getCities, setCities } from '../../actions/weather';

const Header = () => {
  const { Search } = Input;
  const { Title } = Typography;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onSearch = async (values) => {
    if (values === '') {
      dispatch(setCities([]));
      return;
    }
    if (value === '') {
      notification['warning']({
        description: 'Please write a city',
      });
      return;
    }
    dispatch(getCities());
    const config = {
      method: METHOD_GET,
      url: `location/search/?query=${values}`,
      data: null,
      showNotificationError: true,
    };
    const response = await fetchApi(config);

    if (response) {
      dispatch(setCities(response));
    } else {
      dispatch(setCities([]));
    }
  };

  return (
    <div className='header'>
      <Row className='header__container' justify='center'>
        <Col xs={18} md={12}>
          <Title className='text-white' level={2}>
            How is the weather?
          </Title>
          <Search
            placeholder='Search by city name'
            allowClear
            enterButton='GO'
            size='large'
            onSearch={onSearch}
            className='input-search'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Header;

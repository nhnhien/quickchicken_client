import React, { useState } from 'react';
import logo from '../../assets/images/quickchicken_logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Select, Dropdown, Space, Popconfirm, Badge } from 'antd';
import {
  accountMenu,
  navigateItems,
  profileItems,
} from '../../constant/header';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slice/modal';
import { ModalTypes } from '../../constant/modal';
import { DownOutlined } from '@ant-design/icons';
import { logoutSuccess } from '../../redux/slice/auth';
import { clearCart, selectCartItems, selectCartTotalQuantity } from '../../redux/slice/cart';

const Header = () => {
  const totalQuantityCart = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClickIcon = (id) => {
    if (id === 2) {
      dispatch(openModal({ name: ModalTypes.SIGN_IN, info: '' }));
    }
    if (id === 4) {
      navigate('/cart');
    }
  };

  const handleChange = () => {};

  const handleClickDropDownItem = (e, item) => {
    console.log('Item clicked:', item);
    if (item.key === '1') {
      navigate('/profile');
    }
    if (item.key === '4') {
      setOpen(true);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(logoutSuccess());
      dispatch(clearCart());
      setOpen(false);
      setConfirmLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/'>
            <div>
              <img src={logo} alt='Logo' width='67px' height='67px' />
            </div>
          </Link>
          <nav className='hidden md:flex space-x-6 ml-16'>
            {navigateItems.map((item) => (
              // <div key={item.id}>
              //   <NavLink to={item.link}>
              //     <p className='font-medium'>{item.title}</p>
              //   </NavLink>
              // </div>
                            <div
                key={item.id}
                className="group relative p-3 rounded-lg bg-white hover:bg-pink-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
              >
                <NavLink
                  to={item.link}
                  className="flex items-center space-x-3"
                  style={{ textDecoration: "none" }}
                >
                  {/* Icon bên trái */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-all duration-300">
                    <i className="fas fa-link text-pink-600 group-hover:text-pink-800"></i>
                  </div>

                  {/* Nội dung tiêu đề */}
                  <p className="font-semibold text-gray-800 text-md group-hover:text-pink-700 transition-all duration-300">
                    {item.title}
                  </p>
                </NavLink>
              </div>

            

            ))}
          </nav>
        </div>
        <div>
          <div className='flex space-x-3'>
            {/* <Select
              style={{ width: 120 }}
              defaultValue='vn'
              onChange={handleChange}
            >
              <Select.Option value='vn'>
                <div className='flex space-x-1'>
                  <img
                    src='https://www.lotteria.vn/grs-static/images/icon-vn.svg'
                    alt='vn'
                  />
                  <span>Tiếng Việt</span>
                </div>
              </Select.Option>
              <Select.Option value='en'>
                <div className='flex space-x-1'>
                  <img
                    src='https://www.lotteria.vn/grs-static/images/icon-en.svg'
                    alt='en'
                  />
                  <span>English</span>
                </div>
              </Select.Option>
            </Select> */}
          </div>
          <div className='flex space-x-4 mt-4 justify-between'>
            {accountMenu.map((item) => {
              if (item.id === 2 && isLoggedIn) {
                return (
                  <div
                    key={item.id}
                    className='w-[20] h-10 text-red-500 rounded-full flex items-center justify-center cursor-pointer'
                  >
                    <Dropdown
                      menu={{
                        items: profileItems.map((profileItem) => ({
                          key: profileItem?.key,
                          type: profileItem?.type,
                          label: profileItem?.label,
                          icon: profileItem.icon,
                          onClick: (e) =>
                            handleClickDropDownItem(e, profileItem),
                        })),
                      }}
                    >
                      <div
                        onClick={(e) => {
                          console.log;
                          e.preventDefault();
                        }}
                      >
                        <Space>
                          Hello, {currentUser.username}
                          <DownOutlined />
                        </Space>
                      </div>
                    </Dropdown>
                    <Popconfirm
                      title='Are you sure you want to log out?'
                      open={open}
                      onConfirm={handleOk}
                      okButtonProps={{
                        loading: confirmLoading,
                        style: {
                          backgroundColor: 'red',
                          borderColor: 'red',
                        },
                      }}
                      icon={false}
                      onCancel={handleCancel}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleClickIcon(item.id)}
                    className='w-10 tex h-10 border-[1px] rounded-full flex items-center justify-center cursor-pointer relative'
                  >
                    <img src={item.link} alt='' />
                    {item.id === 4 && (
                      <div className='absolute -right-5 -top-2'>
                        <Badge count={cartItems.length} />
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

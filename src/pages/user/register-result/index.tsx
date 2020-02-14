import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import styles from './style.less';

const actions = link => (
  <div className={styles.actions}>
    <a href={link}>
      <Button size="large" type="primary">
        查看邮箱
      </Button>
    </a>
    <Link to="/">
      <Button size="large">返回首页</Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => {
  const { name, email } = location.state as { name: string, email: string };
  const index = email.lastIndexOf('@');
  let link = email.substr(index + 1);
  link = `http://mail.${link}`;
  return (<Result
    className={styles.registerResult}
    status="success"
    title={<div className={styles.title}>你的账户：{name} 注册成功</div>}
    subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
    extra={actions(link)}
  />
  );
}

export default RegisterResult;

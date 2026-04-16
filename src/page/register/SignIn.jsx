import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { ROLE_LIST } from "../../util/const";
import {
  AGENT_HOME_ROUTE,
  admin_routes,
  CASHIER_HOME_ROUTE,
  CrmRoutes,
  GRIND_PRODUCT_HOME_ROUTE,
  InkasatorRoutes,
  PASSWORD_RESET_ROUTE,
  PRODUCT_STORAGE_HOME_ROUTE,
  SALES_HOME_ROUTE,
  SUPPLIER_HOME_ROUTE,
  UPLOADER_HOME_ROUTE,
} from "../../util/path";

import MainText from "../../components/ui/title/MainText";
import styles from "./register.module.css";

export default function SignIn() {
  /* State */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  /* Dispatch */
  const dispatch = useDispatch();
  /* Navigate */
  const navigate = useNavigate();

  /* API */
  const [login] = useLoginMutation();

  /* Handle Submit */
  async function handleSubmit(values) {
    /* Set Event */
    setIsSubmitting(true);
    /* Set status */
    setStatus("validating");

    try {
      const data = {
        login: values.login,
        parol: values.password,
      };

      const resData = await login(data).unwrap();
      if (resData.success === true) {
        /* Set Credentials And Navigate */
        if (resData.data && resData?.data.rol) {
          setStatus("success");
          /* Message */
          if (resData.message) message.success(resData.message);

          const { data } = resData;
          dispatch(
            setCredentials({
              user: {
                name: data?.ism,
                surname: data?.familya,
                email: data?.email,
                telefon: data?.telefon,
                image: data?.rasm,
                login: data?.login,
              },
              accessToken: data?.token,
              role: data?.rol,
              remember: values.remember,
            })
          );

          /* Navigate with role  */
          switch (data.rol) {
            case ROLE_LIST.admin:
              navigate(admin_routes.home, { replace: true });
              break;
            case ROLE_LIST.cashier:
              navigate(CASHIER_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.supplier:
              navigate(SUPPLIER_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.storage:
              navigate(PRODUCT_STORAGE_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.sales:
              navigate(SALES_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.grind:
              navigate(GRIND_PRODUCT_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.uploader:
              navigate(UPLOADER_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.agent:
              navigate(AGENT_HOME_ROUTE, { replace: true });
              break;
            case ROLE_LIST.crm:
              navigate(CrmRoutes.home, { replace: true });
              break;
            case ROLE_LIST.inkasator:
              navigate(InkasatorRoutes.home, { replace: true });
              break;
            default:
              break;
          }
        } else {
          /* Message */
          message.error("Mavjud bo'lmagan toifa!");

          /* Set status */
          setStatus("warning");
        }
      } else if (resData.success === false) {
        /* Error message */
        if (resData.message) message.error(resData.message);

        /* Set status */
        setStatus("error");
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        message.warning("Ulanishda xatolik! Qaytadan urinib ko'ring!");
      }

      /* Set status */
      setStatus("warning");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <MainText lg>Kirish</MainText>
      <Form
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Login bo'sh bo'lmasin!" }]}
          hasFeedback
          validateStatus={status}
        >
          <Input
            autoFocus={true}
            prefix={<UserOutlined />}
            placeholder="Login kiriting"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Parol bo'sh bo'lmasin!" }]}
          hasFeedback
          validateStatus={status}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Parol"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" noStyle valuePropName="checked">
            <Checkbox>Meni eslab qol</Checkbox>
          </Form.Item>

          <Link className={styles.loginFormForgot} to={PASSWORD_RESET_ROUTE}>
            Parolni unutdingizmi?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
            loading={isSubmitting}
          >
            Kirish
          </Button>
          Yoki <Link to="">Ro'yxatdan o'tish!</Link>
        </Form.Item>
      </Form>
    </>
  );
}

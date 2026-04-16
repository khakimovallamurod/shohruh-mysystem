import {
  Button,
  Card,
  Form,
  message
} from "antd";
import { InputOTP } from "antd-input-otp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLightTitle from "../../../components/ui/title/MainLightTitle";
import { useAddSupplierConfirmSmsMutation } from "../../../features/supplier/orderSms/supplierConfirmSmsApiSlice";
import useParamQuery from "../../../hooks/useParamQuery";
import { SUPPLIER_HOME_ROUTE } from "../../../util/path";
import styles from "./supplierConfirmSms.module.css";

function SupplierConfirmSms() {
  /* Form */
  const [form] = Form.useForm();

  /* State */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [paramOrderId, setParamOrderId] = useState(null);
  const [code, setCode] = useState('')

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "confirmSmsCode";

  /* API */
  const [addConfirmSmsKod] = useAddSupplierConfirmSmsMutation();

  /* Query */
  const query = useParamQuery();

  /* Navigate */
  const navigate = useNavigate();

  useEffect(() => {
    const paramId = query.get("orderId");
    const code = query.get('code');
    if (paramId) {
      setCode(code);
      setParamOrderId(paramId);
    } else {
      navigate(SUPPLIER_HOME_ROUTE, { replace: true });
    }
  }, [navigate, query]);
  /* Handle submit */
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setStatus("validating");
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const data = {
        code: values?.otp?.join(""),
      };
      const resData = await addConfirmSmsKod({
        orderId: paramOrderId,
        body: { ...data },
      }).unwrap();
      if (resData?.success === true) {
        form.resetFields();
        setStatus("success");

        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
        setTimeout(() => {
          navigate(SUPPLIER_HOME_ROUTE, { replace: true });
        }, 2000);
      } else if (resData?.success === false) {
        setStatus("error");
        if (resData?.message) {
          messageApi.open({
            key,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        setStatus("warning");
        messageApi.open({
          key,
          type: "warning",
          content: "Ulanishda xatolik! Qaytadan urinib ko'ring!",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div className={styles.content}>
        <Card
          style={{
            width: "100%",
            boxShadow:
              "0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <MainLightTitle>SMS kodni kiriting!</MainLightTitle>
            <h2>{code}</h2>
          </div>
          <Form
            form={form}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "SMS kod talab qilinadi!",
                },
              ]}
            >
              <InputOTP
                autoFocus={true}
                disabled={isSubmitting}
                length={5}
                __EXPERIMENTAL_autoSubmit={form} // If you want to auto submit when all fields is filled, use this, otherwise, don't use it!
                inputType="numeric"
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                Jo'natish
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default SupplierConfirmSms;

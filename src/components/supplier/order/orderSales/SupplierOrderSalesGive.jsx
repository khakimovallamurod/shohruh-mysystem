import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAddSupplierGiveSalesOrderMutation } from "../../../../features/supplier/order/orderOfSales/supplierOrderOfSalesApiSlice";
import { SUPPLIER_CONFIRM_SMS_ROUTE } from "../../../../util/path";
import MainLightTitle from "../../../ui/title/MainLightTitle";
import styles from "./supplierOrderSales.module.css";

function SupplierOrderSalesGive({ orderId, onClose, from = "" }) {
  /* Form */
  const [form] = Form.useForm();
  /* State */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState({
    naqd: 0,
    plastik: 0,
    karta: 0,
    usd: 0,
    exchangeUsd: 0,
  });
  const [returnCurrency, setReturnCurrency] = useState("");
  const [repaymentDate, setRepaymentDate] = useState(null);
  /* State */
  const [totalPrice, setTotalprice] = useState(0);

  /* API */
  const [addOrder] = useAddSupplierGiveSalesOrderMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "orderGive";

  /* Navigate */
  const navigate = useNavigate();

  /* Calculate */
  useEffect(() => {
    const data = { ...currency };
    /* Total */
    let total = 0;
    total += parseFloat(data.naqd || 0);
    total += parseFloat(data.plastik || 0);
    total += parseFloat(data.karta || 0);
    /* Exchange */
    const exchanged =
      parseFloat(data.usd || 0) * parseFloat(data.exchangeUsd || 0);
    total += exchanged || 0;
    setReturnCurrency(total - totalPrice);
  }, [currency, totalPrice]);

  /* Change */
  const handleChange = (name, value) => {
    const data = { ...currency };

    data[name] = value;

    setCurrency({ ...data });
  };

  /* Handle reset */
  const handleReset = () => {
    form.resetFields();
    setReturnCurrency("");
    setCurrency({
      naqd: 0,
      plastik: 0,
      click: 0,
      karta: 0,
      usd: 0,
      exchangeUsd: 0,
    });
  };

  /* Handle submit */
  const handleSubmit = async (values) => {
    /* Set Event */
    setIsSubmitting(true);
    /* Set status */
    setStatus("validating");
    /* Message */
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const data = {
        naqd: 0,
        naqdusd: 0,
        valyuta: 0,
        plastik: 0,
        karta: 0,
        muddat: repaymentDate,
        izoh: values?.description,
      };
      const resData = await addOrder({ id: orderId, body: data }).unwrap();
      if (resData?.success === true) {
        if (from !== "sales") {
          navigate(
            `${SUPPLIER_CONFIRM_SMS_ROUTE}?orderId=${orderId}&code=${resData?.code}`,
            {
              replace: true,
            }
          );
        }
        handleReset();
        onClose();
        setStatus("success");
        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
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
      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        setStatus("warning");
        messageApi.open({
          key,
          type: "warning",
          content: `Ulanishda xatolik! Qaytadan urinib ko'ring!`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {contextHolder}

      <Form
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="horizontal"
      >
        <MainLightTitle>To'lov</MainLightTitle>
        <Divider />

        <table style={{ width: "100%" }}>
          <tbody>
            {/* <tr className={styles.tableRow}>
              <td className={styles.tableItem}>
                <b>Summa:</b>
              </td>
              <td className={styles.tableItem}>
                <b>
                  <MainNumberFormat value={totalPrice} />
                  &nbsp;so'm
                </b>
              </td>
            </tr>
            <tr>
              <td className={styles.tableItem}>Naqd(uzs):</td>
              <td className={styles.tableItem}>
                <MainInputPrice
                  name="naqd"
                  label={"Naqd pul"}
                  status={status}
                  onChange={(val) => handleChange("naqd", val)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.tableItem}>Plastik:</td>
              <td className={styles.tableItem}>
                <MainInputPrice
                  name="plastik"
                  label={"Plastik"}
                  status={status}
                  onChange={(val) => handleChange("plastik", val)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.tableItem}>Karta:</td>
              <td className={styles.tableItem}>
                <MainInputPrice
                  name="karta"
                  label={"Karta"}
                  status={status}
                  onChange={(val) => handleChange("karta", val)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.tableItem}>Naqd(usd):</td>
              <td className={styles.tableItem}>
                <MainInputPrice
                  name="usd"
                  label={"Naqd USD"}
                  status={status}
                  onChange={(val) => handleChange("usd", val)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.tableItem}>Valyuta kursi:</td>
              <td className={styles.tableItem}>
                <MainInputPrice
                  name="exchangeUsd"
                  label={"Valyuta kursi"}
                  status={status}
                  onChange={(val) => handleChange("exchangeUsd", val)}
                />
              </td>
            </tr> */}
            <tr>
              <td className={styles.tableItem}>Qarzni qaytarish muddati:</td>
              <td className={styles.tableItem}>
                <Form.Item
                  name="repayment"
                  rules={[
                    {
                      required: returnCurrency < 0,
                      message: "Muddat talab qilinadi!",
                    },
                  ]}
                  hasFeedback
                  validateStatus={status}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="0000-00-00"
                    onChange={(_, val) => setRepaymentDate(val)}
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <Divider />

        {/* <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "1rem",
          }}
        >
          <tbody>
            <tr className={styles.tableRow}>
              <td className={styles.tableItem}>Qarz(uzs):</td>
              <td className={styles.tableItem}>
                <Tag color={returnCurrency < 0 ? "red" : "green"}>
                  <MainNumberFormat
                    value={returnCurrency >= 0 ? 0 : returnCurrency}
                  />
                  &nbsp;so'm
                </Tag>
              </td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.tableItem}>Qaytim(uzs):</td>
              <td className={styles.tableItem}>
                <MainNumberFormat
                  value={returnCurrency < 0 ? 0 : returnCurrency}
                />
                &nbsp;so'm
              </td>
            </tr>
          </tbody>
        </table> */}

        <Typography.Text strong>
          Izoh <span style={{ opacity: 0.5 }}>(agar joiz bo'lsa)</span>
        </Typography.Text>
        <Form.Item name={"description"} hasFeedback validateStatus={status}>
          <Input.TextArea
            allowClear
            showCount
            placeholder="Izoh kiritish"
            rows={6}
          />
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              icon={<CloseOutlined />}
              danger
              disabled={isSubmitting}
              onClick={onClose}
            >
              Bekor qilish
            </Button>
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
              loading={isSubmitting}
            >
              Saqlash
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default SupplierOrderSalesGive;

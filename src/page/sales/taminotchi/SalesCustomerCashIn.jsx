import {
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import { useMemo, useState } from "react";
import MainModal from "../../../components/common/modal/MainModal";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import MainRefetchBtn from "../../../components/common/refechBtn/MainRefetchBtn";
import Section from "../../../components/common/section/Section";
import MainInputPrice from "../../../components/ui/inputPrice/MainInputPrice";
import {
  useAddSalesCustomerCashInMutation,
  useGetSalesCustomerPayHistoryQuery,
  useGetSalesCustomerQuery,
} from "../../../features/sales/customer/salesCustomerApiSlice";
import removeComma from "../../../util/removeComma";

const { RangePicker } = DatePicker;

function SalesCustomerCashInModal({ onClose }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useGetSalesCustomerQuery();
  const [addCashIn] = useAddSalesCustomerCashInMutation();

  const customerListForModal = useMemo(() => {
    if (data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const handleSubmit = async (values) => {
    const payload = {
      client_id: values.mijoz_id,
      naqdsum: removeComma(values.naqdsum) || 0,
      naqdusd: removeComma(values.naqdusd) || 0,
      valyuta: removeComma(values.valyuta) || 0,
      bank: removeComma(values.bank) || 0,
      karta: removeComma(values.karta) || 0,
      izoh: values.izoh,
    };
    const total =
      Number(payload.naqdsum) +
      Number(payload.bank) +
      Number(payload.karta) +
      Number(payload.naqdusd) * Number(payload.valyuta || 0);

    if (total <= 0) {
      messageApi.warning("Pul miqdorini kiriting!");
      return;
    }

    setIsSubmitting(true);
    try {
      const resData = await addCashIn(payload).unwrap();
      if (resData?.success) {
        messageApi.success(resData?.message || "Pul olindi");
        form.resetFields();
        setTimeout(() => onClose?.(), 700);
      } else {
        messageApi.error(resData?.message || "Saqlanmadi");
      }
    } catch (err) {
      messageApi.warning("Ulanishda xatolik!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Mijoz"
          name="mijoz_id"
          rules={[{ required: true, message: "Mijozni tanlang!" }]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Mijozni tanlash"
            loading={isLoading}
            optionFilterProp="label"
            options={customerListForModal.map((item) => ({
              value: item.id,
              label: `${item.fio} | Balans: ${item.balans || 0}`,
            }))}
          />
        </Form.Item>

        <MainInputPrice label="Naqd so'm" name="naqdsum" showLabel />
        <MainInputPrice label="Naqd USD" name="naqdusd" showLabel />
        <MainInputPrice label="Valyuta kursi" name="valyuta" showLabel />
        <MainInputPrice label="Bank" name="bank" showLabel />
        <MainInputPrice label="Karta" name="karta" showLabel />

        <Form.Item
          label="Izoh"
          name="izoh"
          rules={[{ required: true, message: "Izoh kiriting!" }]}
        >
          <Input.TextArea rows={4} placeholder="Izoh" />
        </Form.Item>

        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isSubmitting} block>
          Pul olish
        </Button>
      </Form>
    </>
  );
}

function SalesCustomerCashIn() {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dates, setDates] = useState({ start: "", end: "" });
  const { data: customerList, isLoading: customerLoading } = useGetSalesCustomerQuery();
  const { data, isLoading, isError, refetch } = useGetSalesCustomerPayHistoryQuery({
    clientId: selectedCustomer || 0,
    start: dates.start,
    end: dates.end,
  });

  const customerOptions = useMemo(() => {
    if (customerList?.success && Array.isArray(customerList?.data)) {
      return customerList.data;
    }
    return [];
  }, [customerList]);

  const tableData = useMemo(() => {
    if (data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const handleDateChange = (_, formatted) => {
    if (!formatted[0] || !formatted[1]) {
      setDates({ start: "", end: "" });
      return;
    }
    setDates({ start: formatted[0], end: formatted[1] });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Mijoz", dataIndex: "mijoz", key: "mijoz", width: 160 },
    {
      title: "Summa",
      dataIndex: "summa",
      key: "summa",
      width: 140,
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Naqd so'm",
      dataIndex: "naqdsum",
      key: "naqdsum",
      width: 130,
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Naqd USD",
      dataIndex: "naqdusd",
      key: "naqdusd",
      width: 120,
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      width: 120,
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Karta",
      dataIndex: "karta",
      key: "karta",
      width: 120,
      render: (v) => <MainNumberFormat value={v} />,
    },
    { title: "Izoh", dataIndex: "izoh", key: "izoh", width: 180 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => (
        <Tag color={status === "checked" ? "cyan-inverse" : "red-inverse"}>
          {status === "checked" ? "TASDIQLANGAN" : "TASDIQLANMAGAN"}
        </Tag>
      ),
    },
    { title: "Vaqt", dataIndex: "vaqt", key: "vaqt", width: 140 },
  ];

  return (
    <>
      <MainModal open={open} onClose={() => setOpen(false)}>
        <SalesCustomerCashInModal onClose={() => { setOpen(false); refetch(); }} />
      </MainModal>
      <Section>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={8}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)} block>
              Mijozdan pul olish
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Select
              style={{ width: "100%" }}
              placeholder="Mijozni tanlang"
              allowClear
              showSearch
              loading={customerLoading}
              onChange={(val) => setSelectedCustomer(val || null)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {customerOptions.map((c) => (
                <Select.Option value={c.id} key={c.id}>
                  {c.fio}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <RangePicker
              format="DD.MM.YYYY"
              style={{ width: "100%" }}
              onChange={handleDateChange}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 620, y: 620 }}
          locale={{
            emptyText: () => {
              if (isError && !isLoading) return <MainRefetchBtn refetch={refetch} />;
              return <Empty />;
            },
          }}
        />
      </Section>
    </>
  );
}

export default SalesCustomerCashIn;

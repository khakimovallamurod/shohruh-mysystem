import { CheckOutlined } from "@ant-design/icons";
import { Button, Tag, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import {
  useGetSalesReturnProductsHistoryByDateMutation,
  usePutSalesReturnProductsMutation,
} from "../../../features/sales/returnProduct/salesReturnProductApiSlice";

function SalesReturnProduct() {
  /* State */
  const [isSubbmitting, setIsSubmitting] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
  });
  const [mount, setMount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [allResData, setAllResData] = useState();

  /* API */
  const [getDataByDate] = useGetSalesReturnProductsHistoryByDateMutation();

  const [confirmData] = usePutSalesReturnProductsMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const getDataKey = "getData";
  const confirmDataKey = "confirmData";

  /* Handle confirm */
  const handleConfirm = async (id) => {
    messageApi.open({
      key: confirmDataKey,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await confirmData({ id }).unwrap();

      if (resData?.success === true) {
        if (resData?.message) {
          messageApi.open({
            key: confirmDataKey,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        if (resData?.message) {
          messageApi.open({
            key: confirmDataKey,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        message.warning("Ulanishda xatolik! Qaytadan urinib ko'ring!");
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sortType: "number",
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "product",
      key: "product",
      width: 150,
      sortType: "string",
    },
    {
      title: "Massa",
      dataIndex: "massa",

      width: 150,
      sortType: "number",
      render: (_, { massa }) => <MainNumberFormat value={massa} />,
    },
    {
      title: "Holat",
      dataIndex: "holat",
      width: 150,
      render: (holat) => (
        <Tag color={holat === "vozvrat" ? "red" : "green"}>{holat}</Tag>
      ),
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "narx",

      width: 150,
      sortType: "number",
      render: (_, { narx }) => <MainNumberFormat value={narx} />,
    },
    {
      title: "Summa (so'm)",
      dataIndex: "summa",

      width: 150,
      sortType: "number",
      render: (_, { summa }) => <MainNumberFormat value={summa} />,
    },
    {
      title: "Mijoz nomi",
      dataIndex: "customer",
      sortType: "string",
      width: 150,
      render: (_, { customerName }) => <>{customerName}</>,
    },
    {
      title: "Dostavkachi",
      dataIndex: "dostavchik",
      sortType: "string",
      width: 150,
    },
    {
      title: "Mijoz telefoni",
      sortType: "string",
      width: 150,
      render: (_, { client }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            fontSize: 11,
          }}
        >
          <a href={`tel:${client?.telefon}`}>{client?.telefon}</a>
          <a href={`tel:${client?.telefon2}`}>{client?.telefon2}</a>
          <a href={`tel:${client?.telefon3}`}>{client?.telefon3}</a>
        </div>
      ),
    },
    {
      title: "Sana",
      dataIndex: "vaqt",
      width: 100,
    },
    {
      title: "Amal",
      key: "operation",
      width: 80,
      fixed: "right",
      align: "center",
      render: (_, { id, status }) =>
        status === "new" ? (
          <Tooltip title="Tasdiqlash">
            <Button
              icon={<CheckOutlined />}
              type="primary"
              size="small"
              shape="round"
              onClick={() => handleConfirm(id)}
            />
          </Tooltip>
        ) : (
          <Button type="primary" size="small" shape="round" disabled>
            {status}
          </Button>
        ),
    },
  ];

  useEffect(() => {
    if (mount >= 1) {
      handleGetDataByDate({ ...selectDate });
    }
    setMount(2);
  }, [selectDate]);

  useEffect(() => {
    setTableData(
      filterData.sort((a, b) => parseInt(b.sana) - parseInt(a.sana))
    );
  }, [filterData]);

  /* Handle get data */
  const handleGetDataByDate = async (values) => {
    if (!values.start || !values.end) {
      setFilterData([]);
      return;
    }
    /* Set Event */
    setIsSubmitting(true);

    /* Message */
    messageApi.open({
      getDataKey,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await getDataByDate({
        start: values.start,
        end: values.end,
      }).unwrap();

      if (resData?.success === true) {
        if (
          resData?.success === true &&
          resData?.data &&
          resData?.data?.list &&
          Array.isArray(resData?.data?.list)
        ) {
          const newData = resData?.data?.list.map((item) => ({
            ...item,
            customerName: item?.client?.fio,
          }));
          setFilterData([...newData]);
          setAllResData(resData?.data);
        } else {
          setFilterData([]);
          setAllResData(null);
        }

        if (resData?.message) {
          messageApi.open({
            getDataKey,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        setFilterData([]);
        if (resData?.message) {
          messageApi.open({
            getDataKey,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        messageApi.open({
          getDataKey,
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

      <Section>
        <MainDataTable
          columns={columns}
          showDatePicker={true}
          setDateValue={setSelectDate}
          isLoading={isSubbmitting}
          data={tableData}
        />
        {tableData?.length ? (
          <div style={{ display: "flex", gap: "100px", marginTop: "3rem" }}>
            <div>
              <p>
                Jami pateriya:{" "}
                <b>
                  <MainNumberFormat value={allResData?.jamipaterya} />
                </b>
              </p>
              <p>
                Jami pateriya summa :{" "}
                <b>
                  <MainNumberFormat value={allResData?.jamisummapaterya} />
                </b>
              </p>
            </div>
            <div>
              <p>
                Jami vozvrat:{" "}
                <b>
                  <MainNumberFormat value={allResData?.jamivozvrat} />
                </b>
              </p>
              <p>
                Jami vozvrat summa:{" "}
                <b>
                  <MainNumberFormat value={allResData?.jamisummavozvrat} />
                </b>
              </p>
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default SalesReturnProduct;

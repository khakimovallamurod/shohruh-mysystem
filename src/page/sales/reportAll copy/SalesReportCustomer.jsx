import { PrinterOutlined } from "@ant-design/icons";
import { Button, Divider, Select, message } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MainTableCard from "../../../components/common/mainTableCard/MainTableCard";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import MainPrintTableData from "../../../components/common/printTableData/MainPrintTableData";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import { useGetSalesSupplierQuery } from "../../../features/sales/customer/salesCustomerApiSlice";
import { useGetSalesReportCustomerMutation } from "../../../features/sales/salesApiSlice";
import formatCurrency from "../../../util/formatCurrency";

function SalesReportCustomer() {
  /* Ref */
  const printTableRef = useRef(null);

  /* State */
  const [allResData, setAllResData] = useState(null);
  const [isSubbmitting, setIsSubmitting] = useState(false);
  const [selectSupplier, setSelectSupplier] = useState(null);
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
  });
  const [selectCustErr, setSelectCustErr] = useState(false);
  const [mount, setMount] = useState(0);
  const [filterData, setFilterData] = useState([]);

  /* API */
  const supplierRes = useGetSalesSupplierQuery();
  const [getDataByDate] = useGetSalesReportCustomerMutation();
  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "getData";

  /* Memo */
  const supplierOptions = useMemo(() => {
    if (
      supplierRes?.data?.success === true &&
      supplierRes?.data?.data &&
      Array.isArray(supplierRes?.data?.data)
    ) {
      return supplierRes?.data.data;
    }
    return [];
  }, [supplierRes?.data]);

  useEffect(() => {
    if (mount >= 1) {
      // if (!selectCustomer) {
      //   setSelectCustErr(true);
      //   message.error("Mijozni tanlang");
      //   return () => null;
      // }
      setSelectCustErr(false);

      handleGetDataByDate({ ...selectDate, supplier: selectSupplier });
    }
    setMount(true);
  }, [selectSupplier, selectDate]);

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
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await getDataByDate({
        supplier: values.supplier,
        start: values.start,
        end: values.end,
      }).unwrap();

      if (resData?.success === true) {
        if (
          resData?.success === true &&
          resData?.data &&
          resData?.data?.akt &&
          Array.isArray(resData?.data?.akt)
        ) {
          const newData = resData?.data?.akt.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          setFilterData([...newData]);
          setAllResData(resData?.data);
        } else {
          setFilterData([]);
          setAllResData(null);
        }

        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        setFilterData([]);
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

  const columns = [
    {
      title: "T/r",
      dataIndex: "id",
      width: 150,
      sortType: "number",
    },
    {
      title: "FIO",
      dataIndex: "fio",
      width: 150,
      sortType: "string",
    },
    {
      title: "Eski qarzi",
      dataIndex: "eski_qarz",
      width: 150,
      sortType: "number",
      render: (_, { eski_qarz }) => <MainNumberFormat value={eski_qarz} />,
    },
    {
      title: "Debet",
      dataIndex: "debit",
      width: 150,
      sortType: "number",
      render: (_, { debit }) => <MainNumberFormat value={debit} />,
    },
    {
      title: "To'lovlar",
      dataIndex: "jamikredit",
      width: 150,
      sortType: "number",
      render: (_, { jamikredit }) => <MainNumberFormat value={jamikredit} />,
    },
    {
      title: "Saldo",
      dataIndex: "saldo",
      width: 150,
      sortType: "number",
      render: (_, { saldo }) => <MainNumberFormat value={saldo} />,
    },
    {
      title: "Qaytarilgan",
      dataIndex: "massavozvrat",
      width: 150,
      sortType: "number",
      render: (_, { massavozvrat }) => (
        <MainNumberFormat value={massavozvrat} />
      ),
    },
  ];

  /* Handle print expand table */
  const handlePrintData = () => printTableRef.current.onPrint();

  return (
    <>
      {contextHolder}

      <MainPrintTableData
        ref={printTableRef}
        columns={columns}
        data={filterData}
        footer={
          filterData?.length ? (
            <div style={{ display: "flex", textAlign: "left", gap: "3rem" }}>
              <div>
                <p>
                  Jami eski qarz:
                  <b>{formatCurrency(allResData?.jami_eski_qarz)} so'm</b>
                </p>
                <p>
                  Terilgan pullar qiymati:{" "}
                  <b>{formatCurrency(allResData?.jamitolov)} so'm</b>
                </p>
                <p>
                  Berilgan yuklar qiymati:{" "}
                  <b>{formatCurrency(allResData?.jamiberilganyuk)} so'm</b>
                </p>
                <p>
                  Jami qoldiq:{" "}
                  <b>{formatCurrency(allResData?.jami_saldo)} so'm</b>
                </p>
              </div>
              <div>
                <p>
                  Chiqgan massa:
                  <b>{formatCurrency(allResData?.massa?.chiqqan)} kg</b>
                </p>
                <p>
                  Qaytarilgan massa:
                  <b>{formatCurrency(allResData?.massa?.vozvrat)} kg</b>
                </p>
                <p>
                  Pateriya massa:
                  <b>{formatCurrency(allResData?.massa?.paterya)} kg</b>
                </p>
              </div>
              <div>
                <p>
                  Chiqgan summa:
                  <b>{formatCurrency(allResData?.summa?.chiqqan)} so'm</b>
                </p>
                <p>
                  Qaytarilgan summa:
                  <b>{formatCurrency(allResData?.summa?.vozvrat)} so'm</b>
                </p>
                <p>
                  Pateriya summa:
                  <b>{formatCurrency(allResData?.summa?.paterya)} so'm</b>
                </p>
              </div>
            </div>
          ) : null
        }
      />

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <MainTableCard
              isLoading={isSubbmitting}
              title={formatCurrency(allResData?.jami_eski_qarz)}
              caption={"Eski qarz"}
              mode="danger"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.jamitolov)}
                caption={"Terilgan pullar qiymati"}
                mode="success"
                size="medium"
                style={{ height: "50%" }}
              />
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.jamiberilganyuk)}
                caption={"Berilgan yuklar qiymati"}
                mode="brown"
                size="medium"
                style={{ height: "50%" }}
              />
            </div>
            <MainTableCard
              isLoading={isSubbmitting}
              title={formatCurrency(allResData?.jami_saldo)}
              caption={"Qoldiq qarz"}
              mode="danger"
            />

            <div>
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.massa?.chiqqan)}
                caption={"Chiqgan massa"}
                mode="success"
                size="small"
                style={{ marginBottom: "0.5rem" }}
              />
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.massa?.vozvrat)}
                caption={"Qaytarilgan massa"}
                style={{ marginBottom: "0.5rem" }}
                mode="danger"
                size="small"
              />
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.massa?.paterya)}
                caption={"Pateriya massa"}
                mode="brown"
                size="small"
              />
            </div>
            <div>
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.summa?.chiqqan)}
                caption={"Chiqgan so'm"}
                mode="success"
                size="small"
                style={{ marginBottom: "0.5rem" }}
              />
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.summa?.vozvrat)}
                caption={"Qaytarilgan so'm"}
                style={{ marginBottom: "0.5rem" }}
                mode="danger"
                size="small"
              />
              <MainTableCard
                isLoading={isSubbmitting}
                title={formatCurrency(allResData?.summa?.paterya)}
                caption={"Pateriya so'm"}
                mode="brown"
                size="small"
              />
            </div>
          </div>
          <Button
            onClick={handlePrintData}
            icon={<PrinterOutlined />}
            shape="round"
            type="primary"
          />
        </div>

        <Divider />

        <div>
          <MainDataTable
            pagination={true}
            columns={columns}
            isLoading={isSubbmitting}
            // isError={isError}
            // refetch={refetch}
            data={filterData}
            showDatePicker={true}
            setDateValue={setSelectDate}
            customHeader={
              <Select
                style={{ width: "200px" }}
                allowClear
                showSearch
                placeholder="Dastavkachini tanlash"
                loading={false}
                filterOption={(inputValue, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0
                }
                status={selectCustErr ? "error" : ""}
                onChange={setSelectSupplier}
              >
                {supplierOptions.map((option) => (
                  <Select.Option value={option.id} key={option.id}>
                    {option?.dostavchik}
                  </Select.Option>
                ))}
              </Select>
            }
          />
        </div>
      </Section>
    </>
  );
}

export default SalesReportCustomer;

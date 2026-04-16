import {
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Popconfirm, Select, message } from "antd";
import React, { useMemo, useState } from "react";
import MainModal from "../../../components/common/modal/MainModal";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import { useDeleteAdminDividendMutation, useGetAdminDividendCategoryQuery, useGetAdminDividendQuery } from "../../../features/admin/dividend/adminDividendApiSlice";
import formatCurrency from "../../../util/formatCurrency";
import validateApiResArray from "../../../util/validateApiResArray";
import validateApiResObjectArray from "../../../util/validateApiResObjectArray";
import AdminAddDividendModal from "./components/AdminAddDividendModal";

function AdminDividend() {
  /* State */ 
  const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
  });
  const [dividendCategory, setDividendCategory] = useState(null);


  /* API */
  const dividendCategoryRes = useGetAdminDividendCategoryQuery();
  const dividendRes = useGetAdminDividendQuery({
    ...selectDate,
    dividendCategory
  });
  const [deleteUser] = useDeleteAdminDividendMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "delete";

  /* Memo */
  const dividendCategoryOptions = useMemo(() => {
    // Loading
    if (dividendCategoryRes.isLoading || dividendCategoryRes.isFetching) {
      return [];
    }

    return validateApiResArray(dividendCategoryRes);
  }, [dividendCategoryRes]);

  // const [onExportToExcel] = useExportToExcel();
  const [expensesData, totalData] = useMemo(() => {
    // Loading
    if (dividendRes.isLoading || dividendRes.isFetching) return [];
    // // Res
    const res = validateApiResObjectArray(dividendRes, "list");
    console.log(res.length);
    if (res.length) {
      const { jaminaqd, jamiusd, jamibank, jamikarta, jami } =
        dividendRes.data?.data;
      return [
        res,
        {
          jaminaqd: jaminaqd ? formatCurrency(jaminaqd) : 0,
          jamiusd: jaminaqd ? formatCurrency(jamiusd) : 0,
          jamibank: jaminaqd ? formatCurrency(jamibank) : 0,
          jamikarta: jaminaqd ? formatCurrency(jamikarta) : 0,
          jami: jaminaqd ? formatCurrency(jami) : 0,
        },
      ];
    } else {
      // setAllResData(null);
    }
    return [];
  }, [dividendRes]);

  /* DELETE */
  const handleDeleteItem = async (id) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await deleteUser(id).unwrap();

      if (resData?.success === true) {
        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
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
        message.warning("Ulanishda xatolik! Qaytadan urinib ko'ring!");
      }
    }
  };

  // const expensesData = useMemo(() => {
  //   if (data?.success === true && data?.data && Array.isArray(data?.data)) {
  //     return data.data;
  //   }
  //   return [];
  // }, [data?.data, data?.success]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      sortType: "number",
    },
    {
      title: "Javobgar",
      dataIndex: "javobgar",
      width: 200,
      sortType: "string",
    },
    {
      title: "Naqd so'm",
      dataIndex: "naqdsum",
      width: 150,
      sortType: "number",
      render: (naqdsum) => <MainNumberFormat value={naqdsum} />,
    },
    {
      title: "Naqd usd",
      dataIndex: "naqdusd",
      width: 150,
      sortType: "number",
      render: (naqdusd) => <MainNumberFormat value={naqdusd} />,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      width: 150,
      sortType: "number",
      render: (bank) => <MainNumberFormat value={bank} />,
    },
    {
      title: "Karta",
      dataIndex: "karta",
      width: 150,
      sortType: "number",
      render: (karta) => <MainNumberFormat value={karta} />,
    },
    {
      title: "Izoh",
      dataIndex: "izoh",
      width: 300,
    },
    {
      title: "Amal",
      dataIndex: "operation",
      width: 60,
      fixed: "right",
      align: "center",
      render: (_, { id }) => (
        <Popconfirm
          title="O'chirish"
          description="Rostdan ham o'chirmoqchimisiz?"
          onConfirm={() => handleDeleteItem(id)}
          okText="Ha, albatta"
          cancelText="Yo'q"
        >
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            size="small"
            danger
          />
        </Popconfirm>
      ),
    },
  ];

  /* MODAL */
  const handleOpenAddDepartmentModal = () => setOpenAddExpensesModal(true);
  const handleCloseAddDepartmentModal = () => setOpenAddExpensesModal(false);

  /* Handle export */
  // const handleExportExcel = () => {
  //   onExportToExcel({
  //     columns: columns,
  //     data: expensesData,
  //   });
  // };

  return (
    <>
      {contextHolder}

      <MainModal
        open={openAddExpensesModal}
        onClose={handleCloseAddDepartmentModal}
      >
        <AdminAddDividendModal />
      </MainModal>

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          {/* <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleExportExcel}
            >
              Excel
            </Button> */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAddDepartmentModal}
          >
            Pul olish
          </Button>
        </div>

        <MainDataTable
          columns={columns}
          isLoading={dividendRes.isLoading || dividendRes.isFetching}
          // isError={isError}
          data={expensesData}
          showDatePicker={true}
          setDateValue={setSelectDate}
          customHeader={
            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              <Select
                style={{ width: "200px" }}
                allowClear
                showSearch
                placeholder="Xarajat turini"
                loading={dividendCategoryRes?.isLoading}
                filterOption={(inputValue, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0
                }
                onChange={setDividendCategory}
              >
                {dividendCategoryOptions.map((option) => (
                  <Select.Option value={option.id} key={option.id}>
                    {option?.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          }
        // refetch={refetch}
        />
        {expensesData?.length ? (
          <div style={{ display: "flex", gap: "100px", marginTop: "3rem" }}>
            <div>
              <p>
                Jami naqd: <b>{totalData?.jaminaqd}</b>
              </p>
              <p>
                Jami usd: <b>{totalData?.jamiusd}</b>
              </p>
              <p>
                Jami bank: <b>{totalData?.jamibank}</b>
              </p>
              <p>
                Jami karta: <b>{totalData?.jamikarta}</b>
              </p>
              <p>
                Jami: <b>{totalData?.jami}</b>
              </p>
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default AdminDividend;

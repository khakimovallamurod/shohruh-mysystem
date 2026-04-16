import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import React, { useMemo, useState } from "react";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainModal from "../../../components/common/modal/MainModal";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import {
  useDeleteAdminExpensesMutation,
  useGetAdminExpensesQuery,
} from "../../../features/admin/expenses/adminExpensesApiSlice";
import useExportToExcel from "../../../hooks/exportTable/useExportToExcel";
import AdminAddExpensesModal from "./components/AdminAddExpensesModal";

function AdminExpenses() {
  /* State */
  const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);

  /* API */
  const { data, isLoading, isError, refetch } = useGetAdminExpensesQuery();
  const [deleteUser] = useDeleteAdminExpensesMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "delete";

  const [onExportToExcel] = useExportToExcel();

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

  const expensesData = useMemo(() => {
    if (data?.success === true && data?.data && Array.isArray(data?.data)) {
      return data.data;
    }
    return [];
  }, [data?.data, data?.success]);

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
  const handleExportExcel = () => {
    onExportToExcel({
      columns: columns,
      data: expensesData,
    });
  };

  return (
    <>
      {contextHolder}

      <MainModal
        open={openAddExpensesModal}
        onClose={handleCloseAddDepartmentModal}
      >
        <AdminAddExpensesModal />
      </MainModal>

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={handleExportExcel}
          >
            Excel
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAddDepartmentModal}
          >
            Xarajat qo'shish
          </Button>
        </div>

        <MainDataTable
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          data={expensesData}
          customHeader={
            <ExportTable
              columns={columns}
              fileName="Xarajatlar"
              data={[...expensesData]}
            />
          }
          refetch={refetch}
        />
      </Section>
    </>
  );
}

export default AdminExpenses;

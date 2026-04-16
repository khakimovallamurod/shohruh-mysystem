import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tag, message } from "antd";
import React, { useMemo, useState } from "react";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainModal from "../../../components/common/modal/MainModal";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import {
  useDeleteAdminUserMutation,
  useGetAdminUserQuery,
} from "../../../features/admin/user/adminUserApiSlice";
import AdminAddUserModal from "./components/AdminAddUserModal";

function AdminUser() {
  /* State */
  const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);

  /* API */
  const { data, isLoading, isError, refetch } = useGetAdminUserQuery();
  const [deleteUser] = useDeleteAdminUserMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "delete";

  const userData = useMemo(() => {
    if (data?.success === true && data?.data && Array.isArray(data?.data)) {
      return data.data;
    }
    return [];
  }, [data]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      sortType: "number",
    },
    {
      title: "Rol",
      dataIndex: "rol",
      width: 150,
      sortType: "string",
      render: (login) => {
        return <Tag color="#2db7f5">{login}</Tag>;
      },
    },
    {
      title: "Login",
      dataIndex: "login",
      width: 150,
      sortType: "string",
    },
    {
      title: "Ism",
      dataIndex: "ism",
      width: 150,
      sortType: "string",
    },
    {
      title: "Familiya",
      dataIndex: "familya",
      width: 150,
      sortType: "string",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      sortType: "string",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      sortType: "string",
      render: (status) => {
        const color = status === "aktiv" ? "cyan" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Telefon",
      dataIndex: "telefon",
      width: 200,
      sortType: "string",
    },
    {
      title: "Amal",
      dataIndex: "operation",
      width: 80,
      fixed: "right",
      align: "center",
      render: (_, { id }) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="primary"
            // onClick={() => handleOpenOrderModal(id)}
            size="small"
            onClick={() => handleOpenAddUserModal(id)}
          />
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
        </>
      ),
    },
  ];

  /* MODAL */
  const handleOpenAddUserModal = (itemId) => {
    const res = userData?.find((item) => item.id === itemId);
    if (res) {
      setOpenAddExpensesModal({
        open: true,
        data: res,
      });
    } else {
      setOpenAddExpensesModal({
        open: true,
        data: null,
      });
    }
  };
  const handleCloseAddUserModal = () =>
    setOpenAddExpensesModal({
      open: false,
      data: null,
    });

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

  return (
    <>
      {contextHolder}

      <MainModal
        open={openAddExpensesModal?.open}
        onClose={handleCloseAddUserModal}
      >
        <AdminAddUserModal
          onClose={handleCloseAddUserModal}
          userData={openAddExpensesModal?.data}
        />
      </MainModal>

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "1rem",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAddUserModal}
          >
            Foydalanuvchi qo'shish
          </Button>
        </div>
        <MainDataTable
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          data={userData}
          customHeader={
            <ExportTable
              columns={columns}
              fileName="Foydalanuvchilar"
              data={[...userData]}
            />
          }
          refetch={refetch}
        />
      </Section>
    </>
  );
}

export default AdminUser;

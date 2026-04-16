import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useMemo, useState } from "react";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import { useGetAdminSupplierMgmtAllReportQuery } from "../../../features/admin/supplierManagement/adminSupplierManagementApiSlice";
import useExportToExcel from "../../../hooks/exportTable/useExportToExcel";

function AdminSupplierAllReport() {
  const [selectedDate, setSelectedDate] = useState({ start: "", end: "" });

  const { data, isLoading, isError, refetch } = useGetAdminSupplierMgmtAllReportQuery(selectedDate);

  const [onExportToExcel] = useExportToExcel();

  const tableData = useMemo(() => {
    if (data?.success === true && Array.isArray(data?.data?.akt)) {
      return data.data.akt.map((item, index) => ({
        id: index + 1,
        taminotchi: item?.fio || "",
        phone: "",
        total_summa: item?.jamikredit || 0,
        paid: item?.debit || 0,
        qarz: item?.saldo || 0,
      }));
    }
    return [];
  }, [data]);

  const columns = [
    { title: "ID", dataIndex: "id", width: 70, sortType: "number" },
    { title: "Ta'minotchi", dataIndex: "taminotchi", width: 180, sortType: "string" },
    { title: "Telefon", dataIndex: "phone", width: 150, sortType: "string" },
    {
      title: "Umumiy summa",
      dataIndex: "total_summa",
      width: 150,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "To'langan",
      dataIndex: "paid",
      width: 140,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Qarz",
      dataIndex: "qarz",
      width: 130,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
  ];

  const handleExportExcel = () => {
    onExportToExcel({ columns, data: tableData });
  };

  return (
    <Section>
      <Row gutter={[12, 12]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} sm={6} lg={4}>
          <Button type="primary" icon={<UploadOutlined />} onClick={handleExportExcel} block>
            Excel
          </Button>
        </Col>
      </Row>
      <MainDataTable
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        data={tableData}
        showDatePicker={true}
        setDateValue={setSelectedDate}
        customHeader={
          <ExportTable columns={columns} fileName="Barcha_taminotchilar_hisobot" data={[...tableData]} />
        }
        refetch={refetch}
      />
    </Section>
  );
}

export default AdminSupplierAllReport;
